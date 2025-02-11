import { formatDate } from "../../utils/formatDate.mjs";
import { formatTimeLeft } from "../../utils/formatTimer.mjs";
import { handleImage } from "../components/imageHandle.mjs";
import { getHighestBid } from "../../utils/getHighestBid.mjs";

export function renderListingCard(listing, template, cardWrapper) {
  const clone = template.content.cloneNode(true);

  clone.querySelector(".seller-name").textContent =
    listing.seller?.name || "Unknown Seller";
  clone.querySelector(".date-posted").textContent = formatDate(listing.updated);

  const listingTitleElement = clone.querySelector(".listing-title");
  listingTitleElement.textContent = listing.title;
  listingTitleElement.setAttribute("title", listing.title);

  const highestBidAmount = getHighestBid(listing.bids);
  clone.querySelector(".price").textContent = `Highest Bid: $${
    highestBidAmount !== null ? highestBidAmount : "N/A"
  }`;
  clone.querySelector(".bids").textContent = `Bids: ${
    listing._count?.bids || 0
  }`;

  const sellerAvatar = clone.querySelector(".seller-avatar");
  sellerAvatar.src = listing.seller?.avatar?.url || "auctionHouse.png";

  const listingImageElement = clone.querySelector(".listing-image");
  handleImage(listingImageElement, listing.media?.[0]?.url || null);

  const timeLeftElement = clone.querySelector(".time-left");
  const { time, expired } = formatTimeLeft(listing.endsAt);
  timeLeftElement.textContent = time;

  if (expired) {
    timeLeftElement.classList.remove("bg-primary");
    timeLeftElement.classList.add("bg-accent");
    clone.querySelector(".item-action").textContent = "View Item";
  }

  const listingCard = clone.querySelector(".listing-card");
  listingCard.setAttribute("data-listing-id", listing.id);

  cardWrapper.appendChild(clone);
}
