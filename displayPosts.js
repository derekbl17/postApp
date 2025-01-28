import { ref, db, onValue,auth} from "./appConfig.js"
import { categoryArray, mainContainer } from "./dom.js";
// export const displayPosts=()=>{
//         onValue(ref(db, 'posts/'), (snapshot) => {
//         const data = snapshot.val();
//         // reach posts, create a card for each post
//         Object.values(data).forEach(posts => {
//         Object.values(posts).forEach(post=>{
//             if (!categoryArray.includes(post.category)){
//                 categoryArray.push(post.category)
//             }
//             // create card
//             const postCard=document.createElement("div")
//             postCard.id=`postCard${post.category}`
//             postCard.className="postCard"

            
//             console.log("Post: ",post.key);
            
//             // create image
//             const cardImage=document.createElement("img")
//             cardImage.src=`${post.imageLink}`
//             cardImage.alt=`${post.description}`
//             // create name
//             const cardName=document.createElement("h2")
//             cardName.innerText=`${post.name}`
//             // create category
//             const cardCategory=document.createElement("h5")
//             cardCategory.innerText=`${post.category}`
//             // create description
//             const cardDesc=document.createElement("p")
//             cardDesc.innerText=`${post.description}`
//             // create price tag
//             const cardPrice=document.createElement("span")
//             cardPrice.innerText=`${post.price} Eur.`
//             // append all to card, append card to main container
//             postCard.append(cardImage,cardName,cardCategory,cardDesc,cardPrice)
//             mainContainer.append(postCard)
//         });
//     })
//     })
// }


export const displayPosts = () => {
    onValue(ref(db, 'posts/'), (snapshot) => {
        const data = snapshot.val();
        if (!data) return; // Ensure there's data before proceeding

        // Iterate through posts while keeping the ID
        Object.entries(data).forEach(([postId, posts]) => {
            Object.entries(posts).forEach(([subPostId, post]) => {
                if (!categoryArray.includes(post.category)) {
                    categoryArray.push(post.category);
                }

                // Create card
                // assign postID to custom attribute
                const postCard = document.createElement("div");
                postCard.id = `postCard${post.category}`;
                postCard.className = "postCard";
                postCard.setAttribute("DBID",subPostId)

                // console.log("Post ID: ", subPostId);
                // console.log("Poster ID: ", postId); // This now correctly logs the post ID

                // image container
                const imageContainer=document.createElement("div")
                imageContainer.id="postCardImgContainer"
                //
                const postBtnContainer=document.createElement("div")
                postBtnContainer.id="postBtnContainer"
                // check if posts are made by current user
                
                // card buttons
                const favBtn=document.createElement("button")
                favBtn.id="favBtn"
                favBtn.innerHTML=`&#9733;`

                //favorite btn action
                favBtn.addEventListener("click",()=>{
                    console.log("Favorite");
                    
                })

                const commentBtn=document.createElement("button")
                commentBtn.id="commentBtn"
                const commentBtnIcon=document.createElement("img")
                commentBtnIcon.src="./images/comment.png"
                commentBtn.appendChild(commentBtnIcon)

                // comment btn action
                commentBtn.addEventListener("click",(e)=>{
                    console.log("Comment");
                    
                })

                postBtnContainer.append(favBtn,commentBtn)

                if (auth.currentUser.uid===postId){
                    console.log("current user posted this");

                    const editBtn=document.createElement("button")
                    editBtn.id="editBtn"
                    const editBtnIcon=document.createElement("img")
                    editBtnIcon.src="./images/pencil.png"
                    editBtn.appendChild(editBtnIcon)
                    const deleteBtnIcon=document.createElement("img")
                    deleteBtnIcon.src="./images/trash.png"
                    const deleteBtn=document.createElement("button")
                    deleteBtn.id="deleteBtn"

                    // edit btn action
                    editBtn.addEventListener("click",(e)=>{
                    console.log("Edit");
                    })

                    // delete btn action
                    deleteBtn.addEventListener("click",(e)=>{
                    console.log("Delete");
                    })

                    deleteBtn.appendChild(deleteBtnIcon)
                    postBtnContainer.append(editBtn,deleteBtn)
                } else{
                    console.log("current user did NOT post these");
                }

                // Create image append to image container
                const cardImage = document.createElement("img");
                cardImage.src = post.imageLink;
                cardImage.alt = post.description;
                imageContainer.append(postBtnContainer,cardImage)

                // Create name
                const cardName = document.createElement("h2");
                cardName.innerText = post.name;

                // Create category
                const cardCategory = document.createElement("h5");
                cardCategory.innerText = post.category;

                // Create description
                const cardDesc = document.createElement("p");
                cardDesc.innerText = post.description;

                // Create price tag
                const cardPrice = document.createElement("span");
                cardPrice.innerText = `${post.price} Eur.`;

                // Append all elements to the card, then append card to main container
                postCard.append(imageContainer, cardName, cardCategory, cardDesc, cardPrice);
                mainContainer.append(postCard);
            });
        });
    });
};
