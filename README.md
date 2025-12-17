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

Vibe Design System is a collection of packages designed to streamline your development process and enhance the user experience, by providing a set of components, styles, and guidelines for building applications in React.js.

This repository is the monorepo that powers the entire ecosystem. It uses Yarn Workspaces and Lerna to version and build every package from a single codebase so that components, documentation, icons, styles, and tooling always evolve together.

## Repository structure

The codebase is organized under `packages/`, where each workspace is published (or consumed) independently:

- `packages/core`: The primary React component library exposed as `@vibe/core`, plus the design tokens imported via `@vibe/core/tokens`.
- `packages/icons`: The SVG/React icon set consumed by `@vibe/core` and available standalone as `@vibe/icons`.
- `packages/docs`: The Storybook instance hosted at `vibe.monday.com`, including docs, catalog, and playground stories.
- `packages/style`: Low-level styling primitives (CSS custom properties, resets, typography rules) shared by the rest of the system.
- `packages/storybook-blocks`: Building blocks used inside the documentation site for live examples, guidelines, and MDX content.
- `packages/testkit`: Playwright-based helpers for running visual and behavioral tests against Vibe components.
- `packages/mcp`: The Model Context Protocol server that surfaces component metadata, examples, and design tokens inside AI coding tools.
- `packages/hooks`, `packages/base`, `packages/shared`, and `packages/components/*`: Smaller internal packages that house cross-cutting hooks, base form controls, shared TypeScript utilities, and experimental components.

Auxiliary tooling such as release/build scripts lives in `scripts/`, while repository-wide configuration (ESLint, TS Config, GitHub Actions) sits at the root.

## Local development

1. **Use the recommended Node version** – run `nvm use` (the repo ships with `.nvmrc` targeting Node 20.12) before installing dependencies.
2. **Install dependencies** – `yarn install` bootstraps every workspace and links cross-package dependencies.
3. **Build everything** – `yarn build` runs `lerna run build`, compiling each package in dependency order.
4. **Run quality checks** – `yarn lint` and `yarn test` proxy to the equivalent `lerna run` commands across all packages.
5. **Work on docs locally** – `yarn storybook` spins up the documentation site so you can browse components, catalog entries, and the playground while developing.

Tip: you can scope any `lerna run` command (for example, `lerna run test --scope @vibe/core`) to target a single package during fast iteration.

## Key scripts

- `yarn build:package` – compiles only the dependencies needed for publishing individual packages (invokes `scripts/build-dependencies.sh`).
- `yarn postinstall` – automatically rebuilds `@vibe/icons` and `vibe-storybook-components` after dependency installation so downstream packages can consume fresh artifacts.
- `lerna run <command> --scope <pkg>` – executes package-level scripts (such as `build`, `lint`, `test`, or `storybook`) against a single workspace.
- `lerna changed` / `lerna version` – used by maintainers to detect changed packages and orchestrate semver bumps prior to publishing.

## CI, releases, and publishing

Automated workflows live in `.github/workflows/` and cover linting, type-checking, bundle-size tracking, Storybook previews, and publish pipelines. Key flows include:

- `pr.yml` / `test.yml` – run unit tests, lint checks, and visual regression jobs for every pull request.
- `chromatic.yml` and `bundle-size.yml` – collect UI diffs and size budgets so regressions surface early.
- `release.yml` / `release-v2.yml` – build tagged artifacts, run `lerna version`, and publish packages to npm. These workflows rely on `lerna.json` plus the per-package `CHANGELOG.md` files to generate release notes.
- `publish-storybook.yml` – deploys the Storybook instance to `vibe.monday.com` once a change merges.

In addition, custom composite actions under `.github/actions/` (for example `setup`, `git-creds`, `download-builds`) encapsulate common CI steps shared across workflows.

## Documentation and ecosystem sites

- `packages/docs` powers https://vibe.monday.com with MDX docs, usage guidelines, and the interactive playground (`/playground` story).
- `packages/storybook-blocks` exposes reusable Storybook MDX components (tabs, callouts, live previews) used across the documentation site.
- `packages/mcp` provides the same design-system knowledge via the Model Context Protocol so AI copilots can answer Vibe-specific questions inside your editor.

## Installation

```bash
npm install @vibe/core
# or
yarn add @vibe/core
```

To load all the relevant CSS tokens, import the tokens file in your root application file:

```javascript
import "@vibe/core/tokens";
```

## Usage

Components are imported from the library's root entry:

```javascript
import { Button } from "@vibe/core";
```

### MCP

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

We welcome and encourage every contributor! Please read our [Contribution Guide](http://vibe.monday.com/?path=/docs/contributing--docs).

## Suggestions

If you have any questions or suggestions, please feel free to open a [discussion](https://github.com/mondaycom/vibe/discussions).

Found a bug? Please [open an issue](https://github.com/mondaycom/vibe/issues/new/choose).
