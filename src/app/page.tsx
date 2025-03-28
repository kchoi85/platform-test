'use client';

import { UserList } from './components/user-list';
import { CreateUserForm } from './components/create-user-form';
import { useGetAllUsers } from './hooks';

export default function HomePage() {
  const { users, isLoading } = useGetAllUsers();

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <UserList users={users} isLoading={isLoading} />
        <CreateUserForm />
      </div>
    </main>
  );
}
