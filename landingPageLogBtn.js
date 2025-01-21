import { landRegBtn } from "./landingPageRegBtn.js";
export const landLogBtn = document.getElementById("logLand");

landLogBtn.addEventListener("click", (e) => {
  e.preventDefault();

  console.log("log");

  document.getElementById("registration-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
  landRegBtn.style.display = "block";
  landLogBtn.style.display = "none";
});
