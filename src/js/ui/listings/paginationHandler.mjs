import { fetchListings } from "../../api/listing.mjs";
import { API_LISTINGS } from "../../constants.mjs";

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
    page: currentPage + 1, // Checking the next page
    _seller: true,
    _bids: true,
    _active: true,
  });

  if (searchValue) {
    params.append("q", searchValue);
  } else if (selectedTag) {
    params.append("_tag", selectedTag); // Ensure it's _tag if it's category-based
  }

  const newUrl = `${API_LISTINGS}?${params}`;

  console.log("Next page check URL:", newUrl); // Debugging log

  const nextPageListings = await fetchListings(newUrl);

  if (!nextPageListings || !nextPageListings.data) {
    return false; // No next page if no data
  }

  return nextPageListings.data.length > 0;
}
