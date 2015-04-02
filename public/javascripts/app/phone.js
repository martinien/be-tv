define(["init", "tv"], function(init, tv) {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  navigator.getUserMedia({audio: true, video: true}, function(stream){
    $('#my-video').prop('src', URL.createObjectURL(stream));
    window.localStream = stream;
  }, function(){ });

  init.peer.on('call', function(call){
    tv.currentState = tv.STATE.PHONE;
    $('#phone').show();
    $('#incoming-call').show();
    init.call = call;
    call.on('close', function() {
      $('#phone').hide();
      tv.currentState = tv.STATE.TV;
      $('#their-video').prop('src', '');
    });
  });
});
