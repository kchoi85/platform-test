'use client';

import { trpc } from '@/utils/trpc';

export const useGetAllProperties = () => {
  const { data: properties, isLoading } = trpc.property.getAll.useQuery();

  return { properties, isLoading };
};

export const useGetUniqueProperty = (id: string) => {
  const {
    data: property,
    isLoading,
    error,
  } = trpc.property.findUnique.useQuery({ id });

  return { property, isLoading, error };
};
