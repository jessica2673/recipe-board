const express= require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/router');
// const authRoutes = require('./routes/authRoutes');
// const profileRoutes = require('./routes/profileRoutes');
const keys = require('./config/keys');
const passport = require('passport');
const passportSetup = require('./config/passport-setup.js');
const cookieSession = require('cookie-session');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('./models/userModel');

const app = express();

app.set('view engine', 'ejs');

// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//     keys: [keys.session.cookieSession]
// }));

app.use(session({
    secret: "secret",
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
                console.log(currentUser.username);
                done(null, currentUser);
            } else {
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.picture,
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                })
            }
        });
    })
);

passport.serializeUser((user, done) => {
    console.log('serialized!');
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        console.log('deserialized!');
        done(null, user);
    });
});

// login
app.get('/auth/login', (req, res) => {
    res.render('login', { user: req.user });
});

// logout
app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}));

app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
})

const check = (req, res, next) => {
    // if they are logged in, req.user exists and is true
    if (!req.user) {
        // if user is not logged in
        console.log(req.user);
        res.redirect('/auth/login');
    } else {
        // if logged in
        next();
    }
};

app.get('/profile', check, (req, res) => {
    res.render('profile', { user: req.user });
});

app.use('/', routes);
// app.use('/profile', profileRoutes);
// app.use('/auth', authRoutes);

app.use((req, res) => {
    res.status(404).render('error', { title: "" }) 
});

