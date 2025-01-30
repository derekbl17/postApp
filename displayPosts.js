import { ref, db, onValue,auth, set, push, database,remove,get} from "./appConfig.js"
import { categoryArray, mainContainer } from "./dom.js";
import { createPostCard } from "./createPostCard.js";
// export const displayPosts = () => {
//   onValue(ref(db, 'posts/'), (snapshot) => {
//     // Clear existing content
//     mainContainer.innerHTML = '';
//     categoryArray.length = 0;

//     const data = snapshot.val();
//     if (!data) return;

//     Object.entries(data).forEach(([postId, posts]) => {
//       Object.entries(posts).forEach(([subPostId, post]) => {
//         if (!categoryArray.includes(post.category)) {
//           categoryArray.push(post.category);
//         }

//         // Create post card
//         const postCard = document.createElement("div");
//         postCard.id = `postCard${post.category}`;
//         postCard.className = "postCard";
//         postCard.setAttribute("DBID", subPostId);

//         // Image container
//         const imageContainer = document.createElement("div");
//         imageContainer.id = "postCardImgContainer";

//         // Button container
//         const postBtnContainer = document.createElement("div");
//         postBtnContainer.id = "postBtnContainer";

//         // Favorite button
//         const favBtn = document.createElement("button");
//         favBtn.id = "favBtn";
//         favBtn.innerHTML = `&#9733;`;

//         const favRef=ref(db, `users/${auth.currentUser.uid}/favorites/${subPostId}`)

//         favBtn.addEventListener("click", () => {
//           console.log("Favorite");

//           get(favRef).then((snapshot) => {
//             if (snapshot.exists()) {
//                 // If exists, remove it (unfavorite)
//                 remove(favRef)
//                     .then(() => console.log("Favorite removed"))
//                     .catch((error) => console.error("Error removing favorite:", error));
//             } else {
//                 // If not exists, add it (favorite)
//                 set(favRef, { fav: true })
//                     .then(() => console.log("Favorite added"))
//                     .catch((error) => console.error("Error adding favorite:", error));
//             }
//           }).catch((error) => {
//               console.error("Error checking favorite:", error);
//           });
//         });

//         // Comment button
//         const commentBtn = document.createElement("button");
//         commentBtn.id = "commentBtn";
//         const commentBtnIcon = document.createElement("img");
//         commentBtnIcon.src = "./images/comment.png";
//         commentBtn.appendChild(commentBtnIcon);

//         // Comment button handler
//         commentBtn.addEventListener("click", (e) => {
//           const backdrop = document.createElement("div");
//           backdrop.id = "backdrop";

//           const commentForm = document.createElement("form");
//           commentForm.id = "commentForm";

//           // Comment form title
//           const commentFormName = document.createElement("h5");
//           commentFormName.innerText = e.currentTarget.closest('.postCard').querySelector('h2').innerText;

//           // Comment textarea
//           const commentArea = document.createElement("textarea");

//           // Submit button
//           const submitCommentBtn = document.createElement("button");
//           submitCommentBtn.innerText = "Comment";

//           // Real-time comments listener
//           const commentsRef = ref(db, `posts/${postId}/${subPostId}/comments`);
//           let commentsListener = null;

//           // Comment submission handler
//           submitCommentBtn.addEventListener("click", (e) => {
//             e.preventDefault();
//             if (!commentArea.value.trim()) return;

//             set(push(ref(db, `posts/${postId}/${subPostId}/comments`)), {
//               comment: commentArea.value,
//               author: auth.currentUser.uid,
//             }).then(() => {
//               commentArea.value = "";
//             });
//           });

//           // Real-time comments renderer
//           const setupComments = () => {
//             commentsListener = onValue(commentsRef, (commentsSnapshot) => {
//               const commentsData = commentsSnapshot.val();
//               renderComments(commentsData, commentForm, postId, subPostId);
//             });
//           };

//           // Cleanup function
//           const cleanup = () => {
//             if (commentsListener) commentsListener();
//             backdrop.remove();
//             commentForm.remove();
//           };

//           // Backdrop click handler
//           backdrop.addEventListener("click", (e) => {
//             e.preventDefault();
//             cleanup();
//           });

//           // Append elements
//           commentForm.append(commentFormName, commentArea, submitCommentBtn);
//           header.after(backdrop, commentForm);
//           setupComments();
//         });

//         // Append buttons to button container
//         postBtnContainer.append(favBtn, commentBtn);

//         // Add edit/delete buttons if current user is the poster
//         if (auth.currentUser.uid === postId) {
//           const editBtn = document.createElement("button");
//           editBtn.id = "editBtn";
//           const editBtnIcon = document.createElement("img");
//           editBtnIcon.src = "./images/pencil.png";
//           editBtn.appendChild(editBtnIcon);

//           const deleteBtn = document.createElement("button");
//           deleteBtn.id = "deleteBtn";
//           const deleteBtnIcon = document.createElement("img");
//           deleteBtnIcon.src = "./images/trash.png";
//           deleteBtn.appendChild(deleteBtnIcon);
//           //
//           //
//           //
//           //
//           //
//           //
//           //
//           //
//           // Edit button handler
//           editBtn.addEventListener("click", (e) => {
//             console.log("Edit");

            
//           mainContainer.innerHTML=""
//           const fieldNames=["Name","Category","Description","Price, eur","Image link"]

//           const existingForm = document.getElementById("addPostForm");
//           if (existingForm) {
//           existingForm.remove()
//           }
//           const form=document.createElement("form")
//           form.id="addPostForm"
//           mainContainer.append(form)

//           for (let x of fieldNames){
//               console.log(x);
//               const label=document.createElement("label")
//               label.innerText=`${x}`
//               // fetch categories from DB and add each one as an option in select
//               if (x==="Category"){
//                   const select=document.createElement("select")
//                   ///////
//                   onValue(ref(db, 'categories/'), (snapshot) => {
//                       const data = snapshot.val();
//                       const option=document.createElement("option")
//                       option.innerText="Choose category"
//                       option.value=""
//                       select.append(option)
//                       console.log(data);
//                       for(let k in data){
//                           const option=document.createElement("option")
//                           option.innerText=k
//                           option.value=k
//                           select.append(option)
//                       }
//                   })
//                   //////// not so simple :DDDDDDDDDD
//                   select.id=`addPostField${x.slice(0,3)}`
//                   label.setAttribute("for",select.id)
//                   form.append(label,select)

//               } else{
//                   const input=document.createElement("input")
//                   input.id=`addPostField${x.slice(0,3)}`
//                   label.setAttribute("for",input.id)
//                   form.append(label,input)
//               }
//           }
//           // declare ALL INPUT FIELDS and a button to submit form
//           const postButton=document.createElement("button")
//           const addPostFieldNam=document.getElementById("addPostFieldNam")
//           addPostFieldNam.value=`${cardName.innerText}`
//           const addPostFieldCat=document.getElementById("addPostFieldCat")
//           addPostFieldCat.value=`${cardCategory.innerText}`
//           const addPostFieldDes=document.getElementById("addPostFieldDes")
//           addPostFieldDes.value=`${cardDesc.innerText}`
//           const addPostFieldPri=document.getElementById("addPostFieldPri")
//           addPostFieldPri
//           addPostFieldPri.value=`${cardPrice.innerText.match(/\d+(\.\d+)?/)[0]}`
//           const addPostFieldIma=document.getElementById("addPostFieldIma")
//           addPostFieldIma.value=`${cardImage.src}`
//           postButton.innerText="Update!"
//           postButton.addEventListener("click",(e)=>{
//               e.preventDefault()
//               console.log("POST!!!");
//               // add post fields check
//               if (addPostFieldCat.value.trim() && addPostFieldNam.value.trim() && addPostFieldDes.value.trim() && addPostFieldPri.value.trim() && addPostFieldIma.value.trim()){
//                   console.log("all Filled");
//                   // ADD POST if all fields filled
//                   set(ref(db, `posts/${auth.currentUser.uid}/${subPostId}`), {
//                           name: addPostFieldNam.value,
//                           category: addPostFieldCat.value,
//                           description: addPostFieldDes.value,
//                           price: addPostFieldPri.value,
//                           imageLink: addPostFieldIma.value
//                         }).then(()=>{
//                           alert("successfully posted!");
                          
//                         })
//                   // if all fields !filled vvvvvv         
//               } else{
//                   console.log("no value somewhere..");
//               }
//           })
//           form.append(postButton)
//           });
//           ////
//           ////
//           ////
//           ////
//           ////
//           ////

//           // Delete button handler
//           deleteBtn.addEventListener("click", (e) => {
//             console.log("Delete");
//             if(window.confirm("Delete post. Are you sure?")){
//                 remove(ref(db, `posts/${postId}/${subPostId}`))
//                 .catch(error => console.error("Delete failed:", error));
//             }
//           });

//           postBtnContainer.append(editBtn, deleteBtn);
//         }

//         // Create image and append to image container
//         const cardImage = document.createElement("img");
//         cardImage.src = post.imageLink;
//         cardImage.alt = post.description;
//         imageContainer.append(postBtnContainer, cardImage);

//         // Create post name
//         const cardName = document.createElement("h2");
//         cardName.innerText = post.name;

//         // Create post category
//         const cardCategory = document.createElement("h5");
//         cardCategory.innerText = post.category;

//         // Create post description
//         const cardDesc = document.createElement("p");
//         cardDesc.innerText = post.description;

//         // Create post price
//         const cardPrice = document.createElement("span");
//         cardPrice.innerText = `${post.price} Eur.`;

//         // Append all elements to the post card
//         postCard.append(imageContainer, cardName, cardCategory, cardDesc, cardPrice);

//         // Append post card to main container
//         mainContainer.append(postCard);
//       });
//     });
//   });
// };

// // SEPARATE COMMENT RENDERER FUNCTION
// function renderComments(commentsData, commentForm, postId, subPostId) {
//   // Clear existing comments
//   const existingComments = commentForm.querySelectorAll('.comment');
//   existingComments.forEach(comment => comment.remove());

//   if (!commentsData) {
//     const noComments = document.createElement('div');
//     noComments.textContent = "No comments yet";
//     commentForm.append(noComments);
//     return;
//   }

//   Object.entries(commentsData).forEach(([commentId, info]) => {
//     const commentDiv = document.createElement("div");
//     commentDiv.className = "comment";

//     const commentText = document.createElement("p");
//     commentText.textContent = info.comment;

//     commentDiv.append(commentText);

//     // Add delete button if current user is the comment author
//     if (info.author === auth.currentUser.uid) {
//       const deleteBtn = document.createElement("button");
//       deleteBtn.textContent = "Delete";

//       deleteBtn.addEventListener("click", (e) => {
//         e.preventDefault();
//         remove(ref(db, `posts/${postId}/${subPostId}/comments/${commentId}`))
//           .catch(error => console.error("Delete failed:", error));
//       });

//       commentDiv.append(deleteBtn);
//     }

//     commentForm.append(commentDiv);
//   });
// }
let postsListener=null
export const displayPosts = () => {
   if (postsListener) {
        postsListener(); // Detach the existing listener
    }
        postsListener = onValue(ref(db, 'posts/'), (snapshot) => {
        mainContainer.innerHTML = ''; // Clear existing content
        categoryArray.length = 0; // Reset categories

        const data = snapshot.val();
        if (!data) return; // If no data, exit

        // Loop through all posts
        Object.entries(data).forEach(([postId, posts]) => {
            Object.entries(posts).forEach(([subPostId, post]) => {
                // Add category to categoryArray if it doesn't already exist
                if (!categoryArray.includes(post.category)) {
                    categoryArray.push(post.category);
                }

                // Create and append the post card using the helper function
                const postCard = createPostCard(post, subPostId, postId);
                mainContainer.append(postCard);
            });
        });
    });
};