var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ name: 'Coins', age: '35' });
});

module.exports = router;
