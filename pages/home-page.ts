import type { Page, Locator } from "playwright";

export class HomePage {
  readonly page: Page;
  readonly txtSearch: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtSearch = page.locator("//input[@name='q']");
  }

  async searchProduct(searchText: string) {
    await this.txtSearch.fill(searchText);
    await this.txtSearch.press("Enter");
    await this.page.waitForLoadState();
  }
}
