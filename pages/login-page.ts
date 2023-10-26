import type { Page, Locator } from "playwright";

export class LoginPage {
  readonly page: Page;
  readonly txtUsername: Locator;
  readonly txtPassword: Locator;
  readonly btnLogin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtUsername = page.getByPlaceholder("Please enter your Phone Number or Email");
    this.txtPassword = page.getByPlaceholder("Please enter your password");
    this.btnLogin = page.getByRole("button", { name: "Login" });
  }

  async login(email: string, password: string) {
    await this.txtUsername.fill(email);
    await this.txtPassword.fill(password);
    await this.btnLogin.click();
  }

  async gotToLogin() {
    await this.page.goto("https://member.daraz.pk/user/login");
  }
}
