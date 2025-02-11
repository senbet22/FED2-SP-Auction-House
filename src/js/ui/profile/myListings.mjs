import { optionGetProfile } from "../../api/requestOptions.mjs";
import { getAuctionEndpoints } from "../../constants.mjs";

const MY_PROFILE_ENDPOINT = getAuctionEndpoints();

export async function fetchUserListings() {
  const accessToken = sessionStorage.getItem("token");

  if (!accessToken) {
    throw new Error("No access token found. Please log in again.");
  }

  const options = optionGetProfile(accessToken);

  try {
    const response = await fetch(MY_PROFILE_ENDPOINT.API_MY_LISTINGS, options);
    console.log(response);

    if (!response.ok) {
      throw new Error(`Failed to fetch listings: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    console.log("User Listings:", data);

    console.log(data.data);
  } catch (error) {
    console.error("Error fetching user listings:", error);
  }
}

// displayListings(data.data);

// function displayListings(listings) {
//   const listingContainer = document.getElementById("listingCard");
//   const template = document.querySelector(".bids-card"); // Select an existing listing card

//   if (!listingContainer || !template) {
//     console.error("Template or listing container not found!");
//     return;
//   }

//   listingContainer.innerHTML = ""; // Clear previous listings

//   listings.forEach((listing) => {
//     const clone = template.cloneNode(true); // Clone the entire listing card

//     clone.querySelector("h1").textContent = listing.title;
//     clone.querySelector("img").src =
//       listing.media[0]?.url || "/public/auctionHouse.png";
//     clone.querySelector("img").alt = listing.media[0]?.alt || "Listing image";
//     clone.querySelector(".listing-price").textContent = `Listing price: $${
//       listing.price || "N/A"
//     }`;
//     clone.querySelector(".listing-category").textContent = `Category: ${
//       listing.tags?.join(", ") || "N/A"
//     }`;
//     clone.querySelector(".listing-timer").textContent = `Ends at: ${new Date(
//       listing.endsAt
//     ).toLocaleString()}`;
//     clone.querySelector(
//       ".listing-bids"
//     ).textContent = `${listing._count.bids} bids`;
//     clone.querySelector(".listing-participants").textContent =
//       listing._count.bids > 0 ? "Participants: Available" : "Participants: N/A";
//     clone.querySelector(".edit-link").href = `/item/edit/${listing.id}`;
//     clone.querySelector(".view-link").href = `/item/${listing.id}`;

//     listingContainer.appendChild(clone);
//   });
// }
