import { API_LISTINGS } from "../constants.mjs";

async function fetchListings() {
  try {
    const response = await fetch(API_LISTINGS);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Listings:", data);
  } catch (error) {
    console.error("Failed to fetch listings:", error);
  }
}

fetchListings();
