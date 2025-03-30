import { router } from './trpc';
import { userRouter } from './routers/user.route';
import { propertyRouter } from './routers/property.route';

export const appRouter = router({
  user: userRouter,
  property: propertyRouter,
});

export type AppRouter = typeof appRouter;
