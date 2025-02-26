import { optionGet } from "./requestOptions.mjs";

/**
 * Fetches listings from the provided URL.
 * @param {string} url - The URL to fetch the listings from.
 * @returns {Promise<Object[]>} A promise that resolves to the list of listings or an empty array if the request fails.
 */

export async function fetchListings(url) {
  try {
    const response = await fetch(url, optionGet);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    return [];
  }
}
