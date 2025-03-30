'use client';

import { Badge, Flex, Spinner, Table } from '@radix-ui/themes';
import Link from 'next/link';
import { useGetAllProperties } from '../hooks';

export function PropertyList() {
  const { properties, isLoading: usersLoading } = useGetAllProperties();
  console.log(properties);

  if (!properties || properties.length === 0)
    return (
      <p className="text-center text-gray-500 flex justify-center items-center min-h-[350px] border bg-white border-gray-300 rounded-lg">
        {usersLoading ? <Spinner /> : 'No properties found.'}
      </p>
    );

  return (
    <div className="shadow-lg h-[780px]">
      <Table.Root variant="surface" className="min-h-[350px] h-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Property Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Address</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>City</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Country</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Owners</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {properties?.map((property) => (
            <Table.Row key={property.id}>
              <Table.RowHeaderCell>
                <Link
                  href={`/properties/${property.id}`}
                  className="underline text-blue-600"
                >
                  {property.title}
                </Link>
              </Table.RowHeaderCell>
              <Table.Cell>{property.address}</Table.Cell>
              <Table.Cell>{property.city}</Table.Cell>

              <Table.Cell>{property.country}</Table.Cell>
              <Table.Cell>
                <Flex gap="2">
                  {property.owners.slice(0, 2).map((owner) => (
                    <Badge
                      key={owner.id}
                      color="blue"
                      className="hover:cursor-pointer"
                    >
                      {owner.name}
                    </Badge>
                  ))}
                  {property.owners.length > 2 && (
                    <Badge color="blue">+{property.owners.length - 2}</Badge>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
