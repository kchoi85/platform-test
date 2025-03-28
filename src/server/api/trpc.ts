import { initTRPC } from '@trpc/server';
import { inferAsyncReturnType } from '@trpc/server';

export const createContext = () => ({});
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;
