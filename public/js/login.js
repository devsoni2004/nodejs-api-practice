function validateForm() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var errorContainer = document.getElementById("error-container");
  var errorHTML = "";

  // Email Validation
  if (!validateEmail(email)) {
    errorHTML +=
      '<p class="error-message">Please enter a valid email address.</p>';
  }

  // Password Validation
  if (!validatePassword(password)) {
    errorHTML += '<p class="error-message">Please enter your password.</p>';
  }

  errorContainer.innerHTML = errorHTML;

  if (errorHTML !== "") {
    return false;
  }
}

function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password !== "";
}
