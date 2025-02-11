import { fetchListings } from "../../api/fetchListing.mjs";
import { API_LISTINGS } from "../../constants.mjs";

// Ensure currentPage is a valid number before proceeding
export async function checkNextPageExists(currentPage, selectedTag) {
  if (isNaN(currentPage) || currentPage < 1) {
    return false;
  }

  const params = new URLSearchParams({
    limit: 12,
    page: currentPage + 1, // Checking next page
    _seller: true,
    _bids: true,
    _active: true,
  });

  if (selectedTag) {
    params.append("_tag", selectedTag);
  }

  const newUrl = `${API_LISTINGS}?${params}`;
  console.log("Next page check URL:", newUrl); // Debugging log

  const nextPageListings = await fetchListings(newUrl);
  console.log("Next page listings count:", nextPageListings.length); // Debugging log

  return nextPageListings && nextPageListings.length > 0;
}
