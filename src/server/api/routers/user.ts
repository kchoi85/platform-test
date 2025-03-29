import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const userRouter = router({
  getAll: publicProcedure.query(async () => {
    return prisma.user.findMany();
  }),

  findUnique: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.user.findUnique({ where: { id: Number(input.id) } });
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        role: z.nativeEnum(Role),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.user.create({ data: input });
    }),
});
