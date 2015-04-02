define(["jquery", "socketio", "peer"], function($, io) {
  return {
    notification: $("#notification"),
    entrance: $("#entrance"),
    accept: $('#accept'),
    refuse: $('#refuse'),
    alarm: $("#alarm"),
    weather: $("#weather"),
    remote: $("#channel"),
    face: $("#face"),
    entranceShown: false,
    socket: io(),
    peer: new Peer('tv', {host: 'localhost', port: 9000, path: '/peerjs'}),
    call: null,
  }
});
