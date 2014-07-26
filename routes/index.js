var express = require('express');
var router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res) {
  res.render('index', { user: req.user });
});

module.exports = router;
