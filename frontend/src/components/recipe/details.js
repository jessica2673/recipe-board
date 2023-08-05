import React from "react";
import { Link } from "react-router-dom";

const Details = () => {
    return (
        <div class="details">
            {/* <div class="back-div"><a class="back" href="/">Back</a></div>

            <h2>{recipe.recipe}</h2>
            <p class="time-posted">Date posted: { recipe.createdAt}</p>
            <div class="short-info">
                <p>Author: {recipe.author}</p>
                <p>Time required: { recipe.time} minutes</p>
            </div>
            <p>Description: { recipe.description}</p>
            <p>Ingredients required: { recipe.ingredients}</p>
            <p>Instructions: { recipe.instructions}</p>
            
            {(user && user._id == recipe.creatorId)  && 
                <>
                    <Link class="update" to={"/recipes/update/" + recipe._id}>Update</Link>
                    <Link class="delete" data-doc={recipe._id}>Delete Recipe</Link>
                </>
            }
            {(recipe.imageName) &&
                <>
                    <img src={recipe.imageUrl} alt="image here" class="recipeImage"></img>
                    <caption>{recipe.caption}</caption>
                    <Link class="delete" to={"/recipes/delete/image/" + recipe._id}>Delete Image</Link>
                </>
            } */}
        </div>
    )
}

export default Details;