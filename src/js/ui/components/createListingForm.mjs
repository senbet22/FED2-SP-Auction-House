import { fetchListings } from "../../api/createListing.mjs";

const form = document.getElementById("createListingForm");
const errorContainer = document.getElementById("errorContainer");
const errorMessage = document.getElementById("errorMessage");

/**
 * Handles the form submission to create a new listing.
 * @param {Event} event - The submit event.
 */
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("itemTitle").value.trim();
  const description = document.getElementById("itemDescription").value.trim();
  const imageUrl = document.getElementById("itemImage").value.trim();
  const imageAlt = document.getElementById("imageAlt").value.trim();
  const listingTime = document.getElementById("listingTime").value;
  const category = document.getElementById("itemCategory").value;

  const tags = [category.toLowerCase()];

  const newListing = {
    title: title,
    description: description,
    tags: tags,
    media: [
      {
        url: imageUrl,
        alt: imageAlt,
      },
    ],
    endsAt: getEndTime(listingTime),
  };

  errorMessage.textContent = "";
  errorContainer.classList.add("hidden");

  if (!title || !imageUrl || !listingTime) {
    errorMessage.textContent = "Please fill in all required fields.";
    errorContainer.classList.remove("hidden");
    return;
  }

  try {
    const response = await fetchListings(newListing);
    if (response) {
      alert("Listing created successfully!");
      window.location.href = "/";
    } else {
      errorMessage.textContent = "Failed to create listing.";
      errorContainer.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error creating listing:", error);
    errorMessage.textContent = error.message || "An error occurred.";
    errorContainer.classList.remove("hidden");
  }
});

/**
 * Calculates the end time for a listing based on the selected duration.
 * @param {string} listingTime - The listing time duration ("24H", "30Days", "60Days", or "90Days").
 * @returns {string} - The calculated end time in ISO format.
 */
function getEndTime(listingTime) {
  const now = new Date();
  let endDate = new Date(now);

  switch (listingTime) {
    case "24H":
      endDate.setHours(now.getHours() + 24);
      break;
    case "30Days":
      endDate.setMonth(now.getMonth() + 1);
      break;
    case "60Days":
      endDate.setMonth(now.getMonth() + 2);
      break;
    case "90Days":
      endDate.setMonth(now.getMonth() + 3);
      break;
    default:
      endDate = now;
  }

  return endDate.toISOString();
}
