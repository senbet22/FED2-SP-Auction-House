/**
 * Provides functions to handle image navigation and opacity adjustments in the image gallery.
 * - updateImageOpacity: Updates the opacity of images based on the current index.
 * - handleImageClick: Updates the main image and adjusts the opacity when an image is clicked.
 * - handleNextImage: Displays the next image in the gallery.
 * - handlePrevImage: Displays the previous image in the gallery.
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
