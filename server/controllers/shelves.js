import {
    createShelf,
    deleteShelfById,
    getShelvesByOwnerId,
    updateShelfIsPublicById,
    updateShelfTitleById,
} from "../models/shelves.js";
import { addThumbnails, getBooksByShelfId } from "../models/shelfBooks.js";
import { getUserById } from "../models/users.js";
import { canUseShelf } from "../tools/permissions.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { myShelvesView } from "../views/myShelves.js";
import { myShelfView } from "../views/myShelf.js";
import { publicShelfView } from "../views/publicShelf.js";

export function myShelvesController(ctx) {
    const { user } = ctx;
    ctx.data.shelves = addThumbnails(getShelvesByOwnerId(user.id));
    ctx.data.title = "My shelves";
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
        ctx.data.title = shelf.title;
        return render(myShelfView, ctx);
    }
    ctx.data.owner = getUserById(shelf.ownerId);
    ctx.data.title = shelf.title;
    return render(publicShelfView, ctx);
}

export function editShelfController(ctx) {
    const { validated, data: { shelf: { id } } } = ctx;
    const shelf = updateShelfTitleById(id, validated.title);
    ctx.flash = `Shelf renamed to '${shelf.title}'`;
    return redirect(`/shelves/${shelf.id}`, ctx);
}

function shelfVisibilityController(isPublic) {
    return (ctx) => {
        const { data: { shelf: { id } } } = ctx;
        const shelf = updateShelfIsPublicById(id, isPublic);
        ctx.flash = isPublic
            ? `Shelf '${shelf.title}' is now public`
            : `Shelf '${shelf.title}' is now private`;
        // Back to My shelves, where the shelf has moved to its new section
        return redirect("/shelves", ctx);
    };
}

export function profileNotPublicController(ctx) {
    ctx.flash = "Publish your profile to share shelves";
    return redirect("/shelves", ctx);
}

export const publishShelfController = shelfVisibilityController(1);
export const unpublishShelfController = shelfVisibilityController(0);

export function deleteShelfController(ctx) {
    const { data: { shelf: { id } } } = ctx;
    const shelf = deleteShelfById(id);
    ctx.flash = `Shelf '${shelf.title}' deleted`;
    return redirect("/shelves", ctx);
}
