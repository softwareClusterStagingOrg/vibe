# @vibe/hooks

<a href="https://www.npmjs.com/package/@vibe/hooks"><img alt="NPM Version" src="https://img.shields.io/npm/v/@vibe/hooks?label=@vibe/hooks"></a>

> React hooks for the Vibe Design System

This package provides reusable React hooks used throughout the Vibe component library. These hooks handle common UI patterns and can also be used in your own applications.

## Installation

```bash
npm install @vibe/hooks
# or
yarn add @vibe/hooks
```

## Available Hooks

### useClickOutside

A hook that detects clicks outside of a specified element. Useful for closing dropdowns, modals, and other UI components when clicking outside.

#### Usage

```javascript
import { useClickOutside } from "@vibe/hooks";
import { useRef } from "react";

function Dropdown() {
  const ref = useRef(null);
  
  useClickOutside({
    ref,
    callback: () => {
      // Handle click outside
      console.log("Clicked outside!");
    }
  });
  
  return (
    <div ref={ref}>
      Dropdown content
    </div>
  );
}
```

#### Options

- `ref` (RefObject): Reference to the element to detect clicks outside of
- `callback` (function): Function to call when a click outside is detected
- `ignoreClasses` (string[], optional): Array of CSS class selectors to ignore (elements with these classes won't trigger the callback)
- `eventName` (string, optional): Event to listen for (default: `"click"`)

The hook automatically handles both mouse clicks and touch events.

## Peer Dependencies

This package requires React as a peer dependency:

- React >= 16.9.0
- React DOM >= 16.9.0

## Dependencies

This package depends on:

- `@vibe/shared`: Shared utilities for Vibe packages

## Usage in Vibe Components

These hooks are used internally by Vibe components and can also be imported and used in your own applications alongside Vibe components.
