define(["init", "tv"], function(init, tv) {
  init.ringtone.loop = true;

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  navigator.getUserMedia({audio: true, video: true}, function(stream){
    $('#my-video').prop('src', URL.createObjectURL(stream));
    window.localStream = stream;
  }, function(){ });

  init.peer.on('call', function(call){
    init.ringtone.play();
    tv.currentState = tv.STATE.PHONE;
    $('#phone').show();
    $('#incoming-call').show();
    init.call = call;
    call.on('close', function() {
      init.endOfCallSound.play();
      $('#phone').hide();
      tv.currentState = tv.STATE.TV;
      $('#their-video').prop('src', '');
    });
  });
});
