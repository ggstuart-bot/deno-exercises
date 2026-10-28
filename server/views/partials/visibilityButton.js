import { html } from "../../tools/html.js";
import { canPublishShelf } from "../../tools/permissions.js";

// Just the button. Also used on the cards in My shelves
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
