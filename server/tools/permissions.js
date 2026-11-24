export const isSelf = (user, targetUser) => user?.id === targetUser.id;
export const isAdmin = (user) => Boolean(user?.isAdmin);
export const canViewUser = (user, targetUser) =>
    isSelf(user, targetUser) || isAdmin(user) || Boolean(targetUser.isPublic);
export const canChangeAdmin = (user, targetUser) => isAdmin(user) && !isSelf(user, targetUser);
export const canChangeAvatar = (user, targetUser) => isSelf(user, targetUser);
export const canPublishProfile = (user, targetUser) => isSelf(user, targetUser);
const isOwner = (user, resource) => user?.id === resource.ownerId;
export const canUseShelf = (user, shelf) => isOwner(user, shelf);
export const canPublishShelf = (user, shelf) => isOwner(user, shelf) && Boolean(user.isPublic);
export const canViewShelf = (user, shelf) => isOwner(user, shelf) || Boolean(shelf.isPublic);
