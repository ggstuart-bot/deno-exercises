export const isSelf = (user, targetUser) => user.id === targetUser.id;
export const canViewUser = (user, targetUser) => isSelf(user, targetUser) || user.isAdmin;
export const canChangeAdmin = (user, targetUser) => user.isAdmin && !isSelf(user, targetUser);
export const canChangeAvatar = (user, targetUser) => isSelf(user, targetUser);
export const isOwner = (user, resource) => user.id === resource.ownerId;
export const canUseList = (user, list) => isOwner(user, list);
