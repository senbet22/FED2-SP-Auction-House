import { loadListings } from "./uiHandler.mjs";
// Load more Btn handler

let selectedTag = sessionStorage.getItem("selectedTag") || "";
let currentPage = 1;

export function loadMoreBtn() {
  document.body.addEventListener("click", async function (event) {
    if (event.target && event.target.id === "loadMore") {
      console.log("Load More button clicked.");
      currentPage++;

      const hasMoreListings = await loadListings(currentPage, selectedTag);

      if (!hasMoreListings) {
        document.getElementById("loadMore").style.display = "none";
        currentPage--;
      }
    }
  });
}
