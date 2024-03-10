import { accountRouter } from "./router/account";
import { assetRouter } from "./router/asset";
import { authRouter } from "./router/auth";
import { customerRouter } from "./router/customer";
import { organizationsRouter } from "./router/organizations";
import { stripeRouter } from "./router/stripe";
import { usersRouter } from "./router/users";
import { createTRPCRouter } from "./trpc";

// Deployed to /trpc/edge/**
export const edgeRouter = createTRPCRouter({
  auth: authRouter,
  stripe: stripeRouter,
  organization: organizationsRouter,
  customer: customerRouter,
  users: usersRouter,
  account: accountRouter,
  asset: assetRouter,
});
