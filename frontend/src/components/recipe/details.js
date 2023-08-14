import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const Details = () => {
    const location = useLocation();
    const { recipe } = location.state
    const { user } = useAuthContext()

    return (
        <div className="details">
            <div className="back-div"><Link className="back" to="/api">Back</Link></div>

            <h2>{recipe.recipe}</h2>
            <p className="time-posted">Date posted: { recipe.createdAt}</p>
            <div className="short-info">
                <p>Author: {recipe.author}</p>
                <p>Time required: { recipe.time} minutes</p>
            </div>
            <p>Description: { recipe.description}</p>
            <p>Ingredients required: { recipe.ingredients}</p>
            <p>Instructions: { recipe.instructions}</p>
            
            {(user && user._id == recipe.creatorId)  && 
                <>
                    <Link className="update" to={"/api/recipes/update/" + recipe._id} state={{givenRecipe: recipe}}>Update</Link>
                    <Link className="delete" data-doc={recipe._id}>Delete Recipe</Link>
                </>
            }
            {(recipe.imageName) &&
                <>
                    <img src={recipe.imageUrl} alt="image here" className="recipeImage"></img>
                    <p>{recipe.caption}</p>
                </>
            }
            {(user && user._id == recipe.creatorId && recipe.imageName) &&
                <>
                    <Link className="delete" to={"/recipes/delete/image/" + recipe._id}>Delete Image</Link>
                </>
            }

        </div>
    )
}

export default Details;