import { Locator, Page } from "@playwright/test";
import { pageLinkMaps } from '../utils/mappings';

export default class EditHistoryPOM {

    private page: Page;

    constructor(page: Page) {
        if (!page) throw new Error("page must be defined");
        this.page = page;
    }

    public async open() {
        await this.page.goto(pageLinkMaps['history']);
    }

    public async isLoggedIn(): Promise<boolean> {
        return await this.page.locator('#loginLink').count() == 0
    }

    public async logIn(username: string, password: string) {
        await this.page.waitForSelector('.loginView');
        await this.page.fill('input[id="loginEmail"]', username);
        await this.page.fill('input[id="loginPassword"]', password);

        await this.page.locator('.modalPopupButtonOK')?.click();
    }

    public async waitForPageLoaded() {
        await this.page.waitForSelector('');
    }

    public async chooseNewEntry() {
        await this.page.click('a:has-text("Neuer Eintrag")');
    }

}
