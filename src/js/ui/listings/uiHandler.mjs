import { renderListingCard } from "./renderListingCard.mjs";
import { fetchListings } from "../../api/listing.mjs";
import { handleCardClick } from "./clickHandler.mjs";
import { API_LISTINGS } from "../../constants.mjs";
import { loadMoreBtn } from "./loadMoreBtn..mjs";
import { checkNextPageExists } from "./paginationHandler.mjs";

let selectedTag = sessionStorage.getItem("selectedTag") || "";
let currentPage = 1;

loadListings(currentPage, selectedTag);

document.getElementById("category")?.addEventListener("change", (event) => {
  selectedTag = event.target.value;
  sessionStorage.setItem("selectedTag", selectedTag);
  location.reload();
});

loadMoreBtn();

checkNextPageExists();

export async function loadListings(currentPage, tag) {
  // Ensure currentPage is valid before proceeding
  if (isNaN(currentPage) || currentPage < 1) {
    console.error("Invalid currentPage value:", currentPage);
    return false;
  }

  const params = new URLSearchParams({
    limit: 12,
    page: currentPage, // Current page
    _seller: true,
    _bids: true,
    _active: true,
  });

  if (tag) {
    params.append("_tag", tag);
  }

  const newUrl = `${API_LISTINGS}?${params}`;

  const listings = await fetchListings(newUrl);
  const loadMoreButton = document.getElementById("loadMore");

  if (!listings || listings.length === 0) {
    if (loadMoreButton) loadMoreButton.style.display = "none";
    return false;
  }

  const cardWrapper = document.getElementById("cardWrapper");
  const template = document.getElementById("listing-template");

  if (!cardWrapper || !template) {
    console.error("Template or card wrapper not found in the DOM!");
    return false;
  }

  // Render listings to the page
  listings.forEach((listing) => {
    renderListingCard(listing, template, cardWrapper);
  });

  handleCardClick();

  document.getElementById("category").value = selectedTag;

  // Check if there is a next page of listings
  const hasNextPage = await checkNextPageExists(currentPage, tag);

  if (!hasNextPage && loadMoreButton) {
    loadMoreButton.style.display = "none";
  } else if (loadMoreButton) {
    loadMoreButton.style.display = "block";
  }

  return true;
}
