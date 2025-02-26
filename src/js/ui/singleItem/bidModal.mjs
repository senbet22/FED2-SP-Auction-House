/**
 * Observes the document for dynamic changes and attaches event listeners to elements
 * to manage the bid modal behavior, including opening, closing, and updating bid values.
 */

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
        .textContent.replace(/\D/g, "");
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

    observer.disconnect();
  }
});

// Observes the document for dynamic changes
observer.observe(document.body, { childList: true, subtree: true });
