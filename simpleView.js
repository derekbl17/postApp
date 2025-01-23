import { onValue,ref,db } from "./appConfig.js";
import { landLogBtn,landRegBtn,logOutBtn,logContainer,simpleNav,mainContainer } from "./dom.js"
export const simpleViewFunc=()=>{
    landLogBtn.style.display = "none";
    landRegBtn.style.display = "none";
    logOutBtn.style.display = "block";
    logContainer.style.display = "none";
    simpleNav.style.display = "block";

    const addPost = document.getElementById("addPost")
    const myPosts=document.getElementById("myPosts")
    const favorites=document.getElementById("favorites")

    addPost.addEventListener("click",(e)=>{
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
        const postButton=document.createElement("button")
        postButton.innerText="Post!"
        postButton.addEventListener("click",(e)=>{
            e.preventDefault()
            console.log("POST!!!");
            
            if (document.getElementById("addPostFieldCat").value.trim() && document.getElementById("addPostFieldNam").value.trim() && document.getElementById("addPostFieldDes").value.trim() && document.getElementById("addPostFieldPri").value.trim() && document.getElementById("addPostFieldIma").value.trim()){
                console.log("all Filled");
                
            } else{
                console.log("no value somewhere..");
                
            }
        })
        form.append(postButton)
    })
}