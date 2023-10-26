import type { Page, Locator } from "playwright";

export class CheckoutPage {
  readonly page: Page;
  readonly gotocart: Locator;
  readonly updateQuantity: Locator;
  readonly deleteBtn: Locator;
  readonly removeBtn: Locator;
  readonly stockItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.gotocart = page.locator("span[class='cart-icon']");
    this.updateQuantity = page.locator("//div[@class='cart-item-right']//input");
    this.deleteBtn = page.locator("//div[@class='cart-item']//span[ contains (@class,'Delete')]");
    this.removeBtn = page.getByRole("button", { name: "REMOVE" });
    this.stockItem = page.locator("p[class='stock-tip ']");
  }

  async gotToCheckout() {
    await this.gotocart.click();
    await this.page.waitForLoadState();
  }

  async deleteProduct() {
    await this.deleteBtn.nth(0).click();
    await this.removeBtn.click();
  }

  async updateProductQuantity(quantity: string) {
    const stockItems = await this.stockItem.count();

    for (let stock = 0; stock < stockItems; stock++) {
      const stockItems = (await this.stockItem.nth(stock).textContent()) as string;
      let stockQuantity = Number(stockItems.match(/(\d+)/)?.at(0));

      if (stockQuantity >= Number(quantity)) {
        await this.updateQuantity.nth(stock).fill(quantity);
        break;
      } else {
        console.log("Out of stock");
      }
    }
  }
}
