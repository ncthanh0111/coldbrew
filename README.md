# ColdBrew - E2E Automation Framework

A comprehensive End-to-End test automation framework built with **Playwright** and **TypeScript** for testing web applications.

## Features

- ✅ **Cross-browser testing** (Chrome, Firefox, Safari, Mobile)
- ✅ **Modular Page Object Model** design
- ✅ **UI Testing** with comprehensive scenarios
- ✅ **API Testing** with integration tests
- ✅ **Allure Reporting** - Advanced analytics and visualization
- ✅ **Parallel test execution**
- ✅ **Retry mechanism** for flaky tests
- ✅ **Screenshot and video capture** on failure
- ✅ **Environment configuration** support

## Project Structure

```
coldbrew/
├── config/                 # Configuration files
│   ├── apiConfig.ts       # API configuration
│   ├── baseConfig.ts      # Base configuration
│   └── performanceConfig.ts # Performance configuration
├── helpers/               # Helper utilities
│   ├── apiHelper.ts       # API helper functions
│   └── performanceHelper.ts # Performance helper functions
├── pages/                 # Page Object Models
│   ├── base.page.ts       # Base page class
│   ├── login.page.ts      # Login page
│   ├── dashboard.page.ts  # Dashboard page
│   ├── adminSearch.page.ts # Admin search page
│   └── modules/           # Page modules
│       └── navigationBar.module.ts
├── tests/                 # Test files
│   ├── ui/               # UI tests
│   │   ├── login.spec.ts
│   │   └── search.spec.ts
│   ├── api/              # API tests
│   │   └── integration.spec.ts
│   └── performance/      # Performance tests (planned)
├── utils/                 # Utility functions
│   ├── apiUtils.ts       # API utilities
│   └── stringUtils.ts    # String utilities
├── playwright.config.ts   # Playwright configuration
├── allure.config.json    # Allure reporting configuration
└── package.json          # Project dependencies
```

## Installation

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn**

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coldbrew
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Verify installation**
   ```bash
   npx playwright --version
   ```

## Running Tests

### UI Tests

#### Run all UI tests
```bash
npm run test
```

#### Run tests on specific browsers
```bash
# Chrome (headed mode - with browser UI)
npm run test:ui:chrome

# Firefox (headed mode)
npm run test:ui:firefox

# Safari (headed mode)
npm run test:ui:safari

# Mobile Chrome (headed mode)
npm run test:ui:mobile

# Mobile Safari
npm run test:ui:ios
```

#### Run cross-browser tests
```bash
# All desktop browsers
npm run test:all-browsers

# All mobile browsers
npm run test:all-mobile
```

#### Run specific test files
```bash
# Run login tests only
npx playwright test tests/ui/login.spec.ts

# Run with specific browser
npx playwright test tests/ui/login.spec.ts --project=chromium
```

#### Run tests with specific options
```bash
# Run in headed mode (see browser)
npx playwright test --headed

# Run with video recording
npx playwright test --video=on

# Run with specific workers (parallel execution)
npx playwright test --workers=4
```

### API Tests

```bash
# Run all API tests
npx playwright test tests/api/

# Run specific API test file
npx playwright test tests/api/integration.spec.ts
```

## Test Reports

### Allure Reports

The framework uses Allure for advanced reporting with detailed analytics and visualizations.

#### Generate and view Allure report
```bash
# Generate Allure report
npm run report:allure:generate

# Open Allure report in browser
npm run report:allure:open

# Generate and open report in one command
npm run report:allure:export
```

## Test Writing Guide

### UI Test Structure

```typescript
// tests/ui/example.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { DashboardPage } from '../../pages/dashboard.page';

test.describe('Feature Name', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        
        // Setup test data
        await loginPage.navigateToLoginPage();
    });

    test('should perform specific action', async ({ page }) => {
        // Arrange
        const testData = { username: 'Admin', password: 'admin123' };
        
        // Act
        await loginPage.login(testData.username, testData.password);
        
        // Assert
        await expect(page).toHaveURL(/dashboard/);
        await expect(await dashboardPage.is_loaded()).toBeTruthy();
    });
});
```

### Page Object Structure

```typescript
// pages/example.page.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ExamplePage extends BasePage {
    private header: Locator;
    private submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.header = this.page.locator('h1');
        this.submitButton = this.page.locator('button[type="submit"]');
    }

    async is_loaded(): Promise<boolean> {
        return await this.isElementDisplayed(this.header);
    }

    async performAction(): Promise<void> {
        await this.submitButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
```

### API Test Structure

```typescript
// tests/api/example.spec.ts
import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
    test('should get user data', async ({ request }) => {
        // Arrange
        const baseURL = 'https://api.example.com';
        
        // Act
        const response = await request.get(`${baseURL}/users/1`);
        
        // Assert
        expect(response.status()).toBe(200);
        const userData = await response.json();
        expect(userData).toHaveProperty('id');
        expect(userData).toHaveProperty('name');
    });
});
```

## Test Types

- **UI Tests:** Automated browser-based end-to-end tests using Playwright and the Page Object Model
- **API Tests:** REST API endpoint testing, authentication, and integration tests
- **Performance Tests:** (Planned) Page load times, workflow durations, and API response time measurements

## Dependencies

- **@playwright/test**: Core testing framework
- **allure-playwright**: Advanced reporting
- **allure-commandline**: Allure report generation
- **@types/node**: TypeScript definitions

## Notes

- Performance test suite is planned for future development
- For any issues or feature requests, please open an issue on GitHub
- Make sure to run `npm run report:allure:export` after tests to view detailed reports

---

**Author:** Thanh Nguyen  
**Version:** 1.0.0  
