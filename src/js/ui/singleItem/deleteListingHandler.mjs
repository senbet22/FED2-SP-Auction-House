import { deleteListing } from "../../api/deleteListing.mjs";

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
      modal.classList.remove("hidden");
    });
  }

  if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", async () => {
      try {
        await deleteListing(listingId, accessToken);
        modal.classList.add("hidden");

        // Set itemDeleted flag in sessionStorage for toastMessage.
        sessionStorage.setItem("itemDeleted", "true");

        window.location.href = "/";
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    });
  }
}
