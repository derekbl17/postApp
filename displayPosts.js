import { ref, db, onValue,auth, set, push, database,remove} from "./appConfig.js"
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


// export const displayPosts = () => {
//     onValue(ref(db, 'posts/'), (snapshot) => {
//         mainContainer.innerHTML=""
//         categoryArray.length=0
//         const data = snapshot.val();
//         if (!data) return; // Ensure there's data before proceeding

//         // Iterate through posts while keeping the ID
//         Object.entries(data).forEach(([postId, posts]) => {
//             Object.entries(posts).forEach(([subPostId, post]) => {
//                 if (!categoryArray.includes(post.category)) {
//                     categoryArray.push(post.category);
//                 }

//                 // Create card
//                 // assign postID to custom attribute
//                 const postCard = document.createElement("div");
//                 postCard.id = `postCard${post.category}`;
//                 postCard.className = "postCard";
//                 postCard.setAttribute("DBID",subPostId)

//                 // console.log("Post ID: ", subPostId);
//                 // console.log("Poster ID: ", postId); // This now correctly logs the post ID

//                 // image container
//                 const imageContainer=document.createElement("div")
//                 imageContainer.id="postCardImgContainer"
//                 //
//                 const postBtnContainer=document.createElement("div")
//                 postBtnContainer.id="postBtnContainer"
//                 // check if posts are made by current user
                
//                 // card buttons
//                 const favBtn=document.createElement("button")
//                 favBtn.id="favBtn"
//                 favBtn.innerHTML=`&#9733;`

//                 //favorite btn action
//                 favBtn.addEventListener("click",()=>{
//                     console.log("Favorite");
                    
//                 })

//                 const commentBtn=document.createElement("button")
//                 commentBtn.id="commentBtn"
//                 const commentBtnIcon=document.createElement("img")
//                 commentBtnIcon.src="./images/comment.png"
//                 commentBtn.appendChild(commentBtnIcon)

//                 // comment btn action
//                 commentBtn.addEventListener("click",(e)=>{
//                     console.log("Comment");
                    
//                     const backdrop=document.createElement("div")
//                     backdrop.id="backdrop"
//                     backdrop.addEventListener("click",(e)=>{
//                         e.preventDefault()
//                         backdrop.remove()
//                         commentForm.remove()
//                     })
//                     const commentForm=document.createElement("form")
//                     commentForm.id="commentForm"
//                     const commentFormName=document.createElement("h5")
//                     // Navigating through the trenches XD VVV
//                     commentFormName.innerText=e.currentTarget.closest('.postCard').querySelector('h2').innerText

//                     const commentArea=document.createElement("textarea")
//                     const submitCommentBtn=document.createElement("button")
//                     submitCommentBtn.innerText="Comment"
//                     //
//                     submitCommentBtn.addEventListener("click",(e)=>{
//                         e.preventDefault()
//                         if (!commentArea.value.trim()) return
//                         set(push(ref(database, `posts/${postId}/${subPostId}/comments`)), {
//                         comment: commentArea.value,
//                         author: auth.currentUser.uid,
//                     }).then(()=>{
//                         commentArea.value=""
//                         alert("comment Posted")
//                         postComments()
//                     })
//                     })
//                     //
                    
//                     //

                    
//                     // appends
//                     const header=document.getElementById("header")
//                     header.after(backdrop,commentForm)
//                     commentForm.append(commentFormName,commentArea,submitCommentBtn)
                    
//                     // dig through comments on post
//                     const commentsRef = ref(db, `posts/${postId}/${subPostId}/comments`);
//                     function postComments(){
//                         commentForm.querySelectorAll("div").forEach(node=>{
//                             node.remove()
//                         })
//                         if (post.comments){
//                         Object.entries(post.comments).forEach(([commentId,info])=>{
//                         console.log("ID: ",commentId);
//                         console.log("info: ",info.comment);

//                         const comment=document.createElement("div")
//                         comment.innerText=info.comment
//                         commentForm.append(comment)
//                         if(info.author===auth.currentUser.uid){
//                             const commentDelBtn=document.createElement("button")
//                             commentDelBtn.innerText="Delete"
//                             comment.append(commentDelBtn)
//                             commentDelBtn.addEventListener("click",(e)=>{
//                                 e.preventDefault()
//                                 remove(ref(db, `posts/${postId}/${subPostId}/comments/${commentId}`))
//                                 .then(()=>{alert("Comment Deleted.")})
//                                 .then(()=>{postComments()})
//                             })
//                         }

//                         })
//                     } else console.log("no comments");
//                     }
//                     postComments()
                    
//                 })

//                 postBtnContainer.append(favBtn,commentBtn)

//                 if (auth.currentUser.uid===postId){
//                     console.log("current user posted this");

//                     const editBtn=document.createElement("button")
//                     editBtn.id="editBtn"
//                     const editBtnIcon=document.createElement("img")
//                     editBtnIcon.src="./images/pencil.png"
//                     editBtn.appendChild(editBtnIcon)
//                     const deleteBtnIcon=document.createElement("img")
//                     deleteBtnIcon.src="./images/trash.png"
//                     const deleteBtn=document.createElement("button")
//                     deleteBtn.id="deleteBtn"

//                     // edit btn action
//                     editBtn.addEventListener("click",(e)=>{
//                     console.log("Edit");
//                     })

//                     // delete btn action
//                     deleteBtn.addEventListener("click",(e)=>{
//                     console.log("Delete");
//                     })

//                     deleteBtn.appendChild(deleteBtnIcon)
//                     postBtnContainer.append(editBtn,deleteBtn)
//                 } else{
//                     console.log("current user did NOT post these");
//                 }

//                 // Create image append to image container
//                 const cardImage = document.createElement("img");
//                 cardImage.src = post.imageLink;
//                 cardImage.alt = post.description;
//                 imageContainer.append(postBtnContainer,cardImage)

//                 // Create name
//                 const cardName = document.createElement("h2");
//                 cardName.innerText = post.name;

//                 // Create category
//                 const cardCategory = document.createElement("h5");
//                 cardCategory.innerText = post.category;

//                 // Create description
//                 const cardDesc = document.createElement("p");
//                 cardDesc.innerText = post.description;

//                 // Create price tag
//                 const cardPrice = document.createElement("span");
//                 cardPrice.innerText = `${post.price} Eur.`;

//                 // Append all elements to the card, then append card to main container
//                 postCard.append(imageContainer, cardName, cardCategory, cardDesc, cardPrice);
//                 mainContainer.append(postCard);
//             });
//         });
//     });
// };

///
///
///
///
///

export const displayPosts = () => {
  onValue(ref(db, 'posts/'), (snapshot) => {
    // Clear existing content
    mainContainer.innerHTML = '';
    categoryArray.length = 0;

    const data = snapshot.val();
    if (!data) return;

    Object.entries(data).forEach(([postId, posts]) => {
      Object.entries(posts).forEach(([subPostId, post]) => {
        if (!categoryArray.includes(post.category)) {
          categoryArray.push(post.category);
        }

        // Create post card
        const postCard = document.createElement("div");
        postCard.id = `postCard${post.category}`;
        postCard.className = "postCard";
        postCard.setAttribute("DBID", subPostId);

        // Image container
        const imageContainer = document.createElement("div");
        imageContainer.id = "postCardImgContainer";

        // Button container
        const postBtnContainer = document.createElement("div");
        postBtnContainer.id = "postBtnContainer";

        // Favorite button
        const favBtn = document.createElement("button");
        favBtn.id = "favBtn";
        favBtn.innerHTML = `&#9733;`;

        favBtn.addEventListener("click", () => {
          console.log("Favorite");
        });

        // Comment button
        const commentBtn = document.createElement("button");
        commentBtn.id = "commentBtn";
        const commentBtnIcon = document.createElement("img");
        commentBtnIcon.src = "./images/comment.png";
        commentBtn.appendChild(commentBtnIcon);

        // Comment button handler
        commentBtn.addEventListener("click", (e) => {
          const backdrop = document.createElement("div");
          backdrop.id = "backdrop";

          const commentForm = document.createElement("form");
          commentForm.id = "commentForm";

          // Comment form title
          const commentFormName = document.createElement("h5");
          commentFormName.innerText = e.currentTarget.closest('.postCard').querySelector('h2').innerText;

          // Comment textarea
          const commentArea = document.createElement("textarea");

          // Submit button
          const submitCommentBtn = document.createElement("button");
          submitCommentBtn.innerText = "Comment";

          // Real-time comments listener
          const commentsRef = ref(db, `posts/${postId}/${subPostId}/comments`);
          let commentsListener = null;

          // Comment submission handler
          submitCommentBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (!commentArea.value.trim()) return;

            set(push(ref(db, `posts/${postId}/${subPostId}/comments`)), {
              comment: commentArea.value,
              author: auth.currentUser.uid,
            }).then(() => {
              commentArea.value = "";
            });
          });

          // Real-time comments renderer
          const setupComments = () => {
            commentsListener = onValue(commentsRef, (commentsSnapshot) => {
              const commentsData = commentsSnapshot.val();
              renderComments(commentsData, commentForm, postId, subPostId);
            });
          };

          // Cleanup function
          const cleanup = () => {
            if (commentsListener) commentsListener();
            backdrop.remove();
            commentForm.remove();
          };

          // Backdrop click handler
          backdrop.addEventListener("click", (e) => {
            e.preventDefault();
            cleanup();
          });

          // Append elements
          commentForm.append(commentFormName, commentArea, submitCommentBtn);
          header.after(backdrop, commentForm);
          setupComments();
        });

        // Append buttons to button container
        postBtnContainer.append(favBtn, commentBtn);

        // Add edit/delete buttons if current user is the poster
        if (auth.currentUser.uid === postId) {
          const editBtn = document.createElement("button");
          editBtn.id = "editBtn";
          const editBtnIcon = document.createElement("img");
          editBtnIcon.src = "./images/pencil.png";
          editBtn.appendChild(editBtnIcon);

          const deleteBtn = document.createElement("button");
          deleteBtn.id = "deleteBtn";
          const deleteBtnIcon = document.createElement("img");
          deleteBtnIcon.src = "./images/trash.png";
          deleteBtn.appendChild(deleteBtnIcon);

          // Edit button handler
          editBtn.addEventListener("click", (e) => {
            console.log("Edit");
          });

          // Delete button handler
          deleteBtn.addEventListener("click", (e) => {
            console.log("Delete");
            if(window.confirm("Delete post. Are you sure?")){
                remove(ref(db, `posts/${postId}/${subPostId}`))
                .catch(error => console.error("Delete failed:", error));
            }
          });

          postBtnContainer.append(editBtn, deleteBtn);
        }

        // Create image and append to image container
        const cardImage = document.createElement("img");
        cardImage.src = post.imageLink;
        cardImage.alt = post.description;
        imageContainer.append(postBtnContainer, cardImage);

        // Create post name
        const cardName = document.createElement("h2");
        cardName.innerText = post.name;

        // Create post category
        const cardCategory = document.createElement("h5");
        cardCategory.innerText = post.category;

        // Create post description
        const cardDesc = document.createElement("p");
        cardDesc.innerText = post.description;

        // Create post price
        const cardPrice = document.createElement("span");
        cardPrice.innerText = `${post.price} Eur.`;

        // Append all elements to the post card
        postCard.append(imageContainer, cardName, cardCategory, cardDesc, cardPrice);

        // Append post card to main container
        mainContainer.append(postCard);
      });
    });
  });
};

// SEPARATE COMMENT RENDERER FUNCTION
function renderComments(commentsData, commentForm, postId, subPostId) {
  // Clear existing comments
  const existingComments = commentForm.querySelectorAll('.comment');
  existingComments.forEach(comment => comment.remove());

  if (!commentsData) {
    const noComments = document.createElement('div');
    noComments.textContent = "No comments yet";
    commentForm.append(noComments);
    return;
  }

  Object.entries(commentsData).forEach(([commentId, info]) => {
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";

    const commentText = document.createElement("p");
    commentText.textContent = info.comment;

    commentDiv.append(commentText);

    // Add delete button if current user is the comment author
    if (info.author === auth.currentUser.uid) {
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";

      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        remove(ref(db, `posts/${postId}/${subPostId}/comments/${commentId}`))
          .catch(error => console.error("Delete failed:", error));
      });

      commentDiv.append(deleteBtn);
    }

    commentForm.append(commentDiv);
  });
}