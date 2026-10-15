const items = [
    { id: 1, label: "apples" },
    { id: 2, label: "bananas" },
    { id: 3, label: "cherries" }
];

let nextId = items.length + 1;

export function getItems() { 
    return items;
}

export function getItemById(id) {
    return items.find(item => item.id === id);
}

export function createItem(label) {
    const item = { id: nextId, label };
    nextId += 1;
    items.push(item);
    return item;
}
