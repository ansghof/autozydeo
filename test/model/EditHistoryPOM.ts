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
        return await this.page.getByText('log in').count() == 0
    }

    public async login(username: string, password: string) {
        await this.page.getByText('log in').click();
        await this.page.waitForSelector('.loginView');
        await this.page.getByRole('textbox', { name: 'me@example.com' }).click();
        await this.page.getByRole('textbox', { name: 'me@example.com' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Passwort' }).click();
        await this.page.getByRole('textbox', { name: 'Passwort' }).fill(password);;
        await this.page.locator('span').filter({ hasText: 'OK' }).click();
    }

    public async waitForPageLoaded() {
        await this.page.waitForSelector('#smEditNew');
    }

    public async chooseNewEntry() {
        await this.page.getByRole('link', { name: 'Neuer Eintrag' }).click();
    }

}
