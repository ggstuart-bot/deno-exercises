import { aboutController } from "./controllers/about.js";
import { homeController } from "./controllers/home.js";
import {
    createItemController,
    deleteItemController,
    editItemController,
    itemController,
    itemsController,
} from "./controllers/items.js";
import { staticController } from "./controllers/static.js";
import { notFoundController } from "./controllers/notFound.js";
import { layout } from "./layout.js";
import { NotFoundError } from "./tools/errors.js";
import { Router } from "./tools/router.js";
import { withLogs } from "./middleware/logging.js";
import { withValidation } from "./middleware/validation.js";
import { itemSchema } from "./schema/item.js";
import { createUserController, signupFormController, usersController } from "./controllers/users.js";
import { userSchema } from "./schema/user.js";

const validateNewItem = withValidation(itemSchema, itemsController);
const validateEditItem = withValidation(itemSchema, itemController);
const validateNewUser = withValidation(userSchema, signupFormController);

const app = new Router();

app.use(withLogs);

app.get("/assets/*", staticController);
app.get("/", homeController);
app.get("/about", aboutController);
app.get("/items", itemsController);
app.post("/items", validateNewItem, createItemController);
app.get("/items/:itemId", itemController);
app.post("/items/:itemId/edit", validateEditItem, editItemController);
app.post("/items/:itemId/delete", deleteItemController);
app.get("/signup", signupFormController);
app.post("/signup", validateNewUser, createUserController);
app.get("/users", usersController);

export async function server(request) {
    const url = new URL(request.url);
    const headers = new Headers();
    const ctx = { request, url, layout, data: {}, headers };

    try {
        return await app.handle(ctx);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return notFoundController(ctx);
        }
        throw error;
    }
}
