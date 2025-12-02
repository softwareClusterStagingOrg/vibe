import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Switch from "../Switch";
import { type MockToggleProps } from "../../Toggle/MockToggle";
import { ComponentVibeId } from "../../../tests/constants";

const TestToggle = ({ checked, disabled }: MockToggleProps) => (
  <div data-testid="mock-toggle">
    {disabled ? "disabled" : "enabled"}-{String(!!checked)}
  </div>
);

describe("Switch", () => {
  it("should render hidden checkbox input with provided attributes", () => {
    render(
      <Switch
        id="switch-id"
        name="notifications"
        value="enabled"
        ariaLabel="Enable notifications"
        ariaLabelledBy="label-id"
        ariaControls="controls-id"
        inputClassName="custom-input"
        wrapperClassName="custom-wrapper"
        role="checkbox"
        data-testid="switch-input"
      >
        <TestToggle disabled={false} />
      </Switch>
    );

    const input = screen.getByTestId("switch-input");
    expect(input).toHaveAttribute("id", "switch-id");
    expect(input).toHaveAttribute("name", "notifications");
    expect(input).toHaveAttribute("value", "enabled");
    expect(input).toHaveAttribute("aria-label", "Enable notifications");
    expect(input).toHaveAttribute("aria-labelledby", "label-id");
    expect(input).toHaveAttribute("aria-controls", "controls-id");
    expect(input).toHaveAttribute("role", "checkbox");
    expect(input).toHaveClass("hidden-switch", "custom-input");

    const wrapper = input.closest("label");
    expect(wrapper).toHaveAttribute("for", "switch-id");
    expect(wrapper).toHaveAttribute("data-vibe", ComponentVibeId.TOGGLE);
    expect(wrapper).toHaveClass("custom-wrapper");
  });

  it("should toggle unchecked state when uncontrolled and notify child + onChange", async () => {
    const onChange = vi.fn();
    render(
      <Switch id="switch" defaultChecked onChange={onChange}>
        <TestToggle disabled={false} />
      </Switch>
    );

    const input = screen.getByRole("switch");
    expect(input).toBeChecked();
    expect(screen.getByTestId("mock-toggle")).toHaveTextContent("enabled-true");

    fireEvent.click(input);

    await waitFor(() => {
      expect(input).not.toBeChecked();
      expect(input).toHaveAttribute("aria-checked", "false");
      expect(screen.getByTestId("mock-toggle")).toHaveTextContent("enabled-false");
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe(false);
  });

  it("should not toggle or call onChange when disabled", () => {
    const onChange = vi.fn();
    render(
      <Switch id="switch" defaultChecked disabled onChange={onChange}>
        <TestToggle disabled />
      </Switch>
    );

    const input = screen.getByRole("switch");
    expect(input).toBeDisabled();

    fireEvent.click(input);

    expect(onChange).not.toHaveBeenCalled();
    expect(input).toBeChecked();
    expect(screen.getByTestId("mock-toggle")).toHaveTextContent("disabled-true");
  });
});
