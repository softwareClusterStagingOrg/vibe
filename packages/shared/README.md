# @vibe/shared

> Shared utilities, types, and helpers for Vibe Design System

This package contains common utilities, TypeScript types, helper functions, and shared logic used across all Vibe packages. It provides a foundation for consistent behavior and type safety throughout the design system.

## Installation

This package is included as a dependency of `@vibe/core`. If you need to use it independently:

```bash
npm install @vibe/shared
# or
yarn add @vibe/shared
```

## Exports

### Utilities

#### Color Utilities

```typescript
import { getColorVar, validateColor } from "@vibe/shared";
```

**Functions:**
- `getColorVar(colorName)` - Gets CSS variable for a color token
- `validateColor(color)` - Validates if a color is a valid Vibe color
- `extractColorValue(cssVar)` - Extracts color value from CSS variable

#### DOM Utilities

```typescript
import { 
  isElement,
  getElementRect,
  isHTMLElement,
  getScrollParent 
} from "@vibe/shared";
```

**Functions:**
- `isElement(node)` - Type guard for Element
- `isHTMLElement(node)` - Type guard for HTMLElement
- `getElementRect(element)` - Gets element's bounding rectangle
- `getScrollParent(element)` - Finds scrollable parent element

#### DOM Event Utilities

```typescript
import { 
  stopPropagation,
  preventDefault,
  preventDefaultAndStopPropagation 
} from "@vibe/shared";
```

**Functions:**
- `stopPropagation(event)` - Stops event propagation
- `preventDefault(event)` - Prevents default event behavior
- `preventDefaultAndStopPropagation(event)` - Both stop propagation and prevent default

#### Function Utilities

```typescript
import { debounce, throttle, noop } from "@vibe/shared";
```

**Functions:**
- `debounce(func, wait)` - Debounces a function
- `throttle(func, wait)` - Throttles a function
- `noop()` - No-operation function

#### Media Query Utilities

```typescript
import { useMediaQuery, isDesktop, isMobile, isTablet } from "@vibe/shared";
```

**Functions:**
- `useMediaQuery(query)` - React hook for media queries
- `isDesktop()` - Checks if viewport is desktop size
- `isMobile()` - Checks if viewport is mobile size
- `isTablet()` - Checks if viewport is tablet size

#### Screen Reader Utilities

```typescript
import { 
  setAccessibilityAnnouncement,
  screenReaderAccessHelper 
} from "@vibe/shared";
```

**Functions:**
- `setAccessibilityAnnouncement(message)` - Announces message to screen readers
- `screenReaderAccessHelper(message, options)` - Advanced screen reader announcements

#### SSR Utilities

```typescript
import { isBrowser, isServer, canUseDOM } from "@vibe/shared";
```

**Functions:**
- `isBrowser()` - Returns true if running in browser
- `isServer()` - Returns true if running on server
- `canUseDOM()` - Returns true if DOM is available

#### Test ID Utilities

```typescript
import { getTestId, createTestId } from "@vibe/shared";
```

**Functions:**
- `getTestId(componentName, suffix)` - Generates test ID for component
- `createTestId(parts)` - Creates test ID from parts array

#### Text Manipulation

```typescript
import { 
  capitalize,
  camelCase,
  kebabCase,
  truncateText 
} from "@vibe/shared";
```

**Functions:**
- `capitalize(str)` - Capitalizes first letter
- `camelCase(str)` - Converts to camelCase
- `kebabCase(str)` - Converts to kebab-case
- `truncateText(text, maxLength)` - Truncates text with ellipsis

#### User Agent Utilities

```typescript
import { isMacOS, isWindows, isIOS, isAndroid } from "@vibe/shared";
```

**Functions:**
- `isMacOS()` - Detects macOS
- `isWindows()` - Detects Windows
- `isIOS()` - Detects iOS
- `isAndroid()` - Detects Android

#### Deprecation Warning

```typescript
import { warnDeprecated } from "@vibe/shared";
```

**Function:**
- `warnDeprecated(componentName, oldUsage, newUsage)` - Logs deprecation warning

### TypeScript Types

#### Component Types

```typescript
import type {
  VibeComponent,
  VibeComponentProps,
  ElementContent,
  FormElement
} from "@vibe/shared";
```

**Types:**
- `VibeComponent` - Base type for all Vibe components
- `VibeComponentProps` - Common props for Vibe components
- `ElementContent` - Valid content types for elements
- `FormElement` - Union of all HTML form element types

#### Color Types

```typescript
import type { Colors } from "@vibe/shared";
```

**Type:**
- `Colors` - Union of all valid Vibe color names

#### Event Types

```typescript
import type { 
  VibeEvent,
  VibeMouseEvent,
  VibeKeyboardEvent 
} from "@vibe/shared";
```

**Types:**
- `VibeEvent` - Generic Vibe event type
- `VibeMouseEvent` - Mouse event with Vibe component context
- `VibeKeyboardEvent` - Keyboard event with Vibe component context

#### Utility Types

```typescript
import type {
  ArrayLastElement,
  MoveBy,
  SplitString,
  WithStaticProps
} from "@vibe/shared";
```

**Types:**
- `ArrayLastElement<T>` - Gets last element type of array
- `MoveBy` - Direction movement type ('up' | 'down' | 'left' | 'right')
- `SplitString<S>` - Splits string literal type
- `WithStaticProps<T, S>` - Adds static properties to component type

### Constants

```typescript
import { 
  SIZES,
  POSITIONS,
  KEYBOARD_KEYS,
  ELEMENT_TYPES 
} from "@vibe/shared";
```

**Constants:**
- `SIZES` - Standard size values ('small', 'medium', 'large')
- `POSITIONS` - Position values ('top', 'bottom', 'left', 'right')
- `KEYBOARD_KEYS` - Common keyboard key codes
- `ELEMENT_TYPES` - HTML element type constants

### Hooks

Re-exported hooks for convenience:

```typescript
import { 
  useEventListener,
  useKeyEvent,
  useMergeRef,
  useIsomorphicLayoutEffect 
} from "@vibe/shared";
```

See [@vibe/hooks](../hooks/README.md) for detailed hook documentation.

## Usage Examples

### Color Utilities

```typescript
import { getColorVar, validateColor } from "@vibe/shared";

// Get CSS variable for primary color
const primaryColor = getColorVar('primary');
// Returns: 'var(--primary-color)'

// Validate color
const isValid = validateColor('primary'); // true
const isInvalid = validateColor('invalid-color'); // false
```

### DOM Utilities

```typescript
import { getScrollParent, isHTMLElement } from "@vibe/shared";

const element = document.getElementById('myElement');

if (isHTMLElement(element)) {
  const scrollParent = getScrollParent(element);
  console.log('Scroll parent:', scrollParent);
}
```

### Event Utilities

```typescript
import { preventDefaultAndStopPropagation } from "@vibe/shared";

function handleClick(event) {
  preventDefaultAndStopPropagation(event);
  // Your click handling logic
}
```

### Debounce/Throttle

```typescript
import { debounce, throttle } from "@vibe/shared";

// Debounce search input
const debouncedSearch = debounce((query) => {
  performSearch(query);
}, 300);

// Throttle scroll handler
const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 100);
```

### Media Queries

```typescript
import { useMediaQuery, isMobile } from "@vibe/shared";

function ResponsiveComponent() {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  
  return (
    <div>
      {isLargeScreen ? <DesktopView /> : <MobileView />}
    </div>
  );
}
```

### Screen Reader Announcements

```typescript
import { setAccessibilityAnnouncement } from "@vibe/shared";

function SaveButton() {
  const handleSave = async () => {
    await saveData();
    setAccessibilityAnnouncement('Your changes have been saved');
  };
  
  return <button onClick={handleSave}>Save</button>;
}
```

### Test IDs

```typescript
import { getTestId } from "@vibe/shared";

function Button({ label, testId }) {
  const id = testId || getTestId('button', label);
  
  return <button data-testid={id}>{label}</button>;
}
```

### TypeScript Type Usage

```typescript
import type { VibeComponentProps, ElementContent } from "@vibe/shared";

interface MyComponentProps extends VibeComponentProps {
  title: string;
  content: ElementContent;
}

const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  content,
  className,
  ...props 
}) => {
  return (
    <div className={className} {...props}>
      <h2>{title}</h2>
      <div>{content}</div>
    </div>
  );
};
```

### Deprecation Warnings

```typescript
import { warnDeprecated } from "@vibe/shared";

function MyComponent({ oldProp, newProp }) {
  if (oldProp !== undefined) {
    warnDeprecated(
      'MyComponent',
      'oldProp',
      'newProp'
    );
  }
  
  const value = newProp ?? oldProp;
  // Component logic
}
```

## SSR Compatibility

All utilities in this package are SSR-compatible unless explicitly noted. Browser-dependent utilities include safety checks:

```typescript
import { isBrowser, canUseDOM } from "@vibe/shared";

if (canUseDOM()) {
  // Safe to use browser APIs
  const element = document.getElementById('app');
}
```

## Testing

### Unit Tests

```bash
# Run shared utilities tests
yarn test packages/shared
```

### Example Test

```typescript
import { capitalize } from "@vibe/shared";

describe('capitalize', () => {
  it('should capitalize first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });
  
  it('should handle empty string', () => {
    expect(capitalize('')).toBe('');
  });
});
```

## File Structure

```
packages/shared/
├── src/
│   ├── constants/        # Constant values
│   ├── hooks/            # Re-exported hooks
│   ├── tests/            # Testing utilities
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── package.json
├── tsconfig.json
└── README.md
```

## TypeScript Configuration

The package is fully typed with TypeScript. Import types from the main export:

```typescript
import type { VibeComponentProps, Colors } from "@vibe/shared";
```

## Best Practices

### 1. Use Type Guards

```typescript
import { isHTMLElement } from "@vibe/shared";

if (isHTMLElement(element)) {
  // TypeScript knows element is HTMLElement here
  element.focus();
}
```

### 2. Leverage Shared Constants

```typescript
import { SIZES, KEYBOARD_KEYS } from "@vibe/shared";

function handleKeyDown(event) {
  if (event.key === KEYBOARD_KEYS.ENTER) {
    // Handle Enter key
  }
}

const buttonSize = SIZES.MEDIUM;
```

### 3. SSR Safety

```typescript
import { canUseDOM } from "@vibe/shared";

const value = canUseDOM() 
  ? window.innerWidth 
  : 1024; // Default for SSR
```

### 4. Deprecation Handling

```typescript
import { warnDeprecated } from "@vibe/shared";

// Warn about deprecated props in development only
if (process.env.NODE_ENV === 'development' && oldProp) {
  warnDeprecated('Component', 'oldProp', 'newProp');
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

- [@vibe/core](../core/README.md) - Core component library
- [@vibe/hooks](../hooks/README.md) - React hooks
- [@vibe/base](../base/README.md) - Base components

## Contributing

When contributing new utilities:

1. Add comprehensive unit tests
2. Ensure SSR compatibility or document limitations
3. Include TypeScript types and JSDoc comments
4. Update this README with examples
5. Follow existing code patterns
6. Consider backward compatibility

See the main [Contributing Guide](../../CONTRIBUTING.md) for more information.

## License

See the main [Vibe repository](../../README.md) for license information.
