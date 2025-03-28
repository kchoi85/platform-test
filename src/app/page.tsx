'use client';

import { UserList } from './components/user-list.component';
import { CreateUserForm } from './components/create-user-form.component';
import { useGetAllUsers } from './hooks';
import { Link } from '@radix-ui/themes';
import { ExportOutlined } from '@ant-design/icons';

export default function HomePage() {
  const { users, isLoading } = useGetAllUsers();

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-100 via-red-50 to-purple-100 p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl  text-gray-800 flex justify-start">
          User Admin Dashboard
        </h1>
        <Link href="/maps">
          <span className="flex justify-start pt-2 gap-2">
            <p className="text-md">Go to maps</p>
            <ExportOutlined />
          </span>
        </Link>
      </header>
      <div className="grid grid-cols-4 gap-4 flex-grow w-full">
        <div className="col-span-1">
          <CreateUserForm />
        </div>
        <div className="col-span-3">
          <UserList users={users} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
