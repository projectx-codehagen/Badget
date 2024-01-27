import { edgeRouter } from "./edge";
import { lambdaRouter } from "./lambda";
import { mergeRouters } from "./trpc";

// Used to provide a good DX with a single client
// Then, a custom link is used to generate the correct URL for the request
export const appRouter = mergeRouters(edgeRouter, lambdaRouter);
export type AppRouter = typeof appRouter;
