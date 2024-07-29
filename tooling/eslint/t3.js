export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    parser: "@typescript-eslint/parser",
    plugins: ["isaacscript", "import"],
    extends: [
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:@typescript-eslint/stylistic-type-checked",
      "plugin:prettier/recommended",
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      // These off/not-configured-the-way-we-want lint rules we like & opt into
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "import/consistent-type-specifier-style": ["error", "prefer-inline"],

      // For educational purposes we format our comments/jsdoc nicely
      "isaacscript/complete-sentences-jsdoc": "warn",
      "isaacscript/format-jsdoc-comments": "warn",

      // These lint rules don't make sense for us but are enabled in the preset configs
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/restrict-template-expressions": "off",

      // This rule doesn't seem to be working properly
      "@typescript-eslint/prefer-nullish-coalescing": "off",
    },
  },
];
