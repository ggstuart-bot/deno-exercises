import { homeController } from "./controllers/home.js";
import { bookController, booksController } from "./controllers/books.js";
import { addBookController, removeBookController } from "./controllers/shelfBooks.js";
import {
    createShelfController,
    deleteShelfController,
    editShelfController,
    myShelvesController,
    profileNotPublicController,
    publishShelfController,
    shelfController,
    unpublishShelfController,
} from "./controllers/shelves.js";
import { staticController } from "./controllers/static.js";
import { notFoundController } from "./controllers/notFound.js";
import { NotFoundError } from "./tools/errors.js";
import { Router } from "./tools/router.js";
import { withLogs } from "./middleware/logging.js";
import { withValidation } from "./middleware/validation.js";
import { shelfSchema } from "./schema/shelf.js";
import {
    avatarController,
    createUserController,
    demoteController,
    ownAdminStatusController,
    profileController,
    promoteController,
    publishProfileController,
    signupFormController,
    unpublishProfileController,
    uploadAvatarController,
    userController,
    usersController,
} from "./controllers/users.js";
import { userSchema } from "./schema/user.js";
import { avatarSchema } from "./schema/avatar.js";
import {
    alreadySignedInRedirectController,
    forbiddenController,
    signinController,
    signinFormController,
    signinRedirectController,
    signoutController,
} from "./controllers/auth.js";
import { signinSchema } from "./schema/signin.js";
import { withSession } from "./middleware/session.js";
import { requireAdmin, requireGuest, requirePermission, requireUser } from "./middleware/access.js";
import { withBook, withShelf, withTargetUser } from "./middleware/resources.js";
import {
    canChangeAdmin,
    canChangeAvatar,
    canPublishProfile,
    canPublishShelf,
    canUseShelf,
    canViewShelf,
    canViewUser,
} from "./tools/permissions.js";

const validateNewShelf = withValidation(shelfSchema, myShelvesController);
const validateEditShelf = withValidation(shelfSchema, shelfController);
const validateNewUser = withValidation(userSchema, signupFormController);
const validateSignin = withValidation(signinSchema, signinFormController);
const validateAvatar = withValidation(avatarSchema, userController);

const mustBeSignedIn = requireUser(signinRedirectController);
const mustBeSignedOut = requireGuest(alreadySignedInRedirectController);
const mustBeAdmin = requireAdmin(forbiddenController);
const mayViewUser = requirePermission(canViewUser, "targetUser", notFoundController);
const mayChangeAdmin = requirePermission(canChangeAdmin, "targetUser", ownAdminStatusController);
const mayChangeAvatar = requirePermission(canChangeAvatar, "targetUser", notFoundController);
const mayPublishProfile = requirePermission(canPublishProfile, "targetUser", notFoundController);
const mayPublishShelf = requirePermission(canPublishShelf, "shelf", profileNotPublicController);
const mayViewShelf = requirePermission(canViewShelf, "shelf", notFoundController);
const mayUseShelf = requirePermission(canUseShelf, "shelf", notFoundController);

const app = new Router();

app.use(withLogs);
app.use(withSession);

app.get("/assets/*", staticController);
app.get("/", homeController);
app.get("/books", booksController);
app.get("/books/:bookId", withBook, bookController);

app.get("/signup", mustBeSignedOut, signupFormController);
app.post("/signup", mustBeSignedOut, validateNewUser, createUserController);
app.get("/signin", mustBeSignedOut, signinFormController);
app.post("/signin", mustBeSignedOut, validateSignin, signinController);
app.post("/signout", signoutController);
app.get("/profile", mustBeSignedIn, profileController);

app.get("/shelves", mustBeSignedIn, myShelvesController);
app.post("/shelves", mustBeSignedIn, validateNewShelf, createShelfController);
app.get("/shelves/:shelfId", withShelf, mayViewShelf, shelfController);
app.post(
    "/shelves/:shelfId/edit",
    mustBeSignedIn,
    withShelf,
    mayUseShelf,
    validateEditShelf,
    editShelfController,
);
app.post(
    "/shelves/:shelfId/publish",
    mustBeSignedIn,
    withShelf,
    mayUseShelf,
    mayPublishShelf,
    publishShelfController,
);
app.post(
    "/shelves/:shelfId/unpublish",
    mustBeSignedIn,
    withShelf,
    mayUseShelf,
    unpublishShelfController,
);
app.post("/shelves/:shelfId/delete", mustBeSignedIn, withShelf, mayUseShelf, deleteShelfController);
app.post(
    "/shelves/:shelfId/books/:bookId/add",
    mustBeSignedIn,
    withShelf,
    withBook,
    mayUseShelf,
    addBookController,
);
app.post(
    "/shelves/:shelfId/books/:bookId/delete",
    mustBeSignedIn,
    withShelf,
    withBook,
    mayUseShelf,
    removeBookController,
);
app.get("/users", mustBeSignedIn, mustBeAdmin, usersController);
app.get("/users/:userId", withTargetUser, mayViewUser, userController);
app.get("/users/:userId/avatar", withTargetUser, mayViewUser, avatarController);
app.post(
    "/users/:userId/avatar",
    mustBeSignedIn,
    withTargetUser,
    mayChangeAvatar,
    validateAvatar,
    uploadAvatarController,
);
app.post(
    "/users/:userId/publish",
    mustBeSignedIn,
    withTargetUser,
    mayPublishProfile,
    publishProfileController,
);
app.post(
    "/users/:userId/unpublish",
    mustBeSignedIn,
    withTargetUser,
    mayPublishProfile,
    unpublishProfileController,
);
app.post(
    "/users/:userId/promote",
    mustBeSignedIn,
    mustBeAdmin,
    withTargetUser,
    mayChangeAdmin,
    promoteController,
);
app.post(
    "/users/:userId/demote",
    mustBeSignedIn,
    mustBeAdmin,
    withTargetUser,
    mayChangeAdmin,
    demoteController,
);

export async function server(request) {
    const url = new URL(request.url);
    const headers = new Headers();
    const ctx = { request, url, data: {}, headers };

    try {
        return await app.handle(ctx);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return notFoundController(ctx);
        }
        throw error;
    }
}
