'use client';

import { User } from '@prisma/client';
import { Box, Container, Progress, Table } from '@radix-ui/themes';
import Link from 'next/link';

export function UserList({
  users,
  isLoading,
}: {
  users: User[] | undefined;
  isLoading: boolean;
}) {
  if (!isLoading && (!users || users.length === 0))
    return <p className="text-center text-gray-500">No users found.</p>;

  return (
    <div className="shadow-lg">
      {isLoading ? (
        <Container align="center" className="h-50"></Container>
      ) : (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
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
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
}
