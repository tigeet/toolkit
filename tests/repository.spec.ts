import test, { expect } from "@playwright/test";

test("displays repository info", async ({ page }) => {
  await page.goto("http://localhost:4173/freeCodeCamp/freeCodeCamp");

  await expect(page.getByTestId("repositoryPage__name")).toHaveText(
    "freeCodeCamp"
  );

  await expect(page.getByTestId("repositoryPage__login")).toHaveText(
    "freeCodeCamp"
  );

  await expect(page.getByTestId("repositoryPage__description")).toHaveText(
    "freeCodeCamp.org's open-source codebase and curriculum. Learn to code for free."
  );
});

test("show error message if repository does not exist", async ({ page }) => {
  await page.goto("http://localhost:4173/tigeet/123456789");
  await expect(page.getByAltText("sad emoji")).toBeVisible();
  await expect(
    page.getByText(
      "Could not resolve to a Repository with the name 'tigeet/123456789'."
    )
  ).toBeVisible();
});
