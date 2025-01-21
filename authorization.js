import { database } from "./submitRegFormBtn.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

import { landLogBtn } from "./landingPageLogBtn.js";
import { landRegBtn } from "./landingPageRegBtn.js";
import { logOutBtn } from "./logOutBtn.js";
import { adminNewCategory } from "./adminNewCategory.js";

export const logContainer = document.getElementById("regLogContainer");
const adminNav = document.getElementById("adminNav");
const simpleNav = document.getElementById("simpleNav");

export const authorizationFunc = (user) => {
  if (user) {
    const uid = user.uid;

    get(child(ref(database), "users/" + uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersFromDB = snapshot.val();
          const userRole = usersFromDB.role;

          if (userRole === "admin") {
            console.log("ADMIN ACCESS GRANTED");
            landLogBtn.style.display = "none";
            landRegBtn.style.display = "none";
            logOutBtn.style.display = "block";
            logContainer.style.display = "none";
            adminNav.style.display = "block";
            adminNewCategory();
          } else {
            console.log("Grey-suit");
            landLogBtn.style.display = "none";
            landRegBtn.style.display = "none";
            logOutBtn.style.display = "block";
            logContainer.style.display = "none";
            simpleNav.style.display = "block";
          }
        } else {
          console.log("No data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("Vartotojas neprisijunges");
    logOutBtn.style.display = "none";
    logEmail.value = "";
    logPass.value = "";
    adminNav.style.display = "none";
    simpleNav.style.display = "none";
  }
};
