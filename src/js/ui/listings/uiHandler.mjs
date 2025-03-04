import { renderListingCard } from "./renderListingCard.mjs";
import { fetchListings } from "../../api/listing.mjs";
import { handleCardClick } from "./clickHandler.mjs";
import { API_LISTINGS } from "../../constants.mjs";
import { loadMoreBtn } from "./loadMoreBtn.mjs";
import { checkNextPageExists } from "./paginationHandler.mjs";

/**
 * Loads and renders listings based on the current page, selected tag, and search value.
 * Displays a skeleton loader while fetching data.
 *
 * @param {number} currentPage - The current page number to load listings from.
 * @param {string|null} tag - The selected tag to filter listings by (optional).
 * @param {string} [searchValue=""] - The search query to filter listings by (optional).
 * @returns {Promise<boolean>} - Returns a promise that resolves to `true` if listings are loaded successfully, `false` if no listings are found or an error occurs.
 */

let selectedTag = sessionStorage.getItem("selectedTag") || "";
let currentPage = 1;

loadListings(currentPage, selectedTag);

let searchTimeout;

const cardWrapper = document.getElementById("cardWrapper");

document.getElementById("search")?.addEventListener("input", (event) => {
  sessionStorage.removeItem("selectedTag");
  clearTimeout(searchTimeout);
  document.getElementById("category").selectedIndex = 0;

  searchTimeout = setTimeout(() => {
    const searchValue = event.target.value.trim();
    loadListings(1, null, searchValue);
  }, 300);

  cardWrapper
    .querySelectorAll(".listing-card")
    .forEach((card) => card.remove());
});

document.getElementById("category")?.addEventListener("change", (event) => {
  document.getElementById("search").value = "";
  selectedTag = event.target.value;
  sessionStorage.setItem("selectedTag", selectedTag);
  loadListings(1, selectedTag, "");
  location.reload();
});

loadMoreBtn();
checkNextPageExists();

export async function loadListings(currentPage, tag, searchValue = "") {
  if (isNaN(currentPage) || currentPage < 1) {
    console.error("Invalid currentPage value:", currentPage);
    return false;
  }

  const cardWrapper = document.getElementById("cardWrapper");
  if (!cardWrapper) {
    console.error("Card wrapper not found!");
    return;
  }

  // Shows skeleton loaders while fetching data
  showSkeletonLoaders(cardWrapper, 12);

  let listings = [];
  const params = new URLSearchParams({
    limit: 12,
    page: currentPage,
    _seller: true,
    _bids: true,
    _active: true,
  });

  if (searchValue) {
    params.append("q", searchValue);
    listings = await fetchListings(`${API_LISTINGS}/search?${params}`);
  } else if (tag) {
    params.append("_tag", tag);
    listings = await fetchListings(`${API_LISTINGS}?${params}`);
  } else {
    listings = await fetchListings(`${API_LISTINGS}?${params}`);
  }

  const { meta } = listings;

  const loadMoreButton = document.getElementById("loadMore");

  // Remove old No Results message if it exists
  document.getElementById("noResultsMessage")?.remove();

  // Removes skeleton loaders before handling results
  removeSkeletonLoaders(cardWrapper);

  if (!listings.data || listings.data.length === 0) {
    if (loadMoreButton) loadMoreButton.style.display = "none";

    // Create and append No Results message
    const message = document.createElement("p");
    message.id = "noResultsMessage";
    message.textContent =
      "Unfortunately, no listings were found that match your criteria.";
    message.classList.add(
      "text-center",
      "justify-center",
      "text-xl",
      "text-text",
      "my-26"
    );

    cardWrapper.appendChild(message);
    return false;
  }

  const template = document.getElementById("listing-template");

  if (!template) {
    console.error("Template not found in the DOM!");
    return false;
  }

  listings.data.forEach((listing) => {
    renderListingCard(listing, template, cardWrapper);
  });

  handleCardClick();
  document.getElementById("category").value = selectedTag;

  await checkNextPageExists(meta.currentPage, tag, searchValue);

  if (meta.nextPage === null) {
    if (loadMoreButton) loadMoreButton.style.display = "none";
    sessionStorage.removeItem("selectedTag");
  } else if (loadMoreButton) {
    loadMoreButton.style.display = "block";
  }

  return true;
}

/**
 * Displays skeleton loader cards while data is being fetched.
 *
 * @param {HTMLElement} container - The container where skeleton loaders should be added.
 * @param {number} [count=6] - The number of skeleton loader cards to display.
 */
function showSkeletonLoaders(container, count = 6) {
  const skeletonTemplate = document.getElementById("skeleton-template");
  if (!skeletonTemplate) return;

  for (let i = 0; i < count; i++) {
    const skeletonClone = skeletonTemplate.content.cloneNode(true);
    container.appendChild(skeletonClone);
  }
}

/**
 * Removes skeleton loader cards after data has been loaded.
 *
 * @param {HTMLElement} container - The container from which skeleton loaders should be removed.
 */

function removeSkeletonLoaders(container) {
  container
    .querySelectorAll(".skeleton-card")
    .forEach((skeleton) => skeleton.remove());
}
