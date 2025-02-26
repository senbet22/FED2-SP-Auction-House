import { API_LISTINGS } from "../constants.mjs";

/**
 * Fetches a single item from the API by its ID.
 * - Retrieves the item data, including bids and seller information.
 *
 * @param {string} id - The ID of the item to fetch.
 * @returns {Promise<Object|null>} The item data if found, or null if the fetch fails or the item is not found.
 */

export async function loadSingleItem(id) {
  try {
    const response = await fetch(
      `${API_LISTINGS}/${id}?_bids=true&_seller=true`
    );

    if (!response.ok) {
      throw new Error("Item not found");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching item data:", error);
    return null;
  }
}
