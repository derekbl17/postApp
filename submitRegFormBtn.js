import { authorizationFunc } from "./authorization.js";
import { app } from "./appConfig.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const submitReg = document.getElementById("regSubmit");
export const auth = getAuth();
export const database = getDatabase(app);

submitReg.addEventListener("click", (e) => {
  e.preventDefault();

  const email = regEmail.value.trim();
  const password = regPass.value.trim();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const loginTime = new Date();

      set(ref(database, "users/" + user.uid), {
        email: email,
        role: "simple",
        timestamp: `${loginTime}`,
      })
        .then(() => {
          console.log("Vartotojo duomenys issaugoti");
          onAuthStateChanged(auth, authorizationFunc);
        })
        .catch((err) => {
          console.log("error saugant duomenis", err);
        });
      regEmail.value = "";
      regPass.value = "";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log((errorCode, errorMessage));
    });
});
