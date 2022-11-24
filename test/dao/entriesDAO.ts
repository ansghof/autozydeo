import fs from 'fs';
import EntryData from '../model/types'

let sqlite3 = require('sqlite3').verbose();

export default class EntriesDbDAO {

    private databasePath = '../../db/entries.db';
    private db;

    public connectToOrdersDb() {
        this.db = new sqlite3.Database(this.databasePath, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the order database.');
        });
    }

    // never tested. Won't use it for now anyway
    public getEntries(): EntryData[] {
        return this.db.run(`SELECT entry_id, simplified, traditional, german, comment FROM entries;`,
            (err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('Value inserted');
            });
    }

    public saveEntryToDb(entry: EntryData) {
        this.db.run(`INSERT INTO entries (simplified, traditional, german, comment) VALUES (?,?,?,?);`,
            [
                entry.simplified,
                entry.traditional,
                entry.german,
                entry.comment ?? ""
            ], (err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('Value inserted');
            });
    }

    public disconnectFromOrdersDb() {
        this.db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }

    public createDatabaseIfNotExists() {
        this.db = new sqlite3.Database(this.databasePath);
        if (!fs.existsSync(this.databasePath)) {
            console.log("creating database file");
            fs.openSync(this.databasePath, "w");
            this.db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            entry_id INTEGER PRIMARY KEY AUTOINCREMENT,
            simplified VARCHAR NOT NULL,
            traditional INTEGER NOT NULL,
            german DATETIME NOT NULL,
            comment VARCHAR NOT NULL
        );`, function (createResult) {
                if (createResult) throw createResult;
            });

            console.log("database initialized");
        }
    }
}