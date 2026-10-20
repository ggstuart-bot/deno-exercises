import { hashPassword } from "../tools/hash.js";
import { db } from "./db.js";

export function getUsers() { 
    return db.prepare(`SELECT id, username, isAdmin FROM users;`).all();
}

export function getUserByUsername(username) {
    return db.prepare(
        `SELECT * FROM users WHERE username=:username`
    ).get({ username });
}

export function getUserById(id) {
    return db.prepare(
        `SELECT id, username, isAdmin, avatarId FROM users WHERE id=:id`
    ).get({ id });
}

export function updateIsAdmin(id, isAdmin) {
    return db.prepare(
        `UPDATE users SET isAdmin=:isAdmin WHERE id=:id`
    ).run({ id, isAdmin });
}

export function updateAvatarId(id, avatarId) {
    return db.prepare(
        `UPDATE users SET avatarId=:avatarId WHERE id=:id`
    ).run({ id, avatarId });
}

export async function createUser({ username, password, isAdmin = 0 }) {
    const hashedPassword = await hashPassword(password);
    return db.prepare(`
        INSERT INTO users(username, hashedPassword, isAdmin)
        VALUES (:username, :hashedPassword, :isAdmin)
        RETURNING *
    `).get({ username, hashedPassword, isAdmin });
}

export function usernameExists(username) {
    return Boolean(
        db.prepare(`
            SELECT 1 FROM users
            WHERE username=:username
        `).get({ username })
    );
}