import { createList, deleteList, updateListTitle } from "../models/lists.js";
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

export function editListController(ctx) {
    const { validated, data: { list: { id } } } = ctx;
    const list = updateListTitle(id, validated.title);
    ctx.flash = `List renamed to '${list.title}'`;
    return redirect(`/lists/${list.id}`, ctx);
}

export function deleteListController(ctx) {
    const { data: { list: { id } } } = ctx;
    const list = deleteList(id);
    ctx.flash = `List '${list.title}' deleted`;
    return redirect("/", ctx);
}
