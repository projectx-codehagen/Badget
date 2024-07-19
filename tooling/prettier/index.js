import { fileURLToPath } from "url";

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindConfig: fileURLToPath(
    new URL("../../tooling/tailwind/index.ts", import.meta.url)
  ),
  bracketSpacing: true,
  endOfLine: "lf",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 80,
  tailwindFunctions: ["cn", "cva"],
  arrowParens: "always",
  proseWrap: "always",
  importOrder: [
    "<TYPES>",
    "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "<TYPES>^@dingify",
    "^@dingify/(.*)$",
    "",
    "<TYPES>^[.|..|~]",
    "",
    "^@/env(.*)$",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@/styles/(.*)$",
    "^@/app/(.*)$",
    "",
    "^~/",
    "^[../]",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "4.4.0",
};

export default config;
