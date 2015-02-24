requirejs.config({
  paths: {
    jquery: 'lib/jquery',
    jqueryweather: 'lib/jquery-simpleWeather',
    jquerymodal: 'lib/jquery-simpleModal',
    socketio: 'lib/socket-io',
    domReady: 'lib/domReady',
    init: 'app/init',
    light: 'app/light',
    tv: 'app/tv',
    weather: 'app/weather',
    player: 'app/player',
    socket: 'app/socket',
    utils: 'app/utils',
    door: 'app/door',
    remote: 'app/remote'
  }
});

requirejs(['domReady'],
  function(domReady) {
    domReady(function() {
      require(['init', 'socket', 'utils', 'remote', 'door', 'light', 'player'], function(init, socket, utils, remote, door, light, player) {
        init.accept.click(function() {
          door.switchToAccept();
          door.validateChoice();
        });
        init.refuse.click(function() {
          door.switchToRefuse();
          door.validateChoice();
        });
        init.alarm.click(function() {
          init.alarm.hide();
          player.vlc.playlist.playItem(player.currentChannel);
          light.stopBlink('65000');
        });
        return;
      });
    })
});
