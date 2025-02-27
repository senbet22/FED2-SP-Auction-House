import { register } from "../../auth/register.mjs";

/**
 * Handles the registration form submission, validates user input, and registers the user.
 * Displays error messages for invalid input and success message upon successful registration.
 * Handles specific error cases such as name, email, or password issues.
 *
 * @listens submit - Submits the registration form, validates input, and registers the user.
 */

const form = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email-register");
const passwordInput = document.getElementById("password-register");
const errorContainer = document.getElementById("errorContainer");
const errorMessage = document.getElementById("errorMessage");

const errorNameContainer = document.getElementById("errorNameContainer");
const errorEmailContainer = document.getElementById("errorEmailContainer");
const errorPassContainer = document.getElementById("errorPassContainer");

const errorNameMessage = document.getElementById("errorNameMessage");
const errorEmailMessage = document.getElementById("errorEmailMessage");
const errorPassMessage = document.getElementById("errorPassMessage");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  errorNameMessage.textContent = "";
  errorEmailMessage.textContent = "";
  errorPassMessage.textContent = "";
  errorContainer.classList.add("hidden");
  errorNameContainer.classList.add("hidden");
  errorEmailContainer.classList.add("hidden");
  errorPassContainer.classList.add("hidden");

  let valid = true;

  if (!name) {
    errorNameMessage.textContent = "Name is required!";
    errorNameContainer.classList.remove("hidden");
    valid = false;
  } else if (!/^[\w]+$/.test(name)) {
    errorNameMessage.textContent =
      "Invalid name. Only letters, numbers, and the underscore (_) are permitted.";
    errorNameContainer.classList.remove("hidden");
    valid = false;
  }

  if (!email) {
    errorEmailMessage.textContent = "Email is required!";
    errorEmailContainer.classList.remove("hidden");
    valid = false;
  } else if (!/^[\w\-.]+@(stud\.)?noroff\.no$/.test(email)) {
    errorEmailMessage.textContent =
      "Please enter a valid email address (noroff.no or stud.noroff.no).";
    errorEmailContainer.classList.remove("hidden");
    valid = false;
  }

  if (!password) {
    errorPassMessage.textContent = "Password is required!";
    errorPassContainer.classList.remove("hidden");
    valid = false;
  } else if (password.length < 8) {
    errorPassMessage.textContent =
      "Password must be at least 8 characters long.";
    errorPassContainer.classList.remove("hidden");
    valid = false;
  }

  if (!valid) {
    errorContainer.classList.remove("hidden");
    errorMessage.textContent = "Please fix the errors above and try again.";
    return;
  }

  try {
    const userData = await register({
      name,
      email,
      password,
    });

    const successAlert = document.getElementById("RegsuccessAlert");
    successAlert.classList.remove("hidden");

    setTimeout(() => {
      successAlert.classList.add("hidden");
      location.reload();
    }, 2300);
  } catch (error) {
    console.error("Registration failed:", error);

    errorPassMessage.textContent = error.message;
    errorPassContainer.classList.remove("hidden");

    // Handle specific cases separately if needed
    if (error.message.includes("Name")) {
      errorNameMessage.textContent = "Name is required. Please provide a name.";
      errorNameContainer.classList.remove("hidden");
    } else if (error.message.includes("Email")) {
      errorEmailMessage.textContent =
        "Email already registered. Please use a different one.";
      errorEmailContainer.classList.remove("hidden");
    } else if (error.message.includes("Password")) {
      errorPassMessage.textContent = "Password does not meet the requirements.";
      errorPassContainer.classList.remove("hidden");
    }
  }
});
