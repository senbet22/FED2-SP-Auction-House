import { optionGetProfile } from "../../api/requestOptions.mjs";
import { formatBidTime } from "../../utils/formatBidTime.mjs";
import { formatTimeLeft } from "../../utils/formatTimer.mjs";
import { API_PROFILES } from "../../constants.mjs";

/**
 * Fetches a seller's listings excluding the current listing by its ID.
 * @param {string} sellerName - The name of the seller whose listings are to be fetched.
 * @throws {Error} - Throws an error if no valid seller name is provided or if the access token is missing.
 *  It populates the seller card with the filtered listings and handles errors if the access token is missing.
 */

export async function fetchSellerListings(sellerName) {
  if (!sellerName || sellerName === "Unknown Seller") {
    console.error("No valid seller name found.");
    return;
  }

  const accessToken = sessionStorage.getItem("token");
  if (!accessToken) {
    throw new Error("No access token found. Please log in again.");
  }

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
    const listingId = getCurrentListingId();

    const filteredListings = data.filter((listing) => listing.id !== listingId);

    populateSellerCard(filteredListings);
  } catch (error) {
    console.error("Error fetching seller listings:", error);
  }
}

function getCurrentListingId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

function populateSellerCard(listings) {
  const sellerCard = document.getElementById("sellerCard");
  if (!sellerCard) {
    console.error("sellerCard not found in the DOM.");
    return;
  }

  sellerCard.innerHTML = "";

  if (listings.length === 0) {
    const noListingsMessage = document.createElement("p");
    noListingsMessage.textContent = "No listings found";
    sellerCard.appendChild(noListingsMessage);
    return;
  }

  listings.forEach((listing) => {
    const sellerTemplate = document.getElementById("sellerTemplate");
    if (!sellerTemplate) {
      console.error("sellerTemplate not found in the DOM.");
      return;
    }

    const listingElement = sellerTemplate.content.cloneNode(true);

    listingElement.querySelector(".listing-title").textContent =
      listing.title || "N/A";
    listingElement.querySelector(".listing-image").src =
      listing.media?.[0]?.url || "placeholder";

    const { time, expired } = formatTimeLeft(listing.endsAt);
    listingElement.querySelector(".time-left").textContent = `Ends in: ${time}`;

    if (expired) {
      listingElement.querySelector(".time-left").classList.remove("bg-primary");
      listingElement.querySelector(".time-left").classList.add("bg-accent");
    }

    const updatedTime = formatBidTime(listing.updated);
    listingElement.querySelector(
      ".updated-time"
    ).textContent = `Updated time: ${updatedTime}`;

    listingElement.querySelector("a").href = `?id=${listing.id}`;

    sellerCard.appendChild(listingElement);
  });
}
