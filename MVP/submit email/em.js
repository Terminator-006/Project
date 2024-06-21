document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const nextButton = document.getElementById('next-button');
    const errorMessage = document.getElementById('error-message');
  
    let debounceTimeout;
  
    emailInput.addEventListener('input', function() {
      clearTimeout(debounceTimeout);
      errorMessage.style.display = 'none'; // Hide error message when typing
  
      debounceTimeout = setTimeout(function() {
        validateEmail();
      }, 1000);
    });
  
    function validateEmail() {
      const email = emailInput.value;
  
      // Regular expression for basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailRegex.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address';
        errorMessage.style.display = 'block';
        nextButton.disabled = true;
        nextButton.style.opacity = '0.5'; // Set opacity to 0.5
        nextButton.style.cursor = 'not-allowed'; // Set cursor to not-allowed
      } else {
        errorMessage.style.display = 'none';
        nextButton.disabled = false;
        nextButton.style.opacity = '1'; // Set opacity to 1
        nextButton.style.cursor = 'pointer'; // Set cursor to pointer
      }
    }
  
    nextButton.addEventListener('click', function() {
      if (!nextButton.disabled) {
        alert('Email is valid');
        // Proceed with form submission or next steps
      }
    });
  });