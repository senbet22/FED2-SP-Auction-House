import { optionGetProfile } from "../../api/requestOptions.mjs";
import { getAuctionEndpoints } from "../../constants.mjs";
import { formatBidTime } from "../../utils/formatBidTime.mjs";

/**
 * Fetches and displays the user's auction wins.
 * If no wins are found, displays a message prompting the user to place bids.
 * If an error occurs during data fetching, an error message is shown.
 * Each win is displayed with details such as title, image, seller, category, winning bid, and time.
 */

const MY_WINS_ENDPOINT = getAuctionEndpoints().API_MY_WINS;

export async function fetchUserWins() {
  const accessToken = sessionStorage.getItem("token");

  if (!accessToken) {
    console.warn("No access token found. User not logged in.");
    return;
  }

  const options = optionGetProfile(accessToken);

  try {
    const response = await fetch(MY_WINS_ENDPOINT, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch wins: ${response.statusText}`);
    }

    const data = await response.json();
    const winsCardContainer = document.getElementById("winsCard");

    if (!data.data.length) {
      console.warn("No wins found for this user.");
      winsCardContainer.innerHTML =
        "<p class='text-center text-text text-xl my-8'>You do not have any wins at this time. Try placing some bids!</p>";
      return;
    }

    displayWins(data.data);
  } catch (error) {
    console.error("Error fetching user wins:", error);
    document.getElementById("winsCard").innerHTML =
      "<p class='text-center text-red-500 mt-4'>Error loading wins. Please try again later.</p>";
  }
}

function displayWins(wins) {
  const template = document.getElementById("winsTemplate");
  const winsCardContainer = document.getElementById("winsCard");

  if (!template || !winsCardContainer) {
    console.error("Wins template or container not found!");
    return;
  }

  winsCardContainer.innerHTML = "";

  wins.forEach((win) => {
    const clone = template.content.cloneNode(true);

    const titleElement = clone.querySelector(".wins-title");
    if (titleElement) {
      titleElement.textContent = win.title || "No Title";
    } else {
      console.warn("Title element not found in template!");
    }

    const imageElement = clone.querySelector(".wins-image");
    if (imageElement) {
      imageElement.src = win.media?.[0]?.url || "/smallLogo.svg";
      imageElement.alt = win.media?.[0]?.alt || "Win image";
    } else {
      console.warn("Image element not found in template!");
    }

    const sellerElement = clone.querySelector(".wins-seller");
    if (sellerElement) {
      sellerElement.textContent = `Seller: ${win.seller?.name || "N/A"}`;
    } else {
      console.warn("Seller element not found in template!");
    }

    const categoryElement = clone.querySelector(".wins-category");
    if (categoryElement) {
      categoryElement.textContent = `Category: ${
        win.tags?.join(", ") || "N/A"
      }`;
    } else {
      console.warn("Category element not found in template!");
    }

    const winningBidElement = clone.querySelector(".winning-bid");
    if (winningBidElement) {
      const highestBid = win.bids.reduce(
        (maxBid, currentBid) => {
          return currentBid.amount > maxBid.amount ? currentBid : maxBid;
        },
        { amount: 0 }
      );

      winningBidElement.textContent = `Winning bid: $${
        highestBid.amount || "N/A"
      }`;
    } else {
      console.warn("Winning bid element not found in template!");
    }

    const winDateElement = clone.querySelector(".win-time");
    if (winDateElement) {
      winDateElement.textContent = formatBidTime(win.endsAt);
    } else {
      console.warn("Created date element not found in template!");
    }

    const itemActionElement = clone.querySelector(".wins-action");
    if (itemActionElement) {
      itemActionElement.href = `/item/?id=${win.id}`;
    } else {
      console.warn("Item action element not found in template!");
    }

    winsCardContainer.appendChild(clone);
  });
}

fetchUserWins();
