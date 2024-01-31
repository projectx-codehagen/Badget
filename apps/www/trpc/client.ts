import { createTRPCClient, loggerLink } from "@trpc/client";

import type { AppRouter } from "@projectx/api";
import { transformer } from "@projectx/api/transformer";

import { endingLink } from "./shared";

export const api = createTRPCClient<AppRouter>({
  transformer: transformer,
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    endingLink({
      headers: {
        "x-trpc-source": "client",
      },
    }),
  ],
});

export { type RouterInputs, type RouterOutputs } from "@projectx/api";
