var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:room*?', function (req, res, next) {
    res.render('index', {
        title: 'Express',
        sala: req.params.room,
    });
});

module.exports = router;
