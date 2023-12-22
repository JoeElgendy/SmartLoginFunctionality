// ^ Required Functions  ^/
// * 1. Login Function --> Done
// * Email Validation --> Done
// * Password Validation --> Done
// * 2. Sign Up function --> Done
// * 3. Logout function --> Done

const elements = {
  email: document.getElementById("signinEmail"),
  password: document.getElementById("signinPassword"),
  newName: document.getElementById("userName"),
  newEmail: document.getElementById("userEmail"),
  newPassword: document.getElementById("userPassword"),
  invalidFeedback: document.getElementById("invalid"),
  loginButton: document.querySelector(".login"),
  signUpButton: document.querySelector(".SignUp"),
  welcomeMessage: document.querySelector("#Welcome"),
  logOutButton: document.getElementById("LogOut"),
};

const pages = {
  login: "index.html",
  home: "home.html",
  success: "login.html",
  signUp: "signup.html",
};

let users = JSON.parse(localStorage.getItem("users")) || [];

// Helper Functions
function redirectToPage(url) {
  window.location.href = url;
}

function validateEmail(email) {
  const regex =
    /[a-z][\w]{2,}@yahoo\.com|gmail\.com|hotmail\.com|microsoft\.com/;
  return regex.test(email);
}

function validatePassword(password) {
  const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  return regex.test(password);
}
function validateName(name) {
  const regex = /[A-Z]+(\w{3,})/;
  return regex.test(name);
}

function updateValidationFeedback(isValid, selector) {
  const feedbackElement = document.querySelector(selector);
  if (isValid) {
    feedbackElement.classList.replace("d-inline-block", "d-none");
  } else if (window.location.pathname.endsWith(pages.signUp)) {
    feedbackElement.classList.replace("d-none", "d-inline-block");
  }
}

if (elements.loginButton) {
  elements.loginButton.addEventListener("click", () => {
    const user = users.find(
      (u) =>
        u.userEmail === elements.email.value &&
        u.userPassword === elements.password.value
    );
    if (user) {
      localStorage.setItem("sessionUsername", user.username);
      redirectToPage(pages.success);
    } else {
      elements.invalidFeedback.classList.replace("d-none", "d-inline-block");
    }
  });
}

if (elements.signUpButton) {
  elements.signUpButton.addEventListener("click", () => {
    const isNameValid = validateName(elements.newName.value);
    const isEmailValid = validateEmail(elements.newEmail.value);
    const isPasswordValid = validatePassword(elements.newPassword.value);

    updateValidationFeedback(isNameValid, ".invalid-name");
    updateValidationFeedback(isEmailValid, ".invalid-email");
    updateValidationFeedback(isPasswordValid, ".invalid-password");

    if (isNameValid && isEmailValid && isPasswordValid) {
      const newUser = {
        username: elements.newName.value,
        userEmail: elements.newEmail.value,
        userPassword: elements.newPassword.value,
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      redirectToPage(pages.login);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("sessionUsername");
  if (window.location.pathname.endsWith(pages.success)) {
    elements.welcomeMessage.innerHTML = `Welcome ${name}`;
  }
});

if (elements.logOutButton) {
  elements.logOutButton.addEventListener("click", () => {
    redirectToPage(pages.login);
  });
}
