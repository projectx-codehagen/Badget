import type { Config } from "tailwindcss";

import baseConfig from "@projectx/tailwind-config";

export default {
  content: [...baseConfig.content],
  presets: [baseConfig],
} satisfies Config;
