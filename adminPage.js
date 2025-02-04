import { landLogBtn,adminNav,landRegBtn,logOutBtn,logContainer, mainContainer } from "./dom.js";
import { ref, onValue,remove, db, auth,deleteUser,set } from "./appConfig.js";
import { adminNewCategoryFunc } from "./adminNewCategoryFunc.js";
import { displayPosts } from "./displayPosts.js";
const newCategorytab=document.getElementById("newCategoryTab")
const showUsersTab=document.getElementById("showUsersTab")
const allPostsTab=document.getElementById("allPostsTab")



export const adminView=()=>{
    landLogBtn.style.display = "none";
    landRegBtn.style.display = "none";
    logOutBtn.style.display = "block";
    logContainer.style.display = "none";
    adminNav.style.display = "block";
    onValue(ref(db, 'categories/'), (snapshot) => {
    const data = snapshot.val();
    adminNewCategoryFunc()
})
    newCategorytab.addEventListener("click",(e)=>{
        e.preventDefault()
        mainContainer.innerHTML=""
        adminNewCategoryFunc()
    })


    showUsersTab.addEventListener("click",(e)=>{
        e.preventDefault()
        mainContainer.innerHTML=""

        const starCountRef = ref(db, 'users/');
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const existingForm = document.getElementById("USERS");
        if (existingForm) {
        existingForm.remove()
        }
        const categoryListForm=document.createElement("form")
        categoryListForm.id="USERS"
        mainContainer.append(categoryListForm)
        for(let key in data){
            const userContainer=document.createElement("div")
            userContainer.id=`userList`
            const categoryName=document.createElement("h5")
            categoryName.innerText=`${data[key].email}`
            const userDelBtn=document.createElement("button")
            userDelBtn.className='deleteUser'
            userDelBtn.innerText="Delete"
            const userBlockBtn=document.createElement("button")
            userBlockBtn.innerText='Block'

            // sets user role to blocked
            userBlockBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    const userRef = ref(db, `users/${key}`);
                    set(userRef, { ...data[key], role: "blocked" }) // 
                        .then(() => {
                            alert(`User ${data[key].email} has been blocked.`);
                        })
                        .catch((error) => {
                            console.error("Error blocking user:", error);
                        });
                });

            userContainer.append(categoryName,userDelBtn,userBlockBtn)
            categoryListForm.append(userContainer)

            // deletes user from database
            userDelBtn.addEventListener("click",(e)=>{
                e.preventDefault()
                remove(ref(db, 'users/'+key))
                .then(()=>{
                    alert(`User ${data[key].email} deleted.`)
            })
        })
        }})
    })

    allPostsTab.addEventListener("click",(e)=>{
    e.preventDefault()
    console.log("ALL POSTS CLICKED");
    mainContainer.innerHTML=""
    displayPosts()
})



}







