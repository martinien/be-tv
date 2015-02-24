define(["jquery", "socketio"], function($, io) {
  return {
    notification: $("#notification"),
    entrance: $("#entrance"),
    accept: $('#accept'),
    refuse: $('#refuse'),
    alarm: $("#alarm"),
    vlc: $("#vlc")[0],
    entranceShown: false,
    socket : io()
  }
});
