import seed from "../db/seed.json" with { type: "json" };
import books from "../db/books.json" with { type: "json" };
import { createUser, updateAvatarId } from "../server/models/users.js";
import { createFile } from "../server/models/files.js";
import { createList } from "../server/models/lists.js";
import { createBook } from "../server/models/books.js";
import { addBookToList } from "../server/models/listBooks.js";

const bookIds = {};
for (const book of books) {
    const { id } = createBook(book);
    bookIds[book.title] = id;
}

for (const user of seed.users) {
    const { id: userId } = await createUser(user);
    const path = new URL(`../db/seed-avatars/${user.avatar}`, import.meta.url);
    const file = new File([await Deno.readFile(path)], user.avatar, { type: "image/webp" });
    updateAvatarId(userId, await createFile(file));

    for (const list of user.lists) {
        const { id: listId } = createList({ title: list.title, ownerId: userId, isPublic: list.isPublic });
        for (const title of list.books) {
            const bookId = bookIds[title];
            if (!bookId) {
                throw new Error(`Book '${title}' not found in books.json`);
            }
            addBookToList(listId, bookId);
        }
    }
}
