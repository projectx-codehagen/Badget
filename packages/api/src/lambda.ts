import { integrationsRouter } from "./router/integrations";
import { createTRPCRouter } from "./trpc";

// Deployed to /trpc/lambda/**
export const lambdaRouter = createTRPCRouter({
  integrations: integrationsRouter,
});
