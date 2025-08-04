import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { BaseConfig } from '../../config/baseConfig';
import { DashboardPage } from '../../pages/dashboard.page';

test.describe('Login Functionality', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('should successfully login with valid credentials', async ({ page }) => {
        const { username, password } = BaseConfig.ADMIN_USER;
        
        await loginPage.login(username, password);
        dashboardPage = new DashboardPage(page);
        await expect(dashboardPage.is_loaded()).toBeTruthy();
        await dashboardPage.navigationBar.checkMenuItemSelected('Dashboard');
    });
}); 