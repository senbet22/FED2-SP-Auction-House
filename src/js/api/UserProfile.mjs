import { optionGetProfile } from "./requestOptions.mjs";
import { getAuctionEndpoints } from "../constants.mjs";

/**
 * Fetches the user's profile from the server using the access token.
 * - If no token is found, it skips the fetch operation and logs a warning.
 *
 * @returns {Promise<Object|null>} The user profile data if successful, or `null` if not found or an error occurs.
 */

const MY_PROFILE_ENDPOINT = getAuctionEndpoints();

export async function fetchUserProfile() {
  const accessToken = sessionStorage.getItem("token");

  if (!accessToken) {
    console.warn("No access token found. Skipping profile fetch.");
    return null;
  }

  const options = optionGetProfile(accessToken);

  try {
    const response = await fetch(MY_PROFILE_ENDPOINT.API_MY_PROFILE, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("User Profile:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

if (sessionStorage.getItem("token")) {
  fetchUserProfile();
}
