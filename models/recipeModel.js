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
        type: Number,
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
    instructions: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: false
    },
    caption: String,
    imageName: String,
    imageUrl: String,
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;