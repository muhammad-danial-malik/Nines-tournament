const forms = document.querySelector(".forms"),
  pwShowHide = document.querySelectorAll(".eye-icon"),
  links = document.querySelectorAll(".link"),
  playersTopCards = document.querySelectorAll(".playersTopCard");

pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    let pwFields =
      eyeIcon.parentElement.parentElement.querySelectorAll(".password");

    pwFields.forEach((password) => {
      if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
        return;
      }
      password.type = "password";
      eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    });
  });
});

function showForgotPassword() {
  forms.classList.remove("show-signup", "show-login");
  forms.classList.add("show-forgot");
}

function activateLogin() {
  forms.classList.remove("show-signup", "show-forgot");
  forms.classList.add("show-login");
}

function activateSignUp() {
  forms.classList.remove("show-login", "show-forgot");
  forms.classList.add("show-signup");
}

function closeForms() {
  forms.classList.remove("show-login", "show-signup", "show-forgot");
}

document
  .querySelector(".dimmed-background")
  .addEventListener("click", closeForms);

function redirectToIndex() {
  window.location.href = "../index.html";
}

playersTopCards.forEach((card) => {
  card.addEventListener("click", () => {
    window.location.href = "./pages/rating.html";
  });
});

// Auth system using AppScript

const API_URL =
  "https://script.google.com/macros/s/AKfycbwCvDa1ggu9_d3agJQX8EY9ldGo47FPEVwmm68U3t8PdzE1aH3T41rAQK6ihNikQ2ZsRg/exec";

document.getElementById("signUpBtn_A").addEventListener("click", async (e) => {
  e.preventDefault();
  let username = document.getElementById("signUp_usernameInput").value;
  let email = document.getElementById("signUp_emailInput").value;
  let password = document.getElementById("signUp_passwordInput").value;
  let confPassword = document.getElementById("signUp_confPasswordInput").value;

  if (!username || !email || !password || !confPassword) {
    alert("All fields are required");
    return;
  }

  if (password !== confPassword) {
    alert("Both Passwords must match");
    return;
  }

  const params = new URLSearchParams();
  params.append("action", "registerUser");
  params.append("username", username);
  params.append("email", email);
  params.append("password", password);

  try {
    let response = await fetch(`${API_URL}?${params.toString()}`, {
      method: "POST",
    });

    let result = await response.json();

    alert(result.message);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to register!");
  }
});

document.getElementById("loginBtn_A").addEventListener("click", async (e) => {
  e.preventDefault();
  let email = document.getElementById("login_emailInput").value;
  let password = document.getElementById("login_passwordInput").value;

  if (!email || !password) {
    alert("All fields are required");
    return;
  }

  try {
    let response = await fetch(
      `${API_URL}?action=loginUser&email=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}`,
      {
        method: "GET",
      }
    );

    let result = await response.json();
    alert(result.message);
  } catch (error) {
    console.error("Error:", error);
    alert("Login Failed!");
  }
});
