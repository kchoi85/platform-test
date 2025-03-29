import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const propertyRouter = router({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1, { message: 'Property title is required' }),
        address: z.string().optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        postalCode: z.string().optional(),
        street: z.string().optional(),
        city: z.string().optional(),
        province: z.string().optional(),
        country: z.string().optional(),
        ownerId: z.string().min(1, { message: 'Owner is required' }),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.property.create({
        data: {
          title: input.title,
          address: input.address,
          latitude: input.latitude,
          longitude: input.longitude,
          postalCode: input.postalCode,
          street: input.street,
          city: input.city,
          province: input.province,
          country: input.country,
          owners: {
            connect: [{ id: Number(input.ownerId) }],
          },
        },
      });
    }),
});
