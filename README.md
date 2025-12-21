<p align="center">
  <img src="https://user-images.githubusercontent.com/60314759/147566893-63c5209a-8b83-4f32-af61-8b4c350ec770.png" width="300px" alt="Vibe Design System, by monday.com">
  <h1 align="center">Vibe Design System</h1>
</p>

<p align="center">
 Official <a href="https://monday.com">monday.com</a> UI resources for building React applications.
</p>

<p align="center">
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@vibe/core">
  <a href="https://bundlephobia.com/package/@vibe/core"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/@vibe/core"></a>
  <a href="https://www.npmjs.com/package/@vibe/core"><img alt="NPM Version" src="https://img.shields.io/npm/v/@vibe/core?label=@vibe/core"></a>
  <a href="https://github.com/softwareClusterStagingOrg/vibe/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/softwareClusterStagingOrg/vibe"></a>
</p>

<p align="center">
  <a href="https://vibe.monday.com">Documentation</a> •
  <a href="https://vibe.monday.com/?path=/docs/catalog--docs">Catalog</a> •
  <a href="https://vibe.monday.com/?path=/story/playground--playground">Playground</a> •
  <a href="https://github.com/softwareClusterStagingOrg/vibe/discussions">Discussions</a>
</p>

## Overview

Vibe is a monorepo that packages monday.com's production UI system for the open community. It delivers:

- A comprehensive React component library with accessibility, responsive design, and theming baked in.
- Shared design tokens, icons, motion primitives, and Storybook blocks that mirror monday.com's UI language.
- Tooling (codemods, MCP server, testing utilities) that helps teams adopt Vibe consistently across large applications.

## Packages

| Package | Description |
| ------- | ----------- |
| [`@vibe/core`](packages/core/README.md) | Production-ready React components, hooks, tokens, and utilities. |
| [`@vibe/icons`](packages/icons/README.md) | The full monday.com icon set, optimized for React. |
| [`@vibe/testkit`](packages/testkit/README.md) | Playwright helpers for writing resilient UI tests. |
| [`@vibe/codemod`](packages/codemod/README.md) | Codemods and CLI tools for automated upgrades. |
| [`@vibe/mcp`](packages/mcp/README.md) | Model Context Protocol server that surfaces component metadata to AI tooling. |
| [`monday-ui-style`](packages/style/README.md) | CSS custom-property tokens and base styles (consumed automatically by `@vibe/core`). |
| [`vibe-storybook-components`](packages/storybook-blocks/README.md) | Storybook blocks and docs-only components. |

There are additional supporting workspaces under `packages/` and `packages/components/` that follow the same conventions. The repo uses Yarn workspaces and Lerna to orchestrate builds.

## Getting Started

### Prerequisites

- Node.js `v20.12` (see `.nvmrc`)
- Yarn 1.x (Workspaces)

### Install dependencies

```bash
git clone https://github.com/softwareClusterStagingOrg/vibe.git
cd vibe
yarn install
```

### Useful scripts

```bash
yarn build          # Runs lerna build across packages
yarn lint           # Lints all workspaces
yarn test           # Runs package-level test suites
yarn storybook      # Starts every Storybook in parallel (useful for local docs)
```

Individual packages expose their own scripts; run `lerna run <script> --scope <package>` for targeted development.

## Using `@vibe/core`

Install from npm:

```bash
npm install @vibe/core
# or
yarn add @vibe/core
```

Import the design tokens once in your app bootstrap file so CSS custom properties are available:

```javascript
import "@vibe/core/tokens";
```

Then consume components directly from the package root:

```javascript
import { Button } from "@vibe/core";
```

### Fonts

Vibe is optimized for the Poppins, Figtree, and Roboto font families. Add them via Google Fonts (or host them yourself):

```html
<link
  href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
  rel="stylesheet"
/>
```

### Theming and SSR

- Components expose CSS variables for theming; see `packages/core/docs/theming.md` for guidance.
- For experimental SSR support, initialize `globalThis.injectedStyles = {}` on the server and inject the collected styles into your HTML response.

## MCP Assistant

The `@vibe/mcp` package exposes a Model Context Protocol server that lets AI-powered tools discover component APIs, usage snippets, and icon metadata. Follow the setup guide in [`packages/mcp`](packages/mcp/README.md) to integrate it with Cursor, VS Code, or other MCP-compatible clients.

## Repository Structure

- `packages/core` – primary component source, hooks, tokens, Storybook stories.
- `packages/icons` – SVG source, React icon exports, generation scripts.
- `packages/style` – CSS variables and theming primitives shared by every package.
- `packages/storybook-blocks` – Docs-only components powering `vibe.monday.com`.
- `packages/testkit` – Playwright fixtures and helpers aligned with Vibe semantics.
- `packages/codemod` – Transformations that keep consumer apps up to date.
- `packages/mcp` – MCP server and metadata definitions.

Refer to `.github/workflows/` for CI, release, and publishing pipelines.

## Older Versions

Vibe 2 (`monday-ui-react-core`) is in maintenance mode. Follow the [migration guide](https://vibe.monday.com/?path=/docs/migration-guide--docs) to upgrade to Vibe 3 for the latest components, accessibility fixes, and tooling. Legacy docs remain at [vibe.monday.com/v2](https://vibe.monday.com/v2).

## Contributing

We love contributions! Read the [contribution guide](https://vibe.monday.com/?path=/docs/contributing--docs) for coding standards, component conventions, and review expectations. Before opening a PR, run the relevant `yarn lint`, `yarn test`, and `yarn build` scripts so CI stays green.

## Support & Feedback

- Ask questions or propose ideas in [Discussions](https://github.com/softwareClusterStagingOrg/vibe/discussions).
- Report bugs via [Issues](https://github.com/softwareClusterStagingOrg/vibe/issues/new/choose) with repro steps and environment details.
- For urgent security matters, follow monday.com's [security disclosure](https://monday.com/trust/security/).

Happy building!
