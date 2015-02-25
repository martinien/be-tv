define(["tv", "light", "init", "player", "weather", "door"], function(tv, light, init, player, weather, door) {
  var socket = init.socket;

  socket.on('face', function(data) {
    init.face.html(data);
  });

  socket.on('bellRing', function(data) {
    light.startBlink("46920");
    setTimeout(light.stopBlink("46920"), 8000);
    console.log(tv.currentState);
    if (tv.currentState === tv.STATE.TV) {
      tv.currentState = tv.STATE.BELL;
      door.showEntrance();
      console.log("ok");
    }
  });

  socket.on('alarm', function(data) {
    light.startBlink("65000");
    if (tv.currentState !== tv.STATE.ALARM) {
      var previousState = tv.currentState;
      player.vlc.playlist.stop();
      if (previousState === tv.STATE.BELL) {
        socket.emit("fermeturePorte");
        door.hideEntrance();
        tv.currentState = tv.STATE.TV;
      }
      tv.currentState = tv.STATE.ALARM;
      init.alarm.show();
    }
  });

  socket.on('cmd', function(data) {
    switch (data) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        init.remote.trigger('num', data);
        break;
      case "BLUE":
        init.remote.trigger('blue', data);
        break;
      case "GREEN":
        init.remote.trigger('green', data);
        break;
      case "RED":
        init.remote.trigger('red', data);
        break;
      case "P+":
        init.remote.trigger('p+', data);
        break;
      case "P-":
        init.remote.trigger('p-', data);
        break
      case "OK":
        init.remote.trigger('ok', data);
        break;
      case "V+":
        init.remote.trigger('v+', data);
        break;
      case "V-":
        init.remote.trigger('v-', data);
        break;
      case "MUTE":
        init.remote.trigger('mute', data);
        break;
    }
  });
});
