import seed from "../db/seed.json" with { type: "json" };
import books from "../db/books.json" with { type: "json" };
import { createUser, updateUserAvatarIdById } from "../server/models/users.js";
import { createFile } from "../server/models/files.js";
import { createShelf } from "../server/models/shelves.js";
import { createBook } from "../server/models/books.js";
import { addBookToShelf } from "../server/models/shelfBooks.js";

const bookIds = {};
for (const book of books) {
    const { id } = createBook(book);
    bookIds[book.title] = id;
}

for (const user of seed.users) {
    const { id: userId } = await createUser(user);
    const path = new URL(`../db/seed-avatars/${user.avatar}`, import.meta.url);
    const file = new File([await Deno.readFile(path)], user.avatar, { type: "image/webp" });
    updateUserAvatarIdById(userId, await createFile(file));

    for (const shelf of user.shelves) {
        const { id: shelfId } = createShelf({
            title: shelf.title,
            ownerId: userId,
            isPublic: shelf.isPublic,
        });
        for (const title of shelf.books) {
            const bookId = bookIds[title];
            if (!bookId) {
                throw new Error(`Book '${title}' not found in books.json`);
            }
            addBookToShelf(shelfId, bookId);
        }
    }
}
