# @vibe/config

> Shared configuration for build, linting, and testing across Vibe packages

This package contains shared configuration files and build tools used across all Vibe Design System packages. It ensures consistency in code quality, build processes, and testing setups.

## Overview

The `@vibe/config` package provides:
- ESLint configurations for JavaScript and TypeScript
- Rollup build configurations
- Vitest test configurations
- Build scripts and utilities

## Installation

This package is typically installed as a devDependency in other Vibe packages:

```bash
npm install --save-dev @vibe/config
# or
yarn add --dev @vibe/config
```

## Included Configurations

### ESLint Configuration

**Files:**
- `eslint.config.cjs` - Modern ESLint flat config (ESLint 9+)
- `.eslintrc.cjs` - Legacy ESLint config

**Usage in Your Package:**

```javascript
// eslint.config.cjs
const vibeConfig = require('@vibe/config/eslint.config.cjs');

module.exports = [
  ...vibeConfig,
  // Your custom rules
  {
    rules: {
      // Override or extend rules
    }
  }
];
```

**Or with legacy config:**

```javascript
// .eslintrc.cjs
module.exports = {
  extends: ['@vibe/config/.eslintrc.cjs'],
  rules: {
    // Your custom rules
  }
};
```

**Included Rules:**
- React best practices
- TypeScript type checking
- Accessibility (a11y) rules
- Import/export ordering
- Code formatting (works with Prettier)
- React Hooks rules

### Rollup Configuration

**File:** `rollup.config.mjs`

**Usage:**

```javascript
// rollup.config.mjs in your package
import { createRollupConfig } from '@vibe/config/rollup.config.mjs';

export default createRollupConfig({
  // Package-specific options
});
```

**Features:**
- TypeScript compilation
- CSS/SCSS processing with CSS Modules
- Tree-shaking optimization
- Source map generation
- Bundle size optimization
- External dependency handling

**Default Output Formats:**
- ESM (ECMAScript Modules)
- CommonJS
- Type declarations (.d.ts)

### Vitest Configuration

**File:** `vitest.config.mjs`

**Usage:**

```javascript
// vitest.config.mjs in your package
import { defineConfig } from 'vitest/config';
import vibeConfig from '@vibe/config/vitest.config.mjs';

export default defineConfig({
  ...vibeConfig,
  test: {
    ...vibeConfig.test,
    // Your custom test config
  }
});
```

**Included Setup:**
- React Testing Library setup
- JSDOM environment
- Coverage configuration
- TypeScript support
- CSS/SCSS module mocking

## Build Scripts

### Style Injection Template

**File:** `scripts/styleInject.ejs`

This template is used by Rollup to inject CSS into JavaScript bundles at runtime.

**Usage:**
Automatically used by the Rollup configuration when processing CSS modules.

**How it works:**
1. CSS is extracted from `.module.scss` files
2. Template wraps CSS in JavaScript
3. CSS is injected into `<head>` at runtime
4. Supports SSR with `globalThis.injectedStyles`

## Configuration Options

### Rollup Build Options

```javascript
import { createRollupConfig } from '@vibe/config/rollup.config.mjs';

export default createRollupConfig({
  input: 'src/index.ts',           // Entry point
  external: ['react', 'react-dom'], // External dependencies
  cssModules: true,                 // Enable CSS modules
  extractCSS: false,                // Extract to separate file
  sourcemap: true,                  // Generate source maps
  minify: true,                     // Minify output
});
```

### Vitest Test Options

Common test configuration patterns:

```javascript
export default defineConfig({
  test: {
    globals: true,              // Enable global test APIs
    environment: 'jsdom',       // Use JSDOM for DOM testing
    setupFiles: ['./vitest.setup.mjs'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.stories.tsx',
        '**/__tests__/**'
      ]
    }
  }
});
```

## Usage Examples

### Setting Up a New Package

#### 1. Install Dependencies

```bash
yarn add --dev @vibe/config
```

#### 2. Create ESLint Config

```javascript
// eslint.config.cjs
const vibeConfig = require('@vibe/config/eslint.config.cjs');

module.exports = vibeConfig;
```

#### 3. Create Rollup Config

```javascript
// rollup.config.mjs
import { createRollupConfig } from '@vibe/config/rollup.config.mjs';

export default createRollupConfig({
  input: 'src/index.ts',
  external: ['react', 'react-dom', '@vibe/core']
});
```

#### 4. Create Vitest Config

```javascript
// vitest.config.mjs
import { defineConfig } from 'vitest/config';
import vibeConfig from '@vibe/config/vitest.config.mjs';

export default defineConfig(vibeConfig);
```

#### 5. Add Scripts to package.json

```json
{
  "scripts": {
    "build": "rollup -c",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix"
  }
}
```

### Extending Configurations

#### Custom ESLint Rules

```javascript
// eslint.config.cjs
const vibeConfig = require('@vibe/config/eslint.config.cjs');

module.exports = [
  ...vibeConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // Disable specific rule for this package
      '@typescript-eslint/no-explicit-any': 'off',
      
      // Add package-specific rules
      'no-console': ['error', { allow: ['warn', 'error'] }]
    }
  }
];
```

#### Custom Rollup Plugins

```javascript
// rollup.config.mjs
import { createRollupConfig } from '@vibe/config/rollup.config.mjs';
import customPlugin from './custom-plugin';

const config = createRollupConfig();

export default {
  ...config,
  plugins: [
    ...config.plugins,
    customPlugin()
  ]
};
```

#### Custom Test Setup

```javascript
// vitest.config.mjs
import { defineConfig } from 'vitest/config';
import vibeConfig from '@vibe/config/vitest.config.mjs';

export default defineConfig({
  ...vibeConfig,
  test: {
    ...vibeConfig.test,
    setupFiles: [
      ...vibeConfig.test.setupFiles,
      './custom-setup.ts'
    ],
    coverage: {
      ...vibeConfig.test.coverage,
      threshold: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    }
  }
});
```

## Shared Build Utilities

### CSS Module Processing

The configuration handles CSS Modules automatically:

```scss
// Component.module.scss
.button {
  background: var(--primary-color);
  
  &:hover {
    background: var(--primary-hover-color);
  }
}
```

```typescript
// Component.tsx
import styles from './Component.module.scss';

export const Component = () => (
  <button className={styles.button}>Click me</button>
);
```

**Features:**
- Automatic class name hashing
- CSS variable support
- SCSS syntax support
- Style injection at runtime
- SSR support via `globalThis.injectedStyles`

### TypeScript Compilation

TypeScript is compiled with:
- Strict type checking
- Declaration file generation
- Source map support
- Modern ES features

## Configuration Files Reference

### eslint.config.cjs

**Purpose:** Modern ESLint flat configuration  
**Extends:** 
- `eslint:recommended`
- `plugin:react/recommended`
- `plugin:@typescript-eslint/recommended`
- `plugin:jsx-a11y/recommended`

**Key Rules:**
- React Hooks dependency checking
- TypeScript type safety
- Accessibility best practices
- Import ordering and organization

### rollup.config.mjs

**Purpose:** Build configuration for package bundling  
**Plugins:**
- `@rollup/plugin-typescript` - TypeScript compilation
- `@rollup/plugin-node-resolve` - Node module resolution
- `@rollup/plugin-commonjs` - CommonJS compatibility
- `rollup-plugin-postcss` - CSS/SCSS processing
- `rollup-plugin-terser` - Code minification

**Output:**
- `dist/index.esm.js` - ES modules
- `dist/index.cjs.js` - CommonJS
- `dist/types/` - TypeScript declarations

### vitest.config.mjs

**Purpose:** Test runner configuration  
**Features:**
- JSDOM environment for DOM testing
- React Testing Library integration
- Coverage reporting with V8
- CSS Module mocking
- TypeScript support

## Troubleshooting

### ESLint Issues

**Problem:** ESLint rules conflicting with Prettier

**Solution:**
```bash
# Install Prettier ESLint config
yarn add --dev eslint-config-prettier

# Update ESLint config
// eslint.config.cjs
module.exports = [
  ...vibeConfig,
  require('eslint-config-prettier')
];
```

### Build Issues

**Problem:** CSS not being injected

**Solution:** Ensure `styleInject.ejs` template is properly configured in Rollup config.

**Problem:** TypeScript types not generated

**Solution:** Check `tsconfig.json` has `declaration: true`.

### Test Issues

**Problem:** Tests failing with CSS import errors

**Solution:** Vitest config should mock CSS modules:
```javascript
css: {
  modules: {
    classNameStrategy: 'non-scoped'
  }
}
```

## Development

### Building the Config Package

```bash
# No build step needed - configs are used directly
yarn lint
```

### Testing Configuration Changes

Test configuration changes in a real package:

```bash
cd packages/some-package
yarn build  # Test Rollup config
yarn test   # Test Vitest config
yarn lint   # Test ESLint config
```

## Best Practices

### 1. Keep Configurations Minimal

Only override what's necessary:
```javascript
// ✅ Good
module.exports = [...vibeConfig];

// ❌ Avoid unless needed
module.exports = {
  // Copying entire config
};
```

### 2. Document Custom Rules

When adding custom rules, explain why:
```javascript
{
  rules: {
    // Disabled because X package needs Y behavior
    'some-rule': 'off'
  }
}
```

### 3. Validate Before Committing

Always run linting and tests:
```bash
yarn lint && yarn test
```

### 4. Keep Dependencies Updated

Regularly update config dependencies:
```bash
yarn upgrade-interactive --latest
```

## Related Packages

All Vibe packages use this configuration:
- [@vibe/core](../core/README.md)
- [@vibe/icons](../icons/README.md)
- [@vibe/hooks](../hooks/README.md)
- [@vibe/shared](../shared/README.md)
- And more...

## Contributing

When contributing configuration changes:

1. **Test across packages** - Changes affect all Vibe packages
2. **Document breaking changes** - Update migration guides
3. **Version carefully** - Follow semantic versioning strictly
4. **Get approval** - Config changes require maintainer review

See the main [Contributing Guide](../../CONTRIBUTING.md) for more information.

## License

See the main [Vibe repository](../../README.md) for license information.
