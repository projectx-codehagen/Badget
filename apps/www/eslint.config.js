import baseConfig from "@dingify/eslint-config/base";
import nextjsConfig from "@dingify/eslint-config/nextjs";
import reactConfig from "@dingify/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  {
    // TODO: Resolve errors when setting these rules to 'error'
    rules: {
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-definitions": "warn",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/require-await": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/dot-notation": "warn",
    },
  },
];
