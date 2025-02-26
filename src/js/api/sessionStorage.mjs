/**
 * Retrieves the access token from sessionStorage.
 * @returns {string|null} The access token if it exists, otherwise null.
 */

export function getAccessToken() {
  const token = sessionStorage.getItem("token");
  return token ? token : null;
}
