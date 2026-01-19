# @vibe/base

<a href="https://www.npmjs.com/package/@vibe/base"><img alt="NPM Version" src="https://img.shields.io/npm/v/@vibe/base?label=@vibe/base"></a>

> Base components for the Vibe Design System

This package provides low-level base components that serve as building blocks for more complex Vibe components. These components handle common UI patterns and ensure consistency across the design system.

## Installation

```bash
npm install @vibe/base
# or
yarn add @vibe/base
```

## Components

### BaseInput

A foundational input component that provides a consistent structure for text inputs with support for various states, sizes, and customizations.

#### Features

- Multiple sizes (small, medium, large)
- State indicators (error, success)
- Left and right content slots
- Disabled and read-only states
- Accessible by default with ARIA support
- Fully styled and themeable

#### Usage

```javascript
import { BaseInput } from "@vibe/base";

function MyInput() {
  return (
    <BaseInput
      size="medium"
      placeholder="Enter text..."
      renderLeft={<SearchIcon />}
      renderRight={<ClearButton />}
    />
  );
}
```

#### Props

- `size`: Input size - `"small"` | `"medium"` | `"large"` (default: `"medium"`)
- `renderLeft`: Content to render on the left side of the input
- `renderRight`: Content to render on the right side of the input
- `error`: Boolean to indicate error state
- `success`: Boolean to indicate success state
- `wrapperRole`: ARIA role for the wrapper element
- `inputRole`: ARIA role for the input element
- `className`: Additional CSS class for the wrapper
- `inputClassName`: Additional CSS class for the input element
- Plus all standard HTML input attributes

## Usage in Vibe

These base components are used internally by higher-level Vibe components to ensure consistency and reduce code duplication. They are building blocks for components like:

- TextField
- Search
- Dropdown
- Combobox
- And other input-based components

## Peer Dependencies

This package requires React as a peer dependency:

- React >= 16.9.0
- React DOM >= 16.9.0

## Dependencies

This package depends on:

- `@vibe/shared`: Shared utilities for Vibe packages
- `classnames`: Utility for conditionally joining class names

## Styling

Components include built-in styles that follow the Vibe Design System. Styles are scoped using CSS Modules to prevent conflicts.
