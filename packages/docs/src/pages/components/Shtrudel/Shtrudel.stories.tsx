import React from "react";
import { Shtrudel, type ShtrudelProps, type ShtrudelTone, type ShtrudelVariant, type ShtrudelSize } from "@vibe/core";
import { createStoryMetaSettingsDecorator } from "../../../utils/createStoryMetaSettingsDecorator";

const metaSettings = createStoryMetaSettingsDecorator({
  component: Shtrudel
});

const Template = (args: ShtrudelProps) => <Shtrudel {...args}>{args.children}</Shtrudel>;

const horizontalStackStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "var(--sb-spacing-medium)",
  alignItems: "center"
};

export default {
  title: "Components/Shtrudel",
  component: Shtrudel,
  argTypes: metaSettings.argTypes,
  decorators: metaSettings.decorators
};

export const Overview = {
  render: Template,
  name: "Overview",
  args: {
    children: "Mention the team"
  }
};

export const Tones = {
  render: () => {
    const tones: ShtrudelTone[] = ["primary", "positive", "negative", "warning", "neutral"];
    return (
      <div style={horizontalStackStyle}>
        {tones.map((tone) => (
          <Shtrudel key={tone} tone={tone}>
            {tone}
          </Shtrudel>
        ))}
      </div>
    );
  },
  name: "Tones"
};

export const Sizes = {
  render: () => {
    const sizes: ShtrudelSize[] = ["small", "medium", "large"];
    return (
      <div style={horizontalStackStyle}>
        {sizes.map((size) => (
          <Shtrudel key={size} size={size}>
            {size}
          </Shtrudel>
        ))}
      </div>
    );
  },
  name: "Sizes"
};

export const Variants = {
  render: () => {
    const variants: ShtrudelVariant[] = ["soft", "solid"];
    return (
      <div style={horizontalStackStyle}>
        {variants.map((variant) => (
          <Shtrudel key={variant} variant={variant}>
            {variant} variant
          </Shtrudel>
        ))}
      </div>
    );
  },
  name: "Variants"
};

export const Pulse = {
  render: Template,
  name: "Pulse",
  args: {
    children: "Someone mentioned you",
    pulse: true,
    tone: "positive"
  }
};
