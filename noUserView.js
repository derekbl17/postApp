import { logOutBtn,adminNav,simpleNav,mainContainer, landRegBtn } from "./dom.js"


export const noUserViewFunc=()=>{
    logOutBtn.style.display = "none";
    logEmail.value = "";
    logPass.value = "";
    adminNav.style.display = "none";
    simpleNav.style.display = "none";
    mainContainer.innerHTML=""
}