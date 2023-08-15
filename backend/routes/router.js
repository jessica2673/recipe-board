const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const Recipe = require('../models/recipeModel');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// verify that user can edit selected recipe
const checkUser = async (req, res, next) => {
    // req.params contains the id of the object

    if (!req.user) {
        // if user is not logged in, redirect to login
        res.redirect('/auth/login');
    } else {
        const userId = await req.user._id.toString();
        // true if user id matches recipe creator id
        let callNext = Recipe.findById(req.params.id)
            .then(found => {
                if (userId === found.creatorId) {
                    return true;
                }
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
        if (await callNext) {
            next();
        } else {
            res.redirect('/');
        }
    }
};

const checkUserCreate = async (req, res, next) => {
    if (!req.user) {
        // if user is not logged in, redirect to login
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', recipeController.recipe_home);

router.get('/recipes', recipeController.recipe_home_redirect)

router.get('/about', recipeController.recipe_about);

router.put('/recipes', upload.single('file'), recipeController.post_new_recipe);

router.get('/create', checkUserCreate, recipeController.recipe_create_form);

router.get('/recipes/:id', recipeController.get_single_recipe);

router.get('/recipes/update/:id', checkUser, recipeController.get_recipe_update);

router.put('/recipes/update/:id', upload.single('file'), recipeController.update_recipe)

router.delete('/recipes/:id', recipeController.delete_recipe);

router.get('/recipes/delete/image/:id', recipeController.delete_image);

module.exports = router;

