import { db } from "../server/models/db.js";

db.exec("DROP TABLE IF EXISTS items");
db.exec(`
    CREATE TABLE items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT NOT NULL
    )
`);
