# @vibe/testkit

<a href="https://www.npmjs.com/package/@vibe/testkit"><img alt="NPM Version" src="https://img.shields.io/npm/v/@vibe/testkit?label=@vibe/testkit"></a>

> Playwright testing utilities for Vibe Design System components

The `@vibe/testkit` package provides testing utilities and helpers for writing end-to-end tests for Vibe components using Playwright. It offers a collection of page objects, selectors, and utilities to simplify testing of @vibe/core components.

## Installation

```bash
npm install --save-dev @vibe/testkit
# or
yarn add --dev @vibe/testkit
```

## Prerequisites

This package requires Playwright to be installed in your project:

```bash
npm install --save-dev @playwright/test
```

## Usage

### Basic Example

```typescript
import { test, expect } from '@playwright/test';
import { ButtonTestkit } from '@vibe/testkit';

test('button click interaction', async ({ page }) => {
  await page.goto('http://localhost:6006');
  
  const button = new ButtonTestkit(page, '[data-testid="my-button"]');
  
  await button.click();
  expect(await button.isDisabled()).toBe(false);
});
```

### Component Test Kits

The package includes test kits for common Vibe components, providing convenient methods for interacting with and asserting component states.

#### Available Test Kits

- `ButtonTestkit` - Testing utilities for Button components
- `DialogTestkit` - Testing utilities for Dialog/Modal components
- `DropdownTestkit` - Testing utilities for Dropdown components
- `TextFieldTestkit` - Testing utilities for TextField components
- And more...

### Custom Selectors

The package exports helper functions for working with Vibe-specific test IDs and selectors:

```typescript
import { getByTestId, getByVibeId } from '@vibe/testkit';

test('using custom selectors', async ({ page }) => {
  const element = await getByTestId(page, 'custom-element');
  const vibeComponent = await getByVibeId(page, 'vibe-button');
});
```

## Testing Best Practices

### 1. Use Data Test IDs

Always prefer `data-testid` attributes over CSS selectors for stability:

```typescript
// ✅ Good
const button = page.locator('[data-testid="submit-button"]');

// ❌ Avoid
const button = page.locator('.button.primary');
```

### 2. Wait for Component States

Use appropriate waiting strategies for asynchronous component behavior:

```typescript
import { waitForDialog } from '@vibe/testkit';

await button.click();
await waitForDialog(page);
```

### 3. Test Accessibility

Leverage Playwright's accessibility testing features with Vibe components:

```typescript
import { expect, test } from '@playwright/test';

test('button has proper ARIA attributes', async ({ page }) => {
  const button = page.locator('[data-testid="my-button"]');
  await expect(button).toHaveAttribute('role', 'button');
});
```

## API Reference

### ButtonTestkit

Methods for testing Button components:

- `click()` - Clicks the button
- `isDisabled()` - Returns whether the button is disabled
- `getText()` - Returns the button text content
- `hasClass(className)` - Checks if button has specific class

### DialogTestkit

Methods for testing Dialog components:

- `waitForOpen()` - Waits for dialog to appear
- `waitForClose()` - Waits for dialog to close
- `clickCloseButton()` - Clicks the dialog close button
- `getTitle()` - Returns the dialog title
- `getContent()` - Returns the dialog content

### DropdownTestkit

Methods for testing Dropdown components:

- `open()` - Opens the dropdown
- `close()` - Closes the dropdown
- `selectOption(text)` - Selects an option by text
- `getSelectedValue()` - Returns currently selected value
- `getOptions()` - Returns all available options

## Examples

### Testing Form Submission

```typescript
import { test, expect } from '@playwright/test';
import { TextFieldTestkit, ButtonTestkit } from '@vibe/testkit';

test('form submission flow', async ({ page }) => {
  await page.goto('http://localhost:3000/form');
  
  const emailField = new TextFieldTestkit(page, '[data-testid="email-input"]');
  const submitButton = new ButtonTestkit(page, '[data-testid="submit-btn"]');
  
  await emailField.fill('user@example.com');
  await submitButton.click();
  
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
});
```

### Testing Dialog Interactions

```typescript
import { test, expect } from '@playwright/test';
import { DialogTestkit, ButtonTestkit } from '@vibe/testkit';

test('dialog open and close', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const openButton = new ButtonTestkit(page, '[data-testid="open-dialog"]');
  const dialog = new DialogTestkit(page);
  
  await openButton.click();
  await dialog.waitForOpen();
  
  expect(await dialog.getTitle()).toBe('Confirmation');
  
  await dialog.clickCloseButton();
  await dialog.waitForClose();
});
```

### Testing Dropdown Selection

```typescript
import { test, expect } from '@playwright/test';
import { DropdownTestkit } from '@vibe/testkit';

test('dropdown selection', async ({ page }) => {
  await page.goto('http://localhost:3000/dropdown');
  
  const dropdown = new DropdownTestkit(page, '[data-testid="country-select"]');
  
  await dropdown.open();
  await dropdown.selectOption('United States');
  
  expect(await dropdown.getSelectedValue()).toBe('US');
});
```

## Configuration

### Playwright Configuration

Recommended Playwright configuration for testing Vibe components:

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'yarn storybook',
    port: 6006,
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
});
```

## Troubleshooting

### Common Issues

**Timeouts when waiting for components:**
- Increase timeout in test configuration
- Check if component is rendered conditionally
- Verify the correct selector is being used

**Flaky tests:**
- Use built-in waiting mechanisms instead of fixed delays
- Ensure proper cleanup between tests
- Check for race conditions in asynchronous operations

**Element not found:**
- Verify `data-testid` attributes are set correctly
- Check if element is in a shadow DOM
- Ensure component is mounted before querying

## Contributing

We welcome contributions to improve the testkit! Please see our [Contributing Guide](../../CONTRIBUTING.md) for more information.

## Related Packages

- [@vibe/core](../core/README.md) - Core component library
- [@playwright/test](https://playwright.dev/) - Playwright testing framework

## License

See the main [Vibe repository](../../README.md) for license information.
