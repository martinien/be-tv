var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var dir = req.param('dir');
  io.emit('swipe', dir);
  res.status(200).end();
});

module.exports = router;
