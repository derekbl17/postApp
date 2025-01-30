import { onValue,ref,db,auth, push, set } from "./appConfig.js";
import { landLogBtn,landRegBtn,logOutBtn,logContainer,simpleNav,mainContainer,categoryArray } from "./dom.js"
import { displayPosts } from "./displayPosts.js";
import { createPostCard } from "./createPostCard.js";
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
        selectCategory.innerHTML = '<option value="0">All Categories</option>';
        for(let k in data){
            const option=document.createElement("option")
            option.innerText=k
            option.value=k
            selectCategory.append(option)
        }
    })

    // Target specific categories in NAV select

    selectCategory.addEventListener("change", (e) => {
        displayPosts()
        const selectedCategory = e.target.value;
        
        // Show/hide posts based on category
        document.querySelectorAll(".postCard").forEach(card => {
            const cardCategory = card.querySelector("h5").textContent; // Adjust selector if needed
            card.style.display = 
                (selectedCategory === "0" || cardCategory === selectedCategory) 
                ? "block" 
                : "none";
        });
    });
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
    //
    //
    favorites.addEventListener("click", (e) => {
        console.log("favorites");
        mainContainer.innerHTML = ''; // Clear existing content

        // Fetch the current user's favorites
        const favoritesRef = ref(db, `users/${auth.currentUser.uid}/favorites`);
        onValue(favoritesRef, (favoritesSnapshot) => {
            const favoritesData = favoritesSnapshot.val();
            if (!favoritesData) {
                mainContainer.innerHTML = '<p>No favorites found.</p>';
                return;
            }

            // Fetch all posts
            const postsRef = ref(db, 'posts/');
            onValue(postsRef, (postsSnapshot) => {
                const postsData = postsSnapshot.val();
                if (!postsData) return;

                // Filter posts that are in the user's favorites
                Object.entries(postsData).forEach(([postId, posts]) => {
                    Object.entries(posts).forEach(([subPostId, post]) => {
                        if (favoritesData[subPostId]) {
                            // Create and append the post card to the main container
                            const postCard = createPostCard(post, subPostId, postId);
                            mainContainer.append(postCard);
                        }
                    });
                });
            });
        });
    });

    myPosts.addEventListener("click",(e)=>{
        console.log("my Posts");
        mainContainer.innerHTML = ''; // Clear existing content

        // Fetch posts made by the current user
        const userPostsRef = ref(db, `posts/${auth.currentUser.uid}`);
        onValue(userPostsRef, (snapshot) => {
            const userPostsData = snapshot.val();
            if (!userPostsData) {
                mainContainer.innerHTML = '<p>No posts found.</p>';
                return;
            }

            // Display each post
            Object.entries(userPostsData).forEach(([subPostId, post]) => {
                const postCard = createPostCard(post, subPostId, auth.currentUser.uid);
                mainContainer.append(postCard);
            });
        });
    })


        
}