import { formatBidTime } from "../../utils/formatBidTime.mjs";
import { formatTimeLeft } from "../../utils/formatTimer.mjs";
import { loadSingleItem } from "../../api/fetchSingleListing.mjs";
import { getHighestBid } from "../../utils/getHighestBid.mjs";

export function populateItemDetails(item) {
  const template = document.getElementById("single-item-template");
  const mainContainer = document.querySelector("main");
  const singleItemCard = document.getElementById("singleItemCard");

  if (!template || !mainContainer || !singleItemCard) {
    console.error("Template or main container or placeholder not found!");
    return;
  }

  singleItemCard.style.display = "none";

  const clone = template.content.cloneNode(true);

  clone.querySelector("#itemName").textContent = item.title || "No Title";
  clone.querySelector("#itemUpdated").textContent = formatBidTime(item.updated);

  const imageElement = clone.querySelector("#itemImage");
  imageElement.src = item.media?.[0]?.url || "/public/placeholder.png";
  imageElement.alt = item.media?.[0]?.alt || "Item image";

  clone.querySelector("#itemDescription").textContent =
    item.description || "No description available.";

  const totalBids = item._count?.bids || 0;
  clone.querySelector("#itemTotalBids").textContent = `Bids: ${totalBids}`;

  const highestBid = getHighestBid(item.bids);
  const highestBidElement = clone.querySelector("#itemHighestBid");

  if (highestBid > 0) {
    highestBidElement.textContent = `Highest Bid: $${highestBid}`;
    highestBidElement.classList.remove("hidden");
  } else {
    highestBidElement.classList.add("hidden");
  }

  const timeLeftElement = clone.querySelector("#itemTimeLeft");
  const { time, expired } = formatTimeLeft(item.endsAt);
  timeLeftElement.textContent = expired ? "Auction Ended" : time;

  clone.querySelector("#itemCategory").textContent = `Category: ${
    item.tags?.join(", ") || "N/A"
  }`;

  const sellerAvatar = clone.querySelector("#sellerAvatar");
  sellerAvatar.src = item.seller?.avatar?.url || "/public/default-avatar.png";

  clone.querySelector("#sellerName").textContent =
    item.seller?.name || "Unknown Seller";

  document.title = item.title || "Auction House";

  mainContainer.innerHTML = "";
  mainContainer.appendChild(clone);
  console.log(item, "Heres the item");
}

const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get("id");

if (listingId) {
  loadSingleItem(listingId).then((data) => {
    if (data) {
      populateItemDetails(data.data);
    }
  });
} else {
  console.error("No listing ID found in URL.");
}
