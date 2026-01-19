# @vibe/docs

> Vibe Design System Documentation and Storybook

This package contains the Storybook-based documentation for the Vibe Design System. It serves as the development environment and interactive documentation hub for Vibe components.

## Overview

The docs package provides:

- **Interactive Component Documentation**: Explore all Vibe components with live examples
- **Development Environment**: Storybook setup for component development and testing
- **Visual Testing**: Integration with Chromatic for visual regression testing
- **API Documentation**: Comprehensive props and usage documentation for all components

## Development

To run the Storybook documentation locally:

```bash
yarn storybook
```

This will start the Storybook development server on `http://localhost:7008`.

## Building

To build the static Storybook site:

```bash
yarn build-storybook
```

The built site will be output to the `static_storybook` directory.

## Testing

### Visual Testing with Chromatic

Run Chromatic tests locally:

```bash
yarn chromatic:local
```

Make sure to set the `CHROMATIC_PROJECT_TOKEN` environment variable before running.

## Deployment

The documentation is automatically deployed to [vibe.monday.com](https://vibe.monday.com) via CI/CD pipelines.

## Package Structure

This package includes:

- **Stories**: Component documentation and examples (`.stories.tsx`, `.mdx` files)
- **Assets**: Images and other media files
- **Configuration**: Storybook configuration and build scripts

## Note

This package is marked as private and is not published to npm. It is only used for documentation and development purposes within the Vibe monorepo.

## Related Links

- [Live Documentation](https://vibe.monday.com)
- [Component Catalog](https://vibe.monday.com/?path=/docs/catalog--docs)
- [Playground](https://vibe.monday.com/?path=/story/playground--playground)
