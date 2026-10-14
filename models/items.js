const items = [
    { id: 1, name: "apples" },
    { id: 2, name: "bananas" },
    { id: 3, name: "cherries" }
];

export function getItems() { 
    return items.map(item => ({ ...item }));
}

export function getById(id) {
    const item = items.find(item => item.id === id);
    return item ? { ...item } : undefined;
}
