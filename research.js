// SHOW POPUP MANUALLY
function showPopup() {
  document.getElementById('successPopup').style.display = 'flex';
}

// CLOSE POPUP
document.getElementById('closePopup').addEventListener('click', () => {
  document.getElementById('successPopup').style.display = 'none';
});

/* 
  Note:
  - With Google Form embed, automatic JS detection of submit is not possible.
  - Ask users to click a "I've submitted the form" button to trigger showPopup().
  - Or, include the popup link inside Google Form confirmation message.
*/
