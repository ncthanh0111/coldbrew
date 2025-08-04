import {Page, BrowserContext, Locator, expect} from '@playwright/test';
import { BasePage } from './base.page';
import { NavigationBarModule } from './modules/navigationBar.module';

export class DashboardPage extends BasePage {

    // Modules
    public navigationBar: NavigationBarModule;

    //Dashboard elements
    public dashboardHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.dashboardHeader = this.page.locator('//header//span[.="Dashboard"]');
        this.navigationBar = new NavigationBarModule(page);
    }

    async is_loaded(): Promise<boolean> {
        return await this.isElementDisplayed(this.dashboardHeader);
    }
}