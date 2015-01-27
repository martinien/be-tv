var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    io.emit('remote', req.query.commandID);
    res.status(200).end();
});

module.exports = router;
