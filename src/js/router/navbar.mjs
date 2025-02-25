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

const currentUrl = window.location.pathname;

const menuItems = document.querySelectorAll("nav ul li");

menuItems.forEach((item) => {
  if (item.querySelector("a").getAttribute("href") === currentUrl) {
    item.classList.add("border-b-4", "border-secondary");
  }
});
