import { chromium, Browser, BrowserContext, Page, test } from '@playwright/test';
import Papa, { ParseResult } from 'papaparse';
import fs from 'fs';
import EntryData from './model/types'
import nowTimestamp, { dateTimestamp, timeTimestamp } from './utils/timestamp'

test.only('Insert stuff', async () => {
    test.setTimeout(120000000);

    let entryData: string = readEntryFile('entries.csv');

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
}

function readEntryFile(filename: string): string {
    let data = "";
    try {
        data = fs.readFileSync(filename, 'utf8')
        console.log(data)
    } catch (err) {
        console.error(err)
    }
    return data;
}