# @vibe/base

Base components for building complex UI components in the Vibe Design System. These foundational components serve as building blocks for creating more sophisticated form controls and interactive elements.

## Installation

```bash
npm install @vibe/base
```

## Usage

```javascript
import { BaseInput } from "@vibe/base";
```

## Components

### BaseInput

A foundational input component that provides a consistent structure and styling for text inputs. It includes support for:

- Customizable sizes (small, medium, large)
- Left and right content rendering (icons, buttons, etc.)
- Success and error states
- Disabled and read-only states
- ARIA attributes for accessibility

#### Example

```jsx
import { BaseInput } from "@vibe/base";

function MyInput() {
  return (
    <BaseInput
      size="medium"
      placeholder="Enter text..."
      renderLeft={<Icon />}
      error={false}
    />
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
