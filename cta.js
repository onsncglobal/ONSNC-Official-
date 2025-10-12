// cta.js
// Optional: subtle fade-in animation for CTA
document.addEventListener("DOMContentLoaded", () => {
    const cta = document.querySelector(".cta-container");
    cta.style.opacity = 0;
    cta.style.transform = "translateY(30px)";
    
    setTimeout(() => {
        cta.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        cta.style.opacity = 1;
        cta.style.transform = "translateY(0)";
    }, 300);
});

