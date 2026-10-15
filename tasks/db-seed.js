import { createItem } from "../server/models/items.js";
import items from "../db/seed.json" with { type: "json" };

for (const item of items) {
    createItem(item.label);
}
