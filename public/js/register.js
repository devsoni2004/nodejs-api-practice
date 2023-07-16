function validateForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var errorContainer = document.getElementById("error-container");
  var errorHTML = "";

  if (name.trim() === "") {
    errorHTML += '<p class="error-message">Please enter your name.</p>';
  }

  if (email.trim() === "" || !validateEmail(email)) {
    errorHTML +=
      '<p class="error-message">Please enter a valid email address.</p>';
  }

  if (password.trim() === "") {
    errorHTML += '<p class="error-message">Please enter a password.</p>';
  }

  if (password !== confirmPassword) {
    errorHTML += '<p class="error-message">Passwords do not match.</p>';
  }

  errorContainer.innerHTML = errorHTML;

  if (errorHTML !== "") {
    return false;
  }

  return {
    name,
    email,
    password,
  };
}

const registerForm = document.getElementById("register-form");

function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userData = validateForm();
  if (!userData) return;

  try {
    const response = await fetch("/register", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log("==> DB: ", data);
      window.location.href = "/login";
    } else {
      console.log("Error in register");
    }
  } catch (err) {
    console.log("Error in register", err);
  }
});
