import { optionGetProfile } from "../../api/requestOptions.mjs";
import { formatBidTime } from "../../utils/formatBidTime.mjs";
import { formatTimeLeft } from "../../utils/formatTimer.mjs";
import { API_PROFILES } from "../../constants.mjs";

let sellerListingsInitialized = false;

/**
 * Sets up the seller listings button to open a modal with the seller's listings.
 * @param {string} sellerName - The name of the seller whose listings are to be fetched.
 */
export function setupSellerListingsModal(sellerName) {
  const sellerListingsButton = document.getElementById("sellerListings");
  const sellerListingsModal = document.getElementById("sellerListingsModal");
  const closeSellerListingsModal = document.getElementById(
    "closeSellerListingsModal"
  );
  const sellerNameInModal = document.getElementById("sellerNameInModal");

  if (!sellerListingsButton || !sellerListingsModal) {
    console.error("Seller listings modal elements not found");
    return;
  }

  // Only add event listeners once
  if (!sellerListingsInitialized) {
    // Open modal on button click
    sellerListingsButton.addEventListener("click", async (e) => {
      e.preventDefault();
      console.log("Opening seller listings modal for:", sellerName);
      sellerNameInModal.textContent = sellerName || "Seller";
      sellerListingsModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";

      // Fetch and display listings
      await fetchSellerListings(sellerName);
    });

    // Close modal on X button click
    closeSellerListingsModal.addEventListener("click", (e) => {
      e.preventDefault();
      sellerListingsModal.classList.add("hidden");
      document.body.style.overflow = "";
    });

    // Close modal when clicking on backdrop
    sellerListingsModal.addEventListener("click", (e) => {
      if (
        e.target === sellerListingsModal ||
        e.target === sellerListingsModal.firstElementChild
      ) {
        sellerListingsModal.classList.add("hidden");
        document.body.style.overflow = "";
      }
    });

    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        !sellerListingsModal.classList.contains("hidden")
      ) {
        sellerListingsModal.classList.add("hidden");
        document.body.style.overflow = "";
      }
    });

    sellerListingsInitialized = true;
  }
}

/**
 * Fetches a seller's listings excluding the current listing by its ID.
 * @param {string} sellerName - The name of the seller whose listings are to be fetched.
 */
export async function fetchSellerListings(sellerName) {
  const sellerCard = document.getElementById("sellerCard");

  if (!sellerCard) {
    console.error("sellerCard not found in the DOM.");
    return;
  }

  if (!sellerName || sellerName === "Unknown Seller") {
    console.error("No valid seller name found.");
    sellerCard.innerHTML =
      '<p class="text-center text-gray-500 text-lg p-8 col-span-full">No valid seller found.</p>';
    return;
  }

  const accessToken = sessionStorage.getItem("token");
  if (!accessToken) {
    sellerCard.innerHTML =
      '<p class="text-center text-red-500 text-lg p-8 col-span-full">Please log in to view listings.</p>';
    console.error("No access token found. Please log in again.");
    return;
  }

  // Show loading state

  const options = optionGetProfile(accessToken);
  const sellerListingsEndpoint = `${API_PROFILES}/${sellerName}/listings`;

  const params = new URLSearchParams({
    limit: 5,
    _seller: true,
    _active: true,
  });

  try {
    const response = await fetch(
      `${sellerListingsEndpoint}?${params}`,
      options
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch seller listings: ${response.statusText}`
      );
    }

    const { data } = await response.json();
    console.log("Fetched listings:", data.length);

    const listingId = getCurrentListingId();
    const filteredListings = data.filter((listing) => listing.id !== listingId);

    populateSellerCard(filteredListings);
  } catch (error) {
    console.error("Error fetching seller listings:", error);
    sellerCard.innerHTML =
      '<p class="text-center text-red-500 text-lg p-8 col-span-full">Error loading listings. Please try again.</p>';
  }
}

function getCurrentListingId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

function populateSellerCard(listings) {
  const sellerCard = document.getElementById("sellerHistory");

  if (!sellerCard) {
    console.error("sellerCard not found in the DOM.");
    return;
  }

  sellerCard.innerHTML = "";

  if (listings.length === 0) {
    sellerCard.innerHTML =
      '<p class="text-center text-text/80 text-xl p-8 col-span-full">No other listings found from this seller.</p>';
    return;
  }

  console.log("Populating", listings.length, "listings");

  listings.forEach((listing) => {
    const sellerTemplate = document.getElementById("sellerHistoryTemplate");

    if (!sellerTemplate) {
      console.error("sellerTemplate not found in the DOM.");
      return;
    }

    const listingElement = sellerTemplate.content.cloneNode(true);

    // Set listing data
    listingElement.querySelector(".listing-title").textContent =
      listing.title || "N/A";
    listingElement.querySelector(".listing-image").src =
      listing.media?.[0]?.url || "/imgnotfound.png";
    listingElement.querySelector(".listing-image").alt =
      listing.title || "Listing Image";

    // Set time left
    const { time, expired } = formatTimeLeft(listing.endsAt);
    const timeLeftElement = listingElement.querySelector(".time-left");
    timeLeftElement.textContent = `Ends in: ${time}`;

    if (expired) {
      timeLeftElement.classList.remove("bg-primary");
      timeLeftElement.classList.add("bg-red-500");
    }

    // Set updated time
    const updatedTime = formatBidTime(listing.updated);
    listingElement.querySelector(
      ".updated-time"
    ).textContent = `Updated: ${updatedTime}`;

    // Set link
    listingElement.querySelector("a").href = `?id=${listing.id}`;

    sellerCard.appendChild(listingElement);
  });
}
