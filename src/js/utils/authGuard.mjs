export function authGuard() {
  const accessToken = sessionStorage.getItem("token");
  const protectedRoutes = ["/item/create/", "/item/edit/", "/profile/"];

  if (!accessToken && protectedRoutes.includes(window.location.pathname)) {
    sessionStorage.setItem("authGuard", "true"); // Store auth guard flag

    window.location.href = "/";
  }
}
