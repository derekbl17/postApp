import { landLogBtn,adminNav,landRegBtn,logOutBtn,logContainer, mainContainer } from "./dom.js";
import { ref, onValue,remove, db, auth,deleteUser,set } from "./appConfig.js";
import { adminNewCategoryFunc } from "./adminNewCategoryFunc.js";
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
    onValue(ref(db, 'categories/'), (snapshot) => {
    const data = snapshot.val();
    console.log(data);

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
            
            const userContainer=document.createElement("div")
            userContainer.id=`userList`
            const categoryName=document.createElement("h5")
            categoryName.innerText=`${data[key].email}`
            const userDelBtn=document.createElement("button")
            userDelBtn.className='deleteUser'
            userDelBtn.innerText="Delete"
            const userBlockBtn=document.createElement("button")
            userBlockBtn.innerText='Block'

            userBlockBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    const userRef = ref(db, `users/${key}`);
                    set(userRef, { ...data[key], role: "blocked" }) // Update the user's role to "blocked"
                        .then(() => {
                            alert(`User ${data[key].email} has been blocked.`);
                        })
                        .catch((error) => {
                            console.error("Error blocking user:", error);
                        });
                });

            userContainer.append(categoryName,userDelBtn,userBlockBtn)
            categoryListForm.append(userContainer)

            userDelBtn.addEventListener("click",(e)=>{
                e.preventDefault()
                remove(ref(db, 'users/'+key))
                .then(()=>{
                    alert(`User ${data[key].email} deleted.`)
            })
        })
        }})
    })

}







