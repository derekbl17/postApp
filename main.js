import { app } from "./appConfig.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

import { auth } from "./submitRegFormBtn.js";
import { authorizationFunc } from "./authorization.js";
onAuthStateChanged(auth, authorizationFunc);

export const mainContainer = document.getElementById("mainContainer");
