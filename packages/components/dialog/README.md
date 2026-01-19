# @vibe/dialog

Dialog (Popover/Tooltip) component for the Vibe Design System. This package provides flexible positioning and overlay components for creating tooltips, popovers, dropdowns, and other floating UI elements.

## Installation

```bash
npm install @vibe/dialog
```

## Usage

```javascript
import { Dialog, DialogContentContainer } from "@vibe/dialog";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const referenceRef = useRef(null);

  return (
    <>
      <button ref={referenceRef} onClick={() => setIsOpen(true)}>
        Open Dialog
      </button>
      <Dialog
        content={() => <div>Dialog content here</div>}
        referenceElement={referenceRef}
        isOpen={isOpen}
      />
    </>
  );
}
```

## Features

- Powered by Popper.js for intelligent positioning
- Automatic overflow handling and boundary detection
- Support for various triggers (click, hover, focus)
- Portal rendering with layer management
- Transition animations
- Accessibility support with proper ARIA attributes
- Scroll locking for modal dialogs
- DialogContentContainer for standardized content layout

## Components

### Dialog

The main dialog component that handles positioning and visibility.

### DialogContentContainer

A container component for standardizing dialog content layout and styling.

```javascript
import { DialogContentContainer } from "@vibe/dialog";

<DialogContentContainer>
  <div>Your content here</div>
</DialogContentContainer>
```

## Peer Dependencies

This package requires React and React DOM as peer dependencies:

```json
{
  "react": ">=16.9.0",
  "react-dom": ">=16.9.0"
}
```

## Dependencies

- `@popperjs/core`: Positioning engine
- `react-popper`: React wrapper for Popper.js
- `react-transition-group`: Animation support
- `@vibe/layer`: Layer management
- `@vibe/hooks`: Shared hooks (e.g., useClickOutside)
- `@vibe/shared`: Shared utilities and types

## License

MIT
