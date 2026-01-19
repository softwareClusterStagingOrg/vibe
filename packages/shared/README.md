# @vibe/shared

Shared utilities, types, hooks, and constants for Vibe Design System packages. This package provides foundational functionality used across the Vibe ecosystem.

## Installation

```bash
npm install @vibe/shared
```

## Usage

```javascript
import { useMergeRef, getStyle, KEYS } from "@vibe/shared";
```

## Package Contents

### Hooks

Reusable React hooks for common functionality:

- **useMergeRef**: Merge multiple refs into a single ref callback
- **useKeyEvent**: Handle keyboard events with ease
- **useEventListener**: Add event listeners with automatic cleanup
- **useIsMounted**: Check if a component is mounted (SSR-safe)
- **useIsomorphicLayoutEffect**: `useLayoutEffect` that works with SSR

#### Example

```jsx
import { useMergeRef, useEventListener } from "@vibe/shared";

function MyComponent({ externalRef }) {
  const internalRef = useRef(null);
  const mergedRef = useMergeRef(internalRef, externalRef);

  useEventListener({
    eventName: "resize",
    ref: windowRef,
    callback: handleResize
  });

  return <div ref={mergedRef}>Content</div>;
}
```

### Utilities

Collection of utility functions for various use cases:

- **colors-utils**: Color manipulation and conversion utilities
- **dom-utils**: DOM manipulation helpers (e.g., `getStyle`)
- **dom-event-utils**: Event handling utilities
- **function-utils**: Function composition and utilities
- **media-query-utils**: Media query helpers
- **ssr-utils**: Server-side rendering utilities (e.g., `isClient`)
- **user-agent-utils**: User agent detection
- **screenReaderAccessHelper**: Screen reader accessibility helpers

#### Example

```javascript
import { getStyle, isClient } from "@vibe/shared";

// Get a style class name based on a value
const sizeClass = getStyle(styles, size); // e.g., styles.medium

// Check if code is running on client
if (isClient()) {
  // Browser-only code
}
```

### Types

TypeScript type definitions for Vibe components:

- **VibeComponent**: Base type for Vibe components
- **VibeComponentProps**: Base props for Vibe components
- **Colors**: Color type definitions
- **ElementContent**: Union type for React children/element content
- **MoveBy**: Movement direction types
- **Event types**: GenericEventCallback and other event-related types

#### Example

```typescript
import type { VibeComponentProps, ElementContent } from "@vibe/shared";

interface MyComponentProps extends VibeComponentProps {
  title: ElementContent;
}
```

### Constants

Shared constants used across Vibe packages:

- **keyCodes**: Keyboard key constants (e.g., `KEYS.ENTER`, `KEYS.ESCAPE`)
- **sizes**: Standard size constants (e.g., `SIZES.SMALL`, `SIZES.MEDIUM`, `SIZES.LARGE`)

#### Example

```javascript
import { KEYS, SIZES } from "@vibe/shared";

function handleKeyDown(event) {
  if (event.key === KEYS.ENTER) {
    // Handle Enter key
  }
}
```

### Test Utilities

Testing helpers for Vibe components:

- **test-utils**: Common test utilities and helpers
- **test-ids-utils**: Test ID generation and management
- **constants**: Test-related constants

## Peer Dependencies

This package requires React as a peer dependency:

```json
{
  "react": ">=16.9.0",
  "vitest": ">=1.6.0"
}
```

## License

MIT
