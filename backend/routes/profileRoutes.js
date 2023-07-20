const router = require('express').Router();

const check = (req, res, next) => {
    // if they are logged in, req.user exists and is true
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', check, (req, res) => {
    res.render('profile', { title: "Profile", user: req.user });
});

module.exports = router;