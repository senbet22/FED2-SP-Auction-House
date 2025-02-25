export function showAdminButton(sellerName) {
  const auctionProfile = JSON.parse(sessionStorage.getItem("auctionProfile"));
  const adminButtonsContainer = document.getElementById(
    "adminButtonsContainer"
  );

  // Ensure auctionProfile and adminButtonsContainer are available
  if (!auctionProfile) {
    console.error("Auction profile not found in sessionStorage.");
    return;
  }

  if (!adminButtonsContainer) {
    console.error("Admin buttons container not found.");
    return;
  }

  // Set up MutationObserver to watch for when adminButtons are added to the DOM
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

          // Disconnect observer once the admin buttons have been handled
          observer.disconnect();
        }
      }
    }
  });

  // Start observing the adminButtonsContainer for changes in its children
  observer.observe(adminButtonsContainer, {
    childList: true, // Observe additions/removals of child elements
    subtree: true, // Observe changes in the entire subtree
  });
}
