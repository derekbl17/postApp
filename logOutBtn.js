export const logOutBtn = document.getElementById("logOut");
import { landRegBtn } from "./landingPageRegBtn.js";
import { landLogBtn } from "./landingPageLogBtn.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

import { logContainer } from "./authorization.js";
import { auth } from "./submitRegFormBtn.js";
logOutBtn.addEventListener("click", (e) => {
  e.preventDefault();

  signOut(auth)
    .then(() => {
      landLogBtn.style.display = "block";
      landRegBtn.style.display = "block";
      logContainer.style.display = "flex";
    })
    .catch((error) => {});
  onAuthStateChanged(auth, authorizationFunc);
});
