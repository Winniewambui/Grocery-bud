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
  item.dataset.itemId = Date.now();

  // Creating delete and edit icons using innerHTML
  item.innerHTML = `
  <span class="item-text">${itemText}</span>
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
// clear all items added
const clearAllBtn = document.querySelector(".clear-btn");

clearAllBtn.addEventListener("click", clearAllItems);
function clearAllItems() {
  let AllItems = groceryList.querySelectorAll(".grocery-item");
  AllItems.forEach((item) => {
    item.remove();

    // Retrieve existing items from local storage either if it has items or its an empty array
    let storedItems = JSON.parse(localStorage.getItem("userInput")) || [];
    localStorage.clear();
    storedItems = [];
    showAlert("all items cleared"); // Pass 'deleted' as the action type
  });
}

window.addEventListener("DOMContentLoaded", function () {
  let storedItems = JSON.parse(localStorage.getItem("userInput")) || [];
  storedItems.forEach((item) => {
    addItemToGroceryList(item);
  });
  deleteItemFromLocalStorage(storedItems);
});

//edit each item
// let items = groceryList.querySelectorAll('.grocery-item')
// items.forEach(item => {
// item.querySelector('.edit-btn').addEventListener('click', function(e) {

//   let editElement = item.querySelector('.item-text');
//   let originalContent = editElement.textContent; // Store the original content

//   let inputField = addInput.querySelector('#add-inputItem');

//   if (inputField.value !== originalContent) {
//     inputField.value = originalContent;
//     submitBtn.textContent = "Edit"; // Change button text to "Edit"
//   }

//   showAlert('Item edited', 'edited'); // Pass 'edited' as the action type

// });
// });
