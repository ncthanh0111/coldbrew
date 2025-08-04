import {Page, Locator} from '@playwright/test';
import { BasePage } from './base.page';
import { BaseConfig } from '../config/baseConfig';

export class LoginPage extends BasePage {

    //Login elements
    public loginHeader: Locator;
    public loginBtn: Locator;
    public usernameInput: Locator;
    public passwordInput: Locator;

    constructor(page: Page) {
        super(page);
        this.PAGE_URL = BaseConfig.SERVER_URL + '/web/index.php/auth/login';
        this.loginHeader = this.page.locator('//h5[.="Login"]');
        this.loginBtn = this.page.locator('//button[contains(., "Login")]');
        this.usernameInput = this.page.locator('input[name="username"]');
        this.passwordInput = this.page.locator('input[name="password"]');
    }

    async is_loaded(): Promise<boolean> {
        return await this.isElementDisplayed(this.loginHeader);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }
    
}