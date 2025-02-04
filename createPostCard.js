import { ref, db, onValue,auth, set, push, database,remove,get} from "./appConfig.js"
import { categoryArray, mainContainer } from "./dom.js";

export function createPostCard(post, subPostId, postId) {

    
    const postCard = document.createElement("div");
    postCard.id = `postCard${post.category}`;
    postCard.className = "postCard";
    postCard.setAttribute("DBID", subPostId);

    const imageContainer = document.createElement("div");
    imageContainer.id = "postCardImgContainer";

    const postBtnContainer = document.createElement("div");
    postBtnContainer.id = "postBtnContainer";

    const favBtn = document.createElement("button");
    favBtn.id = "favBtn";
    favBtn.innerHTML = `&#9733;`;

    const favRef = ref(db, `users/${auth.currentUser.uid}/favorites/${subPostId}`);

    favBtn.addEventListener("click", (e) => {
        e.preventDefault()
        get(favRef).then((snapshot) => {
            if (snapshot.exists()) {
                remove(favRef)
                    .then(() => console.log("Favorite removed"))
                    .catch((error) => console.error("Error removing favorite:", error));
            } else {
                set(favRef, { fav: true })
                    .then(() => console.log("Favorite added"))
                    .catch((error) => console.error("Error adding favorite:", error));
            }
        }).catch((error) => {
            console.error("Error checking favorite:", error);
        });
    });

    const commentBtn = document.createElement("button");
    commentBtn.id = "commentBtn";
    const commentBtnIcon = document.createElement("img");
    commentBtnIcon.src = "./images/comment.png";
    commentBtn.appendChild(commentBtnIcon);

    commentBtn.addEventListener("click", (e) => {
        console.log("COMMENT");

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

        // Comments renderer
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

    postBtnContainer.append(favBtn, commentBtn);

    if (auth.currentUser.uid === postId || auth.currentUser.uid === "aVvE66CIedcPBP6cSa34Xv0mIa82") {
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

        editBtn.addEventListener("click", (e) => {
            console.log("Edit");

            mainContainer.innerHTML = "";
            const fieldNames = ["Name", "Category", "Description", "Price, eur", "Image link"];

            const existingForm = document.getElementById("addPostForm");
            if (existingForm) {
                existingForm.remove();
            }

            const form = document.createElement("form");
            form.id = "addPostForm";
            mainContainer.append(form);

            for (let x of fieldNames) {
                const label = document.createElement("label");
                label.innerText = `${x}`;

                if (x === "Category") {
                    const select = document.createElement("select");
                    onValue(ref(db, 'categories/'), (snapshot) => {
                        const data = snapshot.val();
                        const option = document.createElement("option");
                        option.innerText = "Choose category";
                        option.value = "";
                        select.append(option);

                        for (let k in data) {
                            const option = document.createElement("option");
                            option.innerText = k;
                            option.value = k;
                            select.append(option);
                        }
                    });

                    select.id = `addPostField${x.slice(0, 3)}`;
                    label.setAttribute("for", select.id);
                    form.append(label, select);
                } else {
                    const input = document.createElement("input");
                    input.id = `addPostField${x.slice(0, 3)}`;
                    label.setAttribute("for", input.id);
                    form.append(label, input);
                }
            }

            // Pre-fill form fields with existing post data
            const addPostFieldNam = document.getElementById("addPostFieldNam");
            addPostFieldNam.value = post.name;

            const addPostFieldCat = document.getElementById("addPostFieldCat");
            addPostFieldCat.value = post.category;

            const addPostFieldDes = document.getElementById("addPostFieldDes");
            addPostFieldDes.value = post.description;

            const addPostFieldPri = document.getElementById("addPostFieldPri");
            addPostFieldPri.value = post.price;

            const addPostFieldIma = document.getElementById("addPostFieldIma");
            addPostFieldIma.value = post.imageLink;

            const postButton = document.createElement("button");
            postButton.innerText = "Update!";
            postButton.addEventListener("click", (e) => {
                e.preventDefault();
                if (addPostFieldCat.value.trim() && addPostFieldNam.value.trim() && addPostFieldDes.value.trim() && addPostFieldPri.value.trim() && addPostFieldIma.value.trim()) {
                    set(ref(db, `posts/${postId}/${subPostId}`), {
                        name: addPostFieldNam.value,
                        category: addPostFieldCat.value,
                        description: addPostFieldDes.value,
                        price: addPostFieldPri.value,
                        imageLink: addPostFieldIma.value
                    }).then(() => {
                        alert("Post updated successfully!");
                        displayPosts(); // Refresh the posts
                    });
                } else {
                    console.log("No value somewhere..");
                }
            });

            form.append(postButton);
        });

        deleteBtn.addEventListener("click", (e) => {
            console.log("Delete");
            if (window.confirm("Delete post. Are you sure?")) {
                remove(ref(db, `posts/${postId}/${subPostId}`))
                    .then(() => {
                        console.log("Post deleted");
                        displayPosts(); // Refresh the posts
                    })
                    .catch(error => console.error("Delete failed:", error));
            }
        });

        postBtnContainer.append(editBtn, deleteBtn);
    }

    const cardImage = document.createElement("img");
    cardImage.src = post.imageLink;
    cardImage.alt = post.description;
    imageContainer.append(postBtnContainer, cardImage);

    const cardName = document.createElement("h2");
    cardName.innerText = post.name;

    const cardCategory = document.createElement("h5");
    cardCategory.className = "postCategory";
    cardCategory.innerText = post.category;

    const cardDesc = document.createElement("p");
    cardDesc.innerText = post.description;

    const cardPrice = document.createElement("span");
    cardPrice.innerText = `${post.price} Eur.`;

    postCard.append(imageContainer, cardName, cardCategory, cardDesc, cardPrice);

    return postCard;
}

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