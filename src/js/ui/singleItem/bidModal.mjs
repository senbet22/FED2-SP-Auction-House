import { bidRequest } from "./bidHandler.mjs";

const observer = new MutationObserver(() => {
  const modal = document.getElementById("bidModal");
  const bidButton = document.getElementById("bidButton");
  const closeModalButton = document.getElementById("closeModal");
  const confirmBidButton = document.getElementById("confirmBid");
  const bidInput = document.getElementById("bidInput");
  const highestBidDisplay = document.getElementById("highestBidAmount");
  const yourBidDisplay = document.getElementById("yourBidAmount");

  if (bidButton && modal && closeModalButton && confirmBidButton) {
    // Opens modal when bidButton is clicked
    bidButton.addEventListener("click", () => {
      const highestBid = document
        .querySelector("#itemHighestBid")
        .textContent.replace(/\D/g, ""); // Extract numeric value
      highestBidDisplay.textContent = `$${highestBid || 0}`;
      yourBidDisplay.textContent = `$${bidInput.value || 0}`;
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });

    bidInput.addEventListener("input", () => {
      yourBidDisplay.textContent = `$${bidInput.value || 0}`;
    });

    closeModalButton.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.add("hidden");
      }
    });

    confirmBidButton.addEventListener("click", () => {
      const urlParams = new URLSearchParams(window.location.search);
      const itemId = urlParams.get("id");

      bidRequest(itemId).then((response) => {
        if (response) {
          console.log("Bid placed successfully:", response);

          highestBidDisplay.textContent = `$${response.amount}`;

          modal.classList.add("hidden");
        } else {
          console.log("Bid failed.");
        }
      });
    });

    observer.disconnect();
  }
});

// Observes the document for dynamic changes
observer.observe(document.body, { childList: true, subtree: true });
