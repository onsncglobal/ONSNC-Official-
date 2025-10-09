document.addEventListener('DOMContentLoaded', () => {
  // Show Step 1 initially
  showStep(1);

  function nextStep(current) {
    if(current === 1){
      // Validate Survey (at least one checked)
      const areas = document.querySelectorAll('#surveyForm input[name="area"]:checked');
      if(areas.length === 0) { alert('Please select at least one research area.'); return; }
    }
    if(current === 2){
      // Validate Volunteer Form
      const form = document.getElementById('volunteerForm');
      if(!form.checkValidity()){ alert('Please fill all fields'); return; }
    }

    showStep(current+1);
  }

  window.nextStep = nextStep; // make function global for onclick

  function showStep(step){
    // Hide all sections
    document.querySelectorAll('.step-section').forEach(s => s.classList.remove('active'));
    // Show current step
    if(step <=3){
      document.getElementById('step'+step).classList.add('active');
    } else {
      document.getElementById('thankyou').classList.add('active');
    }
    // Update progress tracker
    document.querySelectorAll('.step-tracker .step').forEach((st,i) => {
      if(i < step) st.classList.add('active');
      else st.classList.remove('active');
    });
  }

  // Handle Resume Form submission
  const resumeForm = document.getElementById('resumeForm');
  resumeForm.addEventListener('submit', function(e){
    e.preventDefault();
    const fileInput = resumeForm.querySelector('input[name="resume"]');
    if(fileInput.files.length === 0){ alert('Please upload your resume'); return; }
    // For now, just show Thank You
    showStep(4);
    // Optional: implement actual upload via server or Google Drive API
  });
});

