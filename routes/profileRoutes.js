const router = require('express').Router();

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

router.get('/', check, (req, res) => {
    res.render('profile', { user: req.user });
});

module.exports = router;