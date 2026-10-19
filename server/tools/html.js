import { escape } from "@std/html";

class SafeHTML {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return this.value;
    }
}

export function safe(value) {
    return new SafeHTML(String(value ?? ""));
}

function toHTML(value) {    
    if (value === undefined || value === null) return "";
    if (value instanceof SafeHTML) return value.value;
    if (Array.isArray(value)) return value.map(toHTML).join("\n");
    return escape(String(value));
}

export function html(strings, ...values) {
    return safe(strings.reduce(
        (output, string, index) => output + string + toHTML(values[index]),
        "",
    ));
}