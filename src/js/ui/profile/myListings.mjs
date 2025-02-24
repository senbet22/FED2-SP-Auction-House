import { optionGetProfile } from "../../api/requestOptions.mjs";
import { getAuctionEndpoints } from "../../constants.mjs";
import { formatTimeLeft } from "../../utils/formatTimer.mjs";
import { formatBidTime } from "../../utils/formatBidTime.mjs";
import { getHighestBid } from "../../utils/getHighestBid.mjs";

const MY_PROFILE_ENDPOINT = getAuctionEndpoints();

export async function fetchUserListings() {
  const accessToken = sessionStorage.getItem("token");

  if (!accessToken) {
    throw new Error("No access token found. Please log in again.");
  }

  const options = optionGetProfile(accessToken);

  try {
    const response = await fetch(MY_PROFILE_ENDPOINT.API_MY_LISTINGS, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch listings: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Listing Data:", data.data);

    // List sorting
    const sortedListings = data.data.sort((a, b) => {
      const now = new Date();
      const dateA = new Date(a.endsAt);
      const dateB = new Date(b.endsAt);

      const isExpiredA = dateA < now ? 1 : 0;
      const isExpiredB = dateB < now ? 1 : 0;

      return isExpiredA - isExpiredB || dateB - dateA; // Active first, then newest at the top
    });

    displayListings(sortedListings);
  } catch (error) {
    console.error("Error fetching user listings:", error);
  }
}

function displayListings(listings) {
  const template = document.getElementById("listingTemplate");
  const listingCardContainer = document.getElementById("listingCard");

  listingCardContainer.innerHTML = "";

  listings.forEach((listing) => {
    const clone = template.content.cloneNode(true);

    const titleElement = clone.querySelector(".listing-title");
    titleElement.textContent = listing.title;
    titleElement.setAttribute("title", listing.title);

    const imageElement = clone.querySelector(".listing-image");
    imageElement.src = listing.media?.[0]?.url || "/public/auctionHouse.png";
    imageElement.alt = listing.media?.[0]?.alt || "Listing image";

    const bidsElement = clone.querySelector(".bids");
    bidsElement.textContent = `Bids: ${listing._count?.bids || 0}`;

    const categoryElement = clone.querySelector(".category");
    categoryElement.textContent = `Category: ${
      listing.tags?.join(", ") || "N/A"
    }`;

    const timeLeftElement = clone.querySelector(".time-left");
    const { time, expired } = formatTimeLeft(listing.endsAt);
    timeLeftElement.textContent = `${time}`;

    if (expired) {
      timeLeftElement.classList.remove("bg-primary");
      timeLeftElement.classList.add("bg-accent");
    }

    const highestBidElement = clone.querySelector(".price");
    const { highestBid } = getHighestBid(listing.bids);
    highestBidElement.textContent = `Highest Bid: $${
      highestBid !== null ? highestBid : "N/A"
    }`;

    const createdDateElement = clone.querySelector(".created-date");
    createdDateElement.textContent = formatBidTime(listing.created);

    const itemActionElement = clone.querySelector(".item-action");
    itemActionElement.href = `/item/?id=${listing.id}`;

    listingCardContainer.appendChild(clone);
  });
}

fetchUserListings();
