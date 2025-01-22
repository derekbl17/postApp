import { landLogBtn,landRegBtn,logOutBtn,logContainer,simpleNav } from "./dom.js"
export const simpleViewFunc=()=>{
    landLogBtn.style.display = "none";
    landRegBtn.style.display = "none";
    logOutBtn.style.display = "block";
    logContainer.style.display = "none";
    simpleNav.style.display = "block";
}