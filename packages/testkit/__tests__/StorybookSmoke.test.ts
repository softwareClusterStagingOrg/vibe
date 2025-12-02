import { expect, test } from "@playwright/test";
import { buttonStory } from "./utils/url-helper";

const frameLocator = "[id='storybook-preview-iframe']";
const buttonStoryId = "components-button--overview";

test.describe("Testkit - Storybook smoke tests", () => {
  test("loads Button story through the explorer search", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.locator("#storybook-explorer-searchfield");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("Button");

    const storyTreeItem = page.locator(`[data-item-id='${buttonStoryId}']`).first();
    await expect(storyTreeItem).toBeVisible();
    await storyTreeItem.click();

    const frame = page.frameLocator(frameLocator);
    await expect(frame.getByRole("button", { name: "Button" })).toBeVisible();
  });

  test("switches between Canvas and Docs tabs for Button story", async ({ page }) => {
    await page.goto(buttonStory);

    const docsTab = page.getByRole("tab", { name: "Docs" });
    const canvasTab = page.getByRole("tab", { name: "Canvas" });

    await docsTab.click();

    const frame = page.frameLocator(frameLocator);
    await expect(frame.getByRole("heading", { name: /button/i })).toBeVisible();

    await canvasTab.click();
    await expect(frame.getByRole("button", { name: "Button" })).toBeVisible();
  });
});
