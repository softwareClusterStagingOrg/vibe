# @vibe/loader

Loader (Spinner) component for the Vibe Design System. This package provides a flexible loading indicator component with various sizes and colors.

## Installation

```bash
npm install @vibe/loader
```

## Usage

```javascript
import { Loader } from "@vibe/loader";

function MyComponent() {
  return <Loader />;
}
```

## Features

- Multiple sizes (small, medium, large)
- Customizable colors
- Smooth animations
- Accessible with ARIA attributes
- Lightweight and performant

## Sizes

```javascript
import { Loader } from "@vibe/loader";

// Small loader
<Loader size="small" />

// Medium loader (default)
<Loader size="medium" />

// Large loader
<Loader size="large" />
```

## Custom Colors

```javascript
import { Loader } from "@vibe/loader";

<Loader color="primary" />
<Loader color="secondary" />
<Loader customColor="#ff5722" />
```

## Loading States

The Loader component is commonly used to indicate loading states in buttons, containers, or full-page overlays:

### In a Button

```javascript
import { Button } from "@vibe/button";

<Button loading={isLoading}>
  Submit
</Button>
```

### In a Container

```javascript
import { Loader } from "@vibe/loader";

function DataContainer() {
  const { data, loading } = useData();

  if (loading) {
    return <Loader size="large" />;
  }

  return <div>{data}</div>;
}
```

## Accessibility

The Loader component includes ARIA attributes for screen readers:

```javascript
<Loader 
  ariaLabel="Loading content" 
  role="status"
/>
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

- `@vibe/shared`: Shared utilities and types

## License

MIT
