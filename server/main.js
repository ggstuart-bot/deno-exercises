import { homeController } from "./controllers/home.js";
import { layout } from "./layout.js";

export function server() {
    const headers = new Headers();
    const ctx = { layout, headers };

    // Placeholder: this will need to change when we add routing
    return homeController(ctx);
}
