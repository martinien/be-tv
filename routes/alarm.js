var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  io.emit('alarm');
  res.status(200).end();
});

module.exports = router;