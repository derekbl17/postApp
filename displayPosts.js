import { ref, db, onValue} from "./appConfig.js"
import { categoryArray } from "./dom.js";
export const displayPosts=()=>{
        onValue(ref(db, 'posts/'), (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        // reach posts, create a card for each post
        Object.values(data).forEach(posts => {
        Object.values(posts).forEach(post=>{
            console.log(post);
            if (!categoryArray.includes(post.category)){
                categoryArray.push(post.category)
            }
            // create card
            const postCard=document.createElement("div")
            postCard.id=`postCard${post.category}`
            postCard.className="postCard"
            // create image
            const cardImage=document.createElement("img")
            cardImage.src=`${post.imageLink}`
            cardImage.alt=`${post.description}`
            // create name
            const cardName=document.createElement("h2")
            cardName.innerText=`${post.name}`
            // create category
            const cardCategory=document.createElement("h5")
            cardCategory.innerText=`${post.category}`
            // create description
            const cardDesc=document.createElement("p")
            cardDesc.innerText=`${post.description}`
            // create price tag
            const cardPrice=document.createElement("span")
            cardPrice.innerText=`${post.price} Eur.`
            // append all to card, append card to main container
            postCard.append(cardImage,cardName,cardCategory,cardDesc,cardPrice)
            mainContainer.append(postCard)
        });
    })
    })
}