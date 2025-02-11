import { fetchUserProfile } from "../../api/fetchUserProfile.mjs";

async function displayWallet() {
  try {
    const profile = await fetchUserProfile();
    const credits = profile.data.credits;
    const walletElement = document.getElementById("wallet");

    walletElement.innerHTML = `<p>wallet($${credits})</p>`;
    walletElement.classList.remove("hidden"); // Removes hidden class
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
}

displayWallet();
