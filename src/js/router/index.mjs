/**
 * Dynamically imports modules based on the current pathname.
 * - Handles routing for various paths, loading necessary UI components and API modules.
 * - Ensures that only relevant scripts are loaded for each page.
 *
 * @param {string} pathname - The current URL path (defaults to window.location.pathname).
 */

export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("../utils/navbar.mjs");
      await import("../ui/components/toastMessages.mjs");
      await import("../ui/listings/uiHandler.mjs");
      await import("../api/UserProfile.mjs");

      break;
    case "/auth/index.html":
      await import("../utils/navbar.mjs");
      await import("../ui/auth/formUI.mjs");
      await import("../ui/auth/loginHandler.mjs");
      await import("../ui/auth/registerHandler.mjs");
      break;
    case "/profile/index.html":
      await import("../utils/navbar.mjs");
      await import("../ui/profile/profileUI.mjs");
      await import("../ui/profile/myProfile.mjs");
      await import("../ui/profile/myListings.mjs");
      await import("../ui/profile/myBids.mjs");
      await import("../ui/profile/myWins.mjs");
      await import("../ui/components/wallet.mjs");
      break;
    case "/item/index.html":
      await import("../utils/navbar.mjs");
      await import("../ui/singleItem/uiSingleItem.mjs");
      await import("../ui/singleItem/bidHandler.mjs");
      await import("../ui/singleItem/bidModal.mjs");
      await import("../ui/components/wallet.mjs");
      await import("../ui/singleItem/sellerListings.mjs");
      break;

    case "/item/create/index.html":
      await import("../utils/navbar.mjs");
      await import("../ui/components/createListingForm.mjs");

      break;
    case "/item/edit/index.html":
      await import("../utils/navbar.mjs");
      await import("../ui/components/editListingForm.mjs");
      await import("../ui/components/populateEditForm.mjs");
      break;
    default:
  }
}
