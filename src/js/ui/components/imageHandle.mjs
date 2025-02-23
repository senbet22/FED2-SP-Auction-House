/**
 * Handles the cases when a user has not uploaded a photo for their product
 * or the image is not rendered properly.
 * @param {HTMLImageElement} imgElement - The image element to display or hide.
 * @param {string} imageUrl - The URL of the image to display.
 */
export function handleImage(imgElement, imageUrl) {
  if (imageUrl) {
    imgElement.src = imageUrl;
    imgElement.style.display = "block";
    imgElement.nextElementSibling.style.display = "none";

    imgElement.onerror = function () {
      imgElement.style.display = "none";
      imgElement.nextElementSibling.style.display = "block";
    };
  } else {
    imgElement.style.display = "none";
    imgElement.nextElementSibling.style.display = "block";
  }
}
