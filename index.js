'use strict';

const STORE = [
    { name: 'Apple', checked: false },
    { name: 'Banana', checked: true }
];

//Functions to handle rendering the shopping-list:
function generateListItemString(item, index) {
    return `
        <li data-item-index="${index}">
            <span class="shopping-item ${item.checked ? 'shopping-item__checked' : '' }">${item.name}</span>
            <div class="shopping-item-controls">
                <button class="shopping-item-toggle">
                    <span class="button-label">check</span>
                </button>
                <button class="shopping-item-delete">
                    <span class="button-label">delete</span>
                </button>
            </div>
        </li>`;
}

function generateFullShoppingListString(shoppingList) {
    return shoppingList.map((item, index) => generateListItemString(item, index)).join('');
}

function renderShoppingList(store = STORE) {
    const fullItemListString = generateFullShoppingListString(store);
    $('.js-shopping-list').html(fullItemListString);
}

//Functions to handle adding a new list item:
function handleAddingNewItem() {
    $('#js-shopping-list-form').submit(event => {
        event.preventDefault();
        const itemName = $('.js-shopping-list-entry').val();
        event.currentTarget.reset();
        addItemToShoppingList(itemName);
        renderShoppingList();
    });
}

function addItemToShoppingList(itemName) {
    STORE.push({name: itemName, checked: false});
}

//Function to grab the item index:
function grabItemIndex(target) {
    return $(target).closest('li').data('itemIndex');
}

//Functions to handle checking an item on the list:
function handleCheckingListItem() {
    $('.shopping-list').on('click', '.shopping-item-toggle', function() {
        const itemIndex = grabItemIndex(this);
        toggleListItemCheck(itemIndex);
        renderShoppingList();
    });
}

function toggleListItemCheck(itemIndex) {
    STORE[itemIndex].checked = !STORE[itemIndex].checked;
}

//Functions to handle deleting an item on the list:
function handleDeletingListItem() {
    $('.shopping-list').on('click', '.shopping-item-delete', function() {
        const itemIndex = grabItemIndex(this);
        deleteListItem(itemIndex);
        renderShoppingList();
    });
}

function deleteListItem(itemIndex) {
    STORE.splice(itemIndex,1);
}

//Main Function:
function main() {
    renderShoppingList();
    handleAddingNewItem();
    handleCheckingListItem();
    handleDeletingListItem();
}

$(main);