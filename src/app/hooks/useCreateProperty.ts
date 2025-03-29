'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trpc } from '@/utils/trpc';

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
  ownerId: z.string(), //?
});

export type CreatePropertyFormData = z.infer<typeof createPropertySchema>;

export const useCreateProperty = () => {
  // const utils = trpc.useUtils();

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
      ownerId: '0',
    },
  });

  const { mutate: createProperty, isPending } =
    trpc.property.create.useMutation({
      onSuccess: () => {
        reset();
      },
      onError: (error) => {
        alert(`Error: ${error.message}`);
      },
      onSettled: () => {
        // utils.property.getAll.invalidate();
      },
    });

  const onSubmit = (data: CreatePropertyFormData) => {
    createProperty(data);
  };

  return {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    onSubmit,
    isSubmitting: isSubmitting || isPending,
  };
};
