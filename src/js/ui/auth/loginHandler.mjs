import { login } from "../../auth/login.mjs";

const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email-login");
const passwordInput = document.getElementById("password-login");
const errorContainer = document.getElementById("loginErrorContainer");
const errorMessage = document.getElementById("loginErrorMessage");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  errorMessage.textContent = "";
  errorContainer.classList.add("hidden");

  try {
    const userData = await login({ email, password });

    console.log(userData);

    const { accessToken, ...user } = userData.data;

    sessionStorage.setItem("token", accessToken);
    sessionStorage.setItem("auctionProfile", JSON.stringify(user));

    // Store welcome message flag with timestamp (expires after 10 sec)
    sessionStorage.setItem(
      "showWelcomeMessage",
      JSON.stringify({ timestamp: Date.now() })
    );

    console.log("Login successful:", userData);
    window.location.href = "/";
  } catch (error) {
    console.error("Login failed:", error);
    errorMessage.textContent = error.message;
    errorContainer.classList.remove("hidden");
  }
});
