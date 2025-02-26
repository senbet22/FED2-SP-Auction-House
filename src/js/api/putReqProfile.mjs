import { optionPut } from "./requestOptions.mjs";
import { getAuctionEndpoints } from "../constants.mjs";

/**
 * Sends a PUT request to update the user's profile with the provided data.
 * @param {Object} updatedProfile - The profile data to update (e.g., avatar, bio, etc.).
 * @returns {Promise<Object>} - A promise that resolves to the API response data.
 * @throws {Error} - Throws an error if the API request fails or the response is not successful.
 */

const MY_PROFILE_ENDPOINT = getAuctionEndpoints();

export async function updateUserProfile(updatedProfile) {
  const options = optionPut(updatedProfile);

  try {
    const response = await fetch(MY_PROFILE_ENDPOINT.API_MY_PROFILE, options);

    const responseBody = await response.json();

    if (!response.ok) {
      throw new Error(
        `${responseBody.statusCode}: ${responseBody.status}. ${responseBody.errors[0].message}`
      );
    }

    return responseBody;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}
