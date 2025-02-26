/**
 * Handles the switching between login and register forms. Toggles the active state of the buttons and displays the corresponding form.
 *
 * @listens click - Switches between login and register forms and updates button styles.
 */

// Get buttons
const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");

// Get forms
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

function setActiveButton(activeButton, inactiveButton) {
  activeButton.classList.add("bg-primary", "text-background");
  activeButton.classList.remove("bg-background");

  inactiveButton.classList.add("bg-background");
  inactiveButton.classList.remove("bg-primary", "text-background");
}

loginButton.addEventListener("click", () => {
  loginForm.style.display = "block";
  registerForm.style.display = "none";

  setActiveButton(loginButton, registerButton);
});

registerButton.addEventListener("click", () => {
  registerForm.style.display = "block";
  loginForm.style.display = "none";

  setActiveButton(registerButton, loginButton);
});

loginButton.click();
