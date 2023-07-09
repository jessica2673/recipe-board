const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const Recipe = require('../models/recipeModel');

const checkUser = async (req, res, next) => {
    if (!req.user) {
        // if user is not logged in
        console.log(req.user);
        res.redirect('/auth/login');
    } else {
        const userId = req.user._id.toString();
        let callNext = Recipe.findById(req.params.id)
            .then(found => {
                // console.log("here" + found.creatorId);
                console.log('userId: ' + userId + ' and recipeCreator: ' + found.creatorId);
                // console.log(userId.localeCompare(found.creatorId));
                console.log(userId === found.creatorId);
                if (userId === found.creatorId) {
                    console.log('here!');
                    return true;
                }
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
        await console.log(callNext);
        if (await callNext) {
            console.log('next!');
            next();
        } else {
            res.redirect('/');
        }
    }
};

router.get('/', recipeController.recipe_home);

router.get('/recipes', recipeController.recipe_home_redirect)

router.get('/about', recipeController.recipe_about);

router.post('/recipes', recipeController.post_new_recipe);

router.get('/create', recipeController.recipe_create_form);

router.get('/recipes/:id', recipeController.get_single_recipe);

router.get('/recipes/update/:id', checkUser, recipeController.get_recipe_update);

router.post('/recipes/update/:id', checkUser, recipeController.update_recipe)

router.delete('/recipes/:id', checkUser, recipeController.delete_recipe);

module.exports = router;

