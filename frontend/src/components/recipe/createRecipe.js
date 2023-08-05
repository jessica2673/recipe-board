import React from "react";

const CreateRecipe = () => {
    return (
        <div class="create-page">
            <h1>Create A New Recipe</h1>

            <form action="/recipes" method="POST" enctype="multipart/form-data">
                <div>
                    <label for="recipe">Recipe name:</label>
                    <input type="text" id="recipe" name="recipe" required></input>
                </div>
                
                <div>
                    <label for="title">Author name:</label>
                    <input type="text" id="author" name="author" required></input>
                </div>
                
                <div>
                    <label for="title">Time required (minutes):</label>
                    <input type="text" id="time" name="time" required></input>
                </div>

                <div class="input-textarea">
                    <label for="description">Description:</label>
                    <textarea name="description" id="description" required></textarea>            
                </div>

                <div class="input-textarea">
                    <label for="body">Ingredients:</label>
                    <textarea name="ingredients" id="ingredients" required></textarea>
                </div>
                
                <div class="input-textarea">
                    <label for="instructions">Instructions:</label>
                    <textarea name="instructions" id="instructions" required></textarea>
                </div>

                <input type="file" name="imageName" />
                <label for="caption">Caption:</label>
                <input type="text" id="caption" name="caption"/>

                <button>Submit</button>
            </form>
        </div>
    )
}

export default CreateRecipe;