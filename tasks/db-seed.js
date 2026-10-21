import { createItem } from "../server/models/items.js";
import seed from "../db/seed.json" with { type: "json" };
import books from "../db/books.json" with { type: "json" };
import { createUser, updateAvatarId } from "../server/models/users.js";
import { createFile } from "../server/models/files.js";
import { createList } from "../server/models/lists.js";
import { createBook } from "../server/models/books.js";

const { defaultList } = seed;

for (const book of books) {
    createBook(book);
}

for (const user of seed.users) {
    const { id } = await createUser(user);
    const path = new URL(`../db/seed-avatars/${user.avatar}`, import.meta.url);
    const file = new File([await Deno.readFile(path)], user.avatar, { type: "image/webp" });
    updateAvatarId(id, await createFile(file));

    const list = createList({ title: defaultList.title, ownerId: id, isPublic: user.listIsPublic ?? 0 });
    for (const item of defaultList.items) {
        createItem({ label: item.label, listId: list.id });
    }
}
