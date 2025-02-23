import { formatBidTime } from "../../utils/formatBidTime.mjs";

/**
 * Toggles the visibility of the bid history container and displays the bid history for the given item.
 * @param {Object} item - The item for which the bid history is to be displayed.
 */
export function toggleBidHistory(item) {
  const bidHistoryButton = document.getElementById("bidHistoryButton");
  const bidHistoryContainer = document.getElementById("bidHistoryContainer");
  const bidHistoryText = document.getElementById("bidHistoryText");

  bidHistoryButton.addEventListener("click", () => {
    if (bidHistoryContainer.classList.contains("hidden")) {
      bidHistoryContainer.classList.remove("hidden");
      bidHistoryText.textContent = "Hide bid history";
      displayBidHistory(item);
    } else {
      bidHistoryContainer.classList.add("hidden");
      bidHistoryText.textContent = "Bid history";
    }
  });
}

/**
 * Displays the bid history for the given item, sorted by bid amount.
 * @param {Object} item - The item for which the bid history is to be displayed.
 */
function displayBidHistory(item) {
  const bidHistoryList = document.getElementById("bidHistoryList");

  if (!item || !item.bids || item.bids.length === 0) {
    bidHistoryList.innerHTML = "<p>No bids yet.</p>";
    return;
  }

  bidHistoryList.innerHTML = "";

  const sortedBids = item.bids.sort((a, b) => b.amount - a.amount);

  const headerRow = document.createElement("div");
  headerRow.classList.add(
    "flex",
    "border-b",
    "border-gray-300",
    "pb-2",
    "mb-2"
  );

  const bidderHeader = document.createElement("div");
  bidderHeader.classList.add("w-1/2", "p-2", "text-lg", "font-semibold");
  bidderHeader.textContent = "Bidder";
  headerRow.appendChild(bidderHeader);

  const amountHeader = document.createElement("div");
  amountHeader.classList.add("w-1/4", "p-2", "text-lg", "font-semibold");
  amountHeader.textContent = "Amount";
  headerRow.appendChild(amountHeader);

  const timeHeader = document.createElement("div");
  timeHeader.classList.add("w-1/4", "p-2", "text-lg", "font-semibold");
  timeHeader.textContent = "Bid Time";
  headerRow.appendChild(timeHeader);

  bidHistoryList.appendChild(headerRow);

  sortedBids.forEach((bid) => {
    const clone = document
      .getElementById("bidHistoryTemplate")
      .content.cloneNode(true);

    clone.querySelector("#bidderName").textContent =
      bid.bidder?.name || "Unknown Bidder";
    clone.querySelector("#bidAmount").textContent = `$${bid.amount || 0}`;
    clone.querySelector("#bidTime").textContent = formatBidTime(bid.created);

    bidHistoryList.appendChild(clone);
  });
}
