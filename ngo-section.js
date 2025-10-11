// NGO Section fade-in animation
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".ngo-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("ngo-fade-in");
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});

