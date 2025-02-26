import { optionGet } from "./requestOptions.mjs";

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
