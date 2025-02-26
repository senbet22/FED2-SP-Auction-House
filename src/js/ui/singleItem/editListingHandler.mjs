/**
 * Handles the click event for the edit button, redirecting to the edit page for a specific listing.
 * Uses a MutationObserver to ensure the edit button is available before attaching the click event.
 */

export function handleEditButtonClick(listingId) {
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const editButton = document.getElementById("editBtn");

        if (editButton) {
          editButton.addEventListener("click", () => {
            window.location.href = `/item/edit/?id=${listingId}`;
          });

          console.log("Edit button found and event attached.");
          observer.disconnect();
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
