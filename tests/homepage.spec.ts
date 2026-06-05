import { test, expect } from '@playwright/test';

test.describe("Home Page", () => {

    // beforeEach runs BEFORE every single test below.
    // This means every test automatically starts on the home page.
    // We don't need to repeat page.goto() inside each test.
    test.beforeEach(async ({page}) =>{
        await page.goto("http://localhost:3000");
    })

    // Check that the browser tab title says "FutureShop"
    test("Should have a correct title", async ({ page }) => {
        await expect(page).toHaveTitle("FutureShop");
    });

    // Navbar tests
    // This test checks that all 4 nav links are actually visible on the screen.
    // If any link is missing or hidden, this test will fail.
    test("should see the navbar links", async ({ page }) => {
        await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Shop" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Wishlist" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Account" })).toBeVisible();
    });

    // Click the "Shop" link and check that the URL now contains "/products"
    // /\/products/ is a REGEX pattern. The two outer / / mark it as a regex.
    // The \/ inside is just an escaped forward slash (meaning it looks for /products in the URL).
    // Using regex means we don't need to write the full "http://localhost:3000/products" — 
    // it just checks if the URL CONTAINS "/products" anywhere.
    test("should redirect to Shop page on click", async ({page})=>{
        await page.getByRole("link", { name: "Shop"}).click();
        await expect(page).toHaveURL(/\/products/);
    });

    // Click the "Wishlist" link and check the URL now contains "/wishlist"
    test("should redirect to Wishlist page on click", async ({page})=>{
        await page.getByRole("link", { name: "Wishlist"}).click();
        await expect(page).toHaveURL(/\/wishlist/);
    });

    // Click the "Account" link and check the URL now contains "/account"
    test("should redirect to Account page on click", async ({page})=>{
        await page.getByRole("link", { name: "Account"}).click();
        await expect(page).toHaveURL(/\/account/);
    });
});