# @vibe/shared

<a href="https://www.npmjs.com/package/@vibe/shared"><img alt="NPM Version" src="https://img.shields.io/npm/v/@vibe/shared?label=@vibe/shared"></a>

> Shared utilities for Vibe packages

This package provides shared utilities, hooks, types, and constants used across all Vibe packages. It serves as a foundation for building consistent and maintainable components.

## Installation

```bash
npm install @vibe/shared
# or
yarn add @vibe/shared
```

## Package Contents

### Hooks

Common React hooks used throughout Vibe:

- **useEventListener**: Attach event listeners with automatic cleanup
- **useKeyEvent**: Handle keyboard events
- **useMergeRef**: Merge multiple React refs
- **useIsMounted**: Check if component is mounted (SSR-safe)
- **useIsomorphicLayoutEffect**: Layout effect that works in SSR

### Types

TypeScript types and interfaces:

- **VibeComponent**: Base type for Vibe components
- **VibeComponentProps**: Base props for Vibe components
- **ElementContent**: Type for renderable content
- **FormElement**: Form element types
- **Colors**: Color type definitions
- **MoveBy**: Movement direction type
- And more utility types

### Constants

Common constants:

- **keyCodes**: Keyboard key codes
- **sizes**: Size constants for components

### Utilities

Helper functions organized by category:

#### DOM Utilities
- DOM manipulation helpers
- Event handling utilities
- Media query utilities

#### Color Utilities
- Color manipulation
- CSS variable mapping

#### SSR Utilities
- Server-side rendering helpers
- Client detection

#### Text Utilities
- Text manipulation
- String operations

#### Testing Utilities
- Test ID helpers
- Test utilities for component testing

#### Other Utilities
- Screen reader accessibility helpers
- User agent detection
- Deprecation warnings
- TypeScript CSS modules helpers

## Usage

Import the utilities you need:

```javascript
import { useEventListener, keyCodes, VibeComponentProps } from "@vibe/shared";
```

### Example: Using useEventListener

```javascript
import { useEventListener } from "@vibe/shared";
import { useRef } from "react";

function MyComponent() {
  const ref = useRef(null);
  
  useEventListener({
    eventName: "click",
    ref,
    callback: (event) => {
      console.log("Element clicked!", event);
    }
  });
  
  return <div ref={ref}>Click me</div>;
}
```

### Example: Using keyCodes

```javascript
import { keyCodes } from "@vibe/shared";

function handleKeyPress(event) {
  if (event.keyCode === keyCodes.ENTER) {
    // Handle enter key
  }
}
```

## Peer Dependencies

This package requires React as a peer dependency:

- React >= 16.9.0
- Vitest >= 1.6.0 (for testing utilities)

## Usage in Vibe

This package is a core dependency for:

- `@vibe/core`: Component library
- `@vibe/hooks`: Additional hooks
- `@vibe/base`: Base components
- Other Vibe packages

It provides the foundational utilities that ensure consistency across the entire Vibe ecosystem.
