var callingSound = new Audio('../audio/calling.ogg');
callingSound.loop = true;
var endOfCallSound = new Audio('../audio/end_of_call.ogg');


navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

navigator.getUserMedia({audio: true, video: true}, function(stream){
  $('#my-video').prop('src', URL.createObjectURL(stream));
  window.localStream = stream;
}, function(){ });

var peer = new Peer({host: '10.134.15.103', port: 9000, path: '/peerjs'});

$("#call").on('click',function() {
  callingSound.play();
  var call = peer.call('tv', window.localStream);
  window.existingCall = call;
  call.on('stream', function(stream){
    callingSound.pause();
    $('#tv-video').prop('src', URL.createObjectURL(stream));
  });
  call.on('close', function() {
    endOfCallSound.play();
    $('#tv-video').prop('src', '');
  });
});

$("#stop").on('click',function() {
  callingSound.pause();
  window.existingCall.close();
});
