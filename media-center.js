emailjs.init("YOUR_EMAILJS_USER_ID");

let currentStep = 0;
const steps = document.querySelectorAll('.step');
const progress = document.querySelector('.progress');

function showStep(index){
  steps.forEach((s,i)=>s.classList.toggle('active', i===index));
  progress.style.width = ((index+1)/steps.length)*100 + '%';
}
showStep(currentStep);

document.querySelectorAll('.btn-next').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    if(validateStep(currentStep)){ currentStep++; showStep(currentStep); }
  });
});
document.querySelectorAll('.btn-prev').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    currentStep--; showStep(currentStep);
  });
});

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

document.getElementById('mcSubmitBtn').addEventListener('click', ()=>{
  const type = document.getElementById('mediaType').value;
  const title = document.getElementById('mcTitle').value;
  const author = document.getElementById('mcAuthor').value;
  const date = document.getElementById('mcDate').value;
  const fileInput = document.getElementById('mcFile');
  const link = document.getElementById('mcLink').value;

  const formData = new FormData();
  formData.append("type", type);
  formData.append("title", title);
  formData.append("author", author);
  formData.append("date", date);
  formData.append("file", fileInput.files[0] || '');
  formData.append("link", link);

  emailjs.send("service_xxx","template_xxx",{
    media_type:type,
    media_title:title,
    media_author:author,
    media_date:date,
    media_link:link
  }).then(response=>{
    document.getElementById('mcSuccessPopup').style.display='block';
    setTimeout(()=>{ document.getElementById('mcSuccessPopup').style.display='none'; currentStep=0; showStep(currentStep); },4000);
  }, error=>{
    alert("Email failed. Use Google Form link to submit.");
  });
});

