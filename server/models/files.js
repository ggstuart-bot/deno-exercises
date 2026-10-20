import { db } from "./db.js";

export async function createFile(file) {
    const bytes = await file.bytes();
    const { id } = db.prepare(`
        INSERT INTO files(name, bytes, type)
        VALUES (:name, :bytes, :type)
        RETURNING id
    `).get({ name: file.name, bytes, type: file.type });
    return id;
}

export function getFile(id) {
    const row = db.prepare(
        `SELECT name, bytes, type FROM files WHERE id=:id`
    ).get({ id });
    if (!row) return null;
    return new File([row.bytes], row.name, { type: row.type });
}
