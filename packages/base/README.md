# @vibe/base

> Internal base component primitives for Vibe Design System

⚠️ **Internal Package** - This package contains internal building blocks used by @vibe/core components. These components are **not intended for direct use** in consumer applications and are **not exported** from the main @vibe/core package.

## Overview

The `@vibe/base` package provides foundational React components that serve as building blocks for more complex Vibe components. These base components handle common patterns like form inputs, lists, and informational text with consistent accessibility and UX patterns.

## Base Components

### BaseInput

A foundational input component that provides consistent structure, accessibility, and styling for text input elements.

**Key Features:**
- Built-in label and field label support
- Error state handling with info text
- Required field indicators
- Accessible form integration with proper ARIA attributes
- Consistent validation message display

**Internal Usage Example:**
```typescript
import { BaseInput } from "@vibe/base";

<BaseInput
  id="email-input"
  label="Email Address"
  required
  error="Please enter a valid email"
  value={value}
  onChange={handleChange}
/>
```

**What Consumers Should Provide:**
- Unique `id` for form association
- Accessible labels via `label` or `aria-label`
- Error messages when validation fails
- Change handlers for controlled components

### BaseList

A foundational list component that provides keyboard navigation, ARIA attributes, and consistent list behavior for dropdown menus, autocomplete results, and other list-based interfaces.

**Key Features:**
- Keyboard navigation (Arrow keys, Home, End)
- Focus management
- ARIA roles and attributes for accessibility
- Virtualization support for large lists
- Selection state management

**Internal Usage Example:**
```typescript
import { BaseList } from "@vibe/base";

<BaseList
  items={items}
  onItemClick={handleItemClick}
  selectedId={selectedId}
  role="listbox"
/>
```

### BaseListItem

A foundational list item component that works in conjunction with BaseList to provide consistent item rendering, states, and interactions.

**Key Features:**
- Hover and focus states
- Selection state styling
- Disabled state support
- ARIA attributes for list items
- Keyboard interaction support

**Internal Usage Example:**
```typescript
import { BaseListItem } from "@vibe/base";

<BaseListItem
  id="item-1"
  selected={selected}
  disabled={disabled}
  onClick={handleClick}
>
  Item content
</BaseListItem>
```

### InfoText

A component for displaying informational, warning, or error messages in a consistent, accessible manner.

**Key Features:**
- Multiple severity levels (info, warning, error)
- Accessible ARIA live regions
- Icon integration
- Consistent styling across the design system

**Internal Usage Example:**
```typescript
import { InfoText } from "@vibe/base";

<InfoText type="error" text="This field is required" />
```

### FieldLabel

A component for rendering form field labels with consistent styling and accessibility support.

**Key Features:**
- Required field indicators
- Tooltip support for additional context
- Proper association with form controls
- Consistent typography and spacing

**Internal Usage Example:**
```typescript
import { FieldLabel } from "@vibe/base";

<FieldLabel
  htmlFor="input-id"
  label="Full Name"
  required
  tooltip="Enter your legal name"
/>
```

## Design Principles

Base components follow these core principles:

### 1. Accessibility First
- Proper ARIA attributes by default
- Keyboard navigation support
- Screen reader compatibility
- Focus management

### 2. Composability
- Small, focused components
- Clear prop interfaces
- Minimal coupling between components
- Extensible through composition

### 3. Consistency
- Unified styling approach
- Shared patterns for similar interactions
- Predictable behavior across components

### 4. Form Integration
- Proper form association
- Validation state handling
- Error message display
- Label management

## Usage in @vibe/core Components

Base components are used internally by higher-level Vibe components to ensure consistency and reduce duplication:

**TextField Component:**
```typescript
import { BaseInput } from "@vibe/base";

export const TextField = ({ label, error, ...props }) => {
  return (
    <BaseInput
      label={label}
      error={error}
      {...props}
    />
  );
};
```

**Dropdown Component:**
```typescript
import { BaseList, BaseListItem } from "@vibe/base";

export const Dropdown = ({ options, ...props }) => {
  return (
    <BaseList role="listbox" {...props}>
      {options.map(option => (
        <BaseListItem key={option.id} {...option} />
      ))}
    </BaseList>
  );
};
```

## Component Props

### BaseInput Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | required | Unique identifier for the input |
| label | string | - | Label text for the input |
| required | boolean | false | Whether the field is required |
| error | string | - | Error message to display |
| value | string | - | Input value (controlled) |
| onChange | function | - | Change handler |
| placeholder | string | - | Placeholder text |

### BaseList Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | array | required | Array of list items |
| onItemClick | function | - | Click handler for items |
| selectedId | string | - | ID of selected item |
| role | string | 'list' | ARIA role for the list |

### BaseListItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | required | Unique identifier |
| selected | boolean | false | Whether item is selected |
| disabled | boolean | false | Whether item is disabled |
| onClick | function | - | Click handler |

### InfoText Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | 'info' \| 'warning' \| 'error' | 'info' | Message severity |
| text | string | required | Message content |

### FieldLabel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| htmlFor | string | required | ID of associated input |
| label | string | required | Label text |
| required | boolean | false | Show required indicator |
| tooltip | string | - | Tooltip content |

## Accessibility Requirements

When using base components, ensure:

1. **Labels are always provided** - Either through the `label` prop or `aria-label`
2. **IDs are unique** - Each form control must have a unique ID
3. **Error states are announced** - Use InfoText for validation messages
4. **Keyboard navigation works** - Test with keyboard only
5. **Focus is managed properly** - Visible focus indicators and logical tab order

## Styling

Base components use CSS modules for styling. Styles are located in adjacent `.module.scss` files:

```
BaseInput/
  ├── BaseInput.tsx
  ├── BaseInput.module.scss
  ├── BaseInput.types.ts
  └── __tests__/
      └── BaseInput.test.tsx
```

## Testing

Each base component includes comprehensive unit tests:

```bash
# Run base component tests
yarn test packages/base
```

**Example Test:**
```typescript
import { render, screen } from '@testing-library/react';
import { BaseInput } from '../BaseInput';

test('renders with label', () => {
  render(<BaseInput id="test" label="Test Label" />);
  expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
});
```

## Development

Base components are developed alongside @vibe/core:

```bash
# Install dependencies
yarn install

# Run tests in watch mode
yarn test --watch

# Build the package
yarn build
```

## For Vibe Component Developers

When creating new components in @vibe/core:

### Do:
✅ Use base components for foundational patterns  
✅ Follow established accessibility patterns  
✅ Extend base components through composition  
✅ Add additional props as needed  
✅ Write tests for new behavior  

### Don't:
❌ Modify base components for specific use cases  
❌ Bypass accessibility features  
❌ Duplicate functionality that exists in base components  
❌ Export base components directly from @vibe/core  

## Related Documentation

- [Component Internal Structure](.cursor/rules/component-internal-structure.mdc)
- [Base Components Guidelines](.cursor/rules/base-components.mdc)
- [Accessibility Guidelines](.cursor/rules/accessibility-guidelines.mdc)
- [File Structures](.cursor/rules/file-structures.mdc)

## Contributing

Base components are critical infrastructure for the Vibe Design System. Changes should be:

1. **Backward compatible** - Existing components depend on these
2. **Well-tested** - Include unit and integration tests
3. **Documented** - Update this README with any changes
4. **Accessible** - Maintain or improve accessibility
5. **Reviewed** - Get approval from Vibe maintainers

See the main [Contributing Guide](../../CONTRIBUTING.md) for more information.

## License

See the main [Vibe repository](../../README.md) for license information.
