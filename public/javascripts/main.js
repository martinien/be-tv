$.fn.slideFadeToggle = function(speed, easing, callback) {
    return this.animate({
        opacity: 'toggle',
        height: 'toggle'
    }, speed, easing, callback);
};


$( document ).ready(function() {


    var notification = $("#notification"),
        //entrance = $("#entrance"),
        socket = io(),
        accept = $('#accept'),
        refuse = $('#refuse'),
        vlc = $("#vlc")[0];




    $( "body" ).keydown(function( event ) {

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

        /*if (entrance.attr('src') !== undefined) {
            entrance.removeAttr('src');
        } else {
            entrance.attr('src', 'http://cs.isen.fr/camera/mjpg/video.mjpg');
        }*/

        if (notification.hasClass('showing') === true) {
          notification.removeClass('showing');
        } else {
          notification.addClass('showing');
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
        triggerBell();
    });

    socket.on('cmd', function(data) {
        switch(data) {
            case "1":
                vlc.playlist.playItem(1);
                break;
            case "2":
                vlc.playlist.playItem(2);
                break;
            case "6":
                vlc.playlist.playItem(3);
                break;
            case "GREEN":
                switchToAccept();
                break;
            case "RED":
                switchToRefuse();
                break
            case "OK":
                if($("#basic-modal-content").hasClass('simplemodal-data')){
                    $.modal.close();
                }
                else{
                  validateChoice();
                }
                break;
            }
    });

    socket.on('alarm', function(data) {


      vlc.playlist.stop();
      $('#basic-modal-content').modal({
        onClose: function(){
          vlc.playlist.play();
          $.modal.close();
        }
      });
    });

    var tf1 = vlc.playlist.add("http://127.0.0.1:8866/live?channel=51");
    var fr2 = vlc.playlist.add("http://127.0.0.1:8866/live?channel=52");
    var m6 = vlc.playlist.add("http://127.0.0.1:8866/live?channel=56");
    vlc.playlist.add("http://127.0.0.1:8866/live?channel=31");

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
