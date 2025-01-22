import { authorizationFunc } from "./authorizationFunc.js";

import {
  ref,
  set,
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  database
} from "./appConfig.js";

const submitReg = document.getElementById("regSubmit");

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
