import { isFile, isType, maxSize } from "../tools/validators.js";

export const AVATAR_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const MAX_AVATAR_SIZE = 1024 ** 2; // 1 MB

export const avatarSchema = {
    avatar: {
        displayName: "Avatar",
        validators: [isFile, isType(AVATAR_TYPES), maxSize(MAX_AVATAR_SIZE)],
    },
};
