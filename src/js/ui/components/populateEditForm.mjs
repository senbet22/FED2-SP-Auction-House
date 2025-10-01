import { loadSingleItem } from "../../api/singleListing.mjs"; // Import API function

/**
 * Populates the edit form with details of a specific listing.
 * Retrieves listing data by ID and fills form fields (title, description, images, category).
 *
 * @param {string} listingId - The ID of the listing to populate the form.
 * @returns {boolean} - Returns true if form was populated successfully, false otherwise.
 */
export async function populateEditForm(listingId) {
  try {
    const data = await loadSingleItem(listingId);

    if (!data || !data.data) {
      console.error("Listing data not found.");
      return false;
    }

    const item = data.data;

    document.getElementById("itemTitle").value = item.title || "";
    document.getElementById("itemDescription").value = item.description || "";
    document.getElementById("itemImage").value = item.media?.[0]?.url || "";
    document.getElementById("imageAlt").value = item.media?.[0]?.alt || "";
    document.getElementById("itemCategory").value = item.tags?.[0] || "";

    // Populate additional images
    const imageInputsContainer = document.getElementById("imageInputs");
    const allInputs = imageInputsContainer.querySelectorAll("input");

    const existingImages = item.media?.slice(1) || [];

    existingImages.forEach((media, index) => {
      if (allInputs[index]) {
        allInputs[index].value = media.url;
      }
    });

    return true;
  } catch (error) {
    console.error("Error fetching listing details:", error);
    return false;
  }
}
