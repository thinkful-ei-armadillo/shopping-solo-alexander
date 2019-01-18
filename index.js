'use strict';

const STORE = {
    hideChecked: false,
    search: { enabled: false, term: '' },
    items: [
        { id: '1932942', name: 'Apple', checked: false },
        { id: '6838193', name: 'Banana', checked: true }
    ]
};

//Functions to handle rendering the shopping-list:
function generateListItemString(item, index) {
    return `
        <li data-item-index="${index}" data-item-id="${item.id}">
            <button class="edit-name-button">E</button>
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

//Function to handle filtering checked items from the list:
function handleCheckedItemFilter() {
    $('.js-checked-item-filter').change(function() {
        toggleCheckedItemFilter();
        renderShoppingList();
    });
}

function toggleCheckedItemFilter() {
    STORE.hideChecked = !STORE.hideChecked;
}

//Functions to handle searching the item list:
function handleSearchItemFilter() {
    $('#js-search-list-controls').submit(event => {
        event.preventDefault();
        const searchTerm = $('.js-search-list-entry').val();
        event.currentTarget.reset();
        if (searchTerm !== '') {
            enableSearchItemFilter(searchTerm);
            toggleCancelSearchButton();
            renderShoppingList();
        } else {
            alert('Make sure to enter the name of the item to search for!');
        }
    });
    $('.js-cancel-search').click(() => {
        disableSearchItemFilter();
        toggleCancelSearchButton();
        renderShoppingList();
    });
}

function toggleCancelSearchButton() {
    $('.js-cancel-search').toggleClass('hidden', !STORE.search.enabled);
}

function enableSearchItemFilter(searchTerm) {
    STORE.search.enabled = true;
    STORE.search.term = searchTerm;
}

function disableSearchItemFilter() {
    STORE.search.enabled = false;
    STORE.search.term = '';
}

//Functions to apply the filters to the shopping-list:
function applyCheckedItemListFilter(shoppingList) {
    //grabs the state of the checkFilter and apply it to the renderfunction
    return shoppingList.filter(item => {
        return (STORE.hideChecked) ? !item.checked : true;
    });
}

function applySearchItemListFilter(shoppingList,searchTerm) {
    return shoppingList.filter(item => {
        return (STORE.search.enabled) ? item.name.includes(STORE.search.term) : true;
    });
}

function generateFullShoppingListString(shoppingList) {
    //apply various filters:
    let visibleList = applyCheckedItemListFilter(shoppingList);
    visibleList = applySearchItemListFilter(visibleList);
    //return the filtered list's string:
    return visibleList.map((item, index) => generateListItemString(item, index)).join('');
}

function renderShoppingList(store = STORE) {
    const fullItemListString = generateFullShoppingListString(store.items);
    $('.js-shopping-list').html(fullItemListString);
}

//Functions to handle adding a new list item:
function handleAddingNewItem() {
    $('#js-shopping-list-form').submit(event => {
        event.preventDefault();
        const itemName = $('.js-shopping-list-entry').val();
        event.currentTarget.reset();
        if (itemName !== '') {
            addItemToShoppingList(itemName);
            renderShoppingList();
        } else {
            alert('Make sure to give your new item a name!');
        }
    });
}

//Functions to handle the unique IDs:
function generateUniqueId() {
    //generate a unique id, check it against the other ids so there are no two being the same.
    let uid = 0;
    let unique = false; 
    while (unique === false) {
        uid = Math.random().toString().substring(2,9);
        if (confirmUniqueId(uid)) {
            unique = true;
        }
    }
    return uid;
}

function confirmUniqueId(uid) {
    for (let i = 0; i < STORE.items.length; i++) {
        if (uid === STORE.items[i].id) { return false; }
    }
    return true;
}

function addItemToShoppingList(itemName) {
    const uid = generateUniqueId();
    STORE.items.push({id: uid, name: itemName, checked: false});
}

//Function to grab the item index:
function grabItemIndex(itemId) {
    return STORE.items.findIndex(x => x.id === itemId);
}

function grabItemId(target) {
    return $(target).closest('li').attr('data-item-id');
}

//Functions to handle checking an item on the list:
function handleCheckingListItem() {
    $('.shopping-list').on('click', '.shopping-item-toggle', function() {
        const itemId = grabItemId(this);
        toggleListItemCheck(itemId);
        renderShoppingList();
    });
}

function toggleListItemCheck(itemId) {
    const itemIndex = grabItemIndex(itemId);
    STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

//Functions to handle deleting an item on the list:
function handleDeletingListItem() {
    $('.shopping-list').on('click', '.shopping-item-delete', function() {
        const itemId = grabItemId(this);
        deleteListItem(itemId);
        renderShoppingList();
    });
}

function deleteListItem(itemId) {
    const itemIndex = grabItemIndex(itemId);
    STORE.items.splice(itemIndex,1);
}

//Functions to handle editing the name of a list item:
function handleEditListItemName() {
    //when you press the button toggle the visiblity of the name and toggle the visibility of the input form (includes text input and button to submit).
    //take the val of the input field on submit and edit the name of the appropriate item in the STORE
    //rerender the list
}

//Main Function:
function main() {
    renderShoppingList();
    handleAddingNewItem();
    handleCheckingListItem();
    handleDeletingListItem();
    handleCheckedItemFilter();
    handleSearchItemFilter();
}

$(main);