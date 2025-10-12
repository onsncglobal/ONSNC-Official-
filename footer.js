// Footer Interactive JS (Newsletter Form)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletterForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();

    if (!name || !email) {
      alert("Please enter your name and email.");
      return;
    }

    // Simulated success message
    alert(`Thank you, ${name}! You are now subscribed to Civilization 3.0 updates.`);
    form.reset();
  });
});

