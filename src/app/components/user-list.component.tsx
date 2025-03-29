'use client';

import { User } from '@prisma/client';
import { Container, Spinner, Table } from '@radix-ui/themes';
import Link from 'next/link';

export function UserList({
  users,
  isLoading,
}: {
  users: User[] | undefined;
  isLoading: boolean;
}) {
  if (!users || users.length === 0)
    return (
      <p className="text-center text-gray-500 flex justify-center items-center min-h-[350px] border bg-white border-gray-300 rounded-lg">
        {isLoading ? <Spinner /> : 'No users found.'}
      </p>
    );

  console.log(users);
  return (
    <div className="shadow-lg">
      <Table.Root variant="surface" className="min-h-[350px]">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Properties</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users?.map((user) => (
            <Table.Row key={user.id}>
              <Table.RowHeaderCell>{user.name}</Table.RowHeaderCell>
              <Table.Cell>
                <Link
                  href={`/users/${user.id}`}
                  className="underline text-blue-600"
                >
                  {user.email}
                </Link>
              </Table.Cell>
              <Table.Cell>
                {user.role?.charAt(0).toUpperCase() +
                  user.role?.slice(1).toLowerCase()}
              </Table.Cell>
              <Table.Cell>{user?.properties?.length}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
