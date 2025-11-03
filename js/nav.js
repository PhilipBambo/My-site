// js/nav.js
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("#nav a");
  // current file name without query/hash
  const path = window.location.pathname.split("/").pop() || "index.html";

  links.forEach(link => {
    link.classList.remove("active");
    const href = link.getAttribute("href");

    // mark active when href matches current file
    if (href === path) {
      link.classList.add("active");
    }
  });
});
