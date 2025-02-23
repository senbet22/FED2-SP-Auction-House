import { optionDelete } from "./requestOptions.mjs"; // Assuming optionDelete is in the requestOptions.mjs file
import { API_LISTINGS } from "../constants.mjs";

/**
 * Sends a DELETE request to remove a listing by its ID.
 * @param {string} listingId - The ID of the listing to delete.
 * @param {string} accessToken - The authentication token required for the request.
 * @returns {Promise<Object>} - A promise that resolves to the API response data.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function deleteListing(listingId, accessToken) {
  try {
    const response = await fetch(`${API_LISTINGS}/${listingId}`, {
      ...optionDelete,
      headers: {
        ...optionDelete.headers,
        Authorization: `Bearer ${accessToken}`, // Include the access token in the request headers
      },
    });

    // Check for success response: 204 No Content
    if (response.status === 204) {
      console.log("Item successfully deleted.");
      return; // No content expected, we can proceed
    } else {
      const errorData = await response.json();
      throw new Error(
        `${errorData.statusCode}: ${errorData.status}. ${errorData.errors[0].message}`
      );
    }
  } catch (error) {
    console.error("Failed to delete item:", error);
    throw error;
  }
}
