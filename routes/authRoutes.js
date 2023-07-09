const express = require('express');
const router = express.Router();
const passport = require('passport');

// login
router.get('/login', (req, res) => {
    res.render('./login', { title: 'Login', user: req.user });
});

// logout
router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

router.get('/github', passport.authenticate('github', {
  scope: ['profile']
}));

router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  res.redirect('/profile');
});

module.exports = router;