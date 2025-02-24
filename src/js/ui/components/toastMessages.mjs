// Welcome message upon Login.

(function () {
  const showMessage = sessionStorage.getItem("showWelcomeMessage");
  const user = JSON.parse(sessionStorage.getItem("auctionProfile"));

  if (showMessage && user) {
    const welcomeMessage = document.querySelector(".welcome-message.hidden");

    if (welcomeMessage) {
      welcomeMessage.classList.remove("hidden");

      document.getElementById("userAvatar").src =
        user.avatar?.url || "/auctionHouse.png";
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

if (sessionStorage.getItem("itemDeleted") === "true") {
  const deleteMessage = document.getElementById("deleteSucessMessage");

  if (deleteMessage) {
    // Show message
    deleteMessage.classList.remove("hidden", "translate-x-full");
    deleteMessage.classList.add("translate-x-0");

    // Hide message after 2 seconds
    setTimeout(() => {
      deleteMessage.classList.remove("translate-x-0");
      deleteMessage.classList.add("translate-x-full");

      // Clear sessionStorage after transition
      setTimeout(() => {
        sessionStorage.removeItem("itemDeleted");
        deleteMessage.classList.add("hidden");
      }, 500); // Wait for transition to complete
    }, 2000);
  }
}
