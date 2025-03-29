import { router } from './trpc';
import { userRouter } from './routers/user';
import { propertyRouter } from './routers/property';

export const appRouter = router({
  user: userRouter,
  property: propertyRouter,
});

export type AppRouter = typeof appRouter;
