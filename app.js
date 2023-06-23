const express= require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Recipe = require('./models/recipeModel');

const app = express();

app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://recipe-admin:2Hs3RSRp6rxuAanI@nodetut.lvubk6s.mongodb.net/recipe-database';
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(3000);
        console.log('connected to db');
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('./recipe/home', { title: "Home" })
});

app.get('/recipes', (req, res)=> {
    res.redirect('/');
})

app.get('/about', (req, res) => {
    res.render('./recipe/about', { title: "About" });
});

app.post('/recipes', (req, res) => {
    const recipe = new Recipe(req.body);

    recipe.save()
        .then((result) => {
            res.redirect('/recipes');
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/create', (req, res) => {
    res.render('./recipe/createRecipe', { title: "Create" });
});

app.use((req, res) => {
    res.status(404).render('error', { title: "" }) 
});

