import { ValidationError } from "./errors.js";

export function required(name, value) {
    if (!value.length) {
        throw new ValidationError(`${name} is a required field.`);
    }
}

export function minLength(len) {
    return (name, value) => {
        if (value.length < len) {
            throw new ValidationError(
                `${name} must be at least ${len} characters.`,
            );
        }
    };
}

export function maxLength(len) {
    return (name, value) => {
        if (value.length > len) {
            throw new ValidationError(
                `${name} must be no more than ${len} characters.`,
            );
        }
    };
}

export function between(min, max) {
    const minValidator = minLength(min);
    const maxValidator = maxLength(max);
    return (name, value) => {
        minValidator(name, value);
        maxValidator(name, value);
    };
}
