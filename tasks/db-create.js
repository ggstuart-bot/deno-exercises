import { db } from "../server/models/db.js";

db.exec("DROP TABLE IF EXISTS items");
db.exec("DROP TABLE IF EXISTS sessions");
db.exec("DROP TABLE IF EXISTS users");
db.exec("DROP TABLE IF EXISTS files");

db.exec(`
    CREATE TABLE items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT NOT NULL
    )
`);

db.exec(`
    CREATE TABLE files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        bytes BLOB NOT NULL,
        type TEXT NOT NULL
    )
`);

db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        hashedPassword TEXT NOT NULL,
        isAdmin INTEGER DEFAULT 0,
        avatarId INTEGER REFERENCES files(id) ON DELETE SET NULL
    )
`);

db.exec(`
    CREATE TABLE sessions (
        id TEXT PRIMARY KEY,
        userId INTEGER NOT NULL,
        expires INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
    )
`);

