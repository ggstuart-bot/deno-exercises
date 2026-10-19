import { db } from "../server/models/db.js";

db.exec("DROP TABLE IF EXISTS items");
db.exec(`
    CREATE TABLE items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT NOT NULL
    )
`);


db.exec("DROP TABLE IF EXISTS users");
db.exec(`
    CREATE TABLE users (
        username TEXT PRIMARY KEY,
        hashedPassword TEXT NOT NULL,
        isAdmin INTEGER DEFAULT 0
    )
`);
