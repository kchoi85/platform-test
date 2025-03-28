'use client';

import { User } from '@prisma/client';
import Link from 'next/link';

export function UserList({
  users,
  isLoading,
}: {
  users: any[] | undefined;
  isLoading: boolean;
}) {
  if (isLoading) return <p className="text-gray-600">Loading users...</p>;
  if (!users || users.length === 0)
    return <p className="text-gray-500">No users found.</p>;

  return (
    <ul className="divide-y border rounded bg-white shadow-sm">
      {users.map((user) => (
        <li key={user.id} className="p-3">
          <Link href={`/users/${user.id}`} className="block">
            <div className="font-medium text-blue-600 hover:underline">
              {user.name}
            </div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
