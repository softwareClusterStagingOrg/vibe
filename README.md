<p align="center">
  <img src="https://user-images.githubusercontent.com/60314759/147566893-63c5209a-8b83-4f32-af61-8b4c350ec770.png" width="300px" alt="Vibe Design System, by monday.com">
  <h1 align="center">Vibe Design System</h1>
</p>

<p align="center">
Official <a href="https://monday.com">monday.com</a> UI resources for application development in React.js
</p>

<p align="center">
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@vibe/core">
  <a href="https://bundlephobia.com/package/@vibe/core"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/@vibe/core"></a>
  <a href="https://www.npmjs.com/package/@vibe/core"><img alt="NPM Version" src="https://img.shields.io/npm/v/@vibe/core?label=@vibe/core"></a>
  <a href="https://github.com/mondaycom/vibe/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/mondaycom/vibe"></a>
</p>

<p align="center">
  <a href="https://vibe.monday.com">Documentation</a> •
  <a href="https://vibe.monday.com/?path=/docs/catalog--docs">Catalog</a> •
  <a href="https://vibe.monday.com/?path=/story/playground--playground">Playground</a>
</p>

## Overview

Vibe Design System is a collection of React packages that deliver cohesive UI foundations for monday.com products and any React application adopting the same visual language. The monorepo ships components, design tokens, icons, tooling, accessibility guidelines, and automated workflows so teams can build consistent experiences faster.

### Key Features

- **Production-ready React components** that follow the monday.com design language and are tested across browsers and assistive technologies.
- **Design tokens & styling primitives** from `monday-ui-style`, exposed as CSS custom properties for effortless theming.
- **Accessibility-first patterns** including keyboard navigation, focus management, and ARIA guidance baked into base components.
- **Tooling & automation** such as codemods, Playwright test helpers, and an MCP (Model Context Protocol) server for AI-assisted development.
- **Documentation & Storybook playgrounds** with live catalogs, migration guides, and configuration recipes.

## Packages & Ecosystem

- [@vibe/core](https://github.com/mondaycom/vibe/blob/master/packages/core/README.md): Core component library
- [@vibe/icons](https://github.com/mondaycom/vibe/blob/master/packages/icons/README.md): Icons library
- [@vibe/testkit](https://github.com/mondaycom/vibe/blob/master/packages/testkit/README.md): Testing utilities for Playwright
- [@vibe/codemod](https://github.com/mondaycom/vibe/blob/master/packages/codemod/README.md): Codemods and CLI tools
- [monday-ui-style](https://github.com/mondaycom/vibe/blob/master/packages/style/README.md): Styling foundations (included in `@vibe/core`)
- [vibe-storybook-components](https://github.com/mondaycom/vibe/blob/master/packages/storybook-blocks/README.md): Storybook Blocks used in docs
- [storybook-addon-playground](https://github.com/mondaycom/storybook-addon-playground/): Component playground addon
- [@vibe/mcp](https://github.com/mondaycom/vibe/blob/master/packages/mcp/README.md): MCP server for AI-assisted workflows

## Getting Started

### Prerequisites

- Node.js `v20.12` (see `.nvmrc`) and npm or Yarn.
- React 18+ application or a compatible framework (Next.js, Vite, Remix, etc.).
- A bundler that understands ES modules (Webpack 5, Vite, Turbopack, etc.).

### Installation

```bash
# with npm
npm install @vibe/core

# or with Yarn
yarn add @vibe/core
```

### Load global styles & tokens

Add the design tokens once in your application entry point to expose the CSS variables used by every component:

```javascript
// src/main.tsx
import "@vibe/core/tokens";
```

If you also need the design system reset, include:

```javascript
import "@vibe/core/reset";
```

### Verify the setup

1. Start your app or Storybook.
2. Import a simple component (e.g., `Button`) from `@vibe/core`.
3. Confirm that tokens are applied (colors match the monday.com palette and typography renders correctly).

## Usage

### Import components

```javascript
import { Button, Flex, Text } from "@vibe/core";
```

### Example

```javascript
import { useState } from "react";
import { Button, Flex, Text } from "@vibe/core";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Flex gap={12} align="center">
      <Text weight="bold">Count: {count}</Text>
      <Button kind="primary" onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </Flex>
  );
}
```

Visit the [Catalog](https://vibe.monday.com/?path=/docs/catalog--docs) for API details and interactive props tables. The [Playground](https://vibe.monday.com/?path=/story/playground--playground) lets you prototype compositions with live code editing.

## Configuration

### Theming with design tokens

Override the custom properties exposed by `@vibe/core/tokens` to align the system with your brand:

```css
:root {
  --primary-text-color: #072d57;
  --primary-color: #0073ea;
  --primary-hover-color: #0060c5;
}

[data-theme="dark"] {
  --primary-text-color: #f6f7fb;
  --primary-color: #9a7fff;
}
```

Switch themes at runtime by toggling a `data-theme` attribute on the document or a wrapping element.

### Bundler configuration

- Ensure your bundler transpiles `@vibe/core` if your environment targets older browsers. For Next.js, add `"@vibe/core"` to `transpilePackages`.
- Keep CSS modules enabled so `.module.scss` files load correctly.
- Tree-shaking works out of the box because packages ship ES modules, but leave `sideEffects` handling enabled for CSS imports.

### TypeScript

Type definitions ship with every package. Make sure your `tsconfig.json` includes `"moduleResolution": "node16"` (or `bundler`) so path exports such as `@vibe/core/tokens` resolve without extra configuration.

## Tooling & Automation

### MCP

Vibe includes an MCP (Model Context Protocol) server that provides intelligent assistance for working with Vibe components. The MCP server can help you discover component APIs, get usage examples, find appropriate icons, and follow best practices.

To get started, follow the installation instructions in the [@vibe/mcp](https://github.com/mondaycom/vibe/blob/master/packages/mcp/README.md) docs to integrate it in your preferred AI development tools.

### Additional tooling

- Run codemods from `@vibe/codemod` when migrating between major versions.
- Use `@vibe/testkit` to write Playwright tests that are consistent with the component APIs.

## Contributing

We welcome and encourage every contributor! Please:

1. Read the [Contribution Guide](http://vibe.monday.com/?path=/docs/contributing--docs) for branching, testing, and code style expectations.
2. Use `yarn` at the repo root to install dependencies and run scripts (`yarn test`, `yarn lint`, `yarn storybook`, etc.).
3. Open a draft pull request early so maintainers can help with design or API questions.
4. Add relevant documentation (stories, docs pages) whenever you introduce or modify a component.

## Community & Support

- Start a [discussion](https://github.com/mondaycom/vibe/discussions) for ideas or help.
- Report bugs via [issues](https://github.com/mondaycom/vibe/issues/new/choose).
- Follow the [release notes](https://github.com/mondaycom/vibe/releases) to keep up with new components and fixes.

## Older Versions

Vibe 2 ([`monday-ui-react-core`](https://www.npmjs.com/package/monday-ui-react-core)) will no longer receive new features or enhancements but will continue to receive critical bug fixes as needed. We highly recommend following the [migration guide](http://vibe.monday.com/?path=/docs/migration-guide--docs) to upgrade to the actively maintained Vibe 3, which includes the latest improvements, new components, and ongoing support.

For version 2 documentation, see [vibe.monday.com/v2](https://vibe.monday.com/v2).

---

Funny note: If your button styles suddenly look too cheerful, that just means Vibe is working (and possibly had an extra espresso). Enjoy the dopamine-fueled pixels!
