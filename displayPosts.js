import { ref, db, onValue} from "./appConfig.js"
import { categoryArray, mainContainer } from "./dom.js";
import { createPostCard } from "./createPostCard.js";

let postsListener=null
export const displayPosts = () => {
    return new Promise((resolve)=>{
        if (postsListener) {
        postsListener(); // Detach the existing listener if exists
    }
        postsListener = onValue(ref(db, 'posts/'), (snapshot) => {  
            mainContainer.innerHTML = ''; // Clear existing content
            categoryArray.length = 0; // Reset categories

            const data = snapshot.val();
            if (!data) {
                resolve();
                return
            }; // If no data, exit

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
        resolve();
    });
    })
};