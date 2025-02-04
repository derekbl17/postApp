import { landRegBtn,landLogBtn,logOutBtn,logContainer } from "./dom.js";

import { signOut,auth} from "./appConfig.js";



logOutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("LOG OUT BUTTON");
  
  signOut(auth)
    .then(() => {
      landLogBtn.style.display = "none";
      landRegBtn.style.display = "block";
      logContainer.style.display = "flex";
    })
    .then(()=>{
      window.location.reload()
    })
    .catch((error) => {
      console.log("error:", error);
    });
});
