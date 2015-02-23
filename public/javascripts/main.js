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
    door: 'app/door'
  }
});

requirejs(['domReady'],
  function(domReady) {
    domReady(function() {
      require(['init', 'socket'], function() {
        return;
      });
    })
});
