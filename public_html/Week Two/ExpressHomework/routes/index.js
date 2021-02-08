var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Lab', name: 'Ethan Tran' });
});

module.exports = router;
