define(function() {

  return {

    startBlink: function(color) {
      var jsonString,
        lightUrl;
      jsonString = '{"hue": ' + color + ',"on": true,"bri": 10,"alert": "lselect"}';
      lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/1/state";
      this.getHTML('PUT', lightUrl, jsonString);
      lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/2/state";
      this.getHTML('PUT', lightUrl, jsonString);
    },

    stopBlink: function(color) {
      var jsonString,
        lightUrl;
      jsonString = '{"hue":' + color + ',"on":true ,"bri": 10}';
      lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/1/state";
      this.getHTML('PUT', lightUrl, jsonString);

      jsonString = '{"hue":' + color + ',"on":true ,"bri": 10}';
      lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/2/state";
      this.getHTML('PUT', lightUrl, jsonString);
    },

    getHTML: function(command, uri, json) {
      if (window.XMLHttpRequest) {
        var http = new XMLHttpRequest();
        http.open(command, uri, true);

        http.onreadystatechange = function() {
          if (http.readyState == 4) {
            if (http.status == 200) {

            } else {
              //console.log("Error " + http.status);
            }
          }
        }

        http.send(json);
      }
      return;
    }
  }

});