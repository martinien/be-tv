var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  console.log(req.body.prenom);
  var name = req.body.prenom;
  io.emit('face', name);
  res.status(200).end();
});

module.exports = router;
