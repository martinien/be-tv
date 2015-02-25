define(["jquery", "socketio"], function($, io) {
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
    socket : io()
  }
});
