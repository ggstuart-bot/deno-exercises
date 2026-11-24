import { postButton } from "./postButton.js";

// The publish or unpublish button for a shelf
export function visibilityButton(shelf) {
    const action = shelf.isPublic ? "unpublish" : "publish";
    const label = shelf.isPublic ? "make private" : "make public";
    return postButton(`/shelves/${shelf.id}/${action}`, label);
}
