import { mainContainer } from "./dom.js";
import { ref, set, db } from "./appConfig.js";
export function adminNewCategoryFunc() {
  mainContainer.innerHTML=""
  const currentCatForm = document.createElement("form");
  const addCatForm = document.createElement("form");
  const label = document.createElement("label");
  label.innerText = "Category name";
  const input = document.createElement("input");
  const addCatBtn = document.createElement("button");
  addCatBtn.innerText = "Add new category";
  addCatForm.append(label, input, addCatBtn);
  mainContainer.append(currentCatForm, addCatForm);
  console.log("ADMIN NEW CATEGORY");
  
  addCatBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log("add new category");

    set(ref(db, 'categories/' + input.value),{
      category: input.value
    }).then(()=>{
      input.value=""
      alert("Category added.")
    });

  })
}



