import { createItem } from "../server/models/items.js";
import seed from "../db/seed.json" with { type: "json" };
import { createUser, updateAvatarId } from "../server/models/users.js";
import { createFile } from "../server/models/files.js";

for (const item of seed.items) {
    createItem(item.label);
}

for (const user of seed.users) {
    const { id } = await createUser(user);
    const path = new URL(`../db/seed-avatars/${user.avatar}`, import.meta.url);
    const file = new File([await Deno.readFile(path)], user.avatar, { type: "image/webp" });
    updateAvatarId(id, await createFile(file));
}
