import { loadListings } from "./uiHandler.mjs";

/**
 * Adds a click event listener to the "Load More" button. When clicked, it increments
 * the current page number and loads more listings based on the selected tag and search value.
 */

let selectedTag = sessionStorage.getItem("selectedTag") || "";
let currentPage = 1;

export function loadMoreBtn() {
  document.body.addEventListener("click", async function (event) {
    if (event.target && event.target.id === "loadMore") {
      console.log("Load More button clicked.");
      currentPage++;
      const searchValue = document.getElementById("search")?.value || "";
      await loadListings(currentPage, selectedTag, searchValue);
    }
  });
}
