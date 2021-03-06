var express = require('express');
var router = express.Router();
var db = require('../lib/items');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('getting items');
  db.get(function (err, items) {
    if (err) return next(err);
    res.render('home', { title: 'Leveldb Modulus Test', items: items });
  });
});

module.exports = router;
