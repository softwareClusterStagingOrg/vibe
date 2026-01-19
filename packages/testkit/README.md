# @vibe/testkit

E2E testing toolkit for Vibe Design System components using Playwright. This package provides Page Object Model (POM) classes and utilities to simplify testing of Vibe components in your applications.

## Installation

```bash
npm install --save-dev @vibe/testkit
```

## Prerequisites

This package requires Playwright as a peer dependency:

```bash
npm install --save-dev @playwright/test
```

## Usage

The testkit provides pre-built Page Object classes for all Vibe components, making it easy to interact with them in your tests.

### Basic Example

```typescript
import { test, expect } from "@playwright/test";
import { Button } from "@vibe/testkit";

test("button click", async ({ page }) => {
  await page.goto("http://localhost:3000");
  
  const submitButton = new Button(
    page,
    page.locator('[data-testid="submit-button"]'),
    "Submit Button"
  );
  
  await submitButton.click();
  expect(await submitButton.isVisible()).toBe(true);
});
```

### Available Components

The testkit includes Page Object classes for all major Vibe components:

- **Button**: Button interactions
- **ButtonGroup**: Button group interactions
- **Checkbox**: Checkbox interactions
- **ColorPicker**: Color picker interactions
- **Combobox**: Combobox/autocomplete interactions
- **Dropdown**: Dropdown menu interactions
- **ExpandCollapse**: Expand/collapse component interactions
- **IconButton**: Icon button interactions
- **Link**: Link interactions
- **List**: List component interactions
- **ListItem**: List item interactions
- **Loader**: Loader/spinner interactions
- **Menu**: Menu interactions
- **MenuButton**: Menu button interactions
- **MenuItem**: Menu item interactions
- **Modal**: Modal dialog interactions
- **RadioButton**: Radio button interactions
- **Search**: Search input interactions
- **SplitButton**: Split button interactions
- **Steps**: Steps/stepper interactions
- **Tab**: Tab interactions
- **TabList**: Tab list interactions
- **Text**: Text element interactions
- **TextArea**: Text area interactions
- **TextField**: Text field interactions
- **Toast**: Toast notification interactions
- **Toggle**: Toggle switch interactions

### Common Actions

The testkit also exports common testing utilities:

```typescript
import { commonActions } from "@vibe/testkit";
```

### BaseElement

All component classes extend from `BaseElement`, which provides common methods:

- `click()`: Click the element
- `isVisible()`: Check if element is visible
- `getText()`: Get element text content
- `getAttribute(name)`: Get element attribute
- And more...

## Running Tests

Configure Playwright in your project and run tests with:

```bash
npx playwright test
```

## Example Test Suite

```typescript
import { test, expect } from "@playwright/test";
import { Button, TextField, Modal } from "@vibe/testkit";

test.describe("Login Form", () => {
  test("should submit form successfully", async ({ page }) => {
    await page.goto("/login");
    
    const emailField = new TextField(
      page,
      page.locator('[data-testid="email-input"]'),
      "Email Input"
    );
    
    const passwordField = new TextField(
      page,
      page.locator('[data-testid="password-input"]'),
      "Password Input"
    );
    
    const submitButton = new Button(
      page,
      page.locator('[data-testid="submit-btn"]'),
      "Submit Button"
    );
    
    await emailField.fill("user@example.com");
    await passwordField.fill("password123");
    await submitButton.click();
    
    expect(await page.url()).toContain("/dashboard");
  });
});
```

## License

ISC
