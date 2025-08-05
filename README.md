# ColdBrew - E2E Automation Framework

A comprehensive End-to-End test automation framework built with **Playwright** and **TypeScript** for testing web applications with advanced API testing capabilities.

## Features

- **Cross-browser testing** (Chrome, Firefox, Safari, Mobile)
- **Modular Page Object Model** design
- **UI Testing** with comprehensive scenarios
- **API Testing** with integration tests and models
- **Performance Testing** (TBD comming soon)
- **Allure Reporting** - Advanced analytics and visualization
- **GitHub Actions** - Automated CI/CD pipeline with matrix builds across browsers
- **ESLint** code quality enforcement

## Project Structure

```
coldbrew/
├── config/                    # Configuration files
│   ├── apiConfig.ts          # API configuration
│   ├── baseConfig.ts         # Base configuration
│   └── performanceConfig.ts  # Performance configuration
├── helpers/                  # Helper utilities
│   ├── api/                  # API helpers
│   │   ├── apiHelper.ts      # Main API helper
│   │   └── userHelper.ts     # User-specific API helper
│   └── performance/          # Performance helpers
├── models/                   # API Data Models
│   ├── user.model.ts         # User model
│   ├── employee.model.ts     # Employee model
│   └── userRole.model.ts     # User role model
├── pages/                    # Page Object Models
│   ├── base.page.ts          # Base page class
│   ├── login.page.ts         # Login page
│   ├── dashboard.page.ts     # Dashboard page
│   ├── adminSearch.page.ts   # Admin search page
│   └── modules/              # Page modules
│       └── navigationBar.module.ts
├── tests/                    # Test files
│   ├── ui/                   # UI tests
│   │   ├── login.spec.ts
│   │   └── search.spec.ts
│   ├── api/                  # API tests
│   │   └── integration.spec.ts
│   └── performance/          # Performance tests (planned)
├── utils/                    # Utility functions
│   ├── apiUtils.ts           # API utilities
│   └── stringUtils.ts        # String utilities
├── playwright.config.ts      # Playwright configuration
├── allure.config.json        # Allure reporting configuration
├── eslint.config.js          # ESLint configuration
└── package.json              # Project dependencies
```

## Installation

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** (Node Package Manager)

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
```

#### Run cross-browser tests
```bash
# All desktop browsers
npm run test:ui:all-browsers

# All mobile browsers (Comming soon)
npm run test:ui:all-mobile
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

Allure is a **flexible, lightweight multi-language test reporting tool** that provides detailed insights into test execution and helps teams understand what went wrong during test runs.

#### Generate and view Allure report
```bash
# Generate Allure report
npm run report:allure:generate

# Open Allure report in browser
npm run report:allure:open

# Generate and open report in one command
npm run report:allure:export
```

### HTML Reports

```bash
# View HTML report
npx playwright show-report
```

### Generate Additional Reports
```bash
# Generate JSON report
npx playwright test --reporter=json
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
import { ApiHelper } from '../../helpers/api/apiHelper';
import { User } from '../../models/user.model';

test.describe('API Tests', () => {
    let apiHelper: ApiHelper;

    test.beforeEach(async ({ request }) => {
        apiHelper = new ApiHelper();
        await apiHelper.initialize();
    });

    test('should get user data', async ({ request }) => {
        // Login first
        await apiHelper.login('Admin', 'admin123');
        
        // Get users
        const users = await apiHelper.userApi.getUsers();
        
        // Assert
        expect(users.data).toBeDefined();
        expect(Array.isArray(users.data)).toBe(true);
    });
});
```

## CI/CD Integration (GitHub Actions Workflow)

GitHub Actions is a **continuous integration and continuous deployment (CI/CD)** platform that allows you to automate your build, test, and deployment pipeline directly in your GitHub repository.

#### **Easy Configuration**
Create `.github/workflows/test.yml` for automated testing:

```yaml
# .github/workflows/test.yml
name: E2E Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    
    steps:
    - uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test --project=${{ matrix.browser }}
    - name: Generate Allure report
      run: npm run report:allure:generate
    - name: Upload test results
      uses: actions/upload-artifact@v4
      if: always()
      with:
        name: test-results
        path: |
          test-results/
          allure-results/
          allure-report/
```

## Test Types

- **UI Tests:** Automated browser-based end-to-end tests using Playwright and the Page Object Model
- **API Tests:** REST API endpoint testing with models, authentication, and integration tests
- **Performance Tests:** (Planned) Page load times, workflow durations, and API response time measurements

## Dependencies

- **@playwright/test**: Core testing framework
- **allure-playwright**: Advanced reporting
- **allure-commandline**: Allure report generation
- **@types/node**: TypeScript definitions
- **eslint**: Code quality enforcement
- **@typescript-eslint/eslint-plugin**: TypeScript ESLint plugin
- **@typescript-eslint/parser**: TypeScript ESLint parser

## Code Quality

### ESLint Configuration

The project uses ESLint for code quality enforcement:

```bash
# Run ESLint
npm run lint

# Run ESLint with auto-fix
npx eslint . --ext .ts --fix
```

### TypeScript Models

The framework includes TypeScript models for API data structures:

```typescript
// models/user.model.ts
export interface User {
    id: number;
    userName: string;
    deleted: boolean;
    status: boolean;
    employee: Employee;
    userRole: UserRole;
}
```

## Notes

- Performance test suite is planned for future development
- For any issues or feature requests, please open an issue on GitHub
- Make sure to run `npm run report:allure:export` after tests to view detailed reports
- Run `npm run lint` before committing to ensure code quality

---

**Author:** Thanh Nguyen  
**Version:** 1.0.0
