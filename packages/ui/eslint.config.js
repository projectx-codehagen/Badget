import baseConfig from "@dingify/eslint-config/base";
import reactConfig from "@dingify/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
const config = [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];

export default config;
