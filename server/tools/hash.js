import { decodeHex, encodeHex } from "@std/encoding/hex";
import { timingSafeEqual } from "@std/crypto/timing-safe-equal";

const ITERATIONS = 600000;

async function derive(password, salt) {
    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveBits"],
    );
    const bits = await crypto.subtle.deriveBits(
        { name: "PBKDF2", hash: "SHA-256", iterations: ITERATIONS, salt },
        key,
        256,
    );
    return new Uint8Array(bits);
}

export async function hashPassword(password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const hash = await derive(password, salt);
    return `${encodeHex(salt)}:${encodeHex(hash)}`;
}

export async function verifyPassword(password, stored) {
    const [salt, hash] = stored.split(":").map(decodeHex);
    const attempt = await derive(password, salt);
    return timingSafeEqual(attempt, hash);
}
