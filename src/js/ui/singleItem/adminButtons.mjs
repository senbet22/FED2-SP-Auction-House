/**
 * Uses a MutationObserver to detect when the admin buttons are added to the DOM.
 * If the seller's name matches the user's profile name, the admin buttons are displayed.
 */

export function showAdminButton(sellerName) {
  const auctionProfile = JSON.parse(sessionStorage.getItem("auctionProfile"));
  const adminButtonsContainer = document.getElementById(
    "adminButtonsContainer"
  );

  if (!auctionProfile) {
    console.error("Auction profile not found in sessionStorage.");
    return;
  }

  if (!adminButtonsContainer) {
    console.error("Admin buttons container not found.");
    return;
  }

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const adminButtons = document.getElementById("adminButtons");

        if (adminButtons) {
          // Compare sellerName with auctionProfile.name
          if (sellerName === auctionProfile.name) {
            adminButtons.classList.remove("hidden");
            adminButtons.classList.add("flex");
            console.log(
              "Admin buttons are now visible because the seller name matches the auction profile name."
            );
          } else {
            console.log("Seller name does not match auction profile name.");
          }

          observer.disconnect();
        }
      }
    }
  });

  observer.observe(adminButtonsContainer, {
    childList: true,
    subtree: true,
  });
}
