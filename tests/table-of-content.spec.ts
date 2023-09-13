import { test, expect } from "@playwright/test";

import data200 from "./mocks/data-200.json" assert { type: "json" };
import dataEmpty200 from "./mocks/data-empty-200.json" assert { type: "json" };

test.describe("TableOfContent", () => {
  test("When data is loading, Then should show skeleton", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("toc-list-skeleton")).toBeVisible();
  });

  test("When data request failed, Then should show error", async ({ page }) => {
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

  test("When request data is empty, Then should show empty list", async ({
    page,
  }) => {
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

  test.describe("Given: data is loaded successfully", () => {
    test.beforeEach(async ({ page }) => {
      await page.route("/api/help/idea/2023.1/HelpTOC.json", async (route) => {
        await route.fulfill({
          status: 200,
          json: data200,
        });
      });

      await page.goto("/");
    });

    test("should show received data in sequence order", async ({ page }) => {
      await expect(page.getByTestId("toc-category-0")).toHaveCount(3);
    });

    test("When category was clicked, Then should open category with sub pages", async ({
      page,
    }) => {
      await page.getByRole("link", { name: "Getting started" }).click();
      await page.waitForTimeout(2000);
      await expect(page).toHaveScreenshot();
    });

    test("When sub page of nested level is clicked, Then should open relevant sub pages list", async ({
      page,
    }) => {
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
