import { fetchListings } from "../../api/listing.mjs";
import { API_LISTINGS } from "../../constants.mjs";

/**
 * Checks if the next page of listings exists by making a request with the next page number.
 * @param {number} currentPage - The current page number.
 * @param {string} selectedTag - The selected tag for filtering listings.
 * @param {string} [searchValue=""] - The search query for filtering listings (optional).
 * @returns {Promise<boolean>} - Returns `true` if the next page exists, otherwise `false`.
 */

export async function checkNextPageExists(
  currentPage,
  selectedTag,
  searchValue = ""
) {
  if (isNaN(currentPage) || currentPage < 1) {
    return false;
  }

  const params = new URLSearchParams({
    limit: 12,
    page: currentPage + 1,
    _seller: true,
    _bids: true,
    _active: true,
  });

  if (searchValue) {
    params.append("q", searchValue);
  } else if (selectedTag) {
    params.append("_tag", selectedTag);
  }

  const newUrl = `${API_LISTINGS}?${params}`;

  console.log("Next page check URL:", newUrl);

  const nextPageListings = await fetchListings(newUrl);

  if (!nextPageListings || !nextPageListings.data) {
    return false;
  }

  return nextPageListings.data.length > 0;
}
