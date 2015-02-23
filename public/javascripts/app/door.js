define(function() {

  return {

    openDoor: function() {

      jsonString = '{"hue": 25500,"on": true,"bri": 10}';
      lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/1/state";
      getHTML('PUT');
      lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/2/state";
      getHTML('PUT');

      socket.emit("ouverturePorte");
    },

    closeDoor: function() {


      jsonString = '{"hue": 0,"on": true,"bri": 10}';
      lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/1/state";
      getHTML('PUT');
      lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/2/state";
      getHTML('PUT');
      socket.emit("fermeturePorte");
    }
  }

});