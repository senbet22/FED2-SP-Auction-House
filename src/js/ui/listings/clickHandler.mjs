// When clicking on a Card, takes you to single item page with id in URL!
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
