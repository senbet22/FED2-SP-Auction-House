// Get buttons
const bidsButton = document.getElementById("bidsButton");
const winsButton = document.getElementById("winsButton");
const listingButton = document.getElementById("listingButton");
const profileButton = document.getElementById("ProfileButton");

// Get sections
const bidsCard = document.getElementById("bidsCard");
const winsCard = document.getElementById("winsCard");
const listingCard = document.getElementById("listingCard");
const profileCard = document.getElementById("profileCard");

// Function to set active button and show corresponding section
function setActiveSection(
  activeButton,
  activeSection,
  inactiveButtons,
  inactiveSections
) {
  activeButton.classList.add("bg-primary", "text-background");
  activeButton.classList.remove("bg-background");

  inactiveButtons.forEach((button) => {
    button.classList.add("bg-background");
    button.classList.remove("bg-primary", "text-background");
  });

  activeSection.style.display = "block";
  inactiveSections.forEach((section) => (section.style.display = "none"));
}

// Add event listeners
bidsButton.addEventListener("click", () => {
  setActiveSection(
    bidsButton,
    bidsCard,
    [winsButton, listingButton, profileButton],
    [winsCard, listingCard, profileCard]
  );
});

winsButton.addEventListener("click", () => {
  setActiveSection(
    winsButton,
    winsCard,
    [bidsButton, listingButton, profileButton],
    [bidsCard, listingCard, profileCard]
  );
});

listingButton.addEventListener("click", () => {
  setActiveSection(
    listingButton,
    listingCard,
    [bidsButton, winsButton, profileButton],
    [bidsCard, winsCard, profileCard]
  );
});

profileButton.addEventListener("click", () => {
  setActiveSection(
    profileButton,
    profileCard,
    [bidsButton, winsButton, listingButton],
    [bidsCard, winsCard, listingCard]
  );
});

// Default to showing the Bids section and setting its button as active
bidsButton.click();
