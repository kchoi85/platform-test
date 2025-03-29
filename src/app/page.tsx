'use client';

import { Link } from '@radix-ui/themes';
import { ExportOutlined } from '@ant-design/icons';
import { LeftActionPanel, UserList } from './components';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-100 via-red-50 to-purple-100 p-8">
      <header className="mb-6 text-center">
        <h1 className="text-3xl  text-gray-800 flex justify-start">
          Admin Dashboard
        </h1>
        <Link href="/maps">
          <span className="flex justify-start pt-2 gap-2 font-medium">
            <p className="text-md">Go to maps as admin</p>
            <ExportOutlined />
          </span>
        </Link>
      </header>
      <div className="grid grid-cols-4 gap-4 flex-grow w-full">
        <div className="col-span-1">
          <LeftActionPanel />
        </div>
        <div className="col-span-3">
          <UserList />
        </div>
      </div>
    </main>
  );
}
