// Reveal animation for philosophy cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".philosophy-card");

  const reveal = () => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", reveal);
  reveal();
});

