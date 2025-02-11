// export function storeAccessToken(accessToken) {
//   sessionStorage.setItem("accessToken", accessToken);
// }

export function getAccessToken() {
  const accessToken = sessionStorage.getItem("accessToken");
  return accessToken;
}
