const express= require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/router');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const keys = require('./config/keys');
const passport = require('passport');
const passportSetup = require('./config/passport-setup.js');
const cookieSession = require('cookie-session');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    keys: [keys.session.cookieSession]
}));

app.use(passport.initialize());
app.use(passport.session());

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
app.use('/profile', profileRoutes);
app.use('/auth', authRoutes);



app.use((req, res) => {
    res.status(404).render('error', { title: "" }) 
});

