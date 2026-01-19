# @vibe/testkit

<a href="https://www.npmjs.com/package/@vibe/testkit"><img alt="NPM Version" src="https://img.shields.io/npm/v/@vibe/testkit?label=@vibe/testkit"></a>

> End-to-end testing utilities for Vibe components with Playwright

This package provides a comprehensive testing toolkit for Vibe Design System components using Playwright. It includes page object models and utilities to make E2E testing easier and more maintainable.

## Installation

```bash
npm install @vibe/testkit --save-dev
# or
yarn add @vibe/testkit --dev
```

## Peer Dependencies

This package requires Playwright as a peer dependency:

```bash
npm install @playwright/test --save-dev
```

## Usage

The testkit provides page object models for all Vibe components. Each component class extends `BaseElement` and provides methods for interacting with the component in tests.

### Basic Example

```typescript
import { test, expect } from "@playwright/test";
import { Button } from "@vibe/testkit";

test("button should be clickable", async ({ page }) => {
  await page.goto("your-app-url");
  
  const button = new Button(
    page,
    page.locator('button[data-testid="submit-button"]'),
    "Submit Button"
  );
  
  await button.waitForElementToBeVisible();
  await button.click();
  await expect(button.getLocator()).toBeEnabled();
});
```

## Available Components

The testkit includes page object models for the following components:

- **Button**: Button interactions
- **ButtonGroup**: Button group interactions
- **Checkbox**: Checkbox state management
- **ColorPicker**: Color selection
- **Combobox**: Combobox interactions
- **Dropdown**: Dropdown selection
- **ExpandCollapse**: Expand/collapse interactions
- **IconButton**: Icon button interactions
- **Link**: Link interactions
- **List**: List interactions
- **ListItem**: List item interactions
- **Loader**: Loader state
- **Menu**: Menu interactions
- **MenuButton**: Menu button interactions
- **MenuItem**: Menu item interactions
- **Modal**: Modal dialogs
- **RadioButton**: Radio button selection
- **Search**: Search input
- **SplitButton**: Split button interactions
- **Steps**: Steps component
- **Tab**: Tab interactions
- **TabList**: Tab list navigation
- **Text**: Text component
- **TextArea**: Text area input
- **TextField**: Text field input
- **Toast**: Toast notifications
- **Toggle**: Toggle switch

## BaseElement

All component classes extend `BaseElement`, which provides common methods:

```typescript
class BaseElement {
  // Visibility
  waitForElementToBeVisible()
  waitForElementToBeHidden()
  isVisible()
  
  // Interactions
  click()
  hover()
  focus()
  
  // State
  isEnabled()
  isDisabled()
  
  // Locator
  getLocator()
  
  // And more...
}
```

## Utilities

The testkit also provides utility functions and enums:

### Common Actions

```typescript
import { CommonActions } from "@vibe/testkit";
```

### Enums

```typescript
import { ComponentState } from "@vibe/testkit";
```

### Types

TypeScript types for better type safety in your tests.

## Running Tests

```bash
# Run all tests
yarn test:all

# Run changed tests only
yarn test:changed
```

## Example Test

Here's a more complete example:

```typescript
import { test, expect } from "@playwright/test";
import { Dropdown, MenuItem } from "@vibe/testkit";

test.describe("Dropdown Selection", () => {
  test("should select an item from dropdown", async ({ page }) => {
    await page.goto("https://your-app.com");
    
    const dropdown = new Dropdown(
      page,
      page.locator('[data-testid="country-dropdown"]'),
      "Country Dropdown"
    );
    
    await dropdown.waitForElementToBeVisible();
    await dropdown.click();
    
    const menuItem = new MenuItem(
      page,
      page.locator('[data-testid="option-usa"]'),
      "USA Option"
    );
    
    await menuItem.click();
    await expect(dropdown.getLocator()).toContainText("USA");
  });
});
```

## Best Practices

1. **Use data-testid attributes**: For reliable element selection
2. **Use descriptive names**: Pass meaningful names to constructors for better error messages
3. **Wait for elements**: Always wait for elements to be visible before interacting
4. **Extend when needed**: Create custom classes extending BaseElement for app-specific components

## Contributing

When adding new components to the testkit:

1. Create a new class in `components/`
2. Extend `BaseElement`
3. Add component-specific methods
4. Add tests in `__tests__/`
5. Export from `components/index.ts`

## License

ISC
