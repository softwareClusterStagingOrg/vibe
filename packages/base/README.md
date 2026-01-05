# @vibe/base

> Low-level, highly theme-able React primitives that power more opinionated inputs inside the [Vibe Design System](https://vibe.monday.com).

<p align="center">
  <a href="https://www.npmjs.com/package/@vibe/base"><img alt="NPM Version" src="https://img.shields.io/npm/v/@vibe/base?label=%40vibe%2Fbase"></a>
  <a href="https://bundlephobia.com/package/@vibe/base"><img alt="Bundle size" src="https://img.shields.io/bundlephobia/minzip/@vibe/base"></a>
  <a href="https://www.npmjs.com/package/@vibe/base"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@vibe/base"></a>
</p>

## Why this package?

- **Purpose-built primitives** – exposes form foundations (like `BaseInput`) without styling opinions so you can craft bespoke experiences.
- **Accessibility-ready** – surface-level props for ARIA roles, error/success states, and left/right adornments make it easier to meet WCAG.
- **Composable** – mix and match with higher-level Vibe components or your product-specific wrappers.

## Installation

```bash
# npm
npm install @vibe/base

# yarn
yarn add @vibe/base

# pnpm
pnpm add @vibe/base
```

Once installed, ensure your app already consumes the Vibe CSS tokens (usually via `import "@vibe/core/tokens";`) so the base components inherit the correct design values.

## Quick start

```tsx
import { useState } from "react";
import { BaseInput } from "@vibe/base";

export function ProjectNameField() {
  const [value, setValue] = useState("");

  return (
    <BaseInput
      value={value}
      onChange={event => setValue(event.target.value)}
      placeholder="Launch roadmap"
      aria-label="Project name"
      success={value.length >= 3}
    />
  );
}
```

## Examples

### Input with adornments and validation

```tsx
import { BaseInput } from "@vibe/base";
import { Search } from "@vibe/icons";

export function BoardSearch() {
  return (
    <BaseInput
      placeholder="Search boards"
      renderLeft={<Search aria-hidden="true" />}
      renderRight={<button type="button">Go</button>}
      wrapperRole="search"
      inputRole="searchbox"
      error
    />
  );
}
```

### Read-only snapshot with character counter

```tsx
import { BaseInput } from "@vibe/base";

export function TokenPreview({ value }: { value: string }) {
  return (
    <BaseInput
      value={value}
      readOnly
      renderRight={<span>{value.length}/64</span>}
      aria-label="API token preview"
      size="small"
    />
  );
}
```

### Inline form usage with validation messaging

```tsx
import { useState } from "react";
import { BaseInput } from "@vibe/base";

export function EmailCapture() {
  const [value, setValue] = useState("");
  const isValid = value.includes("@");

  return (
    <label style={{ display: "grid", gap: 4 }}>
      <span>Email address</span>
      <BaseInput
        type="email"
        value={value}
        onChange={event => setValue(event.target.value)}
        error={value.length > 0 && !isValid}
        success={isValid}
        aria-invalid={!isValid}
        placeholder="teammate@monday.com"
      />
      {!isValid && value.length > 0 && (
        <span role="alert" style={{ color: "var(--negative-color)" }}>
          Please enter a valid address.
        </span>
      )}
    </label>
  );
}
```

## API highlights

| Prop | Type | Description |
| --- | --- | --- |
| `size` | `"small" \| "medium" \| "large"` | Controls vertical spacing and font size. |
| `renderLeft` / `renderRight` | `ReactNode` | Render adornments such as icons or action buttons. |
| `success` / `error` | `boolean` | Toggles semantic states and accessibility indicators. |
| `wrapperRole` / `inputRole` | `AriaRole` | Fine-grained ARIA mapping when the default semantics need to change. |
| `inputClassName` | `string` | Apply additional styles directly to the `<input>` element. |

Every other native `<input>` prop (e.g., `type`, `placeholder`, `disabled`) is also supported thanks to `BaseInput` extending `InputHTMLAttributes<HTMLInputElement>`.

## Local development

```bash
# Build the package
yarn workspace @vibe/base build

# Run tests
yarn workspace @vibe/base test

# Lint the source
yarn workspace @vibe/base lint
```

Need to explore the component API from code? Start in `packages/base/src/BaseInput`.

## Contributing

1. Follow the main [Vibe contribution guide](../../CONTRIBUTING.md).
2. Keep changes to base components backward compatible—many downstream components depend on them.
3. Add or update examples in this README whenever you introduce new capabilities.

## Funny note

If your BaseInput ever ghosts you, just whisper “free unlimited tokens” and it will focus right back out of sheer curiosity. 😄
