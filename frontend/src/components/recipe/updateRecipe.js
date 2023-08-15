import React, { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext.js";

const UpdateRecipe = () => {
    const location = useLocation();
    let render = true
    let givenRecipe = {}
    if (!location.state) {
        givenRecipe = {
            recipe: "",
            author: "",
            time: "",
            description: "",
            ingredients: "",
            instructions: "",
            caption: "",
        }
        render = false
    } else {
        ({ givenRecipe } = location.state)
    }

    const { user } = useAuthContext()

    const [recipe, setRecipe] = useState(givenRecipe.recipe)
    const [author, setAuthor] = useState(givenRecipe.author)
    const [time, setTime] = useState(givenRecipe.time)
    const [description, setDescription] = useState(givenRecipe.description)
    const [ingredients, setIngredients] = useState(givenRecipe.ingredients)
    const [instructions, setInstructions] = useState(givenRecipe.instructions)
    const [file, setFile] = useState({})
    const [caption, setCaption] = useState(givenRecipe.caption)

    const uploadData = async (formData)=>{
        try {
            const response = await fetch(("/api/recipes/update/" + givenRecipe._id), {
              method: "PUT",
              body: formData,
            });
            const json = await response.json();

            if (!response.ok) {
                console.log(json.error)
            }

          } catch (error) {
            console.error("Error:", error);
          }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();

        formData.append("recipe", recipe);
        formData.append("author", author);
        formData.append("time", time);
        formData.append("description", description);
        formData.append("ingredients", ingredients);
        formData.append("instructions", instructions);
        formData.append("caption", caption);
        formData.append("file", file);

        await console.log('file: ', file)

        await uploadData(formData);
    }
    
    return (
        <> {(user && givenRecipe && render) ?
            <div className="update-page">
                <h1>{givenRecipe.recipe}</h1>

                <form action={"/api/recipes/update/" + givenRecipe._id} method="PUT" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="recipe">Recipe name:</label>
                        <input type="text" id="recipe" name="recipe" defaultValue={givenRecipe.recipe} onChange={(e) => setRecipe(e.target.value)} required />
                    </div>
                    
                    <div>
                        <label htmlFor="title">Author name:</label>
                        <input type="text" id="author" name="author" defaultValue={givenRecipe.author} onChange={(e) => setAuthor(e.target.value)} required />   
                    </div>
                    
                    <div>
                        <label htmlFor="title">Time required (minutes):</label>
                        <input type="text" id="time" name="time" defaultValue={givenRecipe.time} onChange={(e) => setTime(e.target.value)} required />
                    </div>

                    <div className="input-textarea">
                        <label htmlFor="description">Description:</label>
                        <textarea name="description" id="description" defaultValue={givenRecipe.description} onChange={(e) => setDescription(e.target.value)} required />            
                    </div>

                    <div className="input-textarea">
                        <label htmlFor="body">Ingredients:</label>
                        <textarea name="ingredients" id="ingredients" defaultValue={givenRecipe.ingredients} onChange={(e) => setIngredients(e.target.value)} required />
                    </div>
                    
                    <div className="input-textarea">
                        <label htmlFor="instructions">Instructions:</label>
                        <textarea name="instructions" id="instructions" defaultValue={givenRecipe.instructions} onChange={(e) => setInstructions(e.target.value)} required />
                    </div>
                    
                    {(givenRecipe.imageName) &&
                        <>
                            <img src={givenRecipe.imageUrl} alt="image here" className="recipeImage" />
                        </>}


                    <input type="file" name="imageName" onChange={(e) => setFile(e.target.files[0])}/>
                    <label htmlFor="caption">Caption:</label>
                    <input type="text" id="caption" name="caption" defaultValue={givenRecipe.caption} onChange={(e) => setCaption(e.target.value)} />

                    <button>Update</button>
                </form>
            </div> 
            : <Navigate to="/auth/login" />}
        </>
    )
}

export default UpdateRecipe;