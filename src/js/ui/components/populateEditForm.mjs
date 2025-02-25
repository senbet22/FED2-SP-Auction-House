import { loadSingleItem } from "../../api/singleListing.mjs"; // Import API function

export async function populateEditForm(listingId) {
  try {
    const data = await loadSingleItem(listingId);

    if (!data || !data.data) {
      console.error("Listing data not found.");
      return;
    }

    const item = data.data;

    // Populate form fields with existing listing details
    document.getElementById("itemTitle").value = item.title || "";
    document.getElementById("itemDescription").value = item.description || "";
    document.getElementById("itemImage").value = item.media?.[0]?.url || "";
    document.getElementById("imageAlt").value = item.media?.[0]?.alt || "";
    document.getElementById("itemCategory").value = item.tags?.[0] || "";

    // Populate additional images
    const imageInputsContainer = document.getElementById("imageInputs");
    const allInputs = imageInputsContainer.querySelectorAll("input");

    let existingImages = item.media?.slice(1) || []; // All images except the main one

    existingImages.forEach((media, index) => {
      if (allInputs[index]) {
        allInputs[index].value = media.url;
      }
    });

    console.log("Edit form populated with:", item);
  } catch (error) {
    console.error("Error fetching listing details:", error);
  }
}
