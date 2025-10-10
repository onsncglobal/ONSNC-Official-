// Fade-in animation
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".card, .apply-section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.2 });
  elements.forEach(el => observer.observe(el));
});

// Popup confirmation when "Contribute Skills" clicked
const contributeBtn = document.getElementById("contributeBtn");
const popup = document.getElementById("successPopup");

contributeBtn.addEventListener("click", () => {
  popup.style.display = "flex";
  setTimeout(() => {
    popup.style.display = "none";
  }, 3500);
});

// Add animation style
const style = document.createElement('style');
style.textContent = `
  .visible { opacity: 1 !important; transform: translateY(0) !important; }
  .card, .apply-section { opacity: 0; transform: translateY(30px); transition: all 0.7s ease; }
`;
document.head.appendChild(style);

<script>
  const steps = document.querySelectorAll('.step');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  steps.forEach(step => observer.observe(step));
</script>

<style>
.step {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}
.step.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
