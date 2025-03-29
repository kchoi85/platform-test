'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const createPropertySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  address: z.string().min(1, 'Address is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
});

export type CreatePropertyFormData = z.infer<typeof createPropertySchema>;

export const useCreateProperty = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePropertyFormData>({
    resolver: zodResolver(createPropertySchema),
    defaultValues: {
      title: '',
      address: '',
      latitude: undefined,
      longitude: undefined,
      street: '',
      city: '',
      country: '',
      province: '',
      postalCode: '',
    },
  });

  const onSubmit = (data: CreatePropertyFormData) => {
    console.log('Submitting property:', data);
    // Example: createPropertyMutation.mutate(data);
    // Reset form after submission if needed:
    // reset();
  };

  return {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    onSubmit,
    isSubmitting,
  };
};
