/**
 * Updates the opacity of images in the image container based on the current index.
 * @param {HTMLElement} imgArContainer - The container element holding the images.
 * @param {number} currentIndex - The index of the image to be set to full opacity.
 */
export function updateImageOpacity(imgArContainer, currentIndex) {
  const images = imgArContainer.querySelectorAll("img");
  images.forEach((img, index) => {
    if (index === currentIndex) {
      img.classList.remove("opacity-60");
      img.classList.add("opacity-100");
    } else {
      img.classList.remove("opacity-100");
      img.classList.add("opacity-60");
    }
  });
}

/**
 * Handles the click event on an image, updating the main image and the opacity of other images.
 * @param {Event} event - The click event.
 * @param {number} currentIndex - The current index of the displayed image.
 * @param {HTMLImageElement} imageElement - The main image element to update.
 * @param {HTMLElement} imgArContainer - The container element holding the images.
 * @returns {number} The updated index of the currently selected image.
 */
export function handleImageClick(
  event,
  currentIndex,
  imageElement,
  imgArContainer
) {
  const index = Array.from(imgArContainer.querySelectorAll("img")).indexOf(
    event.target
  );
  currentIndex = index;
  imageElement.src = event.target.src;
  imageElement.alt = event.target.alt || `Image ${index + 1}`;

  updateImageOpacity(imgArContainer, currentIndex);

  return currentIndex;
}

/**
 * Handles showing the next image in the collection.
 * @param {Object} item - The item containing the media information.
 * @param {number} currentIndex - The current index of the displayed image.
 * @param {HTMLImageElement} imageElement - The main image element to update.
 * @param {HTMLElement} imgArContainer - The container element holding the images.
 * @returns {number} The updated index of the currently selected image.
 */
export function handleNextImage(
  item,
  currentIndex,
  imageElement,
  imgArContainer
) {
  if (currentIndex < item.media.length - 1) {
    currentIndex++;
    const nextImage = item.media[currentIndex];
    imageElement.src = nextImage.url;
    imageElement.alt = nextImage.alt || `Image ${currentIndex + 1}`;

    updateImageOpacity(imgArContainer, currentIndex);
  }

  return currentIndex;
}

/**
 * Handles showing the previous image in the collection.
 * @param {Object} item - The item containing the media information.
 * @param {number} currentIndex - The current index of the displayed image.
 * @param {HTMLImageElement} imageElement - The main image element to update.
 * @param {HTMLElement} imgArContainer - The container element holding the images.
 * @returns {number} The updated index of the currently selected image.
 */
export function handlePrevImage(
  item,
  currentIndex,
  imageElement,
  imgArContainer
) {
  if (currentIndex > 0) {
    currentIndex--;
    const prevImage = item.media[currentIndex];
    imageElement.src = prevImage.url;
    imageElement.alt = prevImage.alt || `Image ${currentIndex + 1}`;

    updateImageOpacity(imgArContainer, currentIndex);
  }

  return currentIndex;
}
