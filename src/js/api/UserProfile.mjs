import { optionGetProfile } from "./requestOptions.mjs";

import { getAuctionEndpoints } from "../constants.mjs";

const MY_PROFILE_ENDPOINT = getAuctionEndpoints();

export async function fetchUserProfile() {
  const accessToken = sessionStorage.getItem("token");

  if (!accessToken) {
    throw new Error("No access token found. Please log in again.");
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
  }
}
// Call the function to fetch the profile
fetchUserProfile();
