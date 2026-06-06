import { test, expect } from '@playwright/test';

test.describe("Home Page", () => {

    test.beforeEach(async ({page}) => {
        await page.goto("http://localhost:3000");
    });

    test("Should have a correct title", async ({ page }) => {
        await expect(page).toHaveTitle("FutureShop");
    });

    test("should see the navbar links", async ({ page }) => {
        const nav = page.getByRole("navigation");

        await expect(nav.getByRole("link", { name: "Home", exact: true })).toBeVisible();
        await expect(nav.getByRole("link", { name: "Shop", exact: true })).toBeVisible();
        await expect(nav.getByRole("link", { name: "Wishlist", exact: true })).toBeVisible();
        await expect(nav.getByRole("link", { name: "Account", exact: true })).toBeVisible();
    });

    test("should redirect to Shop page on click", async ({page}) => {
        const nav = page.getByRole("navigation");

        await nav.getByRole("link", { name: "Shop", exact: true }).click();
        await expect(page).toHaveURL(/\/products/);
    });

    test("should redirect to Wishlist page on click", async ({page}) => {
        const nav = page.getByRole("navigation");

        await nav.getByRole("link", { name: "Wishlist", exact: true }).click();
        await expect(page).toHaveURL(/\/wishlist/);
    });

    test("should redirect to Account page on click", async ({page}) => {
        const nav = page.getByRole("navigation");

        await nav.getByRole("link", { name: "Account", exact: true }).click();
        await expect(page).toHaveURL(/\/account/);
    });
});