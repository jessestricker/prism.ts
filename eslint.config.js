// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

const commonConfig = {
  files: ["src"],
};

export default tseslint.config(
  { ...eslint.configs.recommended, ...commonConfig },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    ...commonConfig,
  })),
);
