# @vibe/layer

Layer management system for the Vibe Design System. This package provides context-based layer management for handling z-index and rendering order of overlays, modals, dialogs, and other layered components.

## Installation

```bash
npm install @vibe/layer
```

## Usage

```javascript
import { LayerProvider } from "@vibe/layer";

function App() {
  return (
    <LayerProvider>
      <YourApp />
    </LayerProvider>
  );
}
```

## Features

- Context-based layer management
- Automatic z-index handling
- Layer stacking and ordering
- Support for nested layers
- Portal rendering coordination
- Accessibility considerations for layer management

## LayerProvider

The `LayerProvider` component should wrap your application or the part of your application that needs layer management.

### Basic Example

```javascript
import { LayerProvider } from "@vibe/layer";

function MyApp() {
  return (
    <LayerProvider>
      {/* Components that use dialogs, modals, tooltips, etc. */}
      <Navigation />
      <Content />
      <Modals />
    </LayerProvider>
  );
}
```

## Use Cases

Layer management is essential for:

- Modal dialogs
- Dropdown menus
- Tooltips and popovers
- Toast notifications
- Context menus
- Overlay panels

## How It Works

The LayerProvider creates a context that tracks and manages the rendering layers of your application. Components like Dialog, Modal, and Dropdown use this context to:

1. Register themselves when mounted
2. Receive appropriate z-index values
3. Coordinate with other layered components
4. Clean up when unmounted

## Peer Dependencies

This package requires React and React DOM as peer dependencies:

```json
{
  "react": ">=16.9.0",
  "react-dom": ">=16.9.0"
}
```

## Dependencies

- `@vibe/shared`: Shared utilities and types

## License

MIT
