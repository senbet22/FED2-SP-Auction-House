function setupNavbar() {
  const hamburger = document.getElementById("hamburger");
  const navtab = document.getElementById("navtab");

  if (hamburger && navtab) {
    hamburger.addEventListener("click", function () {
      navtab.classList.toggle("hidden");
    });
  } else {
    console.error("Navbar elements not found.");
  }
}
setupNavbar();
