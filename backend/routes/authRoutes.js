const express = require('express');
const router = express.Router();
const passport = require('passport');

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

router.post('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
    // console.log(req.body);
    // const {profile, email} = req.body
    // res.json(req)
});

router.get('/github', passport.authenticate('github', {
  scope: ['profile']
}));

router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  res.redirect('/profile');
});

module.exports = router;