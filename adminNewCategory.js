import { mainContainer } from "./main.js";

export function adminNewCategory() {
  const currentCatForm = document.createElement("form");
  const addCatForm = document.createElement("form");
  const label = document.createElement("label");
  label.innerText = "Category name";
  const input = document.createElement("input");
  const addCatBtn = document.createElement("button");
  addCatBtn.innerText = "Add new category";
  addCatForm.append(label, input, addCatBtn);
  mainContainer.append(currentCatForm, addCatForm);
}
