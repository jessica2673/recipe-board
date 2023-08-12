const express = require('express');
const router = express.Router();
const passport = require('passport');

const successLoginURL = "http://localhost:3000/login/success"
const errorLoginURL = "http://localhost:3000/login/error"

router.get("/user", (req, res) => {
  res.json(req.user);
});

// login
router.get('/login', (req, res) => {
    console.log('login called');
    res.render('./login', { title: 'Login' });
});

// logout
router.get('/logout', function(req, res, next){
  console.log('logout')
  req.logout();
  res.redirect('/api');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google', 
  {
    failureRedirect: errorLoginURL,
    successRedirect: successLoginURL,
  }), 
  (req, res) => {
    console.log('authenticated: ', req.user)
    res.redirect('/api')
});

router.get('/github', passport.authenticate('github', {
  scope: ['profile']
}));

router.get('/github/redirect', passport.authenticate('github', 
  {
    failureRedirect: errorLoginURL,
    successRedirect: successLoginURL,
  }), (req, res) => {
    console.log('authenticated: ', req.user)
    res.redirect('/api')
});

module.exports = router;