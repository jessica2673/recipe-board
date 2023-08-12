const express = require('express');
const router = express.Router();
const passport = require('passport');

const successLoginURL = "http://localhost:3000/login/success"
const errorLoginURL = "http://localhost:3000/login/error"

router.get("/user", (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

// login
router.get('/login', (req, res) => {
    console.log('login called');
    res.render('./login', { title: 'Login' });
});

// logout
router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/api');
});

router.get('/test', (req, res) => {
  res.redirect('/auth/next');
  // res.json('works!');
})

router.get('/next',(req, res) =>{
  res.json('works!');
})

router.get('/google', passport.authenticate('google', {
    scope: ['sprofile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google', {
  successRedirect : '/api',
  failureRedirect : '/'
}));

router.get('/github', passport.authenticate('github', {
  scope: ['profile']
}));

router.get('/github/redirect', passport.authenticate('github', {
  failureRedirect: errorLoginURL,
    successRedirect: successLoginURL,
}), (req, res) => {
  console.log('authenticated: ', req.user)
  
  res.send("Thank you for signing in!");
});

module.exports = router;