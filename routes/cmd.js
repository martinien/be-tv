var express = require('express');
var fs = require('fs');
var file = __dirname + '/../remote.conf';

var router = express.Router();

router.get('/', function(req, res) {
    var id = req.param('id');
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) {
        console.log('Error: ' + err);
        return;
      }
      data = JSON.parse(data);
      io.emit('cmd', data[id]);
      res.status(200).end();
      console.log(id);
    });
});

module.exports = router;
