import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SlideTransition from "../SlideTransition";
import { slideAnimationTransition, slideAnimationVariants } from "../utils/animationVariants";

const motionDivSpy = vi.fn();

vi.mock("framer-motion", () => ({
  motion: {
    div: (props: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
      motionDivSpy(props);
      const { children, className, style } = props;
      return (
        <div data-testid="slide-transition" className={className} style={style}>
          {children}
        </div>
      );
    }
  }
}));

describe("SlideTransition", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should pass animation configuration to motion.div", () => {
    render(
      <SlideTransition direction="forward" className="custom-class">
        <div>Content</div>
      </SlideTransition>
    );

    const motionProps = motionDivSpy.mock.calls[0][0];
    expect(motionProps.custom).toBe("forward");
    expect(motionProps.initial).toBe("initial");
    expect(motionProps.animate).toBe("enter");
    expect(motionProps.variants).toBe(slideAnimationVariants);
    expect(motionProps.transition).toBe(slideAnimationTransition);
  });

  it("should render children with combined class names and style", () => {
    render(
      <SlideTransition direction="backward" className="custom-class" style={{ opacity: 0.5 }}>
        <span>Slide Content</span>
      </SlideTransition>
    );

    const wrapper = screen.getByTestId("slide-transition");
    const motionProps = motionDivSpy.mock.calls[0][0];
    expect(motionProps.className).toContain("slide");
    expect(motionProps.className).toContain("custom-class");
    expect(motionProps.style).toEqual({ opacity: 0.5 });
    expect(wrapper).toHaveTextContent("Slide Content");
  });
});
