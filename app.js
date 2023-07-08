const express= require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/router');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const keys = require('./config/keys');
const passport = require('passport');
const session = require('express-session');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('./models/userModel');

const app = express();

app.set('view engine', 'ejs');

app.use(session({
    secret: keys.session.cookieKey,
    resave: false ,
    saveUninitialized: true ,
}))

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

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            } else {
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.picture,
                    email: profile.email,
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                })
            }
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

app.use('/profile', profileRoutes);
app.use('/auth', authRoutes);
app.use('/', routes);

app.use((req, res) => {
    res.status(404).render('error', { title: "" }) 
});

