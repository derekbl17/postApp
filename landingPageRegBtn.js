import { landLogBtn,landRegBtn } from "./dom.js";

landRegBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("registration-form").style.display = "block";
  document.getElementById("login-form").style.display = "none";
  landRegBtn.style.display = "none";
  landLogBtn.style.display = "block";
});
