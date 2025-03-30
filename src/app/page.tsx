'use client';

import { Flex, Link } from '@radix-ui/themes';
import { ExportOutlined } from '@ant-design/icons';
import { LeftActionPanel, PropertyList, UserList } from './components';
import { useState } from 'react';

export default function HomePage() {
  const [panel, setPanel] = useState<'properties' | 'users'>('properties');

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-100 via-red-50 to-purple-100 p-8 pt-5">
      <header className="mb-6 text-center">
        <h1 className="text-2xl  text-gray-800 flex justify-start">
          Admin Dashboard
        </h1>
        <span className="flex font-medium  w-max ">
          <Link href="/maps">
            <Flex gap="2">
              <p className="text-base">Go to maps as admin</p>
              <ExportOutlined />
            </Flex>
          </Link>
        </span>
      </header>
      <div className="grid grid-cols-4 gap-4 flex-grow w-full">
        <div className="col-span-1">
          <LeftActionPanel panel={panel} onHandlePanel={setPanel} />
        </div>
        <div className="col-span-3">
          <div className={panel === 'properties' ? 'block' : 'hidden'}>
            <PropertyList />
          </div>
          <div className={panel === 'users' ? 'block' : 'hidden'}>
            <UserList />
          </div>
        </div>
      </div>
    </main>
  );
}
