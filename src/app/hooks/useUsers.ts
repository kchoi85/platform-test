'use client';

import { trpc } from '@/utils/trpc';

export const useGetAllUsers = () => {
  const { data: users, isLoading } = trpc.user.getAll.useQuery();

  return { users, isLoading };
};

export const useGetUniqueUser = (id: string) => {
  const {
    data: user,
    isLoading,
    error,
  } = trpc.user.findUnique.useQuery({ id });

  return { user, isLoading, error };
};
