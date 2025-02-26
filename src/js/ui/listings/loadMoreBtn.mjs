import { loadListings } from "./uiHandler.mjs";
// Load more Btn handler

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
