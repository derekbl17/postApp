import { landLogBtn } from "./landingPageLogBtn.js";
export const landRegBtn = document.getElementById("regLand");

landRegBtn.addEventListener("click", (e) => {
  e.preventDefault();

  console.log("reg");

  document.getElementById("registration-form").style.display = "block";
  document.getElementById("login-form").style.display = "none";
  landRegBtn.style.display = "none";
  landLogBtn.style.display = "block";
});
