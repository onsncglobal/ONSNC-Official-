const modal = document.getElementById('campaignModal');
const openBtns = document.querySelectorAll('.open-modal');
const closeBtn = modal.querySelector('.close');
const steps = modal.querySelectorAll('.step');
const progressBar = document.getElementById('progressBar');
const emailBtn = document.getElementById('emailSubmit');
let currentStep = 0;
let campaignName = '';

openBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    campaignName = e.target.closest('.campaign-card').dataset.campaign;
    modal.style.display = 'block';
    showStep(0);
    document.getElementById('modalTitle').textContent = campaignName;
  });
});

closeBtn.addEventListener('click', ()=> modal.style.display='none');
window.addEventListener('click', e => { if(e.target===modal) modal.style.display='none'; });

function showStep(n){
  steps.forEach((step,i)=> step.classList.toggle('active', i===n));
  currentStep = n;
  let percent = ((n+1)/steps.length)*100;
  progressBar.style.width = percent+'%';
}

// Next/Prev buttons
modal.querySelectorAll('.next-btn').forEach(btn => btn.addEventListener('click', ()=> {
  if(currentStep < steps.length-1) showStep(currentStep+1);
}));
modal.querySelectorAll('.prev-btn').forEach(btn => btn.addEventListener('click', ()=> {
  if(currentStep > 0) showStep(currentStep-1);
}));

// Email button
emailBtn.addEventListener('click', ()=> {
  const form = document.getElementById('campaignForm');
  const formData = new FormData(form);
  let body = `Hello,%0A%0AI would like to participate in the ${campaignName} campaign.%0A%0A`;
  formData.forEach((val,key)=>{ body += `${key}: ${val}%0A`; });
  body += `%0APlease attach my resume/proposal if any.%0A%0AThank you.`;
  const mailtoLink = `mailto:onsnc.global@gmail.com?subject=Participation in ${encodeURIComponent(campaignName)}&body=${body}`;
  window.location.href = mailtoLink;
  showStep(currentStep+1); // Thank you step
});

// Close button in Thank You step
modal.querySelector('.close-btn').addEventListener('click', ()=> modal.style.display='none');

