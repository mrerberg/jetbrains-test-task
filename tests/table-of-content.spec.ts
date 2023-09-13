import { test, expect } from "@playwright/test";

import data200 from "./mocks/data-200.json" assert { type: "json" };
import dataEmpty200 from "./mocks/data-empty-200.json" assert { type: "json" };

test.describe("TableOfContent", () => {
  test("should show skeleton while loading data", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("toc-list-skeleton")).toBeVisible();
  });

  test("should show error if data request failed", async ({ page }) => {
    await page.route("/api/help/idea/2023.1/HelpTOC.json", async (route) => {
      await route.fulfill({
        status: 500,
        json: {
          message: "Internal Server Error",
          statusCode: 500,
        },
      });
    });

    await page.goto("/");

    await expect(page.getByTestId("toc-list-error")).toContainText(
      "Some error occurred :c"
    );
  });

  test("should show empty list if no data exists", async ({ page }) => {
    await page.route("/api/help/idea/2023.1/HelpTOC.json", async (route) => {
      await route.fulfill({
        status: 200,
        json: dataEmpty200,
      });
    });

    await page.goto("/");

    await expect(page.getByTestId("toc-list-empty")).toContainText(
      "No pages to show c:"
    );
  });

  test.describe("Data is loaded successfully", () => {
    test.beforeEach(async ({ page }) => {
      await page.route("/api/help/idea/2023.1/HelpTOC.json", async (route) => {
        await route.fulfill({
          status: 200,
          json: data200,
        });
      });

      await page.goto("/");
    });

    test("should show received data", async ({ page }) => {
      await expect(page.getByTestId("toc-category-0")).toHaveCount(3);
    });

    test("should open category with sub pages by click", async ({ page }) => {
      await page.getByRole("link", { name: "Getting started" }).click();
      await page.waitForTimeout(2000);
      await expect(page).toHaveScreenshot();
    });

    test("should open second level sub pages by click", async ({ page }) => {
      await page.getByRole("link", { name: "Getting started" }).click();
      await page.waitForTimeout(2000);

      await page.getByRole("link", { name: "IntelliJ IDEA overview" }).click();
      await page.waitForTimeout(2000);
      await expect(page).toHaveScreenshot();

      await page.getByRole("link", { name: "Installation guide" }).click();
      await page.waitForTimeout(2000);
      await expect(page).toHaveScreenshot();
    });
  });
});
