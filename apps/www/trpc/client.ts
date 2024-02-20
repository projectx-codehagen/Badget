import { loggerLink } from "@trpc/client";
import {
  experimental_createActionHook,
  experimental_createTRPCNextAppDirClient,
  experimental_serverActionLink,
} from "@trpc/next/app-dir/client";

import type { AppRouter } from "@projectx/api";
import { transformer } from "@projectx/api/transformer";

import { endingLink } from "./shared";

export const api = experimental_createTRPCNextAppDirClient<AppRouter>({
  config() {
    return {
      transformer,
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
    };
  },
});

export const useAction = experimental_createActionHook({
  transformer,
  links: [experimental_serverActionLink()],
});

export { type RouterInputs, type RouterOutputs } from "@projectx/api";
