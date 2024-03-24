import { fileURLToPath } from "url";
import withMDX from "@next/mdx";
import _jiti from "jiti";

const jiti = _jiti(fileURLToPath(import.meta.url));

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
jiti("./env");

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,

  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["mdx", "ts", "tsx"],

  transpilePackages: [
    "@projectx/api",
    "@projectx/db",
    "@projectx/openbanking",
    "@projectx/stripe",
    "@projectx/transactional",
    "@projectx/validators",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      // TODO: remove code below
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "asset.brandfetch.io",
      },
    ],
  },
};

export default withMDX()(config);
