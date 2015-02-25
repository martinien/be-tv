var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  //var name = req.body.;
    //io.emit('face', position);
    console.log(req.body);
    res.status(200).end();
});

module.exports = router;
