export const isSelf = (user, targetUser) => user.id === targetUser.id;
export const canViewUser = (user, targetUser) => isSelf(user, targetUser) || user.isAdmin;
export const canChangeAdmin = (user, targetUser) => user.isAdmin && !isSelf(user, targetUser);
