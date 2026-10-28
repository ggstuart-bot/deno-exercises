import { canPublishShelf } from "../../tools/permissions.js";
import { postButton } from "./postButton.js";

// The publish or unpublish button for a shelf
export function visibilityButton(user, shelf) {
    if (!shelf.isPublic && !canPublishShelf(user, shelf)) {
        return "";
    }
    const action = shelf.isPublic ? "unpublish" : "publish";
    const label = shelf.isPublic ? "make private" : "make public";
    return postButton(`/shelves/${shelf.id}/${action}`, label);
}
