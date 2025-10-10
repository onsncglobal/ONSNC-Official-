// Initialize EmailJS
emailjs.init("YOUR_EMAILJS_USER_ID"); // get from emailjs.com

let currentStep = 0;
const steps = document.querySelectorAll('.step');
const progress = document.querySelector('.progress');

function showStep(index){
  steps.forEach((s,i)=>s.classList.toggle('active', i===index));
  progress.style.width = ((index+1)/steps.length)*100 + '%';
}
showStep(currentStep);

// Next / Prev Buttons
document.querySelectorAll('.btn-next').forEach(btn => {
  btn.addEventListener('click', ()=>{
    if(validateStep(currentStep)){
      currentStep++;
      showStep(currentStep);
    }
  });
});
document.querySelectorAll('.btn-prev').forEach(btn => {
  btn.addEventListener('click', ()=>{
    currentStep--;
    showStep(currentStep);
  });
});

// Step Validation
function validateStep(index){
  const step = steps[index];
  const requiredFields = step.querySelectorAll('[required]');
  for(let field of requiredFields){
    if(!field.value){
      alert("Please fill all required fields.");
      return false;
    }
  }
  return true;
}

// Submit Form
document.getElementById('submitBtn').addEventListener('click', ()=>{
  const type = document.getElementById('resourceType').value;
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const fileInput = document.getElementById('fileInput');

  if(!fileInput.files[0]){
    alert("Please upload a file.");
    return;
  }

  const formData = new FormData();
  formData.append("type", type);
  formData.append("title", title);
  formData.append("author", author);
  formData.append("file", fileInput.files[0]);

  // Send email via EmailJS
  emailjs.send("service_xxx","template_xxx",{
    resource_type:type,
    resource_title:title,
    resource_author:author,
    attachment:fileInput.files[0]
  }).then(response=>{
    document.getElementById('successPopup').style.display='block';
    setTimeout(()=>{ document.getElementById('successPopup').style.display='none'; steps[0].querySelector('input').focus(); currentStep=0; showStep(currentStep); }, 4000);
  }, error=>{
    alert("Email failed. Please use the Google Form link.");
  });
});