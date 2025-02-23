import { API_LISTINGS } from "../constants.mjs";
import { optionPost } from "./requestOptions.mjs";

/**
 * Sends a POST request to create a new listing.
 * @param {Object} postData - The data for the new listing.
 * @returns {Promise<Object>} - A promise that resolves to the API response data.
 * @throws {Error} - Throws an error if the API request fails.
 */

export async function fetchListings(postData) {
  try {
    const options = optionPost(postData);
    console.log("Fetching with options:", options); // Debugging log

    const response = await fetch(API_LISTINGS, options);
    console.log("Fetch response:", response); // Debugging log

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `${errorData.statusCode}: ${errorData.status}. ${errorData.errors[0].message}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Failed to create listing:", error);
    throw error;
  }
}
