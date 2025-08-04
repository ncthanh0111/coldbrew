import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { BaseConfig } from '../../config/baseConfig';
import { DashboardPage } from '../../pages/dashboard.page';
import { AdminSearchPage } from '../../pages/adminSearch.page';

test.describe('Search Functionality', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let adminSearchPage: AdminSearchPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(BaseConfig.ADMIN_USER.username, BaseConfig.ADMIN_USER.password);
        dashboardPage = new DashboardPage(page);
        await expect(dashboardPage.is_loaded()).toBeTruthy();
    });

    test('should successfully search for a user', async ({ page }) => {
        await dashboardPage.navigationBar.selectMenuItem('Admin');
        await dashboardPage.navigationBar.checkMenuItemSelected('Admin');
        adminSearchPage = new AdminSearchPage(page);
        await adminSearchPage.usernameInput.fill(BaseConfig.ADMIN_USER.username);
        await adminSearchPage.selectUserRole(BaseConfig.ADMIN_USER.userRole);
        await adminSearchPage.searchBtn.click();
        await expect(adminSearchPage.numberOfResults).toContainText('(1) Record Found');
        await adminSearchPage.checkResultOnRowByIndexAndColumn(1, 'Username', BaseConfig.ADMIN_USER.username);
        await adminSearchPage.checkResultOnRowByIndexAndColumn(1, 'User Role', BaseConfig.ADMIN_USER.userRole);
    });
}); 