# @vibe/config

> Shared configurations for Vibe packages

This is an internal package that provides shared configuration files for all packages in the Vibe monorepo. It includes configurations for TypeScript, ESLint, Rollup, and Vitest.

## Package Contents

This package exports the following configurations:

- **TypeScript**: Base TypeScript configuration (`tsconfig.json`)
- **ESLint**: Shared ESLint configuration (`.eslintrc.cjs` and `eslint.config.cjs`)
- **Rollup**: Build configuration for package bundling (`rollup.config.mjs`)
- **Vitest**: Test runner configuration (`vitest.config.mjs`)

## Usage

This package is private and only used internally within the Vibe monorepo. Other packages extend these configurations:

### TypeScript

```json
{
  "extends": "@vibe/config/tsconfig"
}
```

### ESLint

```javascript
module.exports = {
  extends: ["../../node_modules/@vibe/config/.eslintrc.cjs"]
};
```

### Rollup

```javascript
import baseConfig from "@vibe/config/rollup.config";
```

### Vitest

```javascript
import { defineConfig } from "vitest/config";
import baseConfig from "@vibe/config/vitest.config";

export default defineConfig({
  ...baseConfig
});
```

## Note

This package is marked as private and is not published to npm. It is only used for maintaining consistency across the Vibe monorepo.
