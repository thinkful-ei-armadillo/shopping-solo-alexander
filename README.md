# Extended Shopping List Features - Base Requirements Complete

### Structure of the updated STORE:
* To determine whether an item's name is being edited, check it's 'editing' variable.
* To determine if the 'search' filter should be applied, check the 'search.enabled' variable.
  * To determine *what* the search term is for the filter, check the 'search.term' variable.
* To determine if the 'hide completed' filter should be applied, check the 'hideChecked' variable.
* Index now only determines an entries position on the screen. Check, Delete and Edit functionality determine which list item to edit based on their 'id' saved in the 'items.id' variable.
