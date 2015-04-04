requirejs.config({
  paths: {
    jquery: 'libs/jquery/dist/jquery.min',
    jqueryweather: 'libs/simpleWeather/jquery.simpleWeather.min',
    socketio: 'libs/socket.io-client/socket.io',
    peer: 'libs/peerjs/peer.min',
    domReady: 'libs/requirejs-domready/domReady',
    init: 'app/init',
    light: 'app/light',
    tv: 'app/tv',
    weather: 'app/weather',
    player: 'app/player',
    socket: 'app/socket',
    utils: 'app/utils',
    door: 'app/door',
    remote: 'app/remote',
    phone: 'app/phone'
  }
});

requirejs(['domReady'],
  function(domReady) {
    domReady(function() {
      require(['init', 'socket', 'utils', 'remote', 'door', 'light', 'player', 'tv', 'phone'], function(init, socket, utils, remote, door, light, player, tv) {
        init.accept.click(function() {
          door.switchToAccept();
          door.validateChoice();
          tv.currentState = tv.STATE.TV;
        });
        init.refuse.click(function() {
          door.switchToRefuse();
          door.validateChoice();
          tv.currentState = tv.STATE.TV;
        });
        init.alarm.click(function() {
          tv.currentState = tv.STATE.TV;
          init.alarm.hide();
          player.vlc.playlist.playItem(player.currentChannel);
          light.stopBlink('65000');
        });
        return;
      });
    });
});
