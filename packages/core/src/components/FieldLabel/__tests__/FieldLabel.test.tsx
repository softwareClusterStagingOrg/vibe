import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import FieldLabel from "../FieldLabel";

const iconRenderSpy = vi.fn();

vi.mock("@vibe/icon", () => ({
  Icon: ({ icon, className, id }: { icon: string; className?: string; id?: string }) => {
    iconRenderSpy({ icon, className, id });
    return <div data-testid="field-label-icon" data-icon={icon} className={className} id={id} />;
  }
}));

describe("FieldLabel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return null when labelText is not provided", () => {
    const { container } = render(<FieldLabel />);

    expect(container.firstChild).toBeNull();
    expect(iconRenderSpy).not.toHaveBeenCalled();
  });

  it("should render wrapper, icon and label when labelText is provided", () => {
    render(
      <FieldLabel
        labelText="Full name"
        icon="Person"
        labelFor="name-input"
        className="custom-wrapper"
        labelClassName="custom-label"
        iconClassName="custom-icon"
        required
      />
    );

    const wrapper = screen.getByText("Full name").closest("section");
    expect(wrapper).toHaveClass("labelComponentWrapper", "custom-wrapper");

    const icon = screen.getByTestId("field-label-icon");
    expect(icon).toHaveAttribute("data-icon", "Person");
    expect(icon).toHaveClass("labelComponentIcon", "custom-icon");
    expect(icon).toHaveAttribute("id", "name-input");

    const label = screen.getByText("Full name");
    expect(label).toHaveAttribute("for", "name-input");
    expect(label).toHaveClass("labelComponentText", "custom-label");

    const requiredMark = label?.querySelector("span");
    expect(requiredMark).toHaveClass("required");
    expect(requiredMark).toHaveTextContent("*");
  });

  it("should fall back to htmlFor when labelFor is not provided", () => {
    render(<FieldLabel labelText="Email" htmlFor="email-input" />);

    const label = screen.getByText("Email").closest("label");
    expect(label).toHaveAttribute("for", "email-input");
  });
});
