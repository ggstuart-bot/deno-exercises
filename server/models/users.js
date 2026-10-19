import { hashPassword } from "../tools/hash.js";
import { db } from "./db.js";

export function getUsers() { 
    return db.prepare(`SELECT id, username FROM users;`).all();
}

export function getUserByUsername(username) {
    return db.prepare(
        `SELECT * FROM users WHERE username=:username`
    ).get({ username });
}

export async function createUser({ username, password }) {
    const hashedPassword = await hashPassword(password);
    return db.prepare(`
        INSERT INTO users(username, hashedPassword)
        VALUES (:username, :hashedPassword)
        RETURNING *
    `).get({ username, hashedPassword });
}

export function usernameExists(username) {
    return Boolean(
        db.prepare(`
            SELECT 1 FROM users
            WHERE username=:username
        `).get({ username })
    );
}