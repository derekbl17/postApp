import { landRegBtn ,landLogBtn} from "./dom.js";


landLogBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("registration-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
  landRegBtn.style.display = "block";
  landLogBtn.style.display = "none";
});
