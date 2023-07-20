import React from "react";

const CreateRecipe = () => {
    return (
        // <%- include('../partials/header.ejs') %>
        <body>
            {/* <%- include("../partials/nav.ejs") %> */}
            <div class="update-page">
                {/* <h1><%= recipe.recipe %></h1> */}
        
                <form action="/recipes/update/<%= id %>" method="POST" enctype="multipart/form-data">
                    <div>
                        <label for="recipe">Recipe name:</label>
                        <input type="text" id="recipe" name="recipe" value="<%= recipe.recipe %>" required/>
                    </div>
                    
                    <div>
                        <label for="title">Author name:</label>
                        <input type="text" id="author" name="author" value="<%= recipe.author %>" required/>    
                    </div>
                    
                    <div>
                        <label for="title">Time required (minutes):</label>
                        <input type="text" id="time" name="time" value="<%= recipe.time %>" required/>
                    </div>
        
                    <div class="input-textarea">
                        <label for="description">Description:</label>
                        {/* <textarea name="description" id="description" required><%= recipe.description %></textarea>             */}
                    </div>
        
                    <div class="input-textarea">
                        <label for="body">Ingredients:</label>
                        {/* <textarea name="ingredients" id="ingredients" required><%= recipe.ingredients %></textarea> */}
                    </div>
                    
                    <div class="input-textarea">
                        <label for="instructions">Instructions:</label>
                        {/* <textarea name="instructions" id="instructions" required><%= recipe.instructions %></textarea> */}
                    </div>
                    
                    {/* <% if (recipe.imageName) { %>
                        <img src="<%= recipe.imageUrl %>" alt="image here" class="recipeImage">
                        <caption><%= recipe.caption %></caption>
                    <% } %> */}
        
        
                    <input type="file" name="imageName" />
                    <label for="caption">Caption:</label>
                    <input type="text" id="caption" name="caption"/>
        
                    <button>Update</button>
                </form>
            </div>
            {/* // <%- include('../partials/footer.ejs') %> */}
        </body>
    )
}

export default CreateRecipe;