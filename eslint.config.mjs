import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      ".next-dev-*/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "next-env.d.ts"
    ]
  }
];

export default eslintConfig;
