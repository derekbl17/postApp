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

    favBtn.addEventListener("click", () => {
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
        // Handle comment button click (same as before)
    });

    postBtnContainer.append(favBtn, commentBtn);

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

        editBtn.addEventListener("click", (e) => {
            // Handle edit button click (same as before)
        });

        deleteBtn.addEventListener("click", (e) => {
            // Handle delete button click (same as before)
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
    cardCategory.className = "postCategory"
    cardCategory.innerText = post.category;

    const cardDesc = document.createElement("p");
    cardDesc.innerText = post.description;

    const cardPrice = document.createElement("span");
    cardPrice.innerText = `${post.price} Eur.`;

    postCard.append(imageContainer, cardName, cardCategory, cardDesc, cardPrice);

    return postCard;
}