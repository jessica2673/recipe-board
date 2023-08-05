const router = require('express').Router();

const check = (req, res, next) => {
    // if they are logged in, req.user exists and is true
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/extra', check, async (req, res) => {
    // res.render('profile', { title: "Profile", user: req.user });
    console.log(req.user);
    await res.status(200).json(req.user);
});

module.exports = router;