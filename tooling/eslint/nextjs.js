/** @type {import('eslint').Linter.Config} */
const config = {
  extends: [
    "next/core-web-vitals",
    // "plugin:@next/next/recommended",
    // "plugin:tailwindcss/recommended"
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "off"
  },
  settings: {
    tailwindcss: {
      callees: ["cn"],
      config: "tailwind.config.ts"
    }
  },
};

module.exports = config;