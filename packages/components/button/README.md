# @vibe/button

Button component for the Vibe Design System. This package provides a flexible and accessible button component with various styles, sizes, and states.

## Installation

```bash
npm install @vibe/button
```

## Usage

```javascript
import { Button } from "@vibe/button";

function MyComponent() {
  return (
    <Button onClick={() => console.log("Clicked!")}>
      Click Me
    </Button>
  );
}
```

## Features

- Multiple button kinds (primary, secondary, tertiary)
- Various sizes (small, medium, large)
- Loading states with integrated loader
- Icon support (left and right icons)
- Disabled and read-only states
- Full accessibility support with ARIA attributes
- Customizable styling with CSS modules

## Example with Icons and Loading

```javascript
import { Button } from "@vibe/button";
import { Add } from "@vibe/icons";

function MyComponent() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      leftIcon={Add}
      loading={loading}
      onClick={handleClick}
      size="medium"
    >
      Add Item
    </Button>
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

## Dependencies

- `@vibe/icon`: Icon component support
- `@vibe/loader`: Loading state support
- `@vibe/shared`: Shared utilities and types

## License

MIT
