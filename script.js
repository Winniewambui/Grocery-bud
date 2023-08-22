import { showAlert } from "./alertModule.js";


const addInput = document.querySelector(".grocery-form");
const submitBtn = document.querySelector("#submit-btn");
const groceryList = document.querySelector(".grocery-list");

//function how to create item in the grocery list
function addItemToGroceryList(itemText) {
  //creating elements
  let item = document.createElement("article");

  item.classList.add("grocery-item"); // Adding classes
  // Assign a unique ID to the item
  const itemId = Date.now();
  item.dataset.key = itemId;
  // item.setAttribute('data-key', 'itemId')

  // Creating delete and edit icons using innerHTML
  item.innerHTML =
   `
  <span id ="${itemId}" class="item-text">${itemText}</span>
  <div class="button-container">
    <button class="edit-btn" id="edit-btn">
      <i class="bi bi-pencil-square"></i>
    </button>
    <button class="delete-btn" id="delete-btn">
      <i class="bi bi-trash"></i>
    </button>
  </div>
`;
  //  Appending elements
  groceryList.appendChild(item);
}
//how to add item to grocery list
addInput.addEventListener("submit", function (e) {
  e.preventDefault();
  let userInput = addInput.querySelector("#add-inputItem").value;

  // Add item to the grocery list= the userinput is what is being added to the list hence itemtext was just a random text we wanted to show something will be added
  addItemToGroceryList(userInput);

  // Retrieve existing items from local storage either if it has items or its an empty array
  let storedItems = JSON.parse(localStorage.getItem("userInput")) || [];

  // Add the new item to the array
  storedItems.push(userInput);
  // Store the updated array in local storage
  localStorage.setItem("userInput", JSON.stringify(storedItems));

  // Clearing input
  addInput.querySelector("#add-inputItem").value = "";
});

// Deleting and editing elements
function deleteItemFromLocalStorage() {
  let items = groceryList.querySelectorAll(".grocery-item");
  items.forEach((item) => {
    item.querySelector(".delete-btn").addEventListener("click", function (e) {
      const element = e.target.parentElement.parentElement.parentElement;
      let itemText = item.querySelector(".item-text").textContent;
      element.remove();

      // Retrieve existing items from local storage either if it has items or its an empty array
      let storedItems = JSON.parse(localStorage.getItem("userInput")) || [];
      storedItems = storedItems.filter((item) => item !== itemText);
      localStorage.setItem("userInput", JSON.stringify(storedItems));
      showAlert("Item deleted", "deleted"); // Pass 'deleted' as the action type
    });
  });
}
// edit each item
function editElementFromLocalStorage(){
  let inputField = addInput.querySelector('#add-inputItem');
  let items = groceryList.querySelectorAll('.grocery-item')

  items.forEach(item => {
  item.querySelector('.edit-btn').addEventListener('click', function(e) {
  
    // let originalContent = editElement.textContent; // Store the original content
    let element = e.target.parentElement.parentElement.parentElement;
    let editedElementId = element.dataset.key;// Get the data-key value
    let editElement = item.querySelector('.item-text').textContent;

  
    // if (inputField.value !== editElement) {
    //   inputField.value = editElement;
    //   submitBtn.textContent = "Edit"; // Change button text to "Edit"
      // submitBtn.dataset.editId = editedElementId;// Set data-edit-id attribute
       // Use prompt to get the new value from the user
       const newValue = prompt('Enter the new value for the item:', editElement);

       if (newValue !== null && newValue !== editElement) {
         item.querySelector('.item-text').textContent = newValue;
         submitBtn.textContent = "Edit"; // Change button text to "Edit"
       }
// Retrieve existing items from local storage
    let storedItems = JSON.parse(localStorage.getItem("userInput")) || [];
    // Find the index of the item to be edited
    let index = storedItems.findIndex(item => item.itemId === editedElementId);
  
    if( index !== -1){
      // Update the item's content in local storage
    storedItems[index].itemText = inputField.value;
        // Store the updated array back in local storage
    localStorage.setItem("userInput", JSON.stringify(storedItems));
 // Update the item's content in the user interface
    editElement = inputField.value;


    showAlert('Item edited', 'edited'); // Pass 'edited' as the action type

 
  inputField.value = "";
  submitBtn.textContent = "Submit";
  submitBtn.removeAttribute("data-edit-id"); // Reset data-edit-id attribute

 }
});
  });
}
// clear all items added
const clearAllBtn = document.querySelector(".clear-btn");

clearAllBtn.addEventListener("click", clearAllItems);
function clearAllItems() {
  groceryList.innerHTML = ""; // Clear the list in the UI

    // Retrieve existing items from local storage either if it has items or its an empty array
    let storedItems = JSON.parse(localStorage.getItem("userInput")) || [];
  localStorage.removeItem("userInput");// Clear all items from local storage
  showAlert("All items cleared"); // Pass 'deleted' as the action type
}


window.addEventListener("DOMContentLoaded", function () {
  let storedItems = JSON.parse(localStorage.getItem("userInput")) || [];
  storedItems.forEach((item) => {
    addItemToGroceryList(item);
  });
  deleteItemFromLocalStorage(storedItems);
  editElementFromLocalStorage(storedItems)
});



// const currentTime = Date.now();
// console.log(currentTime);

