$.fn.slideFadeToggle = function(speed, easing, callback) {
    return this.animate({
        opacity: 'toggle',
        height: 'toggle'
    }, speed, easing, callback);
};


$( document ).ready(function() {

    var notification = $("#notification"),
        entrance = $("#entrance"),
        socket = io(),
        accept = $('#accept'),
        refuse = $('#refuse'),
        vlc = $("#vlc")[0],
        entranceShown = false;



    function triggerBell() {

        if (entrance.attr('src') !== undefined) {
            entrance.removeAttr('src');
        } else {
            entrance.attr('src', 'http://cs.isen.fr/camera/mjpg/video.mjpg');
        }

        /*if (notification.hasClass('showing') === true) {
          notification.removeClass('showing');
        } else {
          notification.addClass('showing');
        }*/
        notification.slideFadeToggle(200, function(e) {
            accept.addClass('button-selected');
        });

    }

    function showEntrance() {

      if (!entranceShown) {
          entrance.attr('src', 'http://cs.isen.fr/camera/mjpg/video.mjpg');
          notification.slideFadeToggle(200, function(e) {
              accept.addClass('button-selected');
          });
          entranceShown = true;
      }

    }

    function hideEntrance() {

        entrance.removeAttr('src');
        notification.slideFadeToggle(200, function(e) {
            accept.addClass('button-selected');
        });
        entranceShown = false;

    }

    function triggerFireAlarm() {


    }

    socket.on('bellRing', function(data) {
        showEntrance();
    });

    var timer = 0;
    var nbr = "";
    socket.on('cmd', function(data) {
        switch(data) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "0":
                if(Math.floor(Date.now() / 1000) - timer < 3 ) {
                    nbr = nbr + data;
                    $("#channel h1").html(nbr);
                } else {
                    timer = 0;
                    nbr = "";
                }
                if(timer == 0) {
                    nbr = nbr + data;
                    $("#channel").show();
                    $("#channel h1").html(nbr);
                    timer = Math.floor(Date.now() / 1000);
                    setTimeout(function(){
                        $("#channel").hide();
                        vlc.playlist.playItem(parseInt(nbr));
                    }, 3000);
                }
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
        getActiveButton() === accept ? socket.emit("ouverturePorte") : socket.emit("fermeturePorte");
        closeEntrance();
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
