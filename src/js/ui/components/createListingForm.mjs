import { fetchListings } from "../../api/createListing.mjs"; // Adjust the path accordingly

const form = document.getElementById("createListingForm");
const errorContainer = document.getElementById("errorContainer");
const errorMessage = document.getElementById("errorMessage");

// Function to get additional images
function getAdditionalImages() {
  const images = [];

  document.querySelectorAll("#imageInputs input").forEach((input) => {
    const url = input.value.trim();
    if (url) {
      images.push({ url, alt: "Additional image" }); // Default alt text; can be changed
    }
  });

  return images;
}

// Form submission event
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("itemTitle").value.trim();
  const description = document.getElementById("itemDescription").value.trim();
  const imageUrl = document.getElementById("itemImage").value.trim();
  const imageAlt = document.getElementById("imageAlt").value.trim();
  const listingTime = document.getElementById("listingTime").value;
  const category = document.getElementById("itemCategory").value;

  const tags = [category.toLowerCase()];

  // Collect additional images
  const additionalImages = getAdditionalImages();

  // Main image + additional images
  const media = [
    {
      url: imageUrl,
      alt: imageAlt,
    },
    ...additionalImages, // Spread operator to add more images
  ];

  const newListing = {
    title: title,
    description: description,
    tags: tags,
    media: media,
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
      // Set itemCreated flag in sessionStorage for toastMessage.
      sessionStorage.setItem("itemCreated", "true");

      // Redirect to homepage
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

// Toggle additional image inputs visibility
document.getElementById("addMoreImg").addEventListener("click", function () {
  const imageInputs = document.getElementById("imageInputs");
  const arrowIcon = document.getElementById("arrowIcon");

  imageInputs.classList.toggle("hidden");

  // Toggle rotation class for arrow icon
  arrowIcon.classList.toggle("rotate-90");
  arrowIcon.classList.toggle("-rotate-90");
});

// Check if itemCreated flag exists in sessionStorage
document.addEventListener("DOMContentLoaded", () => {
  const deleteSucessMessage = document.getElementById("deleteSucessMessage");
  const deleteSucessText = document.getElementById("deleteSucessText");

  // If itemCreated flag is found, display the success message
  if (sessionStorage.getItem("itemCreated") === "true") {
    deleteSucessText.textContent = "Listing created successfully!";
    deleteSucessMessage.classList.remove("hidden");
    deleteSucessMessage.classList.add("translate-x-0"); // Slide in animation

    // Hide success message after 3 seconds
    setTimeout(() => {
      deleteSucessMessage.classList.add("translate-x-full"); // Slide out animation
      setTimeout(() => {
        deleteSucessMessage.classList.add("hidden"); // Hide completely after sliding out
      }, 500); // Wait for the sliding out animation to complete
    }, 3000); // Message stays for 3 seconds

    // Remove the itemCreated flag after showing the success message
    sessionStorage.removeItem("itemCreated");
  }
});
