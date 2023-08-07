import React from "react";

const CreateRecipe = () => {
    return (
        <div className="create-page">
            <h1>Create A New Recipe</h1>

            <form action="/recipes" method="POST" encType="multipart/form-data">
                <div>
                    <label htmlFor="recipe">Recipe name:</label>
                    <input type="text" id="recipe" name="recipe" required></input>
                </div>
                
                <div>
                    <label htmlFor="title">Author name:</label>
                    <input type="text" id="author" name="author" required></input>
                </div>
                
                <div>
                    <label htmlFor="title">Time required (minutes):</label>
                    <input type="text" id="time" name="time" required></input>
                </div>

                <div className="input-textarea">
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" required></textarea>            
                </div>

                <div className="input-textarea">
                    <label htmlFor="body">Ingredients:</label>
                    <textarea name="ingredients" id="ingredients" required></textarea>
                </div>
                
                <div className="input-textarea">
                    <label htmlFor="instructions">Instructions:</label>
                    <textarea name="instructions" id="instructions" required></textarea>
                </div>

                <input type="file" name="imageName" />
                <label htmlFor="caption">Caption:</label>
                <input type="text" id="caption" name="caption"/>

                <button>Submit</button>
            </form>
        </div>
    )
}

export default CreateRecipe;