'use client';

import { useState, useCallback } from 'react';
import { z } from 'zod';
import { trpc } from '@/utils/trpc';

// Define a zod schema for the user creation form.
const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

// Infer TypeScript type from the zod schema.
type CreateUserFormData = z.infer<typeof createUserSchema>;

export const useCreateUser = () => {
  // Initialize form state using the inferred type.
  const [formData, setFormData] = useState<CreateUserFormData>({
    name: '',
    email: '',
  });
  const utils = trpc.useUtils();

  const { mutate: createUser, isPending } = trpc.user.create.useMutation({
    onSuccess: () => {
      setFormData({ name: '', email: '' });
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
    onSettled: () => {
      utils.user.getAll.invalidate();
    },
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const result = createUserSchema.safeParse(formData);
      if (!result.success) {
        const errorMessages = result.error.issues
          .map((issue) => issue.message)
          .join('\n');
        alert(errorMessages);
        return;
      }
      createUser(formData);
    },
    [formData, createUser]
  );

  return { formData, handleChange, handleSubmit, isPending };
};
