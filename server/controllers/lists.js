import { createList } from "../models/lists.js";
import { getItemsByListId } from "../models/items.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { listView } from "../views/list.js";

export function createListController(ctx) {
    const { validated, user } = ctx;
    const list = createList({ title: validated.title, ownerId: user.id });
    ctx.flash = `List '${list.title}' created`;
    return redirect(`/lists/${list.id}`, ctx);
}

export function listController(ctx) {
    const { data: { list } } = ctx;
    ctx.data.items = getItemsByListId(list.id);
    return render(listView, ctx);
}
