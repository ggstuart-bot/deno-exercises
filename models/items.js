const items = [
    { id: 1, label: "apples" },
    { id: 2, label: "bananas" },
    { id: 3, label: "cherries" }
];

export function getItems() { 
    return items;
}

export function getItem(id) {
    return items.find(item => item.id === id);
}