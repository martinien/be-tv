$.fn.slideFadeToggle  = function(speed, easing, callback) {
        return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
};


$( document ).ready(function() {



    var notification = $(".notification"),
    entrance = $("#entrance"),
    socket = io(),
    accept = $('#accept'),
    refuse = $('#refuse'),
    vlc = document.getElementById("vlc");

    /*player = wjs("#player"),
    video = player.videoelem;*/




    $( "body" ).keydown(function( event ) {
        console.log("aaa");
        if ( event.which == 39 && !refuse.hasClass("button-selected")) {
            //flèche droite
            switchToRefuse();
        }
        else if(event.which == 37 && !accept.hasClass("button-selected")){
            //flèche gauche
            switchToAccept();
        }
        else if(event.which == 13){
            validateChoice();
        }
        else{
            return;
        }

    });








        //video.toggleFullscreen();
/*
        playlist = [];

        playlist.push({
          url: "dvb-t://frequency=594000000:bandwidth=0",
          title: "Grand Lille TV"
        });

        playlist.push({
          url: "dvb-t://frequency=554000000:bandwidth=0:program=1281",
          title: "TF 1"
        });

        playlist.push({
          url: "dvb-t://frequency=554000000:bandwidth=0:program=1282",
          title: "France 2"
        });

        playlist.push({
          url: "dvb-t://frequency=554000000:bandwidth=0:program=1283",
          title: "M6"
        });


        player.addPlaylist(playlist); //"https://www.youtube.com/watch?v=WdNYal09Pfw"

        video.playlist.playItem(0);


*/


    function triggerBell(){

        if(entrance.attr('src') !== undefined) {
            entrance.removeAttr('src');
        }
        else {
            entrance.attr('src', 'http://cs.isen.fr/camera/mjpg/video.mjpg');
        }
      notification.slideFadeToggle(200, function(e){
            accept.addClass('button-selected');
      });

      //video.emitJsMessage("[entrance]");
    }


    function triggerFireAlarm(){

      //video.emitJsMessage("[fireAlarm]");
}


    accept.click(function(e){
        triggerBell();
        alert("Ouverture de la porte");
    });
    refuse.click(function(e){
        triggerBell();
        alert("Porte fermée");
    });


    socket.on('bellRing', function (data){
        console.log("sonette activée")
        triggerBell();
    });

    socket.on('remote', function (data){
        //data = id de la commande
    });

    socket.on('alarm', function (data){
        //video.emitJsMessage("[fireAlarm]");
    });


$("#ouvrir").click(function(e){
    socket.emit("ouverturePorte");
});

$("#fermer").click(function(e){
    socket.emit("fermeturePorte");
});

/*
$("#ouvrirPlaylist").click(function(e){
    video.emitJsMessage("[playlist]");
});

$("#sonette").click(function(e){
    video.emitJsMessage("[trigger]");
});

$("#alarm").click(function(e){
    video.emitJsMessage("[fireAlarm]");
});
*/


    //vlc.video.toggleFullscreen();
    //vlc.video.aspectRatio = "16:9";
    var tf1 = vlc.playlist.add("dvb-t://frequency=554000000:bandwidth=0", "tf1", "program=1281");
    var fr2 = vlc.playlist.add("dvb-t://frequency=554000000:bandwidth=0", "fr2", "program=1282");
    var m6 = vlc.playlist.add("dvb-t://frequency=554000000:bandwidth=0", "m6", "program=1283");
    vlc.playlist.add("dvb-t://frequency=594000000:bandwidth=0", "grdLilleTv", "");




    function switchToRefuse(){
        accept.removeClass("button-selected");
        refuse.addClass("button-selected");
    }

    function switchToAccept(){
        refuse.removeClass("button-selected");
        accept.addClass("button-selected");
    }

    function validateChoice(){
        triggerBell();
        alert(getActiveButton() === accept ? "Ouverture de la porte" : "Porte fermée");
    }



    function getActiveButton(){
        return accept.hasClass("button-selected") ? accept : refuse;
    }

});


function play(id) {
    var vlc = document.getElementById("vlc");
    vlc.playlist.playItem(id);
}
