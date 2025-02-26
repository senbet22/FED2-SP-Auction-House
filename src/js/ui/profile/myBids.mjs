import { optionGetProfile } from "../../api/requestOptions.mjs";
import { getAuctionEndpoints } from "../../constants.mjs";
import { formatTimeLeft } from "../../utils/formatTimer.mjs";
import { formatBidTime } from "../../utils/formatBidTime.mjs";

/**
 * Fetches and displays the user's active bids.
 * Retrieves the user's bids from the server and displays the highest bid for each listing.
 * If no active bids are found, displays a message indicating so.
 * @async
 * @returns {Promise<void>} - A promise that resolves when the bids are fetched and displayed.
 */

const MY_BIDS_ENDPOINT = getAuctionEndpoints().API_MY_BIDS;

export async function fetchUserBids() {
  const accessToken = sessionStorage.getItem("token");
  if (!accessToken) {
    console.warn("No access token found. User not logged in.");
    return;
  }

  const options = optionGetProfile(accessToken);

  try {
    const response = await fetch(`${MY_BIDS_ENDPOINT}?_listings=true`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch bids: ${response.statusText}`);
    }

    const data = await response.json();
    const bidsCardContainer = document.getElementById("bidsCard");

    if (!data.data.length) {
      console.warn("No bids found for this user.");
      bidsCardContainer.innerHTML =
        "<p class='text-center text-text text-xl my-8'>You have not placed any bids yet.</p>";
      return;
    }

    const userHighestBids = new Map();

    data.data.forEach((bid) => {
      const listingId = bid.listing.id;
      const bidAmount = bid.amount;

      const endsAt = new Date(bid.listing.endsAt);
      const now = new Date();

      if (endsAt <= now) {
        return;
      }

      if (
        !userHighestBids.has(listingId) ||
        userHighestBids.get(listingId).amount < bidAmount
      ) {
        userHighestBids.set(listingId, bid);
      }
    });

    const filteredListings = Array.from(userHighestBids.values());

    if (filteredListings.length === 0) {
      console.warn("No active bids found for this user.");
      bidsCardContainer.innerHTML =
        "<p class='text-center text-text text-lg mt-4'>You have not placed any bids yet.</p>";
    } else {
      displayBids(filteredListings);
    }
  } catch (error) {
    console.error("Error fetching user bids:", error);
    document.getElementById("bidsCard").innerHTML =
      "<p class='text-center text-red-500 mt-4'>Error loading bids. Please try again later.</p>";
  }
}

function displayBids(bids) {
  const template = document.getElementById("bidsTemplate");
  const bidsCardContainer = document.getElementById("bidsCard");

  if (!template || !bidsCardContainer) {
    console.error("Bids template or container not found!");
    return;
  }

  bidsCardContainer.innerHTML = "";

  const uniqueBidders = new Set();

  bids.forEach((bid) => {
    if (!bid.listing) {
      console.warn("Bid does not contain listing information:", bid);
      return;
    }

    uniqueBidders.add(bid.bidder.name);

    const clone = template.content.cloneNode(true);

    const titleElement = clone.querySelector(".bids-title");
    titleElement.textContent = bid.listing.title || "No Title";

    const imageElement = clone.querySelector(".bids-image");
    imageElement.src = bid.listing.media?.[0]?.url || "/auctionHouse.png";
    imageElement.alt = bid.listing.media?.[0]?.alt || "Bids image";

    const categoryElement = clone.querySelector(".bids-category");
    categoryElement.textContent = `Category: ${
      bid.listing.tags?.join(", ") || "N/A"
    }`;

    const timeLeftElement = clone.querySelector(".time-left");
    const { time, expired } = formatTimeLeft(bid.listing.endsAt);
    timeLeftElement.textContent = `${time}`;

    if (expired) {
      timeLeftElement.classList.remove("bg-primary");
      timeLeftElement.classList.add("bg-accent");
    }

    const participantsElement = clone.querySelector(".participants");
    participantsElement.textContent = `Participants: ${uniqueBidders.size}`;

    const yourBidElement = clone.querySelector(".your-bid");
    yourBidElement.textContent = `Your bid: $${bid.amount}`;

    const bidTimeElement = clone.querySelector(".bid-time");
    if (bidTimeElement) {
      bidTimeElement.textContent = ` ${formatBidTime(bid.created)}`;
    }

    const viewItemElement = clone.querySelector(".bids-action");
    viewItemElement.href = `/item/?id=${bid.listing.id}`;

    bidsCardContainer.appendChild(clone);
  });
}
fetchUserBids();
