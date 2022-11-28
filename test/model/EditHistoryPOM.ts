import { Locator, Page } from "@playwright/test";
import { pageLinkMaps } from '../utils/mappings';
import EntryData from "./types";

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

    public async createEntry(entry: EntryData) {
        await this.enterSimplified(entry.simplified);
        await this.acceptPinyin();
        await this.enterTranslation(entry.german);
        await this.enterComment(entry.comment ?? "neuer Eintrag");
        await this.saveEntry();
    }

    public async enterSimplified(simplified: string) {
        await this.page.locator('#newEntrySimp').fill(simplified);
        await this.page.locator('#acceptSimp i').click();
    }

    public async enterTraditional(traditional: string) {
        await this.page.locator('#editTrad i').click();
        await this.page.locator('#newEntryTrad').fill(traditional);
        await this.page.locator('#acceptSimp i').click();
    }

    public async acceptPinyin() {
        await this.page.locator('#acceptPinyin i').click();
    }

    public async enterTranslation(german: string) {
        await this.page.locator('#newEntryTrg').click();
        await this.page.locator('#newEntryTrg').fill(german);
        await this.page.locator('#acceptTrg i').click();
    }

    public async enterComment(comment: string) {
        await this.page.getByPlaceholder('Source, comment, reference...').click();
        await this.page.getByPlaceholder('Source, comment, reference...').fill(comment);
    }

    public async saveEntry() {
        await this.page.getByText('Speichern').click();
    }

    public async waitForPageLoaded() {
        await this.page.waitForSelector('#smEditNew');
    }

    public async chooseNewEntry() {
        await this.page.getByRole('link', { name: 'Neuer Eintrag' }).click();
    }

}
