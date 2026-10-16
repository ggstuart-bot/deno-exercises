import { ValidationError } from "./errors.js";

export function required(name, value) {
    if (!value.length) throw new ValidationError(`${name} is a required field.`); 
}

export function minLength(len) {
    return (name, value) => {
        if(value.length < len) throw new ValidationError(`${name} must be at least ${len} characters.`)
    }
}

export function maxLength(len) {
    return (name, value) => {
        if(value.length > len) throw new ValidationError(`${name} must be no more than ${len} characters.`)
    }
}

export function between(min, max) {
    return (name, value) => {
        if(value.length < min) throw new ValidationError(`${name} must be at least ${min} characters.`)
        if(value.length > max) throw new ValidationError(`${name} must be no more than ${max} characters.`)
    }
}