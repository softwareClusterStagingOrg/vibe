# @vibe/hooks

A collection of reusable React hooks for the Vibe Design System. These hooks provide common functionality for building interactive components.

## Installation

```bash
npm install @vibe/hooks
```

## Usage

```javascript
import { useClickOutside } from "@vibe/hooks";
```

## Available Hooks

### useClickOutside

A hook that detects clicks or touch events outside of a specified element. Useful for closing dropdowns, modals, and other overlays when clicking outside.

#### Parameters

- `ref`: RefObject to the element to monitor
- `callback`: Function to call when a click outside is detected
- `ignoreClasses`: Optional array of CSS class names to ignore
- `eventName`: Optional event name to listen to (default: "click")

#### Example

```jsx
import { useRef } from "react";
import { useClickOutside } from "@vibe/hooks";

function Dropdown() {
  const dropdownRef = useRef(null);

  useClickOutside({
    ref: dropdownRef,
    callback: () => {
      console.log("Clicked outside!");
      // Close the dropdown
    },
    ignoreClasses: ["ignore-click"]
  });

  return (
    <div ref={dropdownRef}>
      {/* Dropdown content */}
    </div>
  );
}
```

## Peer Dependencies

This package requires React and React DOM as peer dependencies:

```json
{
  "react": ">=16.9.0",
  "react-dom": ">=16.9.0"
}
```

## License

MIT
