import { mainContainer } from "./dom.js";
import { ref, set, db,onValue } from "./appConfig.js";
export function adminNewCategoryFunc() {
  console.log("admin new cat func worked");
  
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
  onValue(ref(db, 'categories/'),(snapshot) => {
    const data = snapshot.val();
    const existingForm = document.getElementById("CATEGORIES");
      if (existingForm) {
        existingForm.remove()
      }
      const categoryListForm=document.createElement("form")
      categoryListForm.id="CATEGORIES"
      mainContainer.append(categoryListForm)
      for(let key in data){
          console.log(key);
  
          const categoryContainer=document.createElement("div")
          categoryContainer.id=`categoryList`
          const categoryName=document.createElement("h5")
          categoryName.innerText=`${key}`
          const categoryDelBtn=document.createElement("button")
          categoryDelBtn.className='removeCategory'
          categoryDelBtn.innerText="Remove"
          categoryContainer.append(categoryName,categoryDelBtn)
          categoryListForm.append(categoryContainer)
  
          categoryDelBtn.addEventListener("click",(e)=>{
              e.preventDefault()
  
              
              remove(ref(db, 'categories/'+key))
              .then(()=>{
                  alert(`Category ${key} removed.`)
              })
          })
      }
  })
}



