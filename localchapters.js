document.addEventListener('DOMContentLoaded', ()=>{
  const totalSteps = 5;
  showStep(1);

  document.querySelectorAll('input[name="area"]').forEach(el=>{
    el.addEventListener('change', ()=>{
      document.getElementById('techQuestion').style.display = document.querySelector('input[name="area"][value="Technology"]').checked ? 'block' : 'none';
    });
  });

  window.nextStep = function(current){
    if(current===1 && document.querySelectorAll('#surveyForm input[name="area"]:checked').length===0){ alert('Select at least one area.'); return; }
    if(current===2 && !document.getElementById('volunteerForm').checkValidity()){ alert('Fill all volunteer info.'); return; }
    if(current===3 && !document.getElementById('proposalForm').checkValidity()){ alert('Fill all proposal fields.'); return; }
    showStep(current+1);
  }

  function showStep(step){
    document.querySelectorAll('.step-section').forEach(s=>s.classList.remove('active'));
    if(step<=4) document.getElementById('step'+step).classList.add('active');
    else document.getElementById('thankyou').classList.add('active');
    const percent = Math.round((step/totalSteps)*100);
    document.getElementById('progressBar').style.width=percent+'%';
    document.getElementById('progressPercent').innerText=percent+'%';
  }

  const resumeForm = document.getElementById('resumeForm');
  resumeForm.addEventListener('submit', async function(e){
    e.preventDefault();
    const fileInput = resumeForm.querySelector('input[name="resume"]');
    if(fileInput.files.length===0){ alert('Upload resume.'); return; }
    const formData = new FormData();
    formData.append('resume', fileInput.files[0]);
    formData.append('name', document.querySelector('input[name="name"]').value);
    formData.append('email', document.querySelector('input[name="email"]').value);
    formData.append('location', document.querySelector('input[name="location"]').value);

    try{
      const response = await fetch('https://<YOUR_FIREBASE_FUNCTION_URL>/uploadVolunteer',{method:'POST',body:formData});
      const result = await response.json();
      console.log(result);
      showStep(5);
    }catch(err){ alert('Upload failed'); console.error(err); }
  });
});