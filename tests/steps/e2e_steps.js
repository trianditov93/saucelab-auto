const { chromium, expect } = require('@playwright/test');
const { Before, After, Given, When, And, Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(60 * 1000);

let browser;
let context;
let page;

Before(async () => {
  browser = await chromium.launch({ headless: false }); // Or true for headless mode
  context = await browser.newContext();
  page = await context.newPage();
});

Given('I access the login page', async function () {
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');
});

When('I input username and password', async function () {
  // Replace with actual code to input username and password
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secrt_sauce");
  await page.locator('[data-test="login-button"]').click();
});

When('i can see the products page', async function () {
  await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
});

When('I add items to the cart', async function () {
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
});
When('I remove an item from the cart', async function () {
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
});
When('I proceed to checkout', async function () {
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
  await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click();
  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('[data-test="cancel"]')).toBeVisible();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('sauce');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('demo');
  await page.locator('[data-test="postalCode"]').click(); 
  await page.locator('[data-test="postalCode"]').fill('223443');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="pony-express"]').click();
});
When('I log out from the application', async function () {
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#logout_sidebar_link').click();
});
Then('I should be logged out successfully', async function () {
  // Verify that the user is logged out, e.g., by checking the presence of the login button
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

After(async () => {
  await browser.close();
});