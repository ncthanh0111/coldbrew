# E2E Automation Framework

A comprehensive End-to-End test automation framework built with **Playwright** and **TypeScript** for testing the OrangeHRM demo application.

## 🚀 Features

- ✅ **Cross-browser testing** (Chrome, Firefox, Safari, Mobile)
- ✅ **Modular Page Object Model** design
- ✅ **UI Testing** with comprehensive scenarios
- ✅ **API Testing** (TBD - Coming Soon)
- ✅ **Performance Testing** (TBD - Coming Soon)
- ✅ **Allure Reporting** - Advanced analytics and visualization
- ✅ **CI/CD Integration** ready
- ✅ **Parallel test execution**
- ✅ **Retry mechanism** for flaky tests
- ✅ **Screenshot and video capture** on failure
- ✅ **Environment configuration** support

## 📁 Project Structure

## ��️ Installation

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn**

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd automation-framework
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

## �� Running Tests

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

# Run search tests only
npx playwright test tests/ui/search.spec.ts

# Run with specific browser
npx playwright test tests/ui/login.spec.ts --project=chromium
```

#### Run tests with specific options
```bash
# Run in headed mode (see browser)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Run with video recording
npx playwright test --video=on

# Run with specific timeout
npx playwright test --timeout=60000

# Run with specific workers (parallel execution)
npx playwright test --workers=4
```

### API Tests (TBD - Coming Soon)

```bash
# Run all API tests
npm run test:api

# Run specific API test categories
npm run test:api:auth
npm run test:api:users
npm run test:api:employees
```

### Performance Tests (TBD - Coming Soon)

```bash
# Run all performance tests
npm run test:performance

# Run specific performance test categories
npm run test:performance:load
npm run test:performance:workflow
npm run test:performance:loadtest
```

## 📊 Test Reports

### View HTML Report
```bash
npx playwright show-report
```

### Generate Reports
```bash
# Generate HTML report
npx playwright test --reporter=html

# Generate JSON report
npx playwright test --reporter=json

# Generate JUnit report
npx playwright test --reporter=junit
```

## �� Configuration

### Environment Configuration

Create `.env` file in the root directory:

```env
# Server Configuration
SERVER_URL=https://opensource-demo.orangehrmlive.com
BASE_URL=https://opensource-demo.orangehrmlive.com/web

# User Credentials
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=admin123

# Browser Configuration
HEADLESS=false
SLOW_MO=1000

# Test Configuration
PARALLEL_EXECUTION=true
WORKERS=4
RETRY_COUNT=2
```

### Browser Configuration

Update `playwright.config.ts` to modify browser settings:

```typescript
projects: [
  {
    name: 'chromium',
    use: { 
      ...devices['Desktop Chrome'],
      viewport: { width: 1920, height: 1080 }
    },
  },
  // Add more browser configurations
]
```

## �� Test Writing Guide

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

## 🚀 CI/CD Integration

### GitHub Actions

The project includes GitHub Actions workflow for automated testing:

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
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test --project=${{ matrix.browser }}
```

## 🧪 Test Types

- **UI Tests:** Automated browser-based end-to-end tests using Playwright and the Page Object Model.
- **API Tests:** (TBD) Will cover REST API endpoints, authentication, CRUD, and error handling.
- **Performance Tests:** (TBD) Will measure page load times, workflow durations, and API response times.

---

## 📝 Contribution

1. Fork the repository
2. Create a feature branch
3. Make your changes and add/modify tests
4. Submit a pull request

---

## 📚 Further Reading

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Test API](https://playwright.dev/docs/test-api-testing)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Playwright Reporters](https://playwright.dev/docs/test-reporters)
- [Playwright CI Integration](https://playwright.dev/docs/ci)

---

## 📢 Notes

- **API and Performance test suites are under development (TBD).**
- For any issues or feature requests, please open an issue on GitHub.
