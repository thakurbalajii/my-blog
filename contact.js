const scriptURL = 'https://script.google.com/macros/s/AKfycbzt0EgOOItvVf0cTbAHVQQGniDCH1ndGFb2hf02ffrtIcNHRbvTKE18w2CvQe7PqAnI2g/exec';
const form = document.forms['contactForm'];

form.addEventListener('submit', e => {
  e.preventDefault();

  const submitButton = form.querySelector('input[type="submit"]');
  submitButton.disabled = true;
  submitButton.value = "Submitting...";

  const loadingMessage = document.createElement('p');
  loadingMessage.textContent = "Processing your request... Please wait.";
  form.appendChild(loadingMessage); 

  const timeout = setTimeout(() => {
    alert("The form submission is taking longer than expected. Please try again later.");
    submitButton.disabled = false;
    submitButton.value = "Send Message";
    form.removeChild(loadingMessage); 
  }, 10000); // Set timeout for 10 seconds

  // Send form data to Google Apps Script
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      clearTimeout(timeout); 
      alert("Thank you! Form is submitted");
      form.reset(); 
    })
    .catch(error => {
      clearTimeout(timeout); 
      alert("Oops! Something went wrong. Please try again later.");
      console.error('Error!', error.message);
    })
    .finally(() => {
      submitButton.disabled = false; 
      submitButton.value = "Send Message"; 
      form.removeChild(loadingMessage);
    });
});