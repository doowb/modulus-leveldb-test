var express = require('express');
var router = express.Router();
var db = require('../lib/items');

/* GET click item. */
router.get('/:id', function(req, res, next) {
  console.log(req.params.id, 'clicked');
  db.click(req.params.id, function (err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
