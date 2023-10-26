import { FullConfig, chromium } from "@playwright/test";
import { LoginPage } from "./pages/login-page";

const phonenumber = process.env.PHONENUMBER ?? "";
const password = process.env.PASSWORD ?? "";

async function globalSetup(config: FullConfig): Promise<void> {
  const browser = await chromium.launch({ headless: true, slowMo: 2000 });
  const page = await browser.newPage();

  const loginPage = new LoginPage(page);

  await loginPage.gotToLogin();
  await loginPage.login(phonenumber, password);
  await page.pause();
  await page.context().storageState({
    path: "./loginAuth.json",
  });
  await browser.close();
}

export default globalSetup;
