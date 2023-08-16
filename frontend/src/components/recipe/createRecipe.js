import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Navigate } from "react-router";

const CreateRecipe = () => {
    const { user } = useAuthContext()
    const [recipe, setRecipe] = useState('')
    const [author, setAuthor] = useState('')
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [file, setFile] = useState({})
    const [caption, setCaption] = useState('')

    const uploadData = async (formData)=>{
        try {
            const response = await fetch("/api/recipes", {
              method: "PUT",
              body: formData,
            });
            const json = await response.json();

            if (!response.ok) {
                console.log(json.error)
            }
            if (response.ok) {
                setRecipe('')
                setAuthor('')
                setTime('')
                setDescription('')
                setIngredients('')
                setInstructions('')
                setFile({})
                setCaption('')
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
        <> {(user) ?
            <div className="create-page">
                <h1>Create A New Recipe</h1>

                <form id="form" action="/api" method="PUT" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="recipe">Recipe name:</label>
                        <input 
                            type="text"
                            id="recipe"
                            name="recipe" 
                            value={recipe}
                            onChange={(e) => setRecipe(e.target.value)}
                            autocomplete="off"
                            required></input>
                    </div>
                    
                    <div>
                        <label htmlFor="title">Author name:</label>
                        <input 
                            type="text"
                            id="author"
                            name="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            autocomplete="off"
                            required></input>
                    </div>
                    
                    <div>
                        <label htmlFor="title">Time required (minutes):</label>
                        <input
                            type="text"
                            id="time"
                            name="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            autocomplete="off"
                        required></input>
                    </div>

                    <div className="input-textarea">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            autocomplete="off"
                        required></textarea>            
                    </div>

                    <div className="input-textarea">
                        <label htmlFor="body">Ingredients:</label>
                        <textarea
                            name="ingredients"
                            id="ingredients"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            autocomplete="off"
                        required></textarea>
                    </div>
                    
                    <div className="input-textarea">
                        <label htmlFor="instructions">Instructions:</label>
                        <textarea
                            name="instructions"
                            id="instructions"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            autocomplete="off"
                        required></textarea>
                    </div>

                    <input
                        type="file"
                        label='Image: '
                        name="imageName"
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <label htmlFor="caption" id="caption-label">Caption:</label>
                    <input
                        type="text"
                        id="caption"
                        name="caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        autocomplete="off"
                    />

                    <button id="submitBtn">Submit</button>
                </form>
            </div>
            : <Navigate to='/auth/login' /> }
        </>
    )
}

export default CreateRecipe;