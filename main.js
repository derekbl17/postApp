import {
  onAuthStateChanged,
} from "./appConfig.js";

import { auth } from "./appConfig.js";
import { authorizationFunc } from "./authorizationFunc.js";

console.log("INITIAL CHECK");
onAuthStateChanged(auth, authorizationFunc);

