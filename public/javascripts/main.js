/*$.fn.slideFadeToggle = function(speed, easing, callback) {
  return this.animate({
    opacity: 'toggle',
    height: 'toggle'
  }, speed, easing, callback);
};

function soap(CMD) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'http://10.134.15.110/sony/IRCC', true);
  xmlhttp.setRequestHeader("X-Auth-PSK", "iamisen");
  var sr = '<?xml version="1.0"?>' +
    '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<SOAP-ENV:Body>' + '<m:X_SendIRCC xmlns:m="urn:schemas-sony-com:service:IRCC:1">' +
    '<IRCCCode xmlns:dt="urn:schemas-microsoft-com:datatypes" dt:dt="string">' +
    CMD +
    '</IRCCCode>' +
    '</m:X_SendIRCC>' +
    '</SOAP-ENV:Body>' +
    '</SOAP-ENV:Envelope>';
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {}
    }
  }
  xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  xmlhttp.send(sr);
}

$(document).ready(function() {
  $.simpleWeather({
    woeid: '608105', //2357536
    location: '',
    unit: 'c',
    success: function(weather) {
      var date = new Date();
      html = '<h3>' + weather.city + '</h3>';
      html += '<h4>' + date.getDate() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + '</h4>'
      html += '<h2><i class="icon-' + weather.code + '"></i>';
      html += weather.temp + '&deg;' + weather.units.temp + '</h2>';
      html += '<table>';
      html += '<tr>';
      for (var i = 0; i < weather.forecast.length; i++) {
        html += '<td>' + weather.forecast[i].day + '</td>';
      }
      html += '</tr>';
      html += '<tr>';
      for (var i = 0; i < weather.forecast.length; i++) {
        html += '<td><i class="icon-' + weather.forecast[i].code + '"></i></td>';
      }
      html += '</tr>';
      html += '<tr>';
      for (var i = 0; i < weather.forecast.length; i++) {
        html += '<td>' + weather.forecast[i].high + '&deg;' + weather.units.temp + '</td>';
      }
      html += '</tr>';
      html += '</table>';
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>' + error + '</p>');
    }
  });

  var notification = $("#notification"),
    entrance = $("#entrance"),
    socket = io(),
    accept = $('#accept'),
    refuse = $('#refuse'),
    vlc = $("#vlc")[0],
    entranceShown = false,
    currentChannel = 1,
    channelMin = 1,
    channelMax = 22;

  var STATE = {
      TV: 1,
      BELL: 2,
      ALARM: 3
    },
    state = STATE.TV;



  function showEntrance() {

    if (!entranceShown) {
      entrance.attr('src', 'http://cs.isen.fr/camera/mjpg/video.mjpg');
      notification.slideFadeToggle(200, function(e) {
        accept.addClass('button-selected');
      });
      entranceShown = true;
    }

  }

  function hideEntrance() {

    entrance.removeAttr('src');
    notification.slideFadeToggle(200, function(e) {
      accept.removeClass('button-selected');
      refuse.removeClass('button-selected');
    });
    entranceShown = false;
    state = STATE.TV;
  }

  function triggerFireAlarm() {


  }

  socket.on('bellRing', function(data) {
    startBlink("46920");
    setTimeout(stopBlink(), 500);
    if (state === STATE.TV) {
      state = STATE.BELL;
      showEntrance();
    }
  });

  var timer = 0;
  var timer2 = Math.floor(Date.now() / 1000);
  var nbr = "";
  var show = 0;
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
              $("#vlc")[0].playlist.playItem(parseInt(nbr));
              currentChannel = parseInt(nbr);
            }, 3000);
          }
          timer2 = Math.floor(Date.now() / 1000);
        }

        break;
      case "BLUE":
        if (show == 0) {
          $("#weather").show();
          show = 1;
        } else {
          $("#weather").hide();
          show = 0;
        }
        break;
      case "GREEN":
        if (state === STATE.BELL) {
          switchToAccept();
        }
        break;
      case "RED":
        if (state === STATE.BELL) {
          switchToRefuse();
        }
        break;
      case "P+":
        if (state === STATE.TV) {
          if (currentChannel === channelMax) {
            currentChannel = channelMin;
          } else {
            currentChannel++;
          }
          $("#vlc")[0].playlist.playItem(currentChannel);
        }
        break;
      case "P-":
        if (state === STATE.TV) {
          if (currentChannel === channelMin) {
            currentChannel = channelMax;
          } else {
            currentChannel--;
          }
          $("#vlc")[0].playlist.playItem(currentChannel);
        }
        break
      case "OK":
        if (state === STATE.ALARM) {
          $.modal.close();
        } else if (state === STATE.BELL) {
          validateChoice();
        }
        break;
      case "V+":
        soap('AAAAAQAAAAEAAAASAw==');
        break;
      case "V-":
        soap('AAAAAQAAAAEAAAATAw==');
        break;
      case "MUTE":
        soap('AAAAAQAAAAEAAAAUAw==');
        break;
    }


  });

  socket.on('alarm', function(data) {
    startBlink("65000");

    if (state !== STATE.ALARM) {
      var previousState = state;

      vlc.playlist.stop();
      if (previousState === STATE.BELL) {
        socket.emit("fermeturePorte");
        hideEntrance();
      }

      state = STATE.ALARM;
      $('#basic-modal-content').modal({
        onClose: function() {
          vlc.playlist.playItem(currentChannel);
          $.modal.close();
          state = previousState;
          stopBlink();
          jsonString = '{"hue": ' + light1HueValue + ',"on": true,"bri": 10}';
          lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/1/state";
          getHTML('PUT');
          jsonString = '{"hue": ' + light2HueValue + ',"on": true,"bri": 10}';
          lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/1/state";
          lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/2/state";
          getHTML('PUT');
        }
      });
    }

  });

  vlc.playlist.add("http://10.134.15.103:8866/live?channel=51");
  vlc.playlist.add("http://10.134.15.103:8866/live?channel=52");
  vlc.playlist.add("");
  vlc.playlist.add("");
  vlc.playlist.add("");
  vlc.playlist.add("http://10.134.15.103:8866/live?channel=56");
  vlc.playlist.add("http://10.134.15.103:8866/live?channel=57");
  vlc.playlist.add("http://10.134.15.103:8866/live?channel=8");
  vlc.playlist.add("http://10.134.15.103:8866/live?channel=9");
  vlc.playlist.add("");
  vlc.playlist.add("http://10.134.15.103:8866/live?channel=11");
  vlc.playlist.add("");
  vlc.playlist.add("");
  vlc.playlist.add("http://10.134.15.103:8866/live?channel=14");
  vlc.playlist.add("http://10.134.15.103:8866/live?channel=15");
  vlc.playlist.add("http://10.134.15.103:8866/live?channel=16");
  vlc.playlist.add("http://10.134.15.103:8866/live?channel=17");
  vlc.playlist.add("http://10.134.15.103:8866/live?channel=18");
  vlc.playlist.add("");
  vlc.playlist.add("http://10.134.15.103:8866/live?channel=20");
  vlc.playlist.add("http://10.134.15.103:8866/live?channel=21");
  vlc.playlist.add("http://10.134.15.103:8866/live?channel=31");

  function switchToRefuse() {
    accept.removeClass("button-selected");
    refuse.addClass("button-selected");
  }

  function switchToAccept() {
    refuse.removeClass("button-selected");
    accept.addClass("button-selected");
  }

  function validateChoice() {
    getActiveButton() === accept ? openDoor() : closeDoor();
    hideEntrance();
  }

  function openDoor() {

    jsonString = '{"hue": 25500,"on": true,"bri": 10}';
    lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/1/state";
    getHTML('PUT');
    lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/2/state";
    getHTML('PUT');

    socket.emit("ouverturePorte");
  }

  function closeDoor() {


    jsonString = '{"hue": 0,"on": true,"bri": 10}';
    lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/1/state";
    getHTML('PUT');
    lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/2/state";
    getHTML('PUT');
    socket.emit("fermeturePorte");
  }

  //socket.emit("ouverturePorte");
  //socket.emit("fermeturePorte");

  function getActiveButton() {
    return accept.hasClass("button-selected") ? accept : refuse;
  }

});

function play(id) {
  var vlc = document.getElementById("vlc");
  vlc.playlist.playItem(id);

}*/
