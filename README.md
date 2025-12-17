<p align="center">
  <img src="https://user-images.githubusercontent.com/60314759/147566893-63c5209a-8b83-4f32-af61-8b4c350ec770.png" width="300px" alt="Vibe Design System logo" />
  <h1 align="center">Vibe Design System</h1>
</p>

<p align="center">
Official <a href="https://monday.com">monday.com</a> UI resources for building React applications at scale.
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

---

## Table of Contents

- [Why Vibe](#why-vibe-design-system)
- [Packages at a Glance](#packages-at-a-glance)
- [Getting Started](#getting-started)
- [Using `@vibe/core`](#using-vibecore)
- [Local Development Scripts](#local-development-scripts)
- [Documentation & DX Tooling](#documentation--dx-tooling)
- [Release & Quality Guardrails](#release--quality-guardrails)
- [Older Versions](#older-versions)
- [Contributing & Support](#contributing--support)

## Why Vibe Design System

Vibe delivers a cohesive React component library, accessible foundations, testing utilities, and documentation infrastructure that teams at monday.com rely on to ship product UI quickly and consistently. This monorepo houses every part of that system—from the design tokens that define our visual language to the Storybook docs that showcase real-world usage.

Key goals:

- **Consistency:** Shared components, icons, and tokens guarantee a unified look-and-feel.
- **Velocity:** Batteries-included Storybook, codemods, and testing helpers shorten the feedback loop.
- **Quality:** Accessibility, theming, and responsive behavior are built in so every product team benefits.

## Packages at a Glance

| Package | Description | Location |
| --- | --- | --- |
| `@vibe/core` | Primary React component library, tokens, helpers, and theming APIs. | `packages/core` |
| `@vibe/icons` | SVG-based icon set exposed as ready-to-use React components. | `packages/icons` |
| `monday-ui-style` | Design tokens and CSS foundations consumed by the rest of Vibe. | `packages/style` |
| `@vibe/base` | Low-level building blocks (BaseInput, BaseList, etc.) for complex widgets. | `packages/base` |
| `@vibe/hooks` | Standalone hooks that power focus management, async helpers, and more. | `packages/hooks` |
| `@vibe/testkit` | Playwright-based test fixtures to validate component behavior end-to-end. | `packages/testkit` |
| `@vibe/codemod` | Codemods and CLI utilities that keep consumers aligned with the latest APIs. | `packages/codemod` |
| `vibe-storybook-components` | Internal MDX/Storybook blocks used to craft the documentation experience. | `packages/storybook-blocks` |
| `@vibe/mcp` | Model Context Protocol server that makes AI tooling Vibe-aware. | `packages/mcp` |
| `@vibe/docs` | Storybook-powered documentation site deployed to <https://vibe.monday.com>. | `packages/docs` |

> Need a deeper dive? Each package folder ships with its own README describing exports, build commands, and release notes.

## Getting Started

### Prerequisites

- Node.js `v20.12` (see `.nvmrc`). We recommend `nvm use`.
- Yarn (Classic) for workspace management.
- A GitHub PAT with read access if you clone via HTTPS.

### Install dependencies

```bash
nvm use
yarn install
```

### Run Storybook locally

```bash
yarn storybook
```

Storybook is the primary development surface for authoring and testing components.

### Build all packages

```bash
yarn build
```

This uses `lerna run build` to generate distributable artifacts for every workspace.

### Test and lint

```bash
yarn test          # Runs package-level test suites via Lerna
yarn lint          # Executes ESLint across all packages
```

Update snapshots when expected UI output changes:

```bash
yarn test:update
```

## Using `@vibe/core`

Install the component library in any React project:

```bash
yarn add @vibe/core
# or
npm install @vibe/core
```

Load the CSS tokens once near your app entry point:

```javascript
import "@vibe/core/tokens";
```

Import components directly from the package root:

```javascript
import { Button } from "@vibe/core";
```

### Fonts

Vibe works best with the Poppins, Figtree, and Roboto font families. Add them via Google Fonts:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
  rel="stylesheet"
/>
```

### Theming and SSR

- Theming is powered by CSS custom properties; consult `packages/core/docs/theming.md` for guidance.
- For experimental server-side rendering support, set `globalThis.injectedStyles = {}` on the server and aggregate emitted styles into your `<style>` tag.

### Metadata & AI tooling

Expose component metadata to LLM-powered workflows via:

```javascript
import metadata from "@vibe/core/meta";
```

Pair this with the [`@vibe/mcp`](https://github.com/softwareClusterStagingOrg/vibe/tree/master/packages/mcp) server to let AI coding assistants surface component APIs, props, and usage examples in-context.

## Local Development Scripts

| Command | Description |
| --- | --- |
| `yarn storybook` | Spins up the docs/playground environment for interactive development. |
| `yarn build` | Runs `lerna run build` across all public packages. |
| `yarn build:package` | Invokes `scripts/build-dependencies.sh` to build shared assets consumed by Storybook. |
| `yarn test` | Executes every workspace `test` script (Vitest, Playwright, etc.). |
| `yarn lint` | Runs ESLint using the shared config in `packages/config`. |

> Each sub-package exposes its own scripts (`build`, `lint`, `test`). Use `lerna run <script> --scope <package>` for targeted work.

## Documentation & DX Tooling

- **Documentation site:** `packages/docs` houses the Storybook project served at <https://vibe.monday.com>.
- **Component playground:** Launch the "Playground" Storybook route to compose components with live props.
- **Testing harness:** `@vibe/testkit` offers Playwright helpers that mirror production usage.
- **Codemods:** `@vibe/codemod` keeps consumers up to date when APIs evolve.
- **Design tokens:** `monday-ui-style` centralizes spacing, color, and typography tokens shared across components.

## Release & Quality Guardrails

- Versioning is managed by **Lerna (independent mode)** plus Conventional Commits.
- GitHub Actions (`.github/workflows/`) validate pull requests with linting, unit tests, Chromatic visual tests, bundle-size budgets, and Storybook builds.
- Bundle budgets are enforced through the `size-limit` configuration defined at the root.

## Older Versions

Vibe 2 (`monday-ui-react-core`) is now in maintenance mode and only receives critical bug fixes. Follow the [migration guide](https://vibe.monday.com/?path=/docs/migration-guide--docs) to adopt the actively maintained Vibe 3 experience in this repository.

Legacy documentation remains available at <https://vibe.monday.com/v2>.

## Contributing & Support

- Review the [Contribution Guide](./CONTRIBUTING.md) before opening a pull request.
- Start a [discussion](https://github.com/softwareClusterStagingOrg/vibe/discussions) for new ideas or questions.
- Report bugs via [GitHub issues](https://github.com/softwareClusterStagingOrg/vibe/issues/new/choose).

Unless noted otherwise, packages are distributed under the [MIT License](./packages/core/LICENSE).
