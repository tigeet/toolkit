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
