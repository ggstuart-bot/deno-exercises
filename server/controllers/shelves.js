import { createShelf, deleteShelf, getShelvesByOwnerId, updateShelfIsPublic, updateShelfTitle } from "../models/shelves.js";
import { getBooksByShelfId } from "../models/shelfBooks.js";
import { getUserById } from "../models/users.js";
import { canUseShelf } from "../tools/permissions.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { myShelvesView } from "../views/myShelves.js";
import { shelfView } from "../views/shelf.js";
import { readOnlyShelfView } from "../views/readOnlyShelf.js";

export function myShelvesController(ctx) {
    const { user } = ctx;
    ctx.data.shelves = getShelvesByOwnerId(user.id);
    return render(myShelvesView, ctx);
}

export function createShelfController(ctx) {
    const { validated, user } = ctx;
    const shelf = createShelf({ title: validated.title, ownerId: user.id });
    ctx.flash = `Shelf '${shelf.title}' created`;
    return redirect(`/shelves/${shelf.id}`, ctx);
}

export function shelfController(ctx) {
    const { user, data: { shelf } } = ctx;
    ctx.data.books = getBooksByShelfId(shelf.id);
    if (canUseShelf(user, shelf)) {
        return render(shelfView, ctx);
    }
    ctx.data.owner = getUserById(shelf.ownerId);
    return render(readOnlyShelfView, ctx);
}

export function editShelfController(ctx) {
    const { validated, data: { shelf: { id } } } = ctx;
    const shelf = updateShelfTitle(id, validated.title);
    ctx.flash = `Shelf renamed to '${shelf.title}'`;
    return redirect(`/shelves/${shelf.id}`, ctx);
}

function shelfVisibilityController(isPublic) {
    return (ctx) => {
        const { data: { shelf: { id } } } = ctx;
        const shelf = updateShelfIsPublic(id, isPublic);
        ctx.flash = isPublic
            ? `Shelf '${shelf.title}' is now public`
            : `Shelf '${shelf.title}' is now private`;
        return redirect(`/shelves/${shelf.id}`, ctx);
    };
}

export function privateProfileController(ctx) {
    const { data: { shelf } } = ctx;
    ctx.flash = "Publish your profile to share shelves";
    return redirect(`/shelves/${shelf.id}`, ctx);
}

export const publishShelfController = shelfVisibilityController(1);
export const unpublishShelfController = shelfVisibilityController(0);

export function deleteShelfController(ctx) {
    const { data: { shelf: { id } } } = ctx;
    const shelf = deleteShelf(id);
    ctx.flash = `Shelf '${shelf.title}' deleted`;
    return redirect("/shelves", ctx);
}
