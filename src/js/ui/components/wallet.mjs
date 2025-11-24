import { fetchUserProfile } from "../../api/UserProfile.mjs";
import { getAccessToken } from "../../api/sessionStorage.mjs";

/**
 * Fetches and displays the user's wallet balance if they are logged in.
 * @async
 * @throws {Error} If fetching the profile fails.
 */

async function displayWallet() {
  const token = getAccessToken();
  if (token) {
    try {
      const profile = await fetchUserProfile();
      const credits = profile.data.credits;
      const walletElement = document.getElementById("wallet");

      walletElement.innerHTML = `<p>Wallet: $${credits}</p>`;
      walletElement.classList.add("text-secondary");
      walletElement.classList.remove("hidden");
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }
}

displayWallet();
