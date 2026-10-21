import { aboutController } from "./controllers/about.js";
import { homeController } from "./controllers/home.js";
import { addBookController, removeBookController } from "./controllers/listBooks.js";
import { createListController, deleteListController, editListController, listController, privateProfileController, publishListController, unpublishListController } from "./controllers/lists.js";
import { staticController } from "./controllers/static.js";
import { notFoundController } from "./controllers/notFound.js";
import { layout } from "./layout.js";
import { NotFoundError } from "./tools/errors.js";
import { Router } from "./tools/router.js";
import { withLogs } from "./middleware/logging.js";
import { withValidation } from "./middleware/validation.js";
import { listSchema } from "./schema/list.js";
import { avatarController, createUserController, uploadAvatarController, demoteController, profileController, promoteController, publishProfileController, unpublishProfileController, selfChangeController, signupFormController, userController, usersController } from "./controllers/users.js";
import { userSchema } from "./schema/user.js";
import { avatarSchema } from "./schema/avatar.js";
import { alreadySignedInRedirectController, forbiddenController, signinController, signinFormController, signinRedirectController, signoutController } from "./controllers/auth.js";
import { signinSchema } from "./schema/signin.js";
import { withSession } from "./middleware/session.js";
import { requireAdmin, requireGuest, requirePermission, requireUser } from "./middleware/access.js";
import { withBook, withList, withTargetUser } from "./middleware/resources.js";
import { canChangeAdmin, canChangeAvatar, canPublishList, canPublishProfile, canUseList, canViewList, canViewUser } from "./tools/permissions.js";

const validateNewList = withValidation(listSchema, homeController);
const validateEditList = withValidation(listSchema, listController);
const validateNewUser = withValidation(userSchema, signupFormController);
const validateSignin = withValidation(signinSchema, signinFormController);
const validateAvatar = withValidation(avatarSchema, userController);

const mustBeSignedIn = requireUser(signinRedirectController);
const mustBeSignedOut = requireGuest(alreadySignedInRedirectController);
const mustBeAdmin = requireAdmin(forbiddenController);
const mayViewUser = requirePermission(canViewUser, "targetUser", notFoundController);
const mayChangeAdmin = requirePermission(canChangeAdmin, "targetUser", selfChangeController);
const mayChangeAvatar = requirePermission(canChangeAvatar, "targetUser", notFoundController);
const mayPublishProfile = requirePermission(canPublishProfile, "targetUser", notFoundController);
const mayPublishList = requirePermission(canPublishList, "list", privateProfileController);
const mayViewList = requirePermission(canViewList, "list", notFoundController);
const mayUseList = requirePermission(canUseList, "list", notFoundController);

const app = new Router();

app.use(withLogs);
app.use(withSession);

app.get("/assets/*", staticController);
app.get("/", homeController);
app.get("/about", aboutController);

app.get("/signup", mustBeSignedOut, signupFormController);
app.post("/signup", mustBeSignedOut, validateNewUser, createUserController);
app.get("/signin", mustBeSignedOut, signinFormController);
app.post("/signin", mustBeSignedOut, validateSignin, signinController);
app.post("/signout", signoutController);
app.get("/profile", mustBeSignedIn, profileController);

app.post("/lists", mustBeSignedIn, validateNewList, createListController);
app.get("/lists/:listId", mustBeSignedIn, withList, mayViewList, listController);
app.post("/lists/:listId/edit", mustBeSignedIn, withList, mayUseList, validateEditList, editListController);
app.post("/lists/:listId/publish", mustBeSignedIn, withList, mayUseList, mayPublishList, publishListController);
app.post("/lists/:listId/unpublish", mustBeSignedIn, withList, mayUseList, unpublishListController);
app.post("/lists/:listId/delete", mustBeSignedIn, withList, mayUseList, deleteListController);
app.post("/lists/:listId/books/:bookId/add", mustBeSignedIn, withList, withBook, mayUseList, addBookController);
app.post("/lists/:listId/books/:bookId/delete", mustBeSignedIn, withList, withBook, mayUseList, removeBookController);
app.get("/users", mustBeSignedIn, mustBeAdmin, usersController);
app.get("/users/:userId", mustBeSignedIn, withTargetUser, mayViewUser, userController);
app.get("/users/:userId/avatar", mustBeSignedIn, withTargetUser, mayViewUser, avatarController);
app.post("/users/:userId/avatar", mustBeSignedIn, withTargetUser, mayChangeAvatar, validateAvatar, uploadAvatarController);
app.post("/users/:userId/publish", mustBeSignedIn, withTargetUser, mayPublishProfile, publishProfileController);
app.post("/users/:userId/unpublish", mustBeSignedIn, withTargetUser, mayPublishProfile, unpublishProfileController);
app.post("/users/:userId/promote", mustBeSignedIn, mustBeAdmin, withTargetUser, mayChangeAdmin, promoteController);
app.post("/users/:userId/demote", mustBeSignedIn, mustBeAdmin, withTargetUser, mayChangeAdmin, demoteController);

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
