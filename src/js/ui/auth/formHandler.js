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
  // Show the login form and hide the register form
  loginForm.style.display = "block";
  registerForm.style.display = "none";

  // Update button styles
  setActiveButton(loginButton, registerButton);
});

registerButton.addEventListener("click", () => {
  // Show the register form and hide the login form
  registerForm.style.display = "block";
  loginForm.style.display = "none";

  // Update button styles
  setActiveButton(registerButton, loginButton);
});

// Default to showing the login form and setting login button as active
loginButton.click();
