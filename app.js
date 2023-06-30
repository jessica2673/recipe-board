const express= require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/router');
const keys = require('./config/keys');

const app = express();

app.set('view engine', 'ejs');

mongoose.connect(keys.mongo.dbURI)
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

app.use('/', routes);

app.use((req, res) => {
    res.status(404).render('error', { title: "" }) 
});

