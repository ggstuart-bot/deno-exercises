import { fileType, maxFileSize, notSvg, requiredFile } from "../tools/validators.js";

export const AVATAR_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const MAX_AVATAR_SIZE = 1024 ** 2; // 1 MB

export const avatarSchema = {
    avatar: {
        displayName: "Avatar",
        validators: [requiredFile, notSvg, fileType(AVATAR_TYPES), maxFileSize(MAX_AVATAR_SIZE)],
    },
};
