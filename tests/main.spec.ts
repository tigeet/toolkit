import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4173");
});

test("can search", async ({ page }) => {
  await page.getByPlaceholder("Search").fill("free");
  await expect(page.getByText("freeCodeCamp")).toBeVisible();
});

test("pagination works", async ({ page }) => {
  await page.getByPlaceholder("Search").fill("free");
  await expect(page.getByText("freeCodeCamp")).toBeVisible();
  await page.getByRole("button", { name: "3" }).click();
  await expect(page.getByText("freecodecamp.cn")).toBeVisible();
});

test("empty search shows my repositories", async ({ page }) => {
  await expect(page.getByText("oop")).toBeVisible();
});

test("pagination works with empty search", async ({ page }) => {
  await expect(page.getByText("oop")).toBeVisible();
  await page.getByRole("button", { name: "3" }).click();
  await expect(page.getByText("contribute")).toBeVisible();
});

test("navigate to github works", async ({ page }) => {
  const newTabPromise = page.waitForEvent("popup");
  await page.getByTitle("View on github").nth(0).click();
  const newTab = await newTabPromise;
  await newTab.waitForLoadState();
  await expect(newTab).toHaveURL("https://github.com/tigeet/oop");
});

test("navigate to repository card works", async ({ page }) => {
  await page.getByText("oop").click();
  await page.waitForURL("http://localhost:4173/tigeet/oop");
});
