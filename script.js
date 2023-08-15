const addInput = document.querySelector('.grocery-form');
const submitBtn = document.querySelector('#submit-btn');
const groceryList = document.querySelector('.grocery-list');
const alert = document.querySelector('.alert');


//display the alert
function showAlert(message, actionType) {
  alert.textContent = message;

  // Set the text color dynamically based on the action type
  if (actionType === 'deleted') {
    alert.style.color = 'red';
  } else if (actionType === 'edited') {
    alert.style.color = 'green';
  } else {
    alert.style.color = 'black'; // Default color
  }

  alert.classList.add('show');
  setTimeout(() => {
    alert.classList.remove('show');
    alert.style.color = ''; // Reset text color
  }, 2000);
}
//Adding items on grocery list
addInput.addEventListener('submit', function (e) {
  e.preventDefault();
  let userInput = addInput.querySelector('#add-inputItem').value;

  //creating elements
  let item = document.createElement('article')

  // Adding classes
  item.classList.add('grocery-item');

  // Creating delete and edit icons using innerHTML
  item.innerHTML = `
                <span class="item-text">${userInput}</span>
                <div class="button-container">
                  <button class="edit-btn" id="edit-btn">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button class="delete-btn" id="delete-btn">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              
  `
  //  Appending elements
  groceryList.appendChild(item);

    // Clearing input
  addInput.querySelector("#add-inputItem").value = '';

 // Deleting and editing elements
item.querySelector('.delete-btn').addEventListener('click', function (e) {
  const element = e.target.parentElement.parentElement.parentElement;
  element.remove();

  showAlert('Item deleted', 'deleted'); // Pass 'deleted' as the action type

});

item.querySelector('.edit-btn').addEventListener('click', function(e) {

  let editElement = item.querySelector('.item-text');
  let originalContent = editElement.textContent; // Store the original content
  
  let inputField = addInput.querySelector('#add-inputItem');
 
  if (inputField.value !== originalContent) {
    inputField.value = originalContent;
    submitBtn.textContent = "Edit"; // Change button text to "Edit"
  } 
  // else {
  //   inputField.value = ''; // Clear input field
  //   submitBtn.textContent = "Submit"; // Change button text back to "Submit"
  // }

  showAlert('Item edited', 'edited'); // Pass 'edited' as the action type

});

  });
  
  //clear all items added
  const clearAllBtn = document.querySelector('.clear-btn');
  
 clearAllBtn.addEventListener('click', clearAllItems)
 function clearAllItems(){
  let AllItems = groceryList.querySelectorAll('.grocery-item');
  AllItems.forEach(item =>{
    item.remove();
  })
 }

//  function showAlert(message) {
//   alert.textContent = message;
//   alert.classList.add('show'); // Add the .show class to make the alert visible
//   setTimeout(() => {
//     alert.classList.remove('show'); // Remove the .show class to hide the alert
//   }, 2000);
// }