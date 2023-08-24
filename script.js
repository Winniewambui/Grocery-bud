import { showAlert } from "./alertModule.js";

const addInput = document.querySelector(".grocery-form");
const submitBtn = document.querySelector("#submit-btn");
const groceryList = document.querySelector(".grocery-list");

//function how to create item in the grocery list
function addItemToGroceryList(itemText) {
  let item = document.createElement("article"); //creating elements

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
  groceryList.appendChild(item); //  Appending elements
}
//adding item to grocery list
addInput.addEventListener("submit", function (e) {
  e.preventDefault();
  let userInput = addInput.querySelector("#add-inputItem").value;

  addItemToGroceryList(userInput); // Add item to the grocery list= the userinput is what is being added to the list hence itemtext was just a random text we wanted to show something will be added

  let storedItems = JSON.parse(localStorage.getItem("userInput")) || []; // Retrieve existing items from local storage either if it has items or its an empty array

  storedItems.push(userInput); // Add the new item to the array
  localStorage.setItem("userInput", JSON.stringify(storedItems)); // Store the updated array in local storage

  addInput.querySelector("#add-inputItem").value = ""; // Clearing input
});

// Deleting and editing elements
function deleteItemFromLocalStorage() {
  let items = groceryList.querySelectorAll(".grocery-item");
  items.forEach((item) => {
    item.querySelector(".delete-btn").addEventListener("click", function (e) {
      const element = e.target.parentElement.parentElement.parentElement;
      let itemText = item.querySelector(".item-text").textContent;
      element.remove();

      let storedItems = JSON.parse(localStorage.getItem("userInput")) || []; // Retrieve existing items from local storage either if it has items or its an empty array
      storedItems = storedItems.filter((item) => item !== itemText);
      localStorage.setItem("userInput", JSON.stringify(storedItems));
      showAlert("Item deleted", "deleted"); // Pass 'deleted' as the action type
    });
  });
}

// edit each item
function editElementFromLocalStorage() {
  let inputField = addInput.querySelector("#add-inputItem");
  let items = groceryList.querySelectorAll(".grocery-item");

  items.forEach((item) => {
    item.querySelector(".edit-btn").addEventListener("click", function (e) {
      // let originalContent = editElement.textContent; // Store the original content
      // let element = e.target.parentElement.parentElement.previousSibling;
      console.log(element)
      
      let editedElementId = element.dataset.key; // Get the data-key value
      // console.log(editedElementId)
    //WRONG WRONG
      // let editElement = item.querySelector(".item-text").textContent;

      let storedItems = JSON.parse(localStorage.getItem("userInput")) || []; // Retrieve existing items from local storage

      

      if (inputField.value !== editElement) {
        inputField.value = editElement;
        submitBtn.textContent = "Edit"; // Change button text to "Edit"
      submitBtn.dataset.editId = editedElementId;// Set data-edit-id attribute
      
      let index = storedItems.findIndex(
        (item) => item.itemId === editedElementId
      ); // Find the index of the item to be edited

      if (index !== -1) {
        storedItems[index].itemText = inputField.value; // Update the item's content in local storage
        localStorage.setItem("userInput", JSON.stringify(storedItems)); // Store the updated array back in local storage
        editElement = inputField.value; // Update the item's content in the user interface

        showAlert("Item edited", "edited"); // Pass 'edited' as the action type

        inputField.value = "";
        submitBtn.textContent = "Submit";
      }
    }
    });
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
  deleteItemFromLocalStorage(storedItems);
  editElementFromLocalStorage(storedItems);
});
