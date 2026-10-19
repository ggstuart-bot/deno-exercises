import { hashPassword } from "../tools/hash.js";
import { db } from "./db.js";

export function getUsers() { 
    return db.prepare(`SELECT * FROM users;`).all();
}

export async function createUser({ username, password }) {
    const hashedPassword = await hashPassword(password);
    return db.prepare(`
        INSERT INTO users(username, hashedPassword)
        VALUES (:username, :hashedPassword)
        RETURNING *
    `).get({ username, hashedPassword });
}
