import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const properties = [];

  for (let i = 1; i <= 100; i++) {
    properties.push({
      title: `Property #${i}`,
      address: `${i} Random St`,
      latitude: 43.65 + (Math.random() * 0.05 - 0.025), // Spread out to cover a larger area
      longitude: -79.4 + (Math.random() * 0.06 - 0.03),
      street: `Random St`,
      city: 'Toronto',
      province: 'ON',
      country: 'Canada',
      postalCode: `M5V ${Math.floor(Math.random() * 10)}${Math.floor(
        Math.random() * 10
      )}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
    });
  }

  await prisma.property.createMany({
    data: properties,
  });

  console.log('Inserted 100 properties successfully!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
