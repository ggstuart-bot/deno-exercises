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

export function hasDigit(name, value) {
    if (!/\d/.test(value)) {
        throw new ValidationError(`${name} must include a digit.`);
    }
}

export function hasSymbol(name, value) {
    if (!/[^A-Za-z0-9\s]/.test(value)) {
        throw new ValidationError(`${name} must include a symbol.`);
    }
}

export function unique(exists) {
    return (name, value) => { 
        if (exists(value)) {
            throw new ValidationError(`${name} already taken.`);
        }
    }
}