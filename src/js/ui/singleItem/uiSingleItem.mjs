import { toggleBidHistory } from "./bidHistory.mjs";
import { formatBidTime } from "../../utils/formatBidTime.mjs";
import { formatTimeLeft } from "../../utils/formatTimer.mjs";
import { loadSingleItem } from "../../api/singleListing.mjs";
import { getHighestBid } from "../../utils/getHighestBid.mjs";
import {
  updateImageOpacity,
  handleImageClick,
  handleNextImage,
  handlePrevImage,
} from "./carouselHandler.mjs";
import { setupSellerListingsModal } from "./sellerListings.mjs";
import { handleEditButtonClick } from "./editListingHandler.mjs";
import { handleDeleteButtonClick } from "./deleteListingHandler.mjs";

/**
 * Populates the item details on the page including images, descriptions, bid information,
 * seller information, and other relevant data. It handles dynamic behaviors like
 * displaying seller listings, toggling bid history, and managing admin buttons based on access.
 */
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

  // --- Item info ---
  clone.querySelector("#itemName").textContent = item.title || "No Title";
  clone.querySelector("#itemUpdated").textContent = formatBidTime(item.updated);

  const imageElement = clone.querySelector("#itemImage");
  let currentIndex = 0;
  imageElement.src = item.media?.[0]?.url || "/imgnotfound.png";
  imageElement.alt = item.media?.[0]?.alt || "Item image";

  const imgArContainer = clone.querySelector("#imgArContainer");
  if (item.media?.length > 0) {
    item.media.forEach((media, index) => {
      const img = document.createElement("img");
      img.src = media.url;
      img.alt = media.alt || `Image ${index + 1}`;
      img.classList.add(
        "w-24",
        "h-24",
        "object-cover",
        "cursor-pointer",
        "mx-2",
        "transition-opacity",
        "duration-300"
      );

      img.addEventListener("click", (event) => {
        currentIndex = handleImageClick(
          event,
          currentIndex,
          imageElement,
          imgArContainer
        );
      });

      imgArContainer.appendChild(img);
    });
  }
  updateImageOpacity(imgArContainer, currentIndex);

  clone.querySelector("#nextImage").addEventListener("click", () => {
    currentIndex = handleNextImage(
      item,
      currentIndex,
      imageElement,
      imgArContainer
    );
  });
  clone.querySelector("#prevImage").addEventListener("click", () => {
    currentIndex = handlePrevImage(
      item,
      currentIndex,
      imageElement,
      imgArContainer
    );
  });

  clone.querySelector("#itemDescription").textContent =
    item.description || "No description available.";
  clone.querySelector("#itemTotalBids").textContent = `Bids: ${
    item._count?.bids || 0
  }`;

  // --- Bids ---
  const { highestBid } = getHighestBid(item.bids);
  const highestBidElement = clone.querySelector("#itemHighestBid");
  if (highestBid > 0) {
    highestBidElement.textContent = `Highest Bid: $${highestBid}`;
    highestBidElement.classList.remove("hidden");
  } else {
    highestBidElement.classList.add("hidden");
  }

  // --- Time left ---
  const timeLeftElement = clone.querySelector("#itemTimeLeft");
  const { time, expired } = formatTimeLeft(item.endsAt);
  timeLeftElement.textContent = expired ? "Auction Closed" : time;
  if (expired) {
    timeLeftElement.classList.remove("bg-primary");
    timeLeftElement.classList.add("bg-accent");
  }

  const categoryElement = clone.querySelector("#itemCategory");
  if (item.tags && item.tags.length > 0) {
    categoryElement.textContent = item.tags.map((tag) => `#${tag}`).join(" ");
  } else {
    categoryElement.textContent = "N/A";
  }

  // --- Seller ---
  const sellerName = item.seller?.name || "Unknown Seller";
  clone.querySelector("#sellerName").textContent = sellerName;
  const sellerAvatar = clone.querySelector("#sellerAvatar");
  sellerAvatar.src = item.seller?.avatar?.url || "/smallLogo.svg";

  document.title = item.title || "Auction House";

  mainContainer.innerHTML = "";
  mainContainer.appendChild(clone);

  handleEditButtonClick(item.id);

  // --- Admin buttons ---
  const auctionProfileString = sessionStorage.getItem("auctionProfile");
  const auctionProfile = auctionProfileString
    ? JSON.parse(auctionProfileString)
    : null;
  const adminBtn1 = document.getElementById("adminBtn1");
  const adminBtn2 = document.getElementById("adminBtn2");
  const accessToken = sessionStorage.getItem("token");

  if (auctionProfile && sellerName === auctionProfile.name) {
    adminBtn2.classList.remove("hidden");
    adminBtn2.classList.add("flex");
  }
  if (accessToken) {
    adminBtn1.classList.remove("hidden");
    adminBtn1.classList.add("flex");
  }

  // --- Seller listings modal ---
  const sellerListingsButton = document.getElementById("sellerListings");
  if (sellerName && sellerName !== "Unknown Seller") {
    sellerListingsButton.textContent = `More listings by ${sellerName}`;
    setupSellerListingsModal(sellerName);
  } else {
    console.error(
      "Seller name is missing or invalid. Cannot fetch seller listings."
    );
    sellerListingsButton.style.display = "none";
  }

  // --- Bid history + delete ---
  toggleBidHistory(item);

  if (accessToken) {
    handleDeleteButtonClick(item.id, accessToken);
  } else {
    console.error("No access token found.");
  }
}

// --- Load single item on page load ---
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
