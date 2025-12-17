<p align="center">
  <img src="https://user-images.githubusercontent.com/60314759/147566893-63c5209a-8b83-4f32-af61-8b4c350ec770.png" width="300px" alt="Vibe Design System, by monday.com">
  <h1 align="center">Vibe Design System</h1>
</p>

<p align="center">
Official <a href="https://monday.com">monday.com</a> UI resources for building React applications.  
Maintained in the <a href="https://github.com/softwareClusterStagingOrg/vibe">softwareClusterStagingOrg/vibe</a> monorepo.
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

## Why Vibe

Vibe delivers production-ready components, tokens, icons, utilities, and guidelines that keep monday.com's product ecosystem cohesive. The monorepo contains everything needed to ship consistent interfaces—from low-level styling primitives to Storybook docs, codemods, and automated testkits.

## Packages at a Glance

| Package | Description |
| --- | --- |
| `packages/core` (`@vibe/core`) | React components, tokens, hooks, and theming primitives. |
| `packages/icons` (`@vibe/icons`) | SVG sources and React icon components. |
| `packages/style` (`monday-ui-style`) | Design tokens and CSS foundations consumed by `@vibe/core`. |
| `packages/storybook-blocks` (`vibe-storybook-components`) | Shared Storybook documentation building blocks. |
| `packages/testkit` (`@vibe/testkit`) | Playwright helpers for asserting component behavior. |
| `packages/codemod` (`@vibe/codemod`) | Codemods and CLI utilities that keep consumers up to date. |
| `packages/hooks` (`@vibe/hooks`) | Standalone React hooks used across the system. |
| `packages/docs` | Storybook documents, guides, playgrounds, and the public site. |
| `packages/mcp` (`@vibe/mcp`) | Model Context Protocol server for AI-assisted Vibe workflows. |
| `packages/shared`, `packages/base`, `packages/components/*` | Internal utilities, experimental components, and shared configs. |

## Getting Started

### Prerequisites

- Node.js `v20.12` (see `.nvmrc`)
- Yarn (via `corepack enable` or a global Yarn 1.x install)
- Git + Lerna (installed automatically through dependencies)

### Install dependencies

```bash
nvm use
yarn install
```

### Common workflows

- `yarn storybook` – runs every package’s Storybook in parallel for local docs.
- `yarn test` – executes each package’s unit or component tests through Lerna.
- `yarn lint` – enforces ESLint, Stylelint, and TypeScript rules across packages.
- `yarn build` – builds all packages; use before publishing or linking.
- `yarn build:package` – rebuilds dependencies required by `@vibe/core` consumers (icons + Storybook blocks) after installing.

All scripts can be scoped to a particular package with `lerna run <script> --scope <package-name>` if you need faster feedback.

## Usage

Install the core package in any React project:

```bash
yarn add @vibe/core
# or
npm install @vibe/core
```

Load the design tokens once, near your app root:

```javascript
import "@vibe/core/tokens";
```

Then import components from the package entrypoint:

```javascript
import { Button, TextField } from "@vibe/core";
```

Icons ship separately through `@vibe/icons`, and all packages are tree-shakeable for modern bundlers.

## Documentation & Resources

- [Component docs](https://vibe.monday.com)
- [Component catalog](https://vibe.monday.com/?path=/docs/catalog--docs)
- [Interactive playground](https://vibe.monday.com/?path=/story/playground--playground)
- [Migration guide (Vibe 2 → 3)](https://vibe.monday.com/?path=/docs/migration-guide--docs)
- [Contributing guide](https://vibe.monday.com/?path=/docs/contributing--docs)

## MCP Assistant

Vibe ships with an [MCP server](https://github.com/softwareClusterStagingOrg/vibe/tree/master/packages/mcp) that augments AI tooling with component metadata, usage snippets, icon discovery, and linting hints. Install the package and point your MCP-compatible client to the server following the instructions in `packages/mcp/README.md`.

## Staying Current

Vibe 2 (`monday-ui-react-core`) is in maintenance mode. New work happens in Vibe 3 (`@vibe/core`). Follow the migration guide above for upgrade advice, and refer to [vibe.monday.com/v2](https://vibe.monday.com/v2) for legacy docs when needed.

## Contributing

We welcome pull requests! Review [CONTRIBUTING.md](./CONTRIBUTING.md) and open an issue if you plan a large change. Before submitting, run `yarn lint`, `yarn test`, and `yarn build` so CI stays green. Package-specific guidelines live inside each package’s `README.md`.

## Support & Feedback

- Questions or ideas? Start a [discussion](https://github.com/softwareClusterStagingOrg/vibe/discussions).
- Found a bug? File an [issue](https://github.com/softwareClusterStagingOrg/vibe/issues/new/choose).
- Security concerns? Please follow monday.com’s [responsible disclosure process](https://monday.com/trust/).

Each package declares its own license (`packages/core/LICENSE` for the core components). Review those before redistribution.
