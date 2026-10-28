import { postButton } from "./postButton.js";

export function adminButton(user) {
    const action = user.isAdmin ? "demote" : "promote";
    const label = user.isAdmin ? "remove admin" : "make admin";
    return postButton(`/users/${user.id}/${action}`, label);
}
