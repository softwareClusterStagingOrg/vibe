<p align="center">
  <img src="https://user-images.githubusercontent.com/60314759/147566893-63c5209a-8b83-4f32-af61-8b4c350ec770.png" width="300px" alt="Vibe Design System logo">
  <h1 align="center">Vibe Design System</h1>
</p>

<p align="center">
Official UI resources for building monday.com-inspired React applications, maintained in the <a href="https://github.com/softwareClusterStagingOrg/vibe">softwareClusterStagingOrg/vibe</a> monorepo.
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

## What is Vibe?

Vibe is the design system that powers monday.com's product ecosystem. This repository packages the production-ready React components, icons, tokens, documentation site, codemods, and development tooling you need to ship cohesive experiences quickly.

### Highlights

- **Components that feel native to monday.com** – ship with ready-made accessibility, keyboard support, and theming baked in.
- **Single source of truth** – tokens, icons, and layout primitives live in one workspace so design and engineering stay aligned.
- **Tools for every lifecycle stage** – docs, codemods, testing utilities, and even an MCP server accelerate both authoring and maintenance.

## Packages at a glance

| Package | Purpose |
| --- | --- |
| `@vibe/core` (`packages/core`) | Headless + styled React components, design tokens, and entry points (`tokens`, `testIds`, `next`, etc.). |
| `@vibe/icons` (`packages/icons`) | SVG assets and React wrappers with lazy, raw, and metadata exports. |
| `@vibe/base` (`packages/base`) | Primitive inputs, lists, and infra used by higher-level components. |
| `@vibe/shared` (`packages/shared`) | Shared TypeScript utilities, constants, and helpers. |
| `@vibe/hooks` (`packages/hooks`) | Reusable hooks (focus management, layers, interactions). |
| `@vibe/config` (`packages/config`) | ESLint, Rollup, TS, and Stylelint presets shared across packages. |
| `@vibe/codemod` (`packages/codemod`) | Codemods + CLI for automated migrations between rubric versions. |
| `@vibe/testkit` (`packages/testkit`) | Playwright-powered testing helpers and fixtures targeting Vibe components. |
| `@vibe/docs` (`packages/docs`) | Storybook documentation site and playground hosted at `vibe.monday.com`. |
| `vibe-storybook-components` (`packages/storybook-blocks`) | Storybook MDX blocks used inside the docs app. |
| `monday-ui-style` (`packages/style`) | CSS variables, color tokens, and theming primitives included with `@vibe/core/tokens`. |
| `@vibe/mcp` (`packages/mcp`) | Model Context Protocol server for AI-assisted API lookup, examples, and icon discovery. |

> **Note:** `packages/components/*` hosts standalone npm packages (for buttons, dialogs, loaders, etc.) that feed into `@vibe/core` for granular consumption or experimentation.

## Consuming `@vibe/core`

### Install

```bash
yarn add @vibe/core
# or
npm install @vibe/core
```

### Load tokens once

```ts
// e.g. src/main.tsx
import "@vibe/core/tokens";
```

### Import components

```tsx
import { Button } from "@vibe/core";

export function Example() {
  return <Button kind="primary" onClick={() => alert("Hello Vibe!")}>Click me</Button>;
}
```

### Icons

```tsx
import { Icon } from "@vibe/icons";
import { ReactComponent as Custom } from "./custom.svg";

<Icon iconType="SVG" icon={Custom} ariaLabel="Custom action" />;
```

Choose from the React (`@vibe/icons`), lazy (`@vibe/icons/lazy`), or raw SVG (`@vibe/icons/raw`) entry points depending on your bundler strategy.

### MCP-assisted development

Pair the design system with the [@vibe/mcp](https://github.com/softwareClusterStagingOrg/vibe/tree/master/packages/mcp) server to query component APIs, see usage snippets, or surface matching icons directly from AI-powered IDE copilots.

## Working in the monorepo

### Prerequisites

- Node.js `v20.12` (see `.nvmrc`; use `nvm use` or `corepack enable` to stay aligned).
- Yarn Classic (1.x). The repo ships with a `yarn.lock` that should not be regenerated with npm or pnpm.
- Git LFS is **not** required; assets are normal git objects.

### Install dependencies

```bash
yarn install
```

This bootstraps every workspace via Lerna + Yarn Workspaces.

### Common scripts

| Command | What it does |
| --- | --- |
| `yarn storybook` | Launches the docs/storybook app from `packages/docs` (default port `7008`). |
| `yarn test` | Runs each package's configured tests (mostly Vitest + Testing Library). |
| `yarn lint` | Executes shared ESLint + Stylelint configs across the repo. |
| `yarn build` | Builds every publishable package via `lerna run build`. |
| `yarn build:package` | Builds dependencies required when publishing individual packages. |
| `lerna run <script> --scope <package>` | Run a script (e.g., `build`, `test`, `lint`) for a single package. |

Before opening a PR, run `yarn lint && yarn test` at minimum, then open Storybook to visually verify components.

### Storybook & docs

The documentation site lives in `packages/docs` and uses Storybook 8 with custom theming. Deployments are handled by GitHub Actions (`publish-storybook.yml` and `chromatic.yml`) and Chromatic for visual regression testing. When authoring MDX or live playground examples, follow the guidelines in `.cursor/rules/storybook-stories.mdc`.

### Testing, linting, and formatting

- Unit and component tests: [Vitest](https://vitest.dev/) with Testing Library; snapshot tests reside alongside components.
- Accessibility and interactions: `@vibe/testkit` + Playwright utilities, plus eslint plugins like `jsx-a11y`.
- Formatting: Prettier (configured via `.prettierrc`). Run `yarn lint -- --fix` for automatic fixes.

### Releases

The repo uses independent versioning (`lerna.json`) so each package can ship at its own cadence. GitHub Actions (`release.yml`, `release-v2.yml`, `build-and-upload.yml`) enforce tests, bundle-size checks, and publish to npm. Follow [CONTRIBUTING.md](./CONTRIBUTING.md) for commit conventions (Conventional Commits) to ensure release notes are generated correctly.

## Repository layout

- `packages/core`: Main component library consumers install.
- `packages/components/*`: Individually versioned leaf components imported by `@vibe/core`.
- `packages/icons`, `packages/style`, `packages/base`, `packages/hooks`, `packages/shared`: Supporting packages for icons, design tokens, utilities, and hooks.
- `packages/docs`: Storybook site and MDX pages powering `vibe.monday.com`.
- `packages/codemod`, `packages/mcp`, `packages/testkit`: Tooling for migrations, AI assistants, and testing.
- `.github/`: CI/CD pipelines for lint, test, Storybook, Chromatic, publishing, and merge queue.
- `scripts/`: Helper scripts invoked during builds (e.g., dependency builds).

## Older versions

Vibe 2 (`monday-ui-react-core`) is in maintenance mode: critical fixes only, no new features. We strongly recommend following the [Vibe 2 → 3 migration guide](https://vibe.monday.com/?path=/docs/migration-guide--docs) to take advantage of the latest accessibility, performance, and component updates. Historical docs remain at [vibe.monday.com/v2](https://vibe.monday.com/v2).

## Contributing, support, and feedback

- Read the [Contribution Guide](./CONTRIBUTING.md) before opening a PR.
- Start a [discussion](https://github.com/softwareClusterStagingOrg/vibe/discussions) for ideas or questions.
- Report issues via [GitHub Issues](https://github.com/softwareClusterStagingOrg/vibe/issues/new/choose).
- Need help reproducing a bug? Use the Storybook playground (`vibe.monday.com/?path=/story/playground--playground`) or follow `.cursor/rules/playground-reproduce.mdc`.

## License

Packages are published under the MIT License (see individual `packages/*/LICENSE`). Use them freely in commercial and open-source monday.com applications while respecting the terms.
