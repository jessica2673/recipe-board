const Recipe = require('../models/recipeModel');

const recipe_home = (req, res) => {
    Recipe.find()
        .then((result) => {
            res.render('./recipe/home', { title: 'Home', recipes: result });
        })
        .catch((err) => {
            console.log(err);
        })
}

const recipe_home_redirect = (req, res)=> {
    res.redirect('/');
}

const recipe_about = (req, res) => {
    res.render('./recipe/about', { title: "About" });
}

const post_new_recipe = (req, res) => {
    const recipe = new Recipe(req.body);

    recipe.save()
        .then((result) => {
            res.redirect('/recipes');
        })
        .catch((err) => {
            console.log(err);
        })
}

const recipe_create_form = (req, res) => {
    res.render('./recipe/createRecipe', { title: "Create" });
}

const get_single_recipe = (req, res) => {
    const id = req.params.id;
    Recipe.findById(id)
        .then(found => {
            res.render('./recipe/details', { title: found.recipe, recipe: found })
        })
        .catch((err) => {
            console.log(err);
        })
}

const delete_recipe = (req, res) => {
    const id = req.params.id;

    Recipe.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/recipes' })
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = {
    recipe_home,
    recipe_home_redirect,
    recipe_about,
    post_new_recipe,
    recipe_create_form,
    get_single_recipe,
    delete_recipe,
};
