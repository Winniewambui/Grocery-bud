import { showAlert } from "./alertModule.js";

const addInput = document.querySelector(".grocery-form");
const submitBtn = document.querySelector("#submit-btn");
const groceryList = document.querySelector(".grocery-list");

// Function to create an item in the grocery list
function addItemToGroceryList(itemText) {
  let item = document.createElement("article"); // Creating elements

  item.classList.add("grocery-item"); // Adding classes
  const itemId = Date.now(); // Assign a unique ID to the item
  item.dataset.key = itemId;

  // Creating delete and edit icons using innerHTML
  item.innerHTML = `
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

  // Attach event listeners for edit and delete buttons
  const deleteButton = item.querySelector(".delete-btn");
  const editButton = item.querySelector(".edit-btn");

  deleteButton.addEventListener("click", () => {
    deleteItem(item);
  });

  editButton.addEventListener("click", () => {
    editItem(item);
  });

  groceryList.innerHTML = ''; // Clear the groceryList
  groceryList.appendChild(item); // Appending the edited item
}

// Adding item to grocery list
addInput.addEventListener("submit", function (e) {
  e.preventDefault();
  let userInput = addInput.querySelector("#add-inputItem").value.trim(); // Trim whitespace from the input

  if (userInput !== "") { // Check if userInput is not empty
    addItemToGroceryList(userInput); // Add item to the grocery list

    let storedItems = JSON.parse(localStorage.getItem("userInput")) || []; // Retrieve existing items from local storage either if it has items or it's an empty array

    storedItems.push(userInput); // Add the new item to the array
    localStorage.setItem("userInput", JSON.stringify(storedItems)); // Store the updated array in local storage

    addInput.querySelector("#add-inputItem").value = ""; // Clearing input
  }
});

// Deleting elements
function deleteItem(item) {
  let itemText = item.querySelector(".item-text").textContent;
  item.remove();

  let storedItems = JSON.parse(localStorage.getItem("userInput")) || []; // Retrieve existing items from local storage either if it has items or it's an empty array
  storedItems = storedItems.filter((storedItem) => storedItem !== itemText);
  localStorage.setItem("userInput", JSON.stringify(storedItems));
  showAlert("Item deleted", "deleted"); // Pass 'deleted' as the action type
}

// Edit elements
function editItem(item) {
  let inputField = addInput.querySelector("#add-inputItem");
  let editElement = item.querySelector(".item-text");
  let editedElementId = item.dataset.key;

  // Populate the input field with the item's text for editing
  inputField.value = editElement.textContent;

  localStorage.removeItem("userInput"); // Clear all items from local storage


  submitBtn.addEventListener("click", function editItemHandler() {
    let storedItems = JSON.parse(localStorage.getItem("userInput")) || [];
    let index = storedItems.findIndex((item) => item.itemId === editedElementId);

    if (index !== -1) {
      // Update the edited item's text in the groceryList
      editElement.textContent = inputField.value;

      // Update the edited item's text in local storage
      storedItems[index] = inputField.value;
      localStorage.setItem("userInput", JSON.stringify(storedItems));

      showAlert("Item edited", "edited");
      inputField.value = "";
      submitBtn.removeEventListener("click", editItemHandler); // Remove the event listener once editing is done
    }
  });
}



// clear all items added
const clearAllBtn = document.querySelector(".clear-btn");

clearAllBtn.addEventListener("click", clearAllItems);
function clearAllItems() {
  groceryList.innerHTML = ""; // Clear the list in the UI

  let storedItems = JSON.parse(localStorage.getItem("userInput")) || []; // Retrieve existing items from local storage either if it has items or its an empty array
  localStorage.removeItem("userInput"); // Clear all items from local storage
  showAlert("All items cleared"); // Pass 'deleted' as the action type
}

window.addEventListener("DOMContentLoaded", function () {
  let storedItems = JSON.parse(localStorage.getItem("userInput")) || [];
  storedItems.forEach((item) => {
    addItemToGroceryList(item);
  });
  // deleteItemFromLocalStorage(storedItems);
  // editElementFromLocalStorage(storedItems);
});
