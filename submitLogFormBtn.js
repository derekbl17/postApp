import { auth } from "./submitRegFormBtn.js";
import { authorizationFunc } from "./authorization.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const submitLog = document.getElementById("logSubmit");

submitLog.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.getElementById("logEmail").value;
  const password = document.getElementById("logPass").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const loginTime = new Date();

      update(ref(database, "users/" + user.uid), {
        timestamp: `${loginTime}`,
      });
      logContainer.style.display = "none";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  onAuthStateChanged(auth, authorizationFunc);
});
