import { it, expect } from "vitest";
import React from "react";
import renderer from "react-test-renderer";
import Shtrudel from "../Shtrudel";

it("renders the default shtrudel", () => {
  const tree = renderer.create(<Shtrudel />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders with custom props", () => {
  const tree = renderer
    .create(
      <Shtrudel tone="positive" variant="solid" size="large" pulse symbol="#">
        Mention available
      </Shtrudel>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
