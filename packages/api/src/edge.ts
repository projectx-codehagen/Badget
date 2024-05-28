import { accountRouter } from "./router/account";
import { assetRouter } from "./router/asset";
import { authRouter } from "./router/auth";
import { createTRPCRouter } from "./trpc";
import { customerRouter } from "./router/customer";
import { manualImportRouter } from "./router/manual-import";
import { organizationsRouter } from "./router/organizations";
import { stripeRouter } from "./router/stripe";
import { usersRouter } from "./router/users";

// Deployed to /trpc/edge/**
export const edgeRouter = createTRPCRouter({
  auth: authRouter,
  stripe: stripeRouter,
  organization: organizationsRouter,
  customer: customerRouter,
  users: usersRouter,
  account: accountRouter,
  asset: assetRouter,
  import: manualImportRouter,
});
