define(["init"], function(init) {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  navigator.getUserMedia({audio: true, video: true}, function(stream){
    $('#my-video').prop('src', URL.createObjectURL(stream));
    window.localStream = stream;
  }, function(){ });

  init.peer.on('call', function(call){
    call.answer(window.localStream);
    call.on('stream', function(stream){
      $('#their-video').prop('src', URL.createObjectURL(stream));
    });
  });
});
