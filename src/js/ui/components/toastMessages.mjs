/**
 * Handles user notifications and toast messages for various actions:
 * - Welcome message on login
 * - Success messages for item creation, update, deletion and authGuard.
 * - Logout success notification
 * All messages are shown using a sliding toast animation and cleared from sessionStorage after display.
 */

// Welcome message upon Login.
(function () {
  const showMessage = sessionStorage.getItem("showWelcomeMessage");
  const user = JSON.parse(sessionStorage.getItem("auctionProfile"));

  if (showMessage && user) {
    const welcomeMessage = document.querySelector(".welcome-message.hidden");

    if (welcomeMessage) {
      welcomeMessage.classList.remove("hidden");

      document.getElementById("userAvatar").src = user.avatar?.url || "/";
      document.getElementById(
        "userName"
      ).textContent = `Welcome back, ${user.name}!`;

      sessionStorage.removeItem("showWelcomeMessage");

      setTimeout(() => {
        welcomeMessage.remove();
      }, 3000);
    }
  }
})();

// List of sessionStorage keys and corresponding messages
const toastMessages = {
  itemDeleted: "Listing deleted successfully!",
  itemCreated: "Listing created successfully!",
  itemUpdated: "Listing updated successfully!",
  logout: "You are now logged out!",
  authGuard: "You must be logged in to access this page.",
};

// Loops through the toastMessages object and display the corresponding toast
Object.keys(toastMessages).forEach((key) => {
  if (sessionStorage.getItem(key) === "true") {
    const toastMessage = document.getElementById("deleteSucessMessage");
    const toastText = document.getElementById("deleteSucessText");

    if (toastMessage && toastText) {
      toastText.textContent = toastMessages[key];

      toastMessage.classList.remove("hidden", "translate-x-full");
      toastMessage.classList.add("translate-x-0");

      setTimeout(() => {
        toastMessage.classList.remove("translate-x-0");
        toastMessage.classList.add("translate-x-full");

        setTimeout(() => {
          sessionStorage.removeItem(key);
          toastMessage.classList.add("hidden");
        }, 500);
      }, 2000);
    }
  }
});
