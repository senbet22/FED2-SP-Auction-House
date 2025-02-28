/**
 * Sets up mobile navbar toggle, active link indicator, and shows/hides navbar items based on user login status.
 * - Authguard is imported and called to check if user has access to specific pages.
 * - Toggles visibility of navbar on mobile.
 * - Highlights the active link in the navbar.
 * - Adjusts navbar items based on whether the user is logged in.
 * - Handles logout functionality.
 */

import { authGuard } from "../utils/authGuard.mjs";
authGuard();

// Mobile navbar functionality
function setupNavbar() {
  const navToggle = document.getElementById("navToggle");
  const navtab = document.getElementById("navtab");

  if (navToggle && navtab) {
    navToggle.addEventListener("change", function () {
      navtab.classList.toggle("hidden");
    });
  } else {
    console.error("Navbar elements not found.");
  }
}

setupNavbar();

// Active Navbar indicator.
const currentUrl = window.location.pathname;

const menuItems = document.querySelectorAll("nav ul li");

menuItems.forEach((item) => {
  if (item.querySelector("a").getAttribute("href") === currentUrl) {
    item.classList.add("border-b-4", "border-secondary");
  }
});

// Navbar Behaviour based on if user is logged in or not.
const auctionProfile = sessionStorage.getItem("auctionProfile");
const accessToken = sessionStorage.getItem("token");
const newListingLink = document.querySelector('a[href="/item/create/"]');
const profileLink = document.querySelector('a[href="/profile/"]');
const loginButton = document.querySelector('a[href="/auth/"]');

if (!auctionProfile & !accessToken) {
  if (newListingLink) {
    newListingLink.closest("li").classList.add("hidden");
  }
  if (profileLink) {
    profileLink.closest("li").classList.add("hidden");
  }
} else {
  if (newListingLink) {
    newListingLink.closest("li").classList.remove("hidden");
  }
  if (profileLink) {
    profileLink.closest("li").classList.remove("hidden");
  }

  if (loginButton) {
    loginButton.textContent = "Logout";
    loginButton.href = "#";

    loginButton.addEventListener("click", function (event) {
      event.preventDefault();
      // Logout Message
      sessionStorage.setItem("logout", "true");

      sessionStorage.removeItem("auctionProfile");
      sessionStorage.removeItem("token");

      window.location.href = "/";
    });
  }
}
