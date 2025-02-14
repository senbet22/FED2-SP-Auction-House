export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("./views/navbar.mjs");
      await import("../ui/components/welcomeMsg.mjs");
      await import("../ui/listings/uiHandler.mjs");
      await import("../ui/components/wallet.mjs");
      await import("../api/fetchUserProfile.mjs");

      break;
    case "/auth/":
      await import("./views/navbar.mjs");
      await import("../ui/auth/formUI.mjs");
      await import("../ui/auth/loginHandler.mjs");
      await import("../ui/auth/registerHandler.mjs");
      break;
    case "/profile/":
      await import("./views/navbar.mjs");
      await import("../ui/profile/profileUI.mjs");
      await import("../ui/profile/myWins.mjs");
      await import("../ui/profile/myListings.mjs");
      await import("../ui/profile/myBids.mjs");
      await import("../ui/profile/myWins.mjs");
      break;
    case "/item/":
      await import("./views/navbar.mjs");
      await import("../ui/singleItem/uiSingleItem.mjs");
      await import("../ui/singleItem/bidHandler.mjs");
      await import("../ui/singleItem/bidModal.mjs");
      await import("../ui/components/wallet.mjs");

      break;
    default:
      await import("./notFound.mjs");
  }
}
