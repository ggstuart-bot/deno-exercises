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
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        hashedPassword TEXT NOT NULL,
        isAdmin INTEGER DEFAULT 0
    )
`);

db.exec("DROP TABLE IF EXISTS sessions");
db.exec(`
    CREATE TABLE sessions (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        FOREIGN KEY (username) REFERENCES users(username)
    )
`);
