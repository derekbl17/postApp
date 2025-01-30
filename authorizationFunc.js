import {
  database,
  ref,
  child,
  get,
} from "./appConfig.js";

import { adminNewCategoryFunc } from "./adminNewCategoryFunc.js";

import { adminView } from "./adminPage.js";
import { simpleViewFunc } from "./simpleView.js";
import { noUserViewFunc } from "./noUserView.js";

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
            adminView()
            adminNewCategoryFunc();
          } else if(userRole==="simple") {
            console.log("Grey-suit");
            simpleViewFunc()
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
    noUserViewFunc()
  }
};
