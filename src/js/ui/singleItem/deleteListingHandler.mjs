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
  const successMessage = document.getElementById("deleteSuccessMessage");

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

        if (successMessage) {
          successMessage.classList.remove("hidden");
          successMessage.classList.remove("translate-x-full");
          successMessage.classList.add("translate-x-0");

          setTimeout(() => {
            window.location.href = "/"; // Redirect to homepage
          }, 2000);
        }
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    });
  }
}
