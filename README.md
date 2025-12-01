<p align="center">
  <img src="https://user-images.githubusercontent.com/60314759/147566893-63c5209a-8b83-4f32-af61-8b4c350ec770.png" width="300px" alt="Vibe Design System, by monday.com">
  <h1 align="center">Vibe Design System</h1>
</p>

<p align="center">
Official <a href="https://monday.com">monday.com</a> UI resources for React applications
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

Vibe is monday.com's end-to-end design system for building cohesive React experiences across products. The monorepo bundles accessible React components, icons, tokens, testing helpers, and tooling so your team can ship consistent UI faster.

### Why teams use Vibe

- **Product velocity:** Ship production-ready UI primitives, composable layouts, and complex widgets with baked-in monday.com UX best practices.
- **Visual consistency:** Consume the same design tokens, typography setup, and iconography used across monday.com's product suite.
- **Tooling ecosystem:** Rely on Storybook docs, codemods, a Playwright testkit, and an MCP server that keeps AI copilots context-aware.

## Features

- **Type-safe React components** powered by `@vibe/core`, covering inputs, navigation, data display, feedback, and layout patterns.
- **Design-token pipeline** from `monday-ui-style`, exposing CSS variables for light/dark themes, density, motion, and elevation.
- **Iconography at scale** with `@vibe/icons`, curated to match monday.com's visual language.
- **Storybook-powered documentation** (`vibe.monday.com`) featuring live playgrounds, catalog pages, and migration guides.
- **Playwright-focused testkit** (`@vibe/testkit`) to interact with components exactly as users do.
- **Codemods & CLI tools** to automate upgrades when APIs evolve.
- **MCP server** that lets AI tooling (like Cursor) query component metadata, prop definitions, and best practices straight from the repo.

## Installation

### Requirements

- Node 18+ and either `yarn`, `pnpm`, or `npm`
- A bundler that understands ES modules (Webpack, Vite, Next.js, etc.)

### Install packages

```bash
yarn add @vibe/core @vibe/icons
# or
npm install @vibe/core @vibe/icons
```

### Load tokens & fonts

```javascript
// src/main.tsx or src/index.tsx
import "@vibe/core/tokens";
```

Vibe works best with the Poppins, Figtree, or Roboto font families. Add them once in your HTML `<head>`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

## Usage

Import components directly from the package root — they ship with TypeScript definitions, ARIA attributes, and CSS scoped under the hood.

```javascript
import "@vibe/core/tokens";
import { Button, Flex, Text } from "@vibe/core";

export function LaunchPad() {
  return (
    <Flex gap={12} align="center">
      <Text category="body" weight="bold">
        Ready to ship?
      </Text>
      <Button kind="primary">Launch</Button>
    </Flex>
  );
}
```

### Storybook & Playground

- Explore live demos and component props via [vibe.monday.com](https://vibe.monday.com/?path=/docs/catalog--docs).
- Prototype combinations or reproduce issues inside the [Playground](https://vibe.monday.com/?path=/story/playground--playground).

### MCP

Vibe includes an MCP (Model Context Protocol) server for AI-assisted workflows. It can surface component APIs, usage examples, icons, and best practices straight from the repo.

Follow the installation instructions in the [@vibe/mcp](https://github.com/mondaycom/vibe/blob/master/packages/mcp/README.md) docs to wire it into your preferred AI development tools.

## Configuration

- **Theming:** Override CSS variables (see `packages/core/docs/theming.md`) to align colors, spacing, and elevation with your brand.
- **Experimental SSR:** When server-rendering, initialize `globalThis.injectedStyles = {}` before rendering so every component stores its CSS for later injection.
- **Metadata for tooling:** `import meta from "@vibe/core/meta";` exposes experimental component metadata suitable for design linting or AI copilots.
- **Bundler tweaks:** Vibe ships modern ESM. Ensure your bundler transpiles `node_modules` when targeting legacy browsers, and enable tree-shaking to keep bundles lean.

## Ecosystem

- [@vibe/core](https://github.com/mondaycom/vibe/blob/master/packages/core/README.md): Core component library
- [@vibe/icons](https://github.com/mondaycom/vibe/blob/master/packages/icons/README.md): Icons library
- [@vibe/testkit](https://github.com/mondaycom/vibe/blob/master/packages/testkit/README.md): Testing utilities for Playwright
- [@vibe/codemod](https://github.com/mondaycom/vibe/blob/master/packages/codemod/README.md): Codemods and CLI tools
- [monday-ui-style](https://github.com/mondaycom/vibe/blob/master/packages/style/README.md): Styling foundations (included in @vibe/core)
- [vibe-storybook-components](https://github.com/mondaycom/vibe/blob/master/packages/storybook-blocks/README.md): Vibe Storybook Blocks
- [storybook-addon-playground](https://github.com/mondaycom/storybook-addon-playground/): Component Playground add-on
- [@vibe/mcp](https://github.com/mondaycom/vibe/blob/master/packages/mcp/README.md): MCP server for Vibe

## Older Versions

Vibe 2 ([`monday-ui-react-core`](https://www.npmjs.com/package/monday-ui-react-core)) no longer receives new features, only critical fixes. Follow the [migration guide](http://vibe.monday.com/?path=/docs/migration-guide--docs) to upgrade to Vibe 3 for the latest components and support. Legacy docs live at [vibe.monday.com/v2](https://vibe.monday.com/v2).

## Contributing

We ❤️ community contributions!

1. `yarn install` at the repo root.
2. Use `yarn build` (or `yarn lerna run <script>`) to test packages locally.
3. Read the [Contribution Guide](http://vibe.monday.com/?path=/docs/contributing--docs) for coding standards, Storybook workflows, and release notes.
4. Open a PR with screenshots or Storybook links whenever visual changes apply.

## Suggestions & Support

- Start a [discussion](https://github.com/mondaycom/vibe/discussions) for questions or proposals.
- File a [bug report](https://github.com/mondaycom/vibe/issues/new/choose) with steps to reproduce.
- Follow [@vibe/core on npm](https://www.npmjs.com/package/@vibe/core) to get release notifications.

---

_Funny note:_ If one more button asks you “Are you sure?”, just tell it you read this README—clearly you’re sure about everything now (especially installing Vibe). 🎉
