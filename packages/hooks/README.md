# @vibe/hooks

> React hooks library for Vibe Design System

A collection of reusable React hooks that provide common functionality across Vibe components. These hooks are designed to work seamlessly in both client-side and server-side rendering (SSR) environments.

## Installation

This package is included as a dependency of `@vibe/core`. If you need to use it independently:

```bash
npm install @vibe/hooks
# or
yarn add @vibe/hooks
```

## Available Hooks

### useClickOutside

Detects clicks outside a specified element and triggers a callback.

**Use Cases:**
- Closing dropdowns when clicking outside
- Dismissing modals
- Hiding tooltips
- Closing menus

**Usage:**
```typescript
import { useClickOutside } from "@vibe/hooks";
import { useRef, useState } from "react";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  
  useClickOutside(ref, () => {
    setIsOpen(false);
  });
  
  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && <div>Dropdown content</div>}
    </div>
  );
}
```

**API:**
```typescript
useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: () => void,
  options?: {
    enabled?: boolean;
    ignoreElements?: HTMLElement[];
  }
): void
```

**Parameters:**
- `ref` - Reference to the element to watch for outside clicks
- `callback` - Function to call when a click outside is detected
- `options.enabled` - Whether the hook is active (default: true)
- `options.ignoreElements` - Array of elements to ignore when detecting outside clicks

### SSR-Compatible Hooks

These hooks provide safe alternatives for SSR environments:

#### useIsomorphicLayoutEffect

A drop-in replacement for `useLayoutEffect` that safely handles SSR.

**Usage:**
```typescript
import { useIsomorphicLayoutEffect } from "@vibe/hooks";

function Component() {
  useIsomorphicLayoutEffect(() => {
    // This runs after layout paint on client
    // and safely no-ops on server
    const element = document.getElementById('target');
    // ... DOM measurements
  }, []);
}
```

**Why?** 
- `useLayoutEffect` causes warnings in SSR
- This hook uses `useLayoutEffect` on client and `useEffect` on server
- Prevents hydration mismatches

#### useIsMounted

Safely checks if a component is mounted, useful for SSR and preventing state updates on unmounted components.

**Usage:**
```typescript
import { useIsMounted } from "@vibe/hooks";

function DataFetcher() {
  const isMounted = useIsMounted();
  
  useEffect(() => {
    fetchData().then(data => {
      if (isMounted()) {
        setState(data);
      }
    });
  }, [isMounted]);
}
```

**Returns:** 
- A function that returns `true` if component is mounted, `false` otherwise
- Always returns `false` during SSR

## Hook Documentation

### useEventListener

Adds an event listener with automatic cleanup.

**Usage:**
```typescript
import { useEventListener } from "@vibe/hooks";

function ScrollTracker() {
  useEventListener('scroll', (event) => {
    console.log('Scrolled!', event);
  });
  
  return <div>Scroll the page</div>;
}
```

**API:**
```typescript
useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: HTMLElement | Window,
  options?: AddEventListenerOptions
): void
```

**Features:**
- Automatic cleanup on unmount
- Supports custom elements
- Memoizes handler to prevent unnecessary re-subscriptions
- TypeScript support for event types

### useKeyEvent

Handles keyboard events with key code checking.

**Usage:**
```typescript
import { useKeyEvent } from "@vibe/hooks";

function Dialog() {
  useKeyEvent('Escape', () => {
    closeDialog();
  });
  
  return <div>Press Escape to close</div>;
}
```

**API:**
```typescript
useKeyEvent(
  key: string | string[],
  callback: (event: KeyboardEvent) => void,
  options?: {
    element?: HTMLElement;
    preventDefault?: boolean;
    stopPropagation?: boolean;
  }
): void
```

**Parameters:**
- `key` - Key name(s) to listen for (e.g., 'Enter', 'Escape', 'ArrowDown')
- `callback` - Function to call when key is pressed
- `options.element` - Element to attach listener to (default: window)
- `options.preventDefault` - Prevent default key behavior
- `options.stopPropagation` - Stop event propagation

### useMergeRef

Merges multiple refs into a single ref callback.

**Usage:**
```typescript
import { useMergeRef } from "@vibe/hooks";
import { useRef, forwardRef } from "react";

const Button = forwardRef((props, forwardedRef) => {
  const internalRef = useRef(null);
  const mergedRef = useMergeRef(internalRef, forwardedRef);
  
  return <button ref={mergedRef}>{props.children}</button>;
});
```

**API:**
```typescript
useMergeRef<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T>
```

**Use Cases:**
- Forwarding refs while maintaining internal ref
- Combining multiple refs for the same element
- Working with third-party components that need refs

## TypeScript Support

All hooks are fully typed with TypeScript. Import types as needed:

```typescript
import type { UseClickOutsideOptions } from "@vibe/hooks";
```

## SSR Considerations

### Safe for SSR
These hooks work correctly in server-side rendering:
- ✅ `useIsomorphicLayoutEffect`
- ✅ `useIsMounted`
- ✅ `useMergeRef`

### Requires Client-Side Only
These hooks should only run on the client:
- ⚠️ `useClickOutside` - Uses DOM event listeners
- ⚠️ `useEventListener` - Uses DOM event listeners
- ⚠️ `useKeyEvent` - Uses DOM event listeners

For client-only hooks, ensure they're guarded:
```typescript
function Component() {
  const isMounted = useIsMounted();
  
  useEffect(() => {
    if (isMounted()) {
      // Safe to use DOM-dependent hooks here
    }
  }, [isMounted]);
}
```

## Performance Optimization

### Memoization
Most hooks automatically memoize callbacks to prevent unnecessary re-renders:

```typescript
// The callback is automatically memoized
useClickOutside(ref, () => {
  console.log('Clicked outside');
});

// No need to wrap in useCallback
```

### Cleanup
All hooks that add event listeners automatically clean up on unmount:

```typescript
useEventListener('resize', handleResize);
// Automatically removes listener on unmount
```

## Testing

### Testing Components Using Hooks

```typescript
import { render, fireEvent } from '@testing-library/react';
import { useClickOutside } from '@vibe/hooks';

test('useClickOutside triggers callback', () => {
  const callback = jest.fn();
  
  const TestComponent = () => {
    const ref = useRef(null);
    useClickOutside(ref, callback);
    return <div ref={ref}>Content</div>;
  };
  
  const { container } = render(<TestComponent />);
  
  fireEvent.click(document.body);
  expect(callback).toHaveBeenCalledTimes(1);
});
```

### Hook-Specific Tests

Each hook has comprehensive unit tests in the `__tests__` directory:

```bash
# Run hook tests
yarn test packages/hooks
```

## Examples

### Dropdown with Click Outside

```typescript
import { useClickOutside, useKeyEvent } from "@vibe/hooks";
import { useRef, useState } from "react";

function Dropdown({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close on outside click
  useClickOutside(dropdownRef, () => setIsOpen(false));
  
  // Close on Escape key
  useKeyEvent('Escape', () => setIsOpen(false));
  
  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle Menu
      </button>
      {isOpen && (
        <ul>
          {items.map(item => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Modal with Multiple Refs

```typescript
import { useMergeRef, useKeyEvent } from "@vibe/hooks";
import { useRef, forwardRef } from "react";

const Modal = forwardRef(({ onClose }, forwardedRef) => {
  const modalRef = useRef(null);
  const mergedRef = useMergeRef(modalRef, forwardedRef);
  
  // Close on Escape
  useKeyEvent('Escape', onClose);
  
  // Focus trap logic using modalRef
  useEffect(() => {
    const modal = modalRef.current;
    // ... focus trap implementation
  }, []);
  
  return <div ref={mergedRef}>Modal content</div>;
});
```

### Window Resize Handler

```typescript
import { useEventListener } from "@vibe/hooks";
import { useState, useCallback } from "react";

function ResponsiveComponent() {
  const [width, setWidth] = useState(window.innerWidth);
  
  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);
  
  useEventListener('resize', handleResize);
  
  return <div>Window width: {width}px</div>;
}
```

## Best Practices

### 1. Use SSR-Safe Hooks
When building components for SSR:
```typescript
// ✅ Good
import { useIsomorphicLayoutEffect } from "@vibe/hooks";

// ❌ Avoid in SSR
import { useLayoutEffect } from "react";
```

### 2. Cleanup is Automatic
Don't manually remove event listeners:
```typescript
// ✅ Good - automatic cleanup
useEventListener('scroll', handleScroll);

// ❌ Unnecessary
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### 3. Combine Hooks for Complex Behavior
```typescript
function ComplexComponent() {
  const ref = useRef(null);
  
  // Combine multiple hooks
  useClickOutside(ref, handleClose);
  useKeyEvent('Escape', handleClose);
  useEventListener('resize', handleResize);
  
  return <div ref={ref}>Content</div>;
}
```

## Development

### Building
```bash
yarn build
```

### Testing
```bash
yarn test
```

### Linting
```bash
yarn lint
```

## Related Packages

- [@vibe/core](../core/README.md) - Uses these hooks internally
- [@vibe/shared](../shared/README.md) - Shared utilities and types

## Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

When contributing new hooks:
1. Add comprehensive unit tests
2. Ensure SSR compatibility or document limitations
3. Include TypeScript types
4. Update this README with examples
5. Follow existing hook patterns

## License

See the main [Vibe repository](../../README.md) for license information.
