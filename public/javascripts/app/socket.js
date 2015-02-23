define(["socketio", "tv", "light", "init", "jquerymodal", "player", "weather", "door"], function(io, tv, light, init, modal, player, weather, door) {
  var socket = init.socket,
    timer = 0,
    timer2 = Math.floor(Date.now() / 1000),
    nbr = "",
    show = 0,

    currentChannel = 1,
    channelMin = 1,
    channelMax = 22,

    STATE = {
      TV: 1,
      BELL: 2,
      ALARM: 3
    },

    state = STATE.TV,
    vlc = init.vlc;

  socket.on('bellRing', function(data) {
    light.startBlink("46920");
    setTimeout(light.stopBlink("46920"), 8000);
    if (state === STATE.TV) {
      state = STATE.BELL;
      door.showEntrance();
    }
  });

  socket.on('alarm', function(data) {
    light.startBlink("65000");

    if (state !== STATE.ALARM) {
      var previousState = state;

      vlc.playlist.stop();
      if (previousState === STATE.BELL) {
        socket.emit("fermeturePorte");
        door.hideEntrance();
        state = STATE.TV;
      }

      state = STATE.ALARM;
      $('#basic-modal-content').modal({
        onClose: function() {
          vlc.playlist.playItem(currentChannel);
          $.modal.close();
          state = previousState;
          light.stopBlink('65000');
        }
      });
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
        if (Math.floor(Date.now() / 1000) - timer2 > 1) {
          if (Math.floor(Date.now() / 1000) - timer < 4) {
            nbr = nbr + data;
            $("#channel h1").html(nbr);
          } else {
            timer = 0;
            nbr = "";
          }
          if (timer == 0) {
            nbr = nbr + data;
            $("#channel").show();
            $("#channel h1").html(nbr);
            timer = Math.floor(Date.now() / 1000);
            setTimeout(function() {
              $("#channel").hide();
              vlc.playlist.playItem(parseInt(nbr));
              currentChannel = parseInt(nbr);
            }, 3000);
          }
          timer2 = Math.floor(Date.now() / 1000);
        }

        break;
      case "BLUE":
        if (show == 0) {
          weather.load();
          $("#weather").show();
          show = 1;
        } else {
          $("#weather").hide();
          show = 0;
        }
        break;
      case "GREEN":
        if (state === STATE.BELL) {
          door.switchToAccept();
        }
        break;
      case "RED":
        if (state === STATE.BELL) {
          door.switchToRefuse();
        }
        break;
      case "P+":
        if (state === STATE.TV) {
          if (currentChannel === channelMax) {
            currentChannel = channelMin;
          } else {
            currentChannel++;
          }
          vlc.playlist.playItem(currentChannel);
        }
        break;
      case "P-":
        if (state === STATE.TV) {
          if (currentChannel === channelMin) {
            currentChannel = channelMax;
          } else {
            currentChannel--;
          }
          vlc.playlist.playItem(currentChannel);
        }
        break
      case "OK":
        if (state === STATE.ALARM) {
          $.modal.close();
        } else if (state === STATE.BELL) {
          door.validateChoice();
        }
        break;
      case "V+":
        tv.soap('AAAAAQAAAAEAAAASAw==');
        break;
      case "V-":
        tv.soap('AAAAAQAAAAEAAAATAw==');
        break;
      case "MUTE":
        tv.soap('AAAAAQAAAAEAAAAUAw==');
        break;
    }
  });
});
