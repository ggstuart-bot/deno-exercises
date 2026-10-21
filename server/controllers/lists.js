import { createList, deleteList, updateListIsPublic, updateListTitle } from "../models/lists.js";
import { getBooksByListId } from "../models/listBooks.js";
import { getUserById } from "../models/users.js";
import { canUseList } from "../tools/permissions.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { listView } from "../views/list.js";
import { readOnlyListView } from "../views/readOnlyList.js";

export function createListController(ctx) {
    const { validated, user } = ctx;
    const list = createList({ title: validated.title, ownerId: user.id });
    ctx.flash = `Shelf '${list.title}' created`;
    return redirect(`/lists/${list.id}`, ctx);
}

export function listController(ctx) {
    const { user, data: { list } } = ctx;
    ctx.data.books = getBooksByListId(list.id);
    if (canUseList(user, list)) {
        return render(listView, ctx);
    }
    ctx.data.owner = getUserById(list.ownerId);
    return render(readOnlyListView, ctx);
}

export function editListController(ctx) {
    const { validated, data: { list: { id } } } = ctx;
    const list = updateListTitle(id, validated.title);
    ctx.flash = `Shelf renamed to '${list.title}'`;
    return redirect(`/lists/${list.id}`, ctx);
}

function listVisibilityController(isPublic) {
    return (ctx) => {
        const { data: { list: { id } } } = ctx;
        const list = updateListIsPublic(id, isPublic);
        ctx.flash = isPublic
            ? `Shelf '${list.title}' is now public`
            : `Shelf '${list.title}' is now private`;
        return redirect(`/lists/${list.id}`, ctx);
    };
}

export function privateProfileController(ctx) {
    const { data: { list } } = ctx;
    ctx.flash = "Publish your profile to share shelves";
    return redirect(`/lists/${list.id}`, ctx);
}

export const publishListController = listVisibilityController(1);
export const unpublishListController = listVisibilityController(0);

export function deleteListController(ctx) {
    const { data: { list: { id } } } = ctx;
    const list = deleteList(id);
    ctx.flash = `Shelf '${list.title}' deleted`;
    return redirect("/", ctx);
}
