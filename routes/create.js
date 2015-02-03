var express = require('express');
var router = express.Router();
var db = require('../lib/items');

/* GET create item. */
router.get('/', function(req, res, next) {
  console.log('creating item');
  db.create(function (err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
