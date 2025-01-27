import { onValue,ref,db,auth, push, set } from "./appConfig.js";
import { landLogBtn,landRegBtn,logOutBtn,logContainer,simpleNav,mainContainer,categoryArray } from "./dom.js"
import { displayPosts } from "./displayPosts.js";
export const simpleViewFunc=()=>{
    landLogBtn.style.display = "none";
    landRegBtn.style.display = "none";
    logOutBtn.style.display = "block";
    logContainer.style.display = "none";
    simpleNav.style.display = "block";

    const addPost = document.getElementById("addPost")
    const myPosts=document.getElementById("myPosts")
    const favorites=document.getElementById("favorites")
    const selectCategory=document.getElementById("selectCategory")

    displayPosts()
    // fetch and add categories from DB to category select in NAV
    onValue(ref(db, 'categories/'), (snapshot) => {
        const data = snapshot.val();
        for(let k in data){
            const option=document.createElement("option")
            option.innerText=k
            option.value=k
            selectCategory.append(option)
        }
    })

    // Target specific categories in NAV select
    selectCategory.addEventListener("click",e =>{
        mainContainer.innerHTML=""
        displayPosts()
        if (e.target.value!=0){
            categoryArray.forEach(category=>{
                console.log("are they even?",e.target.value==category);
                console.log("target value:",e.target.value);
                
                
                e.target.value == category ? document.querySelectorAll(`#postCard${e.target.value}`).forEach(card=>{
                    console.log("match");
                    
                    card.style.display="block"
                }) : document.querySelectorAll(`#postCard${category}`).forEach(card=>{
                    console.log("NO match");
                    
                    card.style.display="none"
                })
                
            })
        }
        console.log(e.target.value);
    })

    // Add post button
    addPost.addEventListener("click",(e)=>{
        mainContainer.innerHTML=""
        const fieldNames=["Name","Category","Description","Price, eur","Image link"]

        const existingForm = document.getElementById("addPostForm");
        if (existingForm) {
        existingForm.remove()
        }
        const form=document.createElement("form")
        form.id="addPostForm"
        mainContainer.append(form)

        for (let x of fieldNames){
            console.log(x);
            const label=document.createElement("label")
            label.innerText=`${x}`
            // fetch categories from DB and add each one as an option in select
            if (x==="Category"){
                const select=document.createElement("select")
                ///////
                onValue(ref(db, 'categories/'), (snapshot) => {
                    const data = snapshot.val();
                    const option=document.createElement("option")
                    option.innerText="Choose category"
                    option.value=""
                    select.append(option)
                    console.log(data);
                    for(let k in data){
                        const option=document.createElement("option")
                        option.innerText=k
                        option.value=k
                        select.append(option)
                    }
                })
                //////// not so simple :DDDDDDDDDD
                select.id=`addPostField${x.slice(0,3)}`
                label.setAttribute("for",select.id)
                form.append(label,select)

            } else{
                const input=document.createElement("input")
                input.id=`addPostField${x.slice(0,3)}`
                label.setAttribute("for",input.id)
                form.append(label,input)
            }
        }
        // declare ALL INPUT FIELDS and a button to submit form
        const postButton=document.createElement("button")
        const addPostFieldNam=document.getElementById("addPostFieldNam")
        const addPostFieldCat=document.getElementById("addPostFieldCat")
        const addPostFieldDes=document.getElementById("addPostFieldDes")
        const addPostFieldPri=document.getElementById("addPostFieldPri")
        const addPostFieldIma=document.getElementById("addPostFieldIma")
        postButton.innerText="Post!"
        postButton.addEventListener("click",(e)=>{
            e.preventDefault()
            console.log("POST!!!");
            // add post fields check
            if (addPostFieldCat.value.trim() && addPostFieldNam.value.trim() && addPostFieldDes.value.trim() && addPostFieldPri.value.trim() && addPostFieldIma.value.trim()){
                console.log("all Filled");
                // ADD POST if all fields filled
                set(push(ref(db, "posts/" + auth.currentUser.uid)), {
                        name: addPostFieldNam.value,
                        category: addPostFieldCat.value,
                        description: addPostFieldDes.value,
                        price: addPostFieldPri.value,
                        imageLink: addPostFieldIma.value
                      }).then(()=>{
                        alert("successfully posted!");
                        
                      })
                // if all fields !filled vvvvvv         
            } else{
                console.log("no value somewhere..");
            }
        })
        form.append(postButton)
    })


        
    }