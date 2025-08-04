import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";

export class NavigationBarModule extends BasePage {
    // Common navigation bar elements
    public navigationMenuItems: Locator;

    constructor(page: Page) {
        super(page);
        this.navigationMenuItems = this.page.locator('a[class*="oxd-main-menu-item"]');
    }

    async selectMenuItem(menuItem: string) {
        await this.navigationMenuItems.filter({hasText: menuItem}).click();
    }

    async checkMenuItemSelected(menuItem: string) {
        await expect(this.navigationMenuItems.filter({hasText: menuItem})).toContainClass('active');
    }
}