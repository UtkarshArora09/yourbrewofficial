import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'yourbrew_db.sqlite');
const sqliteEnabled = process.env.SQLITE_ENABLED !== 'false';

let db = null;

if (sqliteEnabled) {
    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Could not connect to SQLite database', err.message);
        } else {
            console.log('Connected to YourBrew SQLite database');
            initializeSchema();
        }
    });
} else {
    console.log('SQLite logging disabled by environment');
}

function initializeSchema() {
    if (!db) return;

    db.run(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            company TEXT,
            inquiry_type TEXT,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Could not create messages table', err.message);
        } else {
            console.log('Messages table ready');
        }
    });
}

export const query = (sql, params = []) => {
    if (!db) {
        return Promise.resolve([]);
    }

    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

export const run = (sql, params = []) => {
    if (!db) {
        return Promise.resolve({ id: null, changes: 0 });
    }

    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, changes: this.changes });
        });
    });
};

export default db;

