import { test as base } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { ProductDetails } from "../pages/product-details-page";
import { ProductCatalog } from "../pages/product-catalog-page";
import { CheckoutPage } from "../pages/checkout-page";

export type PageObjects = {
  homePage: HomePage;
  productDetails: ProductDetails;
  productCatalog: ProductCatalog;
  checkout: CheckoutPage;
};

export const test = base.extend<PageObjects>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  productDetails: async ({ page }, use) => {
    const productDetails = new ProductDetails(page);
    await use(productDetails);
  },

  productCatalog: async ({ page }, use) => {
    const productCatalog = new ProductCatalog(page);
    await use(productCatalog);
  },

  checkout: async ({ page }, use) => {
    const checkout = new CheckoutPage(page);
    await use(checkout);
  },
});

export { expect, Page, Locator, Response } from "@playwright/test";
