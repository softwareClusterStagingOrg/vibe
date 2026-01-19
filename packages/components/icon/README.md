# @vibe/icon

Icon component for the Vibe Design System. This package provides a flexible icon component that supports SVG icons, font icons, and custom icons with accessibility features.

## Installation

```bash
npm install @vibe/icon
```

## Usage

```javascript
import { Icon } from "@vibe/icon";
import { Close } from "@vibe/icons";

function MyComponent() {
  return (
    <Icon
      icon={Close}
      iconSize={24}
      iconLabel="Close button"
    />
  );
}
```

## Features

- Support for SVG icons from `@vibe/icons`
- Custom SVG icon support
- Font icon support
- Customizable sizes
- Click handling
- Full accessibility with screen reader support
- ARIA labels and descriptions
- Semantic color support

## Icon Types

### Using Vibe Icons

```javascript
import { Icon } from "@vibe/icon";
import { Settings } from "@vibe/icons";

<Icon icon={Settings} iconSize={20} />
```

### Custom SVG Icons

```javascript
import { CustomSvgIcon } from "@vibe/icon";

<Icon 
  icon={CustomSvgIcon} 
  customSvgIcon="https://example.com/icon.svg"
/>
```

### Font Icons

```javascript
import { Icon } from "@vibe/icon";

<Icon 
  icon="fa-home" 
  iconType="font"
/>
```

## Accessibility

The Icon component includes built-in accessibility features:

- Automatic ARIA labeling
- Screen reader text support
- Semantic role attributes
- Keyboard navigation support

```javascript
<Icon
  icon={Close}
  iconLabel="Close dialog"
  ariaHidden={false}
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

- `react-inlinesvg`: SVG rendering support
- `@vibe/shared`: Shared utilities and types

## License

MIT
