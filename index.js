'use strict';

const STORE = [
    { name: 'Apple', checked: false },
    { name: 'Banana', checked: true }
];

//Functions to handle rendering the shopping-list:

function generateListItemString(item, index) {
    return `
        <li item-index="${index}">
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
    //renders the shopping-list
    const fullItemListString = generateFullShoppingListString(store);
    $('.js-shopping-list').html(fullItemListString);
}

//Functions to handle adding a new list item:
function handleAddingNewItem() {
    //add item to the STORE or other list/array...
    //  needs to grab the input value from the form
    //  feed that to a function that add it into the list
    //rerender the shopping list on the DOM
    $('#js-shopping-list-form').submit(event => {
        event.preventDefault();
        const itemName = $('.js-shopping-list-entry').val();
        event.currentTarget.reset();
        addItemToShoppingList(itemName);
    });
}

function addItemToShoppingList(itemName) {
    STORE.push({name: itemName, checked: false});
}

//Functions to handle checking an item on the list:
function handleCheckingListItem() {
    //adds the 'checked' class to the text
    //grab the index of the item we clicked
    //toggle the 'checked' variable in the shopping-list
    //rerender the shopping-list on the DOM
    $('.shopping-list').on('click', '.shopping-item-toggle', event => {
      const itemIndex = $(event.currentTarget).closest('li').attr('item-index');
      STORE[itemIndex].checked = !STORE[itemIndex].checked;
      renderShoppingList();
    });
}

//Functions to handle deleting an item on the list:
function handleDeletingListItem() {
    //deletes the list them from the store
    //grab the index of the item we clicked
    //splice that index from the store
    //rerender the shopping-list on the DOM
}

//Main Function:
function main() {
    renderShoppingList();
    handleAddingNewItem();
    handleCheckingListItem();
    handleDeletingListItem();
    
}

$(main);