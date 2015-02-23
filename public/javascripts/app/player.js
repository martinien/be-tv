define(["init"],function(init) {
  var channels = [51, 52, undefined, undefined, undefined, 56, 57, 8, 9,
    undefined, 11, undefined, undefined, 14, 15, 16, 17, 18, undefined, 20,
    21, 31];

    for (id in channels){
      var result;
      if(channel !== undefined){
        result = "http://10.134.15.103:8866/live?channel=" + channels[id];
      }
      else{
        result = "";
      }
      init.vlc.playlist.add(result);
    }

})


/*vlc.playlist.add("http://10.134.15.103:8866/live?channel=51");
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
vlc.playlist.add("http://10.134.15.103:8866/live?channel=31");*/
