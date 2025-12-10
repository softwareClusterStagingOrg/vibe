import type { HTMLAttributes, ReactNode } from "react";
import { type VibeComponentProps } from "../../types";

export type ShtrudelTone = "primary" | "positive" | "negative" | "warning" | "neutral";
export type ShtrudelSize = "small" | "medium" | "large";
export type ShtrudelVariant = "solid" | "soft";

type NativeSpanProps = Omit<HTMLAttributes<HTMLSpanElement>, "children">;

export interface ShtrudelProps extends NativeSpanProps, VibeComponentProps {
  /**
   * Determines the color palette used by the shtrudel.
   */
  tone?: ShtrudelTone;
  /**
   * Controls the visual size of the shtrudel container and symbol.
   */
  size?: ShtrudelSize;
  /**
   * Sets the background emphasis between a strong (solid) or subtle (soft) appearance.
   */
  variant?: ShtrudelVariant;
  /**
   * When true, adds a subtle pulse animation to draw attention.
   */
  pulse?: boolean;
  /**
   * Symbol rendered inside the circular badge. Defaults to the "@" character.
   */
  symbol?: ReactNode;
  /**
   * Optional textual content rendered after the symbol.
   */
  children?: ReactNode;
}
