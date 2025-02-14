export function getAccessToken() {
  const token = sessionStorage.getItem("token");
  return token ? token : null;
}
