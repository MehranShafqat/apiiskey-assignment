import type { Page, Locator } from "playwright";

export class ProductDetails {
  readonly page: Page;
  readonly cartBtn: Locator;
  readonly prdctDetails: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBtn = page.getByRole("button", { name: "Add to Cart" });
    this.prdctDetails = page.locator("div[data-spm='product_detail']");
  }

  async addToCart() {
    await this.cartBtn.click();
    await this.page.waitForLoadState();
    await this.page.waitForSelector("#dialog-body-1");
  }

  async getProductDetails() {
    return (await this.prdctDetails.textContent()) as string;
  }
}
