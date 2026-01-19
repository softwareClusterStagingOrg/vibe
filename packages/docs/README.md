# @vibe/docs

> Storybook documentation site for Vibe Design System

The official documentation website for Vibe Design System, built with Storybook. This package contains all component documentation, examples, guidelines, and interactive playground experiences.

🌐 **Live Site:** [vibe.monday.com](https://vibe.monday.com)

## Overview

This package serves as the primary documentation hub for Vibe, providing:
- **Component Catalog** - Interactive component examples and API documentation
- **Design Guidelines** - Usage patterns, best practices, and design principles
- **Code Examples** - Live, editable code samples
- **Playground** - Interactive sandbox for testing components
- **Migration Guides** - Upgrade paths from previous versions
- **Accessibility Docs** - A11y requirements and testing guides

## Getting Started

### Prerequisites

- Node.js 18+ (see `.nvmrc` in root)
- Yarn package manager

### Installation

```bash
# From repository root
yarn install
```

### Running Storybook Locally

```bash
# From repository root
yarn storybook

# Or from this package directory
cd packages/docs
yarn storybook
```

The Storybook will be available at `http://localhost:6006`

## Project Structure

```
packages/docs/
├── .storybook/                 # Storybook configuration
│   ├── art.ts                 # Brand assets and tokens
│   ├── main.ts                # Main Storybook config
│   ├── manager.jsx            # Manager UI customization
│   ├── preview.tsx            # Preview configuration
│   ├── modes.ts               # Theme and viewport modes
│   ├── theme.js               # Custom Storybook theme
│   ├── preview-head.html      # Head tags for preview
│   ├── manager-head.html      # Head tags for manager
│   └── static/                # Static assets
│       ├── favicon.ico
│       └── logo.svg
├── src/                       # Documentation content
│   ├── components/            # Component stories
│   ├── guides/                # User guides
│   ├── foundations/           # Design foundations
│   ├── patterns/              # Design patterns
│   └── assets/                # Images and media
├── chromatic.config.json      # Visual testing config
├── package.json
├── tsconfig.json
└── vite.config.ts            # Vite configuration
```

## Writing Documentation

### Story Format

Stories are written in CSF (Component Story Format) with TypeScript:

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@vibe/core';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Click me',
    kind: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    kind: 'secondary',
  },
};
```

### MDX Documentation

For narrative documentation, use MDX format:

```mdx
<!-- Button.mdx -->
import { Meta, Canvas, Controls } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button

Buttons trigger actions and events.

## Usage

<Canvas of={ButtonStories.Primary} />

## Props

<Controls of={ButtonStories.Primary} />

## Best Practices

- Use clear, action-oriented labels
- Maintain consistent sizing across your UI
- Follow accessibility guidelines
```

## Storybook Configuration

### Main Configuration

**.storybook/main.ts** configures:
- Story file patterns
- Addons and plugins
- Builder settings (Vite)
- TypeScript support
- Static file serving

**Key Addons:**
- `@storybook/addon-essentials` - Core addons bundle
- `@storybook/addon-a11y` - Accessibility testing
- `@storybook/addon-interactions` - Interaction testing
- `@storybook/addon-links` - Cross-linking stories
- Custom Vibe addons

### Preview Configuration

**.storybook/preview.tsx** configures:
- Global decorators
- Theme switching
- Viewport sizes
- Background options
- Default args

**Example:**
```tsx
import type { Preview } from '@storybook/react';
import '@vibe/core/tokens';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1c1c1c' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
```

### Custom Theme

**.storybook/theme.js** customizes Storybook's UI to match Vibe branding:

```javascript
import { create } from '@storybook/theming';

export default create({
  base: 'light',
  brandTitle: 'Vibe Design System',
  brandUrl: 'https://vibe.monday.com',
  brandImage: '/logo.svg',
  
  colorPrimary: '#0073ea',
  colorSecondary: '#00ca72',
  
  // UI
  appBg: '#f6f7fb',
  appContentBg: '#ffffff',
  appBorderColor: '#d0d4e4',
  appBorderRadius: 8,
  
  // Typography
  fontBase: '"Figtree", sans-serif',
  fontCode: 'monospace',
  
  // Toolbar
  barBg: '#ffffff',
  barTextColor: '#676879',
  barSelectedColor: '#0073ea',
});
```

## Building for Production

### Build Command

```bash
# Build static Storybook
yarn build-storybook

# Output directory: storybook-static/
```

### Deployment

The docs are automatically deployed to GitHub Pages on push to master:

**Workflow:** `.github/workflows/publish-storybook.yml`

**Deployment URL:** https://vibe.monday.com

### Chromatic Integration

Visual regression testing is configured via Chromatic:

```bash
# Run Chromatic tests
yarn chromatic
```

**Configuration:** `chromatic.config.json`

## Features

### Interactive Playground

The playground allows users to experiment with components:

**Location:** `src/stories/Playground.stories.tsx`

**Features:**
- Live code editing
- Component composition
- Export functionality
- Share via URL

### Accessibility Testing

Built-in accessibility checks:
- WCAG compliance testing
- Contrast checking
- Keyboard navigation validation
- Screen reader compatibility

**Usage:**
1. Open any story
2. Click "Accessibility" tab
3. Review violations and passes

### Component Controls

Interactive props editing:
- Auto-generated from PropTypes/TypeScript
- Real-time preview updates
- Reset to defaults
- Copy as code snippet

### Documentation Blocks

Reusable documentation components from `@vibe/storybook-blocks`:
- `<Title>` - Component titles
- `<Description>` - Component descriptions
- `<Canvas>` - Story preview with code
- `<Controls>` - Props table
- `<RelatedComponents>` - Cross-references

## Contributing Documentation

### Documentation Checklist

When documenting a component:

- [ ] Create `.stories.tsx` file with examples
- [ ] Include `.mdx` file for narrative docs
- [ ] Add at least 5 story variants
- [ ] Document all props with descriptions
- [ ] Include accessibility guidelines
- [ ] Add usage examples and best practices
- [ ] Include related components links
- [ ] Test with screen readers
- [ ] Verify responsive behavior
- [ ] Add images/diagrams if helpful

### Story Organization

**File Structure:**
```
src/components/
├── Button/
│   ├── Button.stories.tsx      # Component stories
│   ├── Button.mdx              # Narrative docs
│   └── __assets__/             # Story-specific assets
│       └── example.png
```

**Naming Conventions:**
- Stories: `ComponentName.stories.tsx`
- Docs: `ComponentName.mdx`
- Story names: PascalCase (e.g., `PrimaryButton`)

### Best Practices

#### 1. Write Clear Story Names

```tsx
// ✅ Good - Descriptive
export const PrimaryWithIcon: Story = { ... };

// ❌ Avoid - Vague
export const Story1: Story = { ... };
```

#### 2. Provide Comprehensive Examples

```tsx
// Show different states
export const Default: Story = { ... };
export const Disabled: Story = { ... };
export const Loading: Story = { ... };
export const WithError: Story = { ... };
```

#### 3. Document Props Thoroughly

```tsx
const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    onClick: {
      description: 'Callback fired when button is clicked',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
  },
};
```

#### 4. Include Accessibility Notes

```mdx
## Accessibility

- Use semantic `<button>` elements
- Provide clear, action-oriented labels
- Ensure sufficient color contrast
- Support keyboard navigation (Enter/Space)
- Include focus indicators
```

## Advanced Features

### Theme Switching

Storybook supports light/dark theme switching:

```tsx
// In your story
export const ThemedButton: Story = {
  parameters: {
    theme: 'dark', // Override global theme
  },
};
```

### Viewport Testing

Test responsive designs:

```tsx
export const MobileButton: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
```

### Interaction Testing

Test user interactions:

```tsx
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const ClickableButton: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    await userEvent.click(button);
    await expect(button).toHaveClass('active');
  },
};
```

## Troubleshooting

### Common Issues

**Storybook won't start:**
- Clear cache: `yarn storybook --no-manager-cache`
- Delete `node_modules` and reinstall
- Check for port conflicts (6006)

**Stories not appearing:**
- Verify file naming: `*.stories.tsx`
- Check `main.ts` story patterns
- Ensure export default meta object

**TypeScript errors:**
- Run `yarn tsc --noEmit`
- Check `tsconfig.json` includes stories
- Verify component types are exported

**Build fails:**
- Check for console errors
- Verify all imports are valid
- Test build locally before pushing

## Performance Optimization

### Lazy Loading Stories

```tsx
// Use dynamic imports for heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

export const Heavy: Story = {
  render: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  ),
};
```

### Optimize Assets

- Compress images (use WebP when possible)
- Lazy load media in stories
- Minimize large code examples

## Scripts

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "chromatic": "chromatic --exit-zero-on-changes",
    "test-storybook": "test-storybook"
  }
}
```

## Related Packages

- [@vibe/core](../core/README.md) - Components being documented
- [@vibe/storybook-blocks](../storybook-blocks/README.md) - Documentation components
- [@vibe/icons](../icons/README.md) - Icons used in docs

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Component Story Format](https://storybook.js.org/docs/react/api/csf)
- [MDX Documentation](https://storybook.js.org/docs/react/writing-docs/mdx)
- [Chromatic](https://www.chromatic.com/)

## Contributing

We welcome documentation contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md).

For documentation-specific guidelines:
1. Follow the documentation checklist above
2. Test your stories locally
3. Ensure accessibility compliance
4. Get feedback from Vibe maintainers

## License

See the main [Vibe repository](../../README.md) for license information.
