/**
 * Dynamically imports modules based on the current pathname.
 * - Handles routing for various paths, loading necessary UI components and API modules.
 * - Ensures that only relevant scripts are loaded for each page.
 *
 * @param {string} pathname - The current URL path (defaults to window.location.pathname).
 */
export default async function router(pathname = window.location.pathname) {
  switch (true) {
    // Home page
    case pathname === "/":
      await import("../utils/navbar.mjs");
      await import("../ui/components/toastMessages.mjs");
      await import("../ui/listings/uiHandler.mjs");
      await import("../api/UserProfile.mjs");
      break;

    // Authentication pages (login/register)
    case pathname.includes("/auth/"):
      await import("../utils/navbar.mjs");
      await import("../ui/auth/formUI.mjs");
      await import("../ui/auth/loginHandler.mjs");
      await import("../ui/auth/registerHandler.mjs");
      break;

    // Profile related pages
    case pathname.includes("/profile/"):
      await import("../utils/navbar.mjs");
      await import("../ui/profile/profileUI.mjs");
      await import("../ui/profile/myProfile.mjs");
      await import("../ui/profile/myListings.mjs");
      await import("../ui/profile/myBids.mjs");
      await import("../ui/profile/myWins.mjs");
      await import("../ui/components/wallet.mjs");
      break;

    // Single item page
    case pathname.includes("/item/"):
      await import("../utils/navbar.mjs");
      await import("../ui/singleItem/uiSingleItem.mjs");
      await import("../ui/singleItem/bidHandler.mjs");
      await import("../ui/singleItem/bidModal.mjs");
      await import("../ui/components/wallet.mjs");
      await import("../ui/singleItem/sellerListings.mjs");
      break;

    // Item creation page
    case pathname.includes("/item/create/"):
      await import("../utils/navbar.mjs");
      await import("../ui/components/createListingForm.mjs");
      break;

    // Item editing page
    case pathname.includes("/item/edit/"):
      await import("../utils/navbar.mjs");
      await import("../ui/components/editListingForm.mjs");
      await import("../ui/components/populateEditForm.mjs");
      break;

    // Default case if no match is found (404 page or redirect to home)
    default:
      console.log("Page not found, redirecting to home or showing 404");
    // You can also dynamically import a 404 page or redirect
  }
}
