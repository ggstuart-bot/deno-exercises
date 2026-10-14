import layout from "../layout.js";
import render from "../tools/render.js";
import notFoundView from "../views/notFound.js";

export function notFoundController() { 
    return render(notFoundView, layout, { status: 404 });
}
