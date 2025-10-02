import { formatBidTime } from "../../utils/formatBidTime.mjs";

let bidHistoryInitialized = false;

/**
 * Opens the bid history modal and displays the bid history for the given item.
 * @param {Object} item - The item for which the bid history is to be displayed.
 */
export function toggleBidHistory(item) {
  const bidHistoryButton = document.getElementById("bidHistoryButton");
  const bidHistoryModal = document.getElementById("bidHistoryModal");
  const closeBidHistoryModal = document.getElementById("closeBidHistoryModal");

  if (!bidHistoryButton || !bidHistoryModal) {
    console.error("Bid history modal elements not found");
    return;
  }

  // Only add event listeners once
  if (!bidHistoryInitialized) {
    // Open modal on button click
    bidHistoryButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Opening bid history modal");
      displayBidHistory(item);
      bidHistoryModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });

    // Close modal on X button click
    closeBidHistoryModal.addEventListener("click", (e) => {
      e.preventDefault();
      bidHistoryModal.classList.add("hidden");
      document.body.style.overflow = "";
    });

    // Close modal when clicking on backdrop
    bidHistoryModal.addEventListener("click", (e) => {
      if (
        e.target === bidHistoryModal ||
        e.target === bidHistoryModal.firstElementChild
      ) {
        bidHistoryModal.classList.add("hidden");
        document.body.style.overflow = "";
      }
    });

    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !bidHistoryModal.classList.contains("hidden")) {
        bidHistoryModal.classList.add("hidden");
        document.body.style.overflow = "";
      }
    });

    bidHistoryInitialized = true;
  }
}

/**
 * Displays the bid history for the given item, showing only the top 8 highest bids.
 * @param {Object} item - The item for which the bid history is to be displayed.
 */
function displayBidHistory(item) {
  const bidHistoryList = document.getElementById("bidHistoryList");

  if (!bidHistoryList) {
    console.error("bidHistoryList not found");
    return;
  }

  if (!item || !item.bids || item.bids.length === 0) {
    bidHistoryList.innerHTML =
      '<p class="text-center text-gray-500 text-lg p-8">No bids yet.</p>';
    return;
  }

  bidHistoryList.innerHTML = "";

  // Sort bids in descending order and take only the top 8
  const sortedBids = item.bids.sort((a, b) => b.amount - a.amount).slice(0, 8);

  const table = document.createElement("div");
  table.classList.add("w-full");

  // Header Row
  const headerRow = document.createElement("div");
  headerRow.classList.add(
    "flex",
    "border-b-2",
    "border-gray-300",
    "pb-3",
    "mb-3",
    "bg-gray-100"
  );

  const bidderHeader = document.createElement("div");
  bidderHeader.classList.add(
    "w-1/2",
    "px-4",
    "text-lg",
    "font-bold",
    "text-gray-700"
  );
  bidderHeader.textContent = "Bidder";
  headerRow.appendChild(bidderHeader);

  const amountHeader = document.createElement("div");
  amountHeader.classList.add(
    "w-1/4",
    "px-4",
    "text-lg",
    "font-bold",
    "text-gray-700"
  );
  amountHeader.textContent = "Amount";
  headerRow.appendChild(amountHeader);

  const timeHeader = document.createElement("div");
  timeHeader.classList.add(
    "w-1/4",
    "px-4",
    "text-lg",
    "font-bold",
    "text-gray-700"
  );
  timeHeader.textContent = "Bid Time";
  headerRow.appendChild(timeHeader);

  table.appendChild(headerRow);

  // Bid Rows
  sortedBids.forEach((bid, index) => {
    const template = document.getElementById("bidHistoryTemplate");
    if (!template) {
      console.error("bidHistoryTemplate not found");
      return;
    }

    const clone = template.content.cloneNode(true);
    const row = clone.querySelector("div");

    if (index % 2 === 0) {
      row.classList.add("bg-gray-50");
    }

    clone.querySelector("#bidderName").textContent =
      bid.bidder?.name || "Unknown Bidder";
    clone.querySelector("#bidAmount").textContent = `$${bid.amount || 0}`;
    clone.querySelector("#bidTime").textContent = formatBidTime(bid.created);

    table.appendChild(clone);
  });

  bidHistoryList.appendChild(table);
}
