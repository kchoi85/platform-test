'use client';

import { useGetUniqueUser } from '@/app/hooks';
import { useParams } from 'next/navigation';

export default function UserPage() {
  // Extract the dynamic route parameter.
  const { id } = useParams() as { id: string };
  const { user, isLoading, error } = useGetUniqueUser(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
