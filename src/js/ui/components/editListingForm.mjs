import { updateListing } from "../../api/editListing.mjs";
import { populateEditForm } from "./populateEditForm.mjs";

/**
 * Handles the form for editing a listing. Retrieves listing details, populates the form, and allows users to update the listing.
 * Validates the form, updates the listing on submission, and provides error feedback if needed.
 *
 * @listens submit - Handles form submission and updates the listing.
 * @listens click - Toggles visibility of additional image inputs.
 */

const form = document.getElementById("createListingForm");
const errorContainer = document.getElementById("errorContainer");
const errorMessage = document.getElementById("errorMessage");

// Function to get additional images
function getAdditionalImages() {
  const images = [];
  document.querySelectorAll("#imageInputs input").forEach((input) => {
    const url = input.value.trim();
    if (url) {
      images.push({ url, alt: "Additional image" });
    }
  });
  return images;
}

// Get listing ID from URL
const listingId = new URLSearchParams(window.location.search).get("id");

// If ID exists, populates the form
if (listingId) {
  populateEditForm(listingId);
} else {
  console.error("No listing ID found.");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("itemTitle").value.trim();
  const description = document.getElementById("itemDescription").value.trim();
  const imageUrl = document.getElementById("itemImage").value.trim();
  const imageAlt = document.getElementById("imageAlt").value.trim();
  const category = document.getElementById("itemCategory").value;

  const tags = [category.toLowerCase()];
  const additionalImages = getAdditionalImages();
  const media = [{ url: imageUrl, alt: imageAlt }, ...additionalImages];

  const updatedListing = {
    title,
    description,
    tags,
    media,
  };

  errorMessage.textContent = "";
  errorContainer.classList.add("hidden");

  if (!title || !imageUrl) {
    errorMessage.textContent = "Please fill in all required fields.";
    errorContainer.classList.remove("hidden");
    return;
  }

  try {
    const response = await updateListing(listingId, updatedListing);
    if (response) {
      sessionStorage.setItem("itemUpdated", "true");
      window.location.href = "/";
    } else {
      errorMessage.textContent = "Failed to update listing.";
      errorContainer.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error updating listing:", error);
    errorMessage.textContent = error.message || "An error occurred.";
    errorContainer.classList.remove("hidden");
  }
});

// Toggle additional image inputs visibility
document.getElementById("addMoreImg").addEventListener("click", function () {
  const imageInputs = document.getElementById("imageInputs");
  const arrowIcon = document.getElementById("arrowIcon");

  imageInputs.classList.toggle("hidden");
  arrowIcon.classList.toggle("rotate-90");
  arrowIcon.classList.toggle("-rotate-90");
});
