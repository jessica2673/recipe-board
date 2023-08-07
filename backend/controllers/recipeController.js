const mongoose = require('mongoose');
const Recipe = require('../models/recipeModel');
const keys = require('../config/keys');
// for image upload
const multer = require('multer');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require('crypto');
const sharp = require('sharp');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const randomName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const bucketName = keys.AWS.bucket_name;
const bucketRegion = keys.AWS.bucket_region;
const accessKey = keys.AWS.access_key;
const secretAccessKey = keys.AWS.secret_access_key;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion,
})

const recipe_home = async (req, res) => {
    foundRecipes = await Recipe.find();
    
    if (!foundRecipes) {
        console.log("No recipes found");  
    }

    loadedImages = [];
    for (let found of foundRecipes) {
        if (found.imageName) {
            const getObjectParams = {
                Bucket: bucketName,
                Key: found.imageName,
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            found._doc.imageUrl = await url;
        }
        loadedImages.push(found);
    }
    await res.status(200).json(loadedImages);
}

const recipe_home_redirect = (req, res)=> {
    res.redirect('/');
}

const recipe_about = (req, res) => {
    res.render('./recipe/about', { title: "About" });
}

const post_new_recipe = async (req, res) => {
    const recipe = await new Recipe(req.body);
    await console.log(req.file);
    if (req.user) {
        recipe.creatorId = req.user._id;
    }
    if (req.file){
        const buffer = await sharp(req.file.buffer).resize({width: 1000, height: 2000, fit: "contain"}).toBuffer();

        const imageName = randomName();
        const params = {
            Bucket: bucketName, // the bucket it is being uploaded to
            Key: imageName, // the name of the file on the user's pc before upload
            Body: req.file.buffer, // send buffer as body
            ContentType: req.file.mimetype,
        }
        recipe.imageName = imageName;
        const command = new PutObjectCommand(params);
        await s3.send(command);
        await console.log("first");
    }

    await recipe.save()
        .then((result) => {
            console.log("second");
            res.redirect('/recipes');
        })
        .catch((err) => {
            console.log(err);
        })
    
}

const recipe_create_form = (req, res) => {
    res.render('./recipe/createRecipe', { title: "Create", user: req.user });
}

const get_single_recipe = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404);
    }

    found = await Recipe.findById(id);

    if (!found) {
        console.log("Recipe not found");  
    }

    if (found.imageName) {
        const getObjectParams = {
            Bucket: bucketName,
            Key: found.imageName,
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        found.imageUrl = await url;
    }
    res.render('./recipe/details', { title: found.recipe, recipe: found, user: req.user });
}

const get_recipe_update = (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404);
    }

    Recipe.findById(id)
        .then(found => {
            res.render('./recipe/updateRecipe', { title: 'Update', user: req.user, recipe: found, id: id, image: req.image });
        })
        .catch((err) => {
            console.log(err);
        })
}

const update_recipe = async (req, res) => {
    // if an image was uploaded
    if (req.file) {
        const imageBefore = await Recipe.findById(req.params.id);
        
        // if there was another image, delete it
        if (imageBefore.imageName) {
            const deleteParams = {
                Bucket: bucketName,
                Key: imageBefore.imageName,
            }
        
            const deleteCommand = await new DeleteObjectCommand(deleteParams);
            await s3.send(deleteCommand);
        }

        // create new image
        const buffer = await sharp(req.file.buffer).resize({width: 1000, height: 2000, fit: "contain"}).toBuffer();
        const imageName = randomName();
        const createParams = {
            Bucket: bucketName, // the bucket it is being uploaded to
            Key: imageName, // the name of the file on the user's pc before upload
            Body: req.file.buffer, // send buffer as body
            ContentType: req.file.mimetype,
        }
        const createCommand = await new PutObjectCommand(createParams);
        const newImageName = imageName;
        await s3.send(createCommand);

        await Recipe.findOneAndUpdate(
            {_id: req.params.id},
            {
                recipe: req.body.recipe,
                author: req.body.author,
                time: req.body.time,
                description: req.body.description,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
                imageName: newImageName,
                caption: req.body.caption,
            }
        );

        await res.redirect('/');
    } else {
        await Recipe.findOneAndUpdate(
            {_id: req.params.id},
            {
                recipe: req.body.recipe,
                author: req.body.author,
                time: req.body.time,
                description: req.body.description,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
            }
        );
        await res.redirect('/');
    }
}

const delete_recipe = (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404);
    }

    Recipe.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/recipes' })
        })
        .catch((err) => {
            console.log(err);
        })
}

const delete_image = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404);
    }
    
    const found = await Recipe.findById(id);
    
    // delete image from bucket
    const deleteParams = {
        Bucket: bucketName,
        Key: found.imageName,
    }

    const deleteCommand = await new DeleteObjectCommand(deleteParams);
    await s3.send(deleteCommand);

    // remove caption and imageName properties
    await Recipe.findByIdAndUpdate(
        id, 
        {
            $unset: {caption: "", imageName: ""}
        });
    
    await res.redirect('/recipes/' + id);
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
    delete_image,
};
