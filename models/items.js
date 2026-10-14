const items = [
    "apples",
    "bananas",
    "cherries"
];

export function getItems() { 
    return [...items].map((label, id) => ({ label, id }));
}

export function getItem(id) {
    return { id, label: items[id]};
}