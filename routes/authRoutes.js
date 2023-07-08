const router = require('express').Router();
const passport = require('passport');

// login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// logout
router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
})

module.exports = router;