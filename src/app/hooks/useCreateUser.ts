'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trpc } from '@/utils/trpc';
import { Role } from '../shared/enums';

const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  role: z.nativeEnum(Role),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;

export const useCreateUser = () => {
  const utils = trpc.useUtils();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      role: Role.CUSTOMER,
    },
  });

  const { mutate: createUser, isPending } = trpc.user.create.useMutation({
    onSuccess: () => {
      reset();
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
    onSettled: () => {
      utils.user.getAll.invalidate();
    },
  });

  const onSubmit = (data: CreateUserFormData) => {
    createUser(data);
  };

  return {
    control,
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting: isSubmitting || isPending,
  };
};
