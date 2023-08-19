export function showAlert(message, actionType) {
  const alert = document.querySelector(".alert");

  alert.textContent = message;

  // Set the text color dynamically based on the action type
  if (actionType === "deleted") {
    alert.style.color = "red";
  } else if (actionType === "edited") {
    alert.style.color = "green";
  } else {
    alert.style.color = "black"; // Default color
  }

  alert.classList.add("show");
  setTimeout(() => {
    alert.classList.remove("show");
    alert.style.color = ""; // Reset text color
  }, 2000);
}
