import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const Details = () => {
    const { user } = useAuthContext()
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
    
    const deleteRecipeBtn = async () => {
        const deleteRecipe = document.querySelector('a.delete');
        const endpoint = '/api/recipes/' + deleteRecipe.dataset.doc;

        fetch(endpoint, {
            method: 'DELETE'
        })
            .then((jsonResponse) => {
                jsonResponse.json()
                    .then((parsedData) => {
                        window.location.href = parsedData.redirect;
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteImageBtn = async () => {
        const deleteImage = document.querySelector('a.delete');
        const endpoint = '/api/recipes/delete/image/' + deleteImage.dataset.doc;

        fetch(endpoint, {
            method: 'GET'
        })
            .then((jsonResponse) => {
                jsonResponse.json()
                    .then((parsedData) => {
                        window.location.href = parsedData.redirect;
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <> {(render) ?
            <div className="details">
                <div className="back-div"><Link className="back" to="/api">Back</Link></div>

                <h2>{givenRecipe.recipe}</h2>
                <p className="time-posted">Date posted: { givenRecipe.createdAt}</p>
                <div className="short-info">
                    <p>Author: {givenRecipe.author}</p>
                    <p>Time required: { givenRecipe.time} minutes</p>
                </div>
                <p>Description: { givenRecipe.description}</p>
                <p>Ingredients required: { givenRecipe.ingredients}</p>
                <p>Instructions: { givenRecipe.instructions}</p>
                
                {(user && user._id === givenRecipe.creatorId)  && 
                    <>
                        <Link className="update" to={"/api/recipes/update/" + givenRecipe._id} state={{givenRecipe: givenRecipe}}>Update</Link>
                        <Link className="delete" onClick={deleteRecipeBtn} data-doc={givenRecipe._id}>Delete Recipe</Link>
                    </>
                }
                {(givenRecipe.imageName) &&
                    <>
                        <img src={givenRecipe.imageUrl} alt="image here" className="recipeImage"></img>
                        <p>{givenRecipe.caption}</p>
                    </>
                }
                {(user && user._id == givenRecipe.creatorId && givenRecipe.imageName) &&
                    <>
                        <Link className="delete" onClick={deleteImageBtn} data-doc={givenRecipe._id}>Delete Image</Link>
                    </>
                }

            </div>
        : <Navigate to="/api" /> } 
        </>
    )
}

export default Details;