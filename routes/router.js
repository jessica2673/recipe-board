const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/', recipeController.recipe_home);

router.get('/recipes', recipeController.recipe_home_redirect)

router.get('/about', recipeController.recipe_about);

router.post('/recipes', recipeController.post_new_recipe);

router.get('/create', recipeController.recipe_create_form);

router.get('/recipes/:id', recipeController.get_single_recipe);

router.delete('/recipes/:id', recipeController.delete_recipe);

module.exports = router;

