# Playwright Automation Framework

## Overview

This repository contains the automated testing framework built using Playwright and TypeScript for Natwest Home page. The framework follows the Page Object Model (POM) design pattern and supports environment-based execution through `.env` configuration files.

The framework is designed to provide:

* Maintainable and scalable test automation
* Environment-specific execution
* Reusable page objects and utilities
* Stable automation using dedicated automation attributes
* Accessibility validation support
* HTML content validation support

---

## Tech Stack

* Playwright
* TypeScript
* Node.js
* dotenv
* wcag-contrast
* cheerio

---

## Project Structure

```text
project-root/
│
├── .env.prod
│
├── archived-reports
│   └── Previous reports
│
├── constants/
│   └── Application constants
│
├── pages/
│   └── Page Object Model (POM) classes
│
├── tests/
│   ├── Actual tests (spec.ts)
│
├── utils/
│   └── Utility and helper functions
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Prerequisites

Ensure the following are installed:

* Node.js (v18 or later recommended)
* npm

Verify installation:

```bash
node -v
npm -v
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/jessalmanidhar/natwest-demo.git
```

### Install Dependencies

```bash
npm install
```

### Install Playwright Browsers

```bash
npx playwright install
```

---

## Key Dependencies

| Package          | Purpose                           |
| ---------------- | --------------------------------- |
| @playwright/test | Test execution framework          |
| dotenv           | Environment variable management   |
| wcag-contrast    | Accessibility contrast validation |
| cheerio          | HTML parsing and DOM analysis     |

---

## Environment Configuration

Environment-specific values are maintained using `.env` files.

### Example: `.env.prod`

```env
BASE_URL=https://www.natwestgroup.com
```

The framework uses the `dotenv` package to load environment variables during execution.

---

## Running Tests

### Execute All Tests

```bash
npm run test:prod
```

### Execute a Specific Test File

```bash
npx playwright test tests/homePageValidation.spec.ts
```

### Execute Tests in Headed Mode

```bash
npx playwright test --headed
```

### Execute Tests in Chromium

```bash
npx playwright test --project=chromium
```

### Execute Tests Matching a Tag or Name

```bash
npx playwright test -g "Validate the Title of the Home Page"
```

---

## Available Scripts

Example package.json scripts:

```json
{
  "scripts": {
    "test:prod": "cross-env ENV=prod playwright test"
  }
}
```

Run:

```bash
npm run test:prod
```

---

## Reporting

Playwright automatically generates an HTML report after execution.

Open the report:

```bash
npx playwright show-report
```

---

## Framework Design Principles

### Page Object Model (POM)

* Page locators and actions are maintained within page classes.
* Test files focus on validation and business logic.
* Improves maintainability and reusability.

### Environment-Based Execution

* Environment-specific configuration is maintained in `.env` files.
* URLs and environment settings are not hardcoded in tests.

### Stable Automation

The framework follows the use of dedicated automation identifiers wherever available to minimize locator flakiness and improve test stability.

Example:

```html
<button automation-id="login-button">
    Login
</button>
```

Using dedicated automation identifiers reduces failures caused by UI text, styling, or structural changes.

### Accessibility Validation

The framework supports accessibility checks using `wcag-contrast` to validate color contrast compliance with WCAG standards.

### HTML Content Validation

The framework uses `cheerio` for parsing and validating HTML content when required.

---

## Best Practices

* Keep locators inside Page Objects.
* Avoid hardcoded URLs in tests.
* Reuse common functionality through utility classes.
* Separate test data from application constants.
* Use meaningful test names and assertions.
* Prefer automation identifiers over XPath whenever possible.
* Keep tests independent and executable in any order.

---

## Troubleshooting

### Reinstall Playwright Browsers

```bash
npx playwright install
```

### Reinstall Node Modules

```bash
rm -rf node_modules package-lock.json
npm install
```

### Verify Environment Variables

Add a temporary log statement:

```ts
console.log(process.env.BASE_URL);
```

Run the test and verify the expected value is loaded.

---

## Maintainers

Jessal Manidhar
