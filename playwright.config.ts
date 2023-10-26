import { defineConfig, devices } from "@playwright/test";
require("dotenv").config();

export default defineConfig({
  //globalSetup: "./global-setup",
  timeout: 280000,
  testDir: "./tests",
  fullyParallel: false,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    launchOptions: {
      slowMo: 2000,
    },
    trace: "on-first-retry",
    storageState: "./loginAuth.json",
    baseURL: "https://daraz.pk",
    video: "on",
  },
  projects: [
    {
      name: "Mobile Chrome",
      use: { ...devices["iPad Air"] },
    },
  ],
});
