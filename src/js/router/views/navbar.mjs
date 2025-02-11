function setupNavbar() {
  const navToggle = document.getElementById("navToggle");
  const navtab = document.getElementById("navtab");

  if (navToggle && navtab) {
    navToggle.addEventListener("change", function () {
      navtab.classList.toggle("hidden");
    });
  } else {
    console.error("Navbar elements not found.");
  }
}

setupNavbar();
