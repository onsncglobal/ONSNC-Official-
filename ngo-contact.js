// Contact Form Submit
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();

  alert('Thank you for contacting ONSNC Foundation! Please email additional details to onsnc.global@gmail.com if required.');

  // Optional: reset form
  this.reset();
});

