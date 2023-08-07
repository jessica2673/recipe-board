import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [recipes, setRecipes] = useState(null)

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch('/api', {
                headers: {'Content-Type': 'application/json'},
            })
            const json = await response.json()
            if (response.ok) {
                setRecipes(json)
            }
        }

        fetchRecipe()
    }, [])

    return (
        <>{(recipes && recipes.length > 0) ?
            <div className="home-page">
                <h1>What's Cooking</h1>
                {recipes.map((recipe) => (
                <div className="recipe" key={recipe._id}>
                    <Link className="home-recipe-title" to={"/recipes/" + recipe._id.toString()}><h2>{recipe.recipe}</h2></Link>
                    <p className="time-posted">Date posted: {recipe.createdAt}</p>
                    <div className="home-short-info">
                        <p>Author: {recipe.author}</p>
                        <p>Time required: {recipe.time} minutes</p>
                    </div>
                    <p>Description: {recipe.description}</p>
                    <p>Ingredients required: {recipe.ingredients}</p>
                    <p>Instructions: {recipe.instructions}</p>
                    {(recipe.imageName) &&
                        <> 
                            <img src={recipe.imageUrl} className="recipeImage"></img>
                            <p className="caption">{recipe.caption}</p>
                        </>}
                </div>
            ))}
        </div> 
    :
        <h2>No recipes yet!</h2>
    }</>)
}

export default Home