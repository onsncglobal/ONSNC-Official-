const form = document.getElementById('chapterForm');
const steps = document.querySelectorAll('.form-step');
const progressBar = document.getElementById('progress-bar');
const stepIndicator = document.getElementById('step-indicator');
const thankyouMessage = document.getElementById('thankyou-message');

let currentStep = 0;

function showStep(step){
  steps.forEach((s,i)=>s.classList.toggle('active', i===step));
  const progressPercent = ((step)/ (steps.length-1)) * 100;
  progressBar.style.width = progressPercent + '%';
  stepIndicator.textContent = `Step ${step+1} of ${steps.length-1}`;
}

document.querySelectorAll('.next-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    if(validateStep(currentStep)){
      currentStep++;
      showStep(currentStep);
    }
  });
});

document.querySelectorAll('.prev-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    currentStep--;
    showStep(currentStep);
  });
});

function validateStep(step){
  const inputs = steps[step].querySelectorAll('input, select');
  for(let input of inputs){
    if(!input.checkValidity()){
      input.reportValidity();
      return false;
    }
  }
  return true;
}

// Form Submit
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const formData = new FormData(form);
  
  try{
    const response = await fetch('https://<YOUR_BACKEND_DOMAIN>/send-email', {  // Replace with your backend URL
      method:'POST',
      body: formData
    });
    if(response.ok){
      steps.forEach(s=>s.style.display='none');
      thankyouMessage.style.display='block';
      progressBar.style.width='100%';
      stepIndicator.textContent='Completed';
    }else{
      alert('Submission failed. Please try again.');
    }
  }catch(err){
    console.error(err);
    alert('Submission failed. Please try again.');
  }
});

showStep(currentStep);


