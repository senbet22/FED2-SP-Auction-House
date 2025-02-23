import { API_LISTINGS } from "../constants.mjs";

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
