import { formatBidTime } from "../../utils/formatBidTime.mjs";
import { formatTimeLeft } from "../../utils/formatTimer.mjs";
import { getHighestBid } from "../../utils/getHighestBid.mjs";

export function renderListingCard(listing, template, cardWrapper) {
  const clone = template.content.cloneNode(true);

  clone.querySelector(".date-posted").textContent = formatBidTime(
    listing.updated
  );

  const listingTitleElement = clone.querySelector(".listing-title");
  listingTitleElement.textContent = listing.title;
  listingTitleElement.setAttribute("title", listing.title);

  const { highestBid } = getHighestBid(listing.bids);
  clone.querySelector(".price").textContent = `Highest Bid: $${
    highestBid !== null ? highestBid : "N/A"
  }`;
  clone.querySelector(".bids").textContent = `Bids: ${
    listing._count?.bids || 0
  }`;

  // Get the image element
  const listingImageElement = clone.querySelector(".listing-image");

  // Check if listing has an image and set it, otherwise leave default
  if (listing.media?.length > 0 && listing.media[0].url) {
    listingImageElement.src = listing.media[0].url;
    listingImageElement.alt = listing.title || "Listing Image";
  }

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
