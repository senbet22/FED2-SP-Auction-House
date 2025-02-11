import { API_LISTINGS } from "../../constants.mjs";

const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get("id");

if (listingId) {
  loadSingleItem(listingId).then((data) => {
    console.log(data);
  });
} else {
  console.error("No listing ID found in URL.");
}

export async function loadSingleItem(id) {
  try {
    const response = await fetch(`${API_LISTINGS}/${id}`);

    // Check if the response is OK
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
