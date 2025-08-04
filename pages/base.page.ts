import { Locator, Page, expect } from '@playwright/test';

export class BasePage {
    protected page: Page;
    readonly ELEMENT_DISPLAY_TIMEOUT = 30000;
    protected PAGE_URL: string;

    constructor(page: Page) {
        this.page = page;
    }

    async is_loaded(): Promise<boolean> {
        console.warn('Class has not implemented is_loaded method');
        return true;
    }

    async waitForElementVisible(elementIdentifier, timeout=this.ELEMENT_DISPLAY_TIMEOUT): Promise<void> {
        if (elementIdentifier instanceof String) {
            await this.page.waitForSelector(elementIdentifier.toString(), {state: "visible", timeout: timeout});
        }
        else {
            await elementIdentifier.waitFor({state: "visible", timeout: timeout});
        }
    }

    async isElementDisplayed(elementIdentifier, timeout=this.ELEMENT_DISPLAY_TIMEOUT): Promise<boolean> {
        try {
            await this.waitForElementVisible(elementIdentifier, timeout);
        }
        catch(TimeoutError){
            return false;
        }
        return true;
    }

    async navigate(): Promise<void>{
        await this.page.goto(this.PAGE_URL);
        await expect(this.is_loaded()).toBeTruthy();
    }
}