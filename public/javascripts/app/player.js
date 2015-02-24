define(["jquery", "init"], function($, init) {
  var channels = [51, 52, undefined, undefined, undefined, 56, 57, 8, 9,
    undefined, 11, undefined, undefined, 14, 15, 16, 17, 18, undefined, 20,
    21, 31];
  for (id in channels) {
    var result;
    if (channel !== undefined) {
      result = "http://10.134.15.103:8866/live?channel=" + channels[id];
    } else {
      result = "";
    }
    $("#vlc")[0].playlist.add(result);
  }
  return {
    vlc: $("#vlc")[0],
    currentChannel: 0,
    channelMin: 0,
    channelMax: 22
  }
})
