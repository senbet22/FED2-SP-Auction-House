/**
 * @fileoverview
 * This script has two main functions:
 * 1. **Update Profile**: On clicking the "Update Profile" button, a PUT request is made to update the user's avatar.
 *    The updated avatar is displayed, and the profile is saved in sessionStorage.
 *
 * 2. **Display Profile**: On page load, the user's profile data is retrieved from sessionStorage and displayed, including the banner, avatar, name, and bio.
 */

import { updateUserProfile } from "../../api/putReqProfile.mjs";

// Section 1: Update profile with new avatar
export function showAlert(message) {
  const alertMessage = document.getElementById("alertMessage");
  const alertText = document.getElementById("alertText");

  alertText.textContent = message;

  alertMessage.classList.remove("hidden");
  alertMessage.classList.remove("translate-x-full");
  alertMessage.classList.add("translate-x-0");

  setTimeout(() => {
    alertMessage.classList.remove("translate-x-0");
    alertMessage.classList.add("translate-x-full");

    setTimeout(() => {
      alertMessage.classList.add("hidden");
    }, 500); // Time for the sliding out animation to complete
  }, 2000); // Time to keep the alert visible
}

document
  .getElementById("updateProfileBtn")
  .addEventListener("click", async () => {
    const newAvatarUrl = document
      .getElementById("profileAvatarInput")
      .value.trim();

    if (!newAvatarUrl) {
      // Show the alert with a message if the input is empty
      showAlert("Please enter a valid image URL.");
      return;
    }

    try {
      const updatedData = await updateUserProfile({
        avatar: { url: newAvatarUrl, alt: "User avatar" },
      });

      const avatarData = updatedData?.data?.avatar;

      if (avatarData?.url) {
        document.getElementById("profileAvatar").src = avatarData.url;
        window.scrollTo(0, 0);
        location.reload();

        // Updates session storage with the new avatar
        const updatedProfile = {
          ...JSON.parse(sessionStorage.getItem("auctionProfile")),
          avatar: avatarData,
        };
        sessionStorage.setItem(
          "auctionProfile",
          JSON.stringify(updatedProfile)
        );
      } else {
        throw new Error("Avatar URL not returned from API.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      showAlert(error.message);
    }
  });

// Section 2: Display profile from sessionStorage
const auctionProfile = JSON.parse(sessionStorage.getItem("auctionProfile"));

if (auctionProfile) {
  const profileBanner = document.getElementById("profileBanner");
  profileBanner.style.background = `url('${auctionProfile.banner.url}') center/cover no-repeat`;

  const profileAvatar = document.getElementById("profileAvatar");
  profileAvatar.src = auctionProfile.avatar.url;
  profileAvatar.alt = auctionProfile.avatar.alt || "Profile Avatar";

  document.getElementById("profileName").textContent =
    auctionProfile.name || "No name available";
  document.getElementById("profileBio").textContent =
    auctionProfile.bio || "No bio available";
} else {
  console.error("No auction profile found in sessionStorage.");
}
