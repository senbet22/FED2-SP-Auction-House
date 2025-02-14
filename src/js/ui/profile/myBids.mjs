import { optionGetProfile } from "../../api/requestOptions.mjs";
import { getAuctionEndpoints } from "../../constants.mjs";
import { formatTimeLeft } from "../../utils/formatTimer.mjs";
import { formatBidTime } from "../../utils/formatBidTime.mjs";
import { getHighestBid } from "../../utils/getHighestBid.mjs";

const MY_BIDS_ENDPOINT = getAuctionEndpoints().API_MY_BIDS;

export async function fetchUserBids() {
  const accessToken = sessionStorage.getItem("token");
  if (!accessToken) {
    throw new Error("No access token found. Please log in again.");
  }

  const options = optionGetProfile(accessToken);

  try {
    const response = await fetch(`${MY_BIDS_ENDPOINT}?_listings=true`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch bids: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Bids Data:", data.data);

    if (!data.data.length) {
      console.warn("No bids found for this user.");
      return;
    }

    displayBids(data.data);
  } catch (error) {
    console.error("Error fetching user bids:", error);
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
    imageElement.src =
      bid.listing.media?.[0]?.url || "/public/auctionHouse.png";
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

    const leadingBidElement = clone.querySelector(".leading-bid");
    if (expired) {
      leadingBidElement.style.display = "none"; // Hide if auction expired
    } else {
      leadingBidElement.textContent = `Leading bid: $${
        getHighestBid(bid.listing.bids) || "N/A"
      }`;
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
