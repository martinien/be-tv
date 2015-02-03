var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var id = req.param('id');
    io.emit('cmd', id);
    res.status(200).end();
    console.log(id);
});

module.exports = router;
