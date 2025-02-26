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

// Toast for Item deleted
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

// Toast for Item created - (re-use of the delete Toast)
if (sessionStorage.getItem("itemCreated") === "true") {
  const createMessage = document.getElementById("deleteSucessMessage");
  const successText = document.getElementById("deleteSucessText");

  if (createMessage && successText) {
    successText.textContent = "Listing created successfully!";

    createMessage.classList.remove("hidden", "translate-x-full");
    createMessage.classList.add("translate-x-0");

    setTimeout(() => {
      createMessage.classList.remove("translate-x-0");
      createMessage.classList.add("translate-x-full");

      setTimeout(() => {
        sessionStorage.removeItem("itemCreated");
        createMessage.classList.add("hidden");
      }, 500);
    }, 2000);
  }
}

// Toast for Item Edited - (re-use of the delete Toast)
if (sessionStorage.getItem("itemUpdated") === "true") {
  const createMessage = document.getElementById("deleteSucessMessage");
  const successText = document.getElementById("deleteSucessText");

  if (createMessage && successText) {
    successText.textContent = "Listing updated successfully!";

    createMessage.classList.remove("hidden", "translate-x-full");
    createMessage.classList.add("translate-x-0");

    setTimeout(() => {
      createMessage.classList.remove("translate-x-0");
      createMessage.classList.add("translate-x-full");

      setTimeout(() => {
        sessionStorage.removeItem("itemUpdated");
        createMessage.classList.add("hidden");
      }, 500);
    }, 2000);
  }
}

// Toast for Logout Success - (re-use of the delete Toast)
if (sessionStorage.getItem("logout") === "true") {
  const createMessage = document.getElementById("deleteSucessMessage");
  const successText = document.getElementById("deleteSucessText");

  if (createMessage && successText) {
    successText.textContent = "You are now logged out!";

    createMessage.classList.remove("hidden", "translate-x-full");
    createMessage.classList.add("translate-x-0");

    setTimeout(() => {
      createMessage.classList.remove("translate-x-0");
      createMessage.classList.add("translate-x-full");

      setTimeout(() => {
        sessionStorage.removeItem("logout"); // Remove logout flag after showing message
        createMessage.classList.add("hidden");
      }, 500);
    }, 2000);
  }
}
