import path from "node:path";

import { FlatCompat } from "@eslint/eslintrc";
import prettierConfig from "eslint-config-prettier";

const compat = new FlatCompat({
  baseDirectory: path.resolve(process.cwd())
});

const config = [
  ...compat.extends("next", "next/core-web-vitals", "next/typescript"),
  prettierConfig,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "import/order": [
        "error",
        {
          groups: [["builtin", "external"], ["internal"], ["parent", "sibling", "index"]],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ]
    }
  },
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
  }
];

export default config;
