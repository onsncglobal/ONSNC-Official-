// header.js

document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");
  const header = document.querySelector(".main-header");
  let lastScrollTop = 0;

  // Mobile Menu Toggle
  mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
  });

  // Auto close on click
  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Scroll Hide/Show Header
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }
    lastScrollTop = scrollTop;
  });
});

