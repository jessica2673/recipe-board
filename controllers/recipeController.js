const Recipe = require('../models/recipeModel');


const recipe_home = (req, res) => {
    Recipe.find()
        .then((result) => {
            res.render('./recipe/home', { title: 'Home', recipes: result, user: req.user });
        })
        .catch((err) => {
            console.log(err);
        })
}

const recipe_home_redirect = (req, res)=> {
    res.redirect('/');
}

const recipe_about = (req, res) => {
    res.render('./recipe/about', { title: "About", user: req.user});
}

const post_new_recipe = (req, res) => {
    console.log(req);
    const recipe = new Recipe(req.body);
    if (req.user) {
        recipe.creatorId = req.user._id;
    }
    
    recipe.save()
        .then((result) => {
            console.log(recipe);
            res.redirect('/recipes');
        })
        .catch((err) => {
            console.log(err);
        })
}

const recipe_create_form = (req, res) => {
    res.render('./recipe/createRecipe', { title: "Create", user: req.user });
}

const get_single_recipe = (req, res) => {
    const id = req.params.id;
    Recipe.findById(id)
        .then(found => {
            res.render('./recipe/details', { title: found.recipe, recipe: found, user: req.user })
        })
        .catch((err) => {
            console.log(err);
        })
}

const get_recipe_update = (req, res) => {
    const id = req.params.id;
    Recipe.findById(id)
        .then(found => {
            res.render('./recipe/updateRecipe', { title: 'Update', user: req.user, recipe: found, id: id });
        })
        .catch((err) => {
            console.log(err);
        })
}

const update_recipe = (req, res) => {
    Recipe.findOneAndUpdate(
        {_id: req.params.id},
        {
            recipe: req.body.recipe,
            author: req.body.author,
            time: req.body.time,
            description: req.body.description,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
        }
    ).then((result) => {
        res.redirect('/');
    }).catch((err) => {
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
    get_recipe_update,
    update_recipe,
    delete_recipe,
};
