const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    recipe: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: false
    },
    author: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;