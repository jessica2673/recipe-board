const express= require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
// const cookieSession = require('cookie-session');
const cors = require("cors")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

const routes = require('./routes/router');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes')
const keys = require('./config/keys');
const User = require('./models/userModel');

const app = express();
// parse incoming requests with JSON
app.use(express.json());

// app.set('view engine', 'ejs');

app.use(session({
    secret: keys.session.cookieKey,
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,PUT,PATCH,POST,DELETE",
  })
);

mongoose.connect(keys.mongo.dbURI)
    .then((result) => {
        app.listen(4000);
        console.log('connected to db');
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.append('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    next();
});

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: 'http://localhost:4000/auth/google/redirect',
    }, async (accessToken, refreshToken, profile, done) => {
        await User.findOne({googleId: profile.id}).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            } else {
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.picture,
                    moreInfo: profile.email,
                }).save().then((newUser) => {
                    done(null, newUser);
                })
            }
        })
    })
);

passport.use(
    new GitHubStrategy({
        clientID: keys.github.clientID,
        clientSecret: keys.github.clientSecret,
        callbackURL: 'http://localhost:4000/auth/github/redirect',
    }, async (accessToken, refreshToken, profile, done) => {
        await console.log("profile", profile);
        await User.findOne({githubId: profile.id}).then((currentUser) => {
            if (currentUser) {
                console.log("profile", profile);
                done(null, currentUser);
            } else {
                new User({
                    githubId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.avatar_url,
                    moreInfo: profile.username,
                }).save().then((newUser) => {
                    done(null, newUser);
                })
            }
        })
    })
);

passport.serializeUser((user, done) => {
    console.log('serializing')
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

app.use('/profile', profileRoutes);
app.use('/auth', authRoutes);
app.use('/api', routes);

app.use((req, res) => {
    res.status(404).send('error')
});

