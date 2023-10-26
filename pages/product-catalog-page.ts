import type { Page, Locator } from "playwright";

export class ProductCatalog {
  readonly page: Page;
  readonly countProduct: Locator;
  readonly productPrice: Locator;
  readonly clickPrdct: Locator;
  readonly delivery: Locator;

  constructor(page: Page) {
    this.page = page;
    this.countProduct = page.locator("div[data-qa-locator='product-item']");
    this.productPrice = page.locator("//div[@data-qa-locator='product-item']//span[ contains (@class,'currency')]");
    this.clickPrdct = page.locator("div[data-qa-locator='product-item']");
    this.delivery = page.locator("//div[@data-qa-locator='product-item']//span[ contains (@class,'location')]");
  }

  async getProductCount() {
    return await this.countProduct.count();
  }

  async getProductPrice(indx: number) {
    const price = await this.productPrice.nth(indx).textContent();
    return Number(price!.replace(/Rs\. /g, "").split(",").join(""));
  }

  async clickProduct(indx: number) {
    await this.clickPrdct.nth(indx).click();
    await this.page.waitForLoadState();
  }

  async deliveryFee(indx: number) {
    return (await this.delivery.nth(indx).textContent()) as string;
  }
}
