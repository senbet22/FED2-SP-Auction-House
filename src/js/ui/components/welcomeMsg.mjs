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
