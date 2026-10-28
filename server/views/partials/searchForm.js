import { html } from "../../tools/html.js";

// The book search form, shared by the home page and the books page.
// Pass the current search to pre-fill the box
export function searchForm(q = "") {
    return html`
        <search>
            <form method="GET" action="/books">
                <label for="q">Search by title or author</label>
                <input id="q" type="search" name="q" value="${q}">
                <button>search</button>
            </form>
        </search>
    `;
}
