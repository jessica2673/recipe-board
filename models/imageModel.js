const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
   caption: String,
   imageName: String,
   imageUrl: String,
   recipeId: String,
})

const Image = mongoose.model('image', imageSchema);

module.exports = Image;