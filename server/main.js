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
import { alreadySignedInRedirectController, signinController, signinFormController, signinRedirectController, signoutController } from "./controllers/auth.js";
import { signinSchema } from "./schema/signin.js";
import { withSession } from "./middleware/session.js";
import { requireGuest, requireUser } from "./middleware/access.js";

const validateNewItem = withValidation(itemSchema, itemsController);
const validateEditItem = withValidation(itemSchema, itemController);
const validateNewUser = withValidation(userSchema, signupFormController);
const validateSignin = withValidation(signinSchema, signinFormController);

const gentleSignIn = requireUser(signinRedirectController);
const gentleSignedIn = requireGuest(alreadySignedInRedirectController);

const app = new Router();

app.use(withLogs);
app.use(withSession);

app.get("/assets/*", staticController);
app.get("/", homeController);
app.get("/about", aboutController);

app.get("/signup", gentleSignedIn, signupFormController);
app.post("/signup", gentleSignedIn, validateNewUser, createUserController);
app.get("/signin", gentleSignedIn, signinFormController);
app.post("/signin", gentleSignedIn, validateSignin, signinController);
app.post("/signout", gentleSignIn, signoutController);

app.get("/items", itemsController);
app.post("/items", validateNewItem, createItemController);
app.get("/items/:itemId", itemController);
app.post("/items/:itemId/edit", validateEditItem, editItemController);
app.post("/items/:itemId/delete", deleteItemController);
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
