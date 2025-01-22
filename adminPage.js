import { landLogBtn,adminNav,landRegBtn,logOutBtn,logContainer, mainContainer } from "./dom.js";
import { ref, onValue,remove, db, auth,deleteUser } from "./appConfig.js";

const newCategorytab=document.getElementById("newCategoryTab")
const showUsersTab=document.getElementById("showUsersTab")
const allPostsTab=document.getElementById("allPostsTab")


allPostsTab.addEventListener("click",(e)=>{
    e.preventDefault()
})


export const adminView=()=>{
    landLogBtn.style.display = "none";
    landRegBtn.style.display = "none";
    logOutBtn.style.display = "block";
    logContainer.style.display = "none";
    adminNav.style.display = "block";
    const starCountRef = ref(db, 'categories/');
    onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);

    
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
    newCategorytab.addEventListener("click",(e)=>{
        e.preventDefault()
        mainContainer.innerHTML=""
        adminView()
    })


    showUsersTab.addEventListener("click",(e)=>{
        e.preventDefault()
        mainContainer.innerHTML=""

        const starCountRef = ref(db, 'users/');
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        const existingForm = document.getElementById("USERS");
        if (existingForm) {
        existingForm.remove()
        }
        const categoryListForm=document.createElement("form")
        categoryListForm.id="USERS"
        mainContainer.append(categoryListForm)
        for(let key in data){
            console.log(auth.currentUser);
            
            const categoryContainer=document.createElement("div")
            categoryContainer.id=`userList`
            const categoryName=document.createElement("h5")
            categoryName.innerText=`${data[key].email}`
            const categoryDelBtn=document.createElement("button")
            categoryDelBtn.className='deleteUser'
            categoryDelBtn.innerText="Delete"
            categoryContainer.append(categoryName,categoryDelBtn)
            categoryListForm.append(categoryContainer)

            categoryDelBtn.addEventListener("click",(e)=>{
                e.preventDefault()
                remove(ref(db, 'users/'+key))
                .then(()=>{
                    alert(`User ${data[key].email} deleted.`)
            })
        })
        }})
    })

}







