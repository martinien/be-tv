$.fn.slideFadeToggle = function(speed, easing, callback) {
    return this.animate({
        opacity: 'toggle',
        height: 'toggle'
    }, speed, easing, callback);
};


$( document ).ready(function() {


    var notification = $(".notification"),
        entrance = $("#entrance"),
        socket = io(),
        accept = $('#accept'),
        refuse = $('#refuse'),
        vlc = document.getElementById("vlc");



    $( "body" ).keydown(function( event ) {
        console.log("aaa");
        if (event.which == 39 && !refuse.hasClass("button-selected")) {
            //flèche droite
            switchToRefuse();
        } else if (event.which == 37 && !accept.hasClass("button-selected")) {
            //flèche gauche
            switchToAccept();
        } else if (event.which == 13) {
            validateChoice();
        } else {
            return;
        }

    });

    function triggerBell() {

        if (entrance.attr('src') !== undefined) {
            entrance.removeAttr('src');
        } else {
            entrance.attr('src', 'http://cs.isen.fr/camera/mjpg/video.mjpg');
        }
        notification.slideFadeToggle(200, function(e) {
            accept.addClass('button-selected');
        });

    }

    function triggerFireAlarm() {


    }

    accept.click(function(e) {
        triggerBell();
        alert("Ouverture de la porte");
    });

    refuse.click(function(e) {
        triggerBell();
        alert("Porte fermée");
    });

    socket.on('bellRing', function(data) {
        console.log("sonette activée")
        triggerBell();
    });

    socket.on('cmd', function(data) {
        //data = id de la commande
        if (data == 16) {
            vlc.playlist.playItem(1);
        }
        if (data == 2064) {
            vlc.playlist.playItem(2);
        }
        if (data == 1040) {
            vlc.playlist.playItem(3);
        }
    });

    socket.on('alarm', function(data) {

    });

    vlc.video.aspectRatio = "16:9";
    var tf1 = vlc.playlist.add("dvb-t://frequency=554000000:bandwidth=0", "tf1", "program=1281");
    var fr2 = vlc.playlist.add("dvb-t://frequency=554000000:bandwidth=0", "fr2", "program=1282");
    var m6 = vlc.playlist.add("dvb-t://frequency=554000000:bandwidth=0", "m6", "program=1283");
    vlc.playlist.add("dvb-t://frequency=594000000:bandwidth=0", "grdLilleTv", "");

    function switchToRefuse() {
        accept.removeClass("button-selected");
        refuse.addClass("button-selected");
    }

    function switchToAccept() {
        refuse.removeClass("button-selected");
        accept.addClass("button-selected");
    }

    function validateChoice() {
        triggerBell();
        getActiveButton() === accept ? socket.emit("ouverturePorte") : socket.emit("fermeturePorte");
    }

    //socket.emit("ouverturePorte");
    //socket.emit("fermeturePorte");

    function getActiveButton() {
        return accept.hasClass("button-selected") ? accept : refuse;
    }

});

function play(id) {
    var vlc = document.getElementById("vlc");
    vlc.playlist.playItem(id);
}
