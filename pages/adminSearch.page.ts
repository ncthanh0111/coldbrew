import {Page, Locator, expect} from '@playwright/test';
import { BasePage } from './base.page';

export class AdminSearchPage extends BasePage {

    //Admin Search elements
    public adminSearchHeader: Locator;
    public searchBtn: Locator;
    public usernameInput: Locator;
    public userRoleDropdown: Locator;
    public userRoleOptions: Locator;
    public numberOfResults: Locator;

    constructor(page: Page) {
        super(page);
        this.adminSearchHeader = this.page.locator('//header//h6[.="Admin"]');
        this.searchBtn = this.page.locator('//button[contains(., "Search")]');
        this.usernameInput = this.page.locator('//div[.="Username"]/following-sibling::div/input');
        this.userRoleDropdown = this.page.locator('//div[.="User Role"]/following-sibling::div');
        this.userRoleOptions = this.page.locator('div[class*="oxd-select-option"]');
        this.numberOfResults = this.page.locator('//div[@role="table"]/../preceding-sibling::div//span');
    }

    async is_loaded(): Promise<boolean> {
        return await this.isElementDisplayed(this.adminSearchHeader);
    }

    async selectUserRole(userRole: string) {
        await this.userRoleDropdown.click();
        await this.userRoleOptions.filter({hasText: userRole}).click();
    }
    
    async checkResultOnRowByIndexAndColumn(index: number, column: string, expectedResult: string) {
        // Get the cell value from the table by index (1-based) and column name (Username, User Role, Employee Name, Status)
        await expect(await this.page.locator('//div[@class="oxd-table-body"]//div[@role="row"][' + index + ']//div[@role="cell"][count(//div[@role="columnheader"][contains(., "' + column + '")]//preceding-sibling::div) + 1]')).toHaveText(expectedResult);
    }
}