import { html } from "../../tools/html.js";
import { canPublishShelf } from "../../tools/permissions.js";

// The publish or unpublish button for a shelf
export function visibilityButton(user, shelf) {
    if (shelf.isPublic) {
        return html`
            <form method="POST" action="/shelves/${shelf.id}/unpublish">
                <button>make private</button>
            </form>
        `;
    }
    if (canPublishShelf(user, shelf)) {
        return html`
            <form method="POST" action="/shelves/${shelf.id}/publish">
                <button>make public</button>
            </form>
        `;
    }
    return "";
}
