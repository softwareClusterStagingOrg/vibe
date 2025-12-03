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
  <a href="https://github.com/softwareClusterStagingOrg/vibe/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/softwareClusterStagingOrg/vibe"></a>
</p>

<p align="center">
  <a href="https://vibe.monday.com">Documentation</a> •
  <a href="https://vibe.monday.com/?path=/docs/catalog--docs">Catalog</a> •
  <a href="https://vibe.monday.com/?path=/story/playground--playground">Playground</a>
</p>

## Overview

Vibe is the design system that powers monday.com. This repository hosts the entire system—React component libraries, iconography, tokens, documentation, Storybook playgrounds, automation utilities, and the MCP (Model Context Protocol) server that helps AI-assisted workflows. Everything ships from this monorepo under the `@vibe/*` npm scope.

## Monorepo at a glance

Vibe is managed with Yarn Workspaces and Lerna (`yarn.lock` + `lerna.json`). Each package lives under `packages/` and can be developed independently while sharing tooling.

| Area | What it contains |
| --- | --- |
| `packages/core` | The main React component library (`@vibe/core`) plus tokens and CSS foundations consumers import into their apps. |
| `packages/docs` | The Storybook site published at [vibe.monday.com](https://vibe.monday.com), including docs, catalog, and playground stories. |
| `packages/icons` | SVG sources, React icon components, and the generation pipeline for `@vibe/icons`. |
| `packages/style` | The raw design tokens (`monday-ui-style`) that back all theming variables used by components. |
| `packages/storybook-blocks` | Building blocks that power interactive documentation experiences and custom MDX blocks. |
| `packages/testkit` | Playwright-based helpers and fixtures for integration testing components in consuming products. |
| `packages/codemod` | CLI utilities and codemods that help migrate between Vibe versions. |
| `packages/mcp` | The Vibe MCP server that exposes component metadata to AI development tools. |
| `packages/base`, `packages/components`, `packages/shared`, `packages/config`, `packages/hooks` | Internal building blocks, shared logic, configuration, and experimental component workspaces that feed into `@vibe/core`. |

Each package has its own README with additional context and usage notes—start from `packages/<name>/README.md`.

## Getting started

1. **Use the repo’s Node version**
   ```bash
   nvm install
   nvm use
   ```
   `.nvmrc` currently pins Node `v20.12`.
2. **Install dependencies** (Yarn v1 is recommended; enable it through Corepack if needed).
   ```bash
   corepack enable
   yarn install
   ```
3. **Bootstrap build artifacts** (icons, Storybook blocks, etc.) if you need them locally:
   ```bash
   yarn build:package
   ```

> Tip: Lerna scripts run against every package by default. You can scope a command with `--scope <package>` when iterating on a single package.

## Common workspace scripts

| Command | Purpose |
| --- | --- |
| `yarn build` | Runs `lerna run build` across all packages (components, icons, docs, etc.). |
| `yarn lint` | Executes each package’s lint task to keep TS/ESLint rules consistent. |
| `yarn test` | Runs unit and integration tests (Vitest, Playwright) registered by packages. |
| `yarn storybook` | Starts local Storybook instances from `packages/docs` so you can explore components. |
| `yarn build:package` | Invokes `scripts/build-dependencies.sh` to pre-build assets required by downstream packages (icons, Storybook blocks). |

## Developing inside `@vibe/core`

Most contributions target `packages/core`:

- Components expose their API through the package root:
  ```javascript
  import { Button } from "@vibe/core";
  import "@vibe/core/tokens";
  ```
- Styles must rely on design tokens (CSS variables from `monday-ui-style`); see `packages/core/src/components/*/*.module.scss`.
- Each component includes stories (`*.stories.mdx/tsx`), tests (Vitest), and documentation. Refer to the component-specific README and the internal guidelines under `.cursor/rules/`.
- Run scoped tooling while iterating:
  ```bash
  yarn lerna run lint --scope @vibe/core
  yarn lerna run test --scope @vibe/core
  ```
- Document or demo new work from `packages/docs` so it appears in the public catalog and playground.

## Documentation & supporting tools

- **Docs site** – `packages/docs` publishes to [vibe.monday.com](https://vibe.monday.com) with guides, catalog entries, and migration notes.
- **MCP server** – `packages/mcp` exposes component metadata to AI tools. Follow [`packages/mcp/README.md`](packages/mcp/README.md) for setup instructions.
- **Codemods** – `packages/codemod` contains migration helpers for consumers upgrading between major versions.
- **Testing utilities** – `packages/testkit` provides Playwright helpers to validate components in consuming products.
- **Storybook blocks** – `packages/storybook-blocks` exports MDX blocks that make docs interactive.

## Contributing & support

- Read the [Contribution Guide](https://vibe.monday.com/?path=/docs/contributing--docs) before opening a PR.
- Discuss ideas or ask questions in [GitHub Discussions](https://github.com/softwareClusterStagingOrg/vibe/discussions).
- Report bugs via [Issues](https://github.com/softwareClusterStagingOrg/vibe/issues/new/choose) with repro steps, package version, and screenshots when possible.

## Need Vibe 2?

Vibe 2 (published as [`monday-ui-react-core`](https://www.npmjs.com/package/monday-ui-react-core)) is in maintenance mode. Use the [migration guide](https://vibe.monday.com/?path=/docs/migration-guide--docs) to move to Vibe 3 and visit [vibe.monday.com/v2](https://vibe.monday.com/v2) for legacy docs.
