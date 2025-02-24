const auctionProfile = JSON.parse(sessionStorage.getItem("auctionProfile"));

if (auctionProfile) {
  // Set banner background
  const profileBanner = document.getElementById("profileBanner");
  profileBanner.style.background = `url('${auctionProfile.banner.url}') center/cover no-repeat`;

  // Set avatar image
  const profileAvatar = document.getElementById("profileAvatar");
  profileAvatar.src = auctionProfile.avatar.url;
  profileAvatar.alt = auctionProfile.avatar.alt || "Profile Avatar";

  // Set name and bio (Centered)
  document.getElementById("profileName").textContent =
    auctionProfile.name || "No name available";
  document.getElementById("profileBio").textContent =
    auctionProfile.bio || "No bio available";
} else {
  console.error("No auction profile found in sessionStorage.");
}
