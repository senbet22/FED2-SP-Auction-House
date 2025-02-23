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
import { fetchSellerListings } from "./sellerListings.mjs";
import { handleDeleteButtonClick } from "./deleteListingHandler.mjs"; // Import the delete function

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
  let currentIndex = 0;

  imageElement.src = item.media?.[0]?.url || "/public/placeholder.png";
  imageElement.alt = item.media?.[0]?.alt || "Item image";

  const imgArContainer = clone.querySelector("#imgArContainer");
  if (item.media && item.media.length > 0) {
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

  const nextButton = clone.querySelector("#nextImage");
  nextButton.addEventListener("click", () => {
    currentIndex = handleNextImage(
      item,
      currentIndex,
      imageElement,
      imgArContainer
    );
  });

  const prevButton = clone.querySelector("#prevImage");
  prevButton.addEventListener("click", () => {
    currentIndex = handlePrevImage(
      item,
      currentIndex,
      imageElement,
      imgArContainer
    );
  });

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

  const sellerName = item.seller?.name || "Unknown Seller";
  clone.querySelector("#sellerName").textContent = sellerName;

  const sellerAvatar = clone.querySelector("#sellerAvatar");
  sellerAvatar.src = item.seller?.avatar?.url || "/public/default-avatar.png";

  document.title = item.title || "Auction House";

  mainContainer.innerHTML = "";
  mainContainer.appendChild(clone);

  console.log(item, "Here's the item");

  const sellerListingsButton = document.getElementById("sellerListings");

  if (
    sellerName &&
    sellerName.trim() !== "" &&
    sellerName !== "Unknown Seller"
  ) {
    sellerListingsButton.textContent = `More listings by ${sellerName}`;

    let listingsVisible = false; // A flag to track the visibility of the listings

    sellerListingsButton.addEventListener("click", () => {
      console.log(`Fetching listings for seller: ${sellerName}`); // Debugging

      // If the listings are currently visible, hide them and set the flag to false
      if (listingsVisible) {
        const sellerCard = document.getElementById("sellerCard");
        if (sellerCard) {
          sellerCard.style.display = "none"; // Hide the listings
        }
        sellerListingsButton.textContent = `More listings by ${sellerName}`; // Change button text
        listingsVisible = false;
      } else {
        // If listings are not visible, fetch and display them
        fetchSellerListings(sellerName);
        const sellerCard = document.getElementById("sellerCard");
        if (sellerCard) {
          sellerCard.style.display = "block"; // Show the listings
        }
        sellerListingsButton.textContent = `Hide listings by ${sellerName}`; // Change button text
        listingsVisible = true;
      }
    });
  } else {
    console.error(
      "Seller name is missing or invalid. Cannot fetch seller listings."
    );
    sellerListingsButton.style.display = "none"; // Hide the button if no seller is available
  }

  toggleBidHistory(item);

  // Call the delete function, passing the listingId and accessToken
  const accessToken = sessionStorage.getItem("token"); // Assuming the token is stored in sessionStorage
  const listingId = item.id;

  if (accessToken) {
    handleDeleteButtonClick(listingId, accessToken); // Setup the delete button functionality
  } else {
    console.error("No access token found.");
  }
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
