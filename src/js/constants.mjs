export const API_KEY = import.meta.env.VITE_API_KEY;

// Gets profile name from sessionStorage;

export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_LISTINGS = `${API_BASE}/auction/listings`;

export const API_PROFILES = `${API_BASE}/auction/profiles`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

// Fix for the endpoints trying to fetch for username before login, resulting in an error.

export function getAuctionEndpoints() {
  const userName = JSON.parse(sessionStorage.getItem("auctionProfile"));

  const storedSellerName = sessionStorage.getItem("sellerName");

  if (userName) {
    return {
      API_MY_PROFILE: `${API_PROFILES}/${userName.name}`,
      API_MY_LISTINGS: `${API_PROFILES}/${userName.name}/listings?_bids=true&_seller=true`,
      API_SELLER_LISTINGS: `${API_PROFILES}/${storedSellerName}/listings?_bids=true&_seller=true`,
      API_MY_WINS: `${API_PROFILES}/${userName.name}/wins?_bids=true&_seller=true`,
      API_MY_BIDS: `${API_PROFILES}/${userName.name}/bids`,
    };
  } else {
    console.log("No user data available");
    return {};
  }
}
