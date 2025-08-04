import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['allure-playwright', { 
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: false,
      environmentInfo: {
        framework: 'Playwright',
        language: 'TypeScript',
        browser: 'Chrome, Firefox, Safari, Mobile',
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
      },
      categories: [
        {
          name: 'Failed tests',
          matchedStatuses: ['failed']
        },
        {
          name: 'Broken tests',
          matchedStatuses: ['broken']
        },
        {
          name: 'Ignored tests',
          matchedStatuses: ['skipped']
        }
      ]
    }],
    ['html', { 
      outputFolder: 'html-report',
      open: 'never'
    }],
    ['json', { 
      outputFile: 'results.json'
    }],
  ],
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  expect: {
    timeout: 30000, // 30 seconds for all expect assertions
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }
  ],
  outputDir: 'test-results/',
});
