import { API_LISTINGS } from "../constants.mjs";
import { optionPut } from "./requestOptions.mjs";

/**
 * Sends a PUT request to update an existing listing.
 * @param {string} listingId - The ID of the listing to update.
 * @param {Object} updateData - The updated listing data.
 * @returns {Promise<Object>} - A promise that resolves to the API response data.
 * @throws {Error} - Throws an error if the API request fails.
 */

export async function updateListing(listingId, updateData) {
  try {
    const url = `${API_LISTINGS}/${listingId}`;
    const options = optionPut(updateData);

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `${errorData.statusCode}: ${errorData.status}. ${errorData.errors[0].message}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Failed to update listing:", error);
    throw error;
  }
}
