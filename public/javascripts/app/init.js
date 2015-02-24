define(["jquery", "socketio"], function($, io) {
  return {
    notification: $("#notification"),
    entrance: $("#entrance"),
    accept: $('#accept'),
    refuse: $('#refuse'),
    alarm: $("#alarm"),
    weather: $("#weather"),
    remote: $("#channel"),
    entranceShown: false,
    socket : io()
  }
});
