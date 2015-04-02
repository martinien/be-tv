navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

navigator.getUserMedia({audio: true, video: true}, function(stream){
  $('#my-video').prop('src', URL.createObjectURL(stream));
  window.localStream = stream;
}, function(){ });

var peer = new Peer({host: '10.134.15.103', port: 9000, path: '/peerjs'});

$("#call").on('click',function() {
  var call = peer.call('tv', window.localStream);
  window.existingCall = call;
  call.on('stream', function(stream){
    $('#tv-video').prop('src', URL.createObjectURL(stream));
  });
});

$("#stop").on('click',function() {
  window.existingCall.close();
});
