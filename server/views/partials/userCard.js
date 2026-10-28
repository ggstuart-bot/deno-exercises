import { html } from "../../tools/html.js";
import { avatarImage } from "./avatarImage.js";

// A user as a card in a .grid list, with their avatar as the picture.
// Pass extra content (e.g. the admin button) to show it in the card footer
export function userCard(user, footer = "") {
    return html`<li class="card user">
                ${avatarImage(user)}
                <div>
                    <h2><a href="/users/${user.id}">${user.username}</a></h2>
                    <p>
                        ${user.isAdmin ? html`<span class="badge">admin</span>` : ""}
                        <span class="badge">${user.isPublic ? "public" : "private"}</span>
                    </p>
                    ${footer ? html`<footer>${footer}</footer>` : ""}
                </div>
            </li>`;
}
