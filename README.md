# Appiskey Assignment

## Project setup and execution

- `git clone` - git clone url
- `npm install` - packages install
- `npx playwright install` - it installs the playwright and browsers
- `npm run test` - it runs the tests in the headles or in ci
- `npm run test:ui` - it runs the tests in headed mode

## Project structure

    pages
        └── *.page.ts
    tests
        ├── *.spec.ts
    utils
        ├── pageFixture.ts
    playwright-report
        ├── contains html report and execution videos

    global-setup.ts
        ├── global setup file for application login and store the state

- `pages`

  - This directory contains all pages and page objects.

- `utils/pageFixture.ts`

  - This is a [fixture](https://playwright.dev/docs/test-fixtures) used to instantiate all of our page objects so they can be used across all of our tests, saving us the hassle of importing and instantiating them in every spec file.

- `tests`

  - This directory contains all the test spec files

- `playwright-report`

  - please find the test execution recordings and html report here

### Tests Execution and Global login setup

- I have created .env on the root directory, and please find the test user details in the email. Just add Test user details in .env and execute the test
- global setup will run once and generate the loginAuth.json file, which we use further for all tests
- Currently, I generate a session and store it in loginAuth.json. If it expires, please uncomment the code ` globalSetup: "./global-setup"` in the playwright—config file.
- Why did I turn off the login script? As this is prod env, Daraz will detect frequent login requests and block specific IPs and network

## Tests Result/Report

After running the tests, it generates the HTML test report for all the tests. This report tells you how each test went and a recording of the test execution.
