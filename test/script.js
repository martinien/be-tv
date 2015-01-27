window.onload = function() {
    var vlc = document.getElementById("vlc");

    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.readAsText(file);
    var text = reader.result;
    loadChannels(text);

    //vlc.video.toggleFullscreen();
    vlc.playlist.add("dvb-t://frequency=554000000:bandwidth=0", "tf1", "program=1281");
    vlc.playlist.add("dvb-t://frequency=554000000:bandwidth=0", "fr2", "program=1282");
    vlc.playlist.add("dvb-t://frequency=554000000:bandwidth=0", "m6", "program=1283");
    vlc.playlist.add("dvb-t://frequency=594000000:bandwidth=0", "grdLilleTv", "");

}

function playChannel() {
    var htmlList = document.getElementById("channelList");
    var vlc = document.getElementById("vlc");

    var text = htmlList.selectedOptions.item().value;
    var splitString=text.split("(");
    var id = parseInt(splitString[0]);
    console.log("id = "+id);
    vlc.playlist.playItem(id);
}

function loadChannels(text){
    var textByLines =  text.split(/\r\n|\r|\n/);
    var nbLines = textByLines.length;

    var channelsList = new Array();

    if((nbLines-1)%6==0){
        for(var i=1; i<nbLines; i+=6){
            // on récupère le nom de la chaîne
            var nameLine=textByLines[i].split("-");
            var channelName = nameLine[1];
            // on récupère la fréquence
            var freqLine=textByLines[i+2].split("=");
            var frequence = freqLine[1];
            // on récupère le numéro du programme
            var numProgLine = textByLines[i+4].split("=");
            var numProg = numProgLine[1];

            var channel = {name:channelName, frequency:frequence, programNumber: numProg};
            channelsList[channelsList.length] = channel;
        }

        var htmlList = document.getElementById("channelList");

        for(var i=0;i<channelsList.length;i++){
            var option = document.createElement("option");
            option.text = i+1 + " (" + channelsList[i].name+")";
            htmlList.add(option);
            vlc.playlist.add("dvb-t://frequency="+channelsList[i].frequency+":bandwidth=0", channelsList[i].name, "program="+channelsList[i].programNumber);
        }




    }
}

function update(id) {

    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(e){
        var text = reader.result;
        loadChannels(text);
    }

}

