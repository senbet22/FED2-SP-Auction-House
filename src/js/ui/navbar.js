document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navtab = document.getElementById("navtab");

  hamburger.addEventListener("click", function () {
    navtab.classList.toggle("hidden");
  });
});
