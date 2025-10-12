// vision.js
// Example: animate principles on scroll
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".principle-card, .pillar");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add("animate-in");
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
});

