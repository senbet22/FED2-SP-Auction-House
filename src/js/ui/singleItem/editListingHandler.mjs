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
          observer.disconnect(); // Stop observing once button is found
        }
      }
    }
  });

  // Observe changes in the entire document body (adjust if needed)
  observer.observe(document.body, { childList: true, subtree: true });
}
