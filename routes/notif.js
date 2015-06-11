
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  io.emit('urbiNotif',req.param('msg'));
  res.status(200).end();
});

module.exports = router;

/*
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  //var msg = req.param.msg;
  //io.emit('urbiNotif', msg);
  res.status(200).end();
});

module.exports = router;
*/
