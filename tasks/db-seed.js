import { createItem } from "../server/models/items.js";
import seed from "../db/seed.json" with { type: "json" };
import { createUser } from "../server/models/users.js";

for (const item of seed.items) {
    createItem(item.label);
}

for (const user of seed.users) {
    await createUser(user);
}


