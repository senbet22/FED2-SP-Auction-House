// This handles the cases when a user has not uploaded photo for their product or the image is not rendered properly:

export function handleImage(imgElement, imageUrl) {
  if (imageUrl) {
    imgElement.src = imageUrl;
    imgElement.style.display = "block"; // Show the image
    imgElement.nextElementSibling.style.display = "none"; // Hide the placeholder div

    imgElement.onerror = function () {
      imgElement.style.display = "none"; // Hide the broken image
      imgElement.nextElementSibling.style.display = "block"; // Show the placeholder div
    };
  } else {
    imgElement.style.display = "none"; // Hide the image if not available
    imgElement.nextElementSibling.style.display = "block"; // Show the placeholder div
  }
}
