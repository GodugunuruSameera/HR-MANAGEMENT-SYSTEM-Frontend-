document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = localStorage.getItem("hr_user");
  const loginLink = document.getElementById("loginLink");
  const signupLink = document.getElementById("signupLink");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loggedInUser) {
    if(loginLink) loginLink.style.display = "none";
    if(signupLink) signupLink.style.display = "none";
    if(logoutBtn) logoutBtn.style.display = "inline";
  }

  if(logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("hr_user");
      window.location.href = "login.html";
    });
  }
});

function handleSignup(e) {
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let pwd = document.getElementById("password").value;
  let cpwd = document.getElementById("confirmPassword").value;
  let role = document.getElementById("role").value;

  if (!name || !email || !pwd || !cpwd || !role) return alert("All fields are required!");
  if (pwd !== cpwd) return alert("Passwords do not match!");

  localStorage.setItem("hr_acc_" + email, JSON.stringify({ name, pwd, role }));
  alert("Registration Successful!");
  window.location.href = "login.html";
}

function handleLogin(e) {
  e.preventDefault();
  let email = document.getElementById("email").value.trim();
  let pwd = document.getElementById("password").value;

  let acc = JSON.parse(localStorage.getItem("hr_acc_" + email));
  if (acc && acc.pwd === pwd) {
    localStorage.setItem("hr_user", email);
    window.location.href = "index.html";
  } else {
    alert("Invalid Email or Password!");
  }
}
