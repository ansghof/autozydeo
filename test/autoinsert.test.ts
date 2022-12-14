import { chromium, Browser, BrowserContext, Page, test } from '@playwright/test';
import Papa, { ParseResult } from 'papaparse';
import fs from 'fs';
import EntryData from './model/types'
import EditHistoryPOM from './model/EditHistoryPOM';
import credentials from '../env.json';

test.only('Insert stuff', async () => {
    test.setTimeout(120000000);

    let entryData: string = readEntryFile('../entries.csv');

    const csvData: ParseResult<EntryData> = Papa.parse(entryData, { header: true, skipEmptyLines: true });
    console.table(csvData.data);

    const browser: Browser = await chromium.launch({ headless: false });
    for (let index = 0; index < csvData.data.length; index++) {
        const element: EntryData = csvData.data[index];

        await insertEntry(browser, element);
        console.log(`Eintrag: ${element.simplified} - ${element.german} eingefügt.`);
    }
    await browser.close();
});

async function insertEntry(browser: Browser, element: EntryData) {
    const context: BrowserContext = await browser.newContext();
    let page: Page = await context.newPage();
    const editHistoryPOM: EditHistoryPOM = new EditHistoryPOM(page);

    await editHistoryPOM.open();
    await editHistoryPOM.waitForPageLoaded();
    await editHistoryPOM.chooseNewEntry();
    const isLoggedIn = await editHistoryPOM.isLoggedIn();
    if (isLoggedIn) {
        await editHistoryPOM.login(credentials.username, credentials.password);
    }
    await editHistoryPOM.createEntry(element);
}

function readEntryFile(filename: string): string {
    try {
        return fs.readFileSync(filename, 'utf8')
    } catch (err) {
        console.error(err)
    }
    return "";
}