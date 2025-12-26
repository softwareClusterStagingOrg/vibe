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

Vibe Design System is a multi-package toolkit that streamlines monday.com product development. It ships production-ready React components, design tokens, styling foundations, icons, codemods, documentation, and automation so teams can move from design to implementation quickly while staying on-brand and accessible.

## Features

- **Production-ready React components** – Opinionated building blocks covering form controls, navigation, overlays, feedback, data display, and layout primitives.
- **Design tokens** – monday.com design decisions (color, spacing, typography, elevation) exposed as CSS variables through `@vibe/core/tokens`.
- **Documentation & playground** – API references, catalog pages, and interactive demos at [vibe.monday.com](https://vibe.monday.com).
- **Developer automation** – Codemods, Playwright utilities, and the @vibe/mcp server for AI-assisted workflows across the ecosystem.
- **Integration-ready assets** – SVG icons, Storybook blocks, and styling primitives that keep downstream apps visually consistent.

## Installation

### Prerequisites

- Node.js `v20.12` (see `.nvmrc`)
- Yarn 1.x (workspace-aware) or npm 9+

### Install `@vibe/core`

```bash
# with npm
npm install @vibe/core

# or with Yarn
yarn add @vibe/core
```

### Monorepo setup (contributors)

```bash
git clone https://github.com/mondaycom/vibe.git
cd vibe
yarn install
yarn build        # builds packages via Lerna
yarn storybook    # runs Storybook instances in parallel
```

## Usage Examples

### Import components

```tsx
import "@vibe/core/tokens"; // once in your app entrypoint
import { Button, Flex, Text } from "@vibe/core";

export function WelcomePanel() {
  return (
    <Flex direction="column" gap={3} padding={4}>
      <Text size="md" weight="bold">
        Welcome to Vibe
      </Text>
      <Button kind="primary" onClick={() => console.log("Clicked!")}>
        Get started
      </Button>
    </Flex>
  );
}
```

### Compose components with tokens

```tsx
import "@vibe/core/tokens";
import { Box } from "@vibe/core";

export const Card = ({ children }) => (
  <Box
    elevation={2}
    style={{
      borderRadius: "var(--radius-large)",
      backgroundColor: "var(--surface-secondary-color)",
      padding: "var(--spacing-xl)"
    }}
  >
    {children}
  </Box>
);
```

## Configuration

- **Design tokens** – Import `@vibe/core/tokens` once per bundle to register CSS variables. Components and custom styles rely on the same theme contract.
- **Tree shaking** – Favor `import { Button } from "@vibe/core";` so modern bundlers drop unused code paths.
- **Icons** – Install `@vibe/icons` to access SVG assets that match component sizing and semantics.
- **TypeScript** – Types are bundled with each package. Update `tsconfig.json` include paths if you restrict `node_modules`.
- **Theming** – Override CSS variables at `:root` or within a scoped container to align Vibe with your product palette.

## MCP

Vibe includes an MCP (Model Context Protocol) server that provides intelligent assistance for working with Vibe components. The MCP server can help you discover component APIs, get usage examples, find appropriate icons, and follow best practices.

To get started, follow the installation instructions in the [@vibe/mcp](https://github.com/mondaycom/vibe/blob/master/packages/mcp/README.md) docs to integrate it in your preferred AI development tools.

## Ecosystem

- [@vibe/core](https://github.com/mondaycom/vibe/blob/master/packages/core/README.md): Core component library
- [@vibe/icons](https://github.com/mondaycom/vibe/blob/master/packages/icons/README.md): Icons library
- [@vibe/testkit](https://github.com/mondaycom/vibe/blob/master/packages/testkit/README.md): Testing utilities for Playwright
- [@vibe/codemod](https://github.com/mondaycom/vibe/blob/master/packages/codemod/README.md): Codemods and CLI tools
- [monday-ui-style](https://github.com/mondaycom/vibe/blob/master/packages/style/README.md): Styling foundations (included in @vibe/core)
- [vibe-storybook-components](https://github.com/mondaycom/vibe/blob/master/packages/storybook-blocks/README.md): Vibe Storybook Blocks
- [storybook-addon-playground](https://github.com/mondaycom/storybook-addon-playground/): A Component Playground Addon for Storybook
- [@vibe/mcp](https://github.com/mondaycom/vibe/blob/master/packages/mcp/README.md): MCP server for Vibe Design System

## Older Versions

Vibe 2 ([`monday-ui-react-core`](https://www.npmjs.com/package/monday-ui-react-core)) will no longer receive new features or enhancements but will continue to receive critical bug fixes as needed. We highly recommend following the [migration guide](http://vibe.monday.com/?path=/docs/migration-guide--docs) to upgrade to the actively maintained Vibe 3, which includes the latest improvements, new components, and ongoing support.

For version 2 documentation, see [vibe.monday.com/v2](https://vibe.monday.com/v2).

## Contributing

We welcome and encourage every contributor!

1. Review the [Contribution Guide](http://vibe.monday.com/?path=/docs/contributing--docs) for branching strategy, coding standards, and review expectations.
2. Install dependencies with `yarn install`, then run `yarn build` and `yarn lint` to ensure the workspace is healthy.
3. Use `yarn storybook` for visual verification and `yarn test` to execute package-level suites.
4. Open a pull request following `.github/PULL_REQUEST_TEMPLATE.md` so reviewers have context, screenshots, and test notes.

## Suggestions

If you have any questions or suggestions, please feel free to open a [discussion](https://github.com/mondaycom/vibe/discussions).

Found a bug? Please [open an issue](https://github.com/mondaycom/vibe/issues/new/choose).
