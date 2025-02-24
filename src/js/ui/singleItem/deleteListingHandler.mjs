import { deleteListing } from "../../api/deleteListing.mjs"; // Adjust the path accordingly

/**
 * Handles the delete button click event.
 * @param {string} listingId - The ID of the listing to delete.
 * @param {string} accessToken - The authentication token required for the request.
 */
export function handleDeleteButtonClick(listingId, accessToken) {
  const deleteBtn = document.getElementById("deleteBtn");
  const modal = document.getElementById("deleteModal");
  const confirmDeleteBtn = document.getElementById("confirmDelete");
  const cancelDeleteBtn = document.getElementById("cancelDelete");

  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      modal.classList.remove("hidden"); // Show modal
    });
  }

  if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener("click", () => {
      modal.classList.add("hidden"); // Hide modal
    });
  }

  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", async () => {
      try {
        await deleteListing(listingId, accessToken);
        modal.classList.add("hidden"); // Hide modal after deletion

        // Set itemDeleted flag in sessionStorage for toastMessage.
        sessionStorage.setItem("itemDeleted", "true");

        // Redirect to homepage immediately after deletion
        window.location.href = "/";
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    });
  }
}
