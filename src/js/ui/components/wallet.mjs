import { fetchUserProfile } from "../../api/UserProfile.mjs";

/**
 * Fetches and displays the user's wallet balance.
 * @async
 * @throws {Error} If fetching the profile fails.
 */

async function displayWallet() {
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

displayWallet();
