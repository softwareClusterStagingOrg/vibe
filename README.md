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

Vibe is monday.com's React-based design system and the home of every UI surface that powers the monday.com product suite. This repository is a Yarn Workspaces + Lerna monorepo that contains the component library, styling primitives, icons, documentation site, testing utilities, codemods, and AI tooling that help teams build polished monday.com experiences that feel consistent out of the box.

## Packages at a glance

| Package | Type | Purpose |
| --- | --- | --- |
| [`@vibe/core`](packages/core/README.md) | Component library | Ready-to-ship React components, tokens, utilities, and helpers exported on npm. |
| [`@vibe/icons`](packages/icons/README.md) | Asset pipeline | SVG source files, React icon wrappers, and the build pipeline that publishes icon assets. |
| [`@vibe/base`](packages/base/) & [`@vibe/hooks`](packages/hooks/) | Foundations | Primitive inputs, lists, hooks, and shared logic used internally by higher-level components. |
| [`monday-ui-style`](packages/style/README.md) | Design tokens | CSS variables, typography, motion, and layout primitives that power theming in `@vibe/core`. |
| [`@vibe/docs`](packages/docs/) | Documentation | Storybook instance for docs, catalog, playground, and migration content deployed to `vibe.monday.com`. |
| [`vibe-storybook-components`](packages/storybook-blocks/README.md) | Storybook blocks | Reusable documentation blocks for building rich Storybook pages. |
| [`@vibe/testkit`](packages/testkit/README.md) | Testing utilities | Playwright helpers and test ids used to validate Vibe components in consumer applications. |
| [`@vibe/codemod`](packages/codemod/README.md) | Tooling | Codemods, CLIs, and migration scripts for keeping consumer code up to date. |
| [`@vibe/mcp`](packages/mcp/README.md) | MCP server | Model Context Protocol server that powers AI-assisted authoring and discovery of Vibe APIs. |
| `packages/components/*` & `packages/shared` | Internal packages | Component-specific packages (Button, Icon, Dialog, etc.) and shared utilities consumed by `@vibe/core`. |

Each package can be built and tested in isolation through its workspace, while the root scripts orchestrate repo-wide operations.

## Requirements

- Node.js `v20.12` (see `.nvmrc`)
- Yarn Classic (1.x) with workspaces enabled
- Git and a POSIX-compatible shell, plus access to monday.com registries if you publish packages
- Optional: Chromatic token for visual regression tests and MCP-compatible tooling for @vibe/mcp

## Getting started

1. **Install dependencies**
   ```bash
   git clone https://github.com/softwareClusterStagingOrg/vibe.git
   cd vibe
   yarn install
   ```
2. **Build everything once** – compiles shared artifacts (`@vibe/icons`, Storybook blocks, etc.).
   ```bash
   yarn build
   ```
3. **Run Storybook documentation locally**
   ```bash
   yarn workspace @vibe/docs storybook
   # or run all package storybooks in parallel
   yarn storybook
   ```

Consumers install the published library through npm:

```bash
yarn add @vibe/core
```

Load the CSS tokens once in your app entry point to ensure theming support:

```ts
import "@vibe/core/tokens";
```

Import components directly from the package root:

```tsx
import { Button } from "@vibe/core";
```

## Everyday workflows

### Develop `@vibe/core` components
- Scaffold new components with Plop:
  ```bash
  yarn workspace @vibe/core plop
  ```
- Run component tests and lints while iterating:
  ```bash
  yarn workspace @vibe/core test --watch
  yarn workspace @vibe/core lint
  ```
- Storybook stories live alongside components in `packages/core/src/components/**`.

### Contribute to documentation
- `packages/docs` houses the main Storybook site (catalog, guides, playground).
- Start the docs server via `yarn workspace @vibe/docs storybook`.
- Use Chromatic (`yarn workspace @vibe/docs chromatic:local`) for visual regression approval before deploying.

### Maintain icons, tokens, and shared assets
- Icon SVGs reside in `packages/icons/src/svg`. Run `yarn workspace @vibe/icons build` to regenerate React wrappers.
- Styling primitives originate in `packages/style`; changes flow automatically through `@vibe/core/tokens`.
- Shared utilities live in `packages/shared` and are versioned independently.

### Automate with codemods and MCP
- `@vibe/codemod` hosts scripts that migrate consumer code between major versions.
- `@vibe/mcp` exposes Vibe-aware prompts through the Model Context Protocol so AI coding copilots can surface docs, props, and icons inline. Follow the package README to integrate it with your preferred MCP host.

## Testing & quality

- `yarn test` runs every workspace test suite through Lerna (Vitest, Jest, or Playwright depending on the package).
- `yarn lint` enforces shared ESLint + Stylelint rules.
- Component-level interaction helpers live in `@vibe/testkit` and can be imported into consumer Playwright suites.
- For visual validation, leverage Storybook + Chromatic via `yarn workspace @vibe/docs chromatic:local`.

## Releases & versioning

- The repo uses **independent package versioning** (`lerna.json` is set to `independent`). Each workspace releases on its own cadence while sharing the same Git history.
- Run release scripts via Lerna (e.g., `lerna version` / `lerna publish`) to bump versions, generate changelogs, and publish to npm.
- Post-install hooks prebuild frequently-consumed artifacts (`@vibe/icons`, `vibe-storybook-components`) so packages stay in sync.
- See the internal release documentation (within Storybook's Contributing section) for detailed CI/CD expectations.

## Additional resources

- [Vibe documentation](https://vibe.monday.com) – component API docs, accessibility guidance, and best practices.
- [Component catalog](https://vibe.monday.com/?path=/docs/catalog--docs) – overview of everything available in `@vibe/core`.
- [Playground](https://vibe.monday.com/?path=/story/playground--playground) – live-edit components with tokens and themes.
- [Migration guide](https://vibe.monday.com/?path=/docs/migration-guide--docs) – recommended path from Vibe 2 (`monday-ui-react-core`) to Vibe 3.
- [Storybook Addon Playground](https://github.com/mondaycom/storybook-addon-playground/) – reuse the playground outside this repo.

## Older versions

Vibe 2 (`monday-ui-react-core`) is now in maintenance mode—it only receives critical fixes. Follow the [migration guide](https://vibe.monday.com/?path=/docs/migration-guide--docs) to adopt Vibe 3 and keep receiving new components, accessibility improvements, and tokens. Documentation for the legacy version lives at [vibe.monday.com/v2](https://vibe.monday.com/v2).

## Contributing & support

- We welcome every contributor! Please read the [Contribution Guide](https://vibe.monday.com/?path=/docs/contributing--docs) before opening a PR.
- Questions or suggestions? Start a [discussion](https://github.com/mondaycom/vibe/discussions).
- Found a bug? [Open an issue](https://github.com/mondaycom/vibe/issues/new/choose) with as much detail as possible (component name, reproduction, environment).

Thanks for building with Vibe!
