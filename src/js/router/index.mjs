export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("./views/navbar.mjs");
      await import("../api/fetchListing.mjs");

      break;
    case "/Auth/":
      await import("./views/navbar.mjs");
      await import("../ui/auth/formHandler.mjs");
      break;
    default:
      await import("./notFound.mjs");
  }
}
