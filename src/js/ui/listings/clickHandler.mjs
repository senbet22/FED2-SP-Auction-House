/**
 * Adds a click event listener to the card wrapper to navigate to the single item page
 * when a listing card is clicked. The listing ID is passed in the URL.
 */

export function handleCardClick() {
  const cardWrapper = document.getElementById("cardWrapper");

  if (!cardWrapper) {
    console.error("Card wrapper not found!");
    return;
  }

  cardWrapper.addEventListener("click", function (event) {
    const card = event.target.closest(".listing-card");

    if (card) {
      const listingId = card.getAttribute("data-listing-id");

      if (listingId) {
        window.location.href = `/item/?id=${listingId}`;
      }
    }
  });
}
