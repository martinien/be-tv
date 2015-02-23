define(["light", "init"], function(light, init) {
  return {
    openDoor: function() {
      light.stopBlink(25500);
      init.socket.emit("ouverturePorte");
    },

    closeDoor: function() {
      light.stopBlink(0);
      init.socket.emit("fermeturePorte");
    },

    showEntrance: function() {
      if (!this.entranceShown) {
        entrance.setAttribute('src', 'http://cs.isen.fr/camera/mjpg/video.mjpg');
        notification.style.display = 'block';
        accept.setAttribute("class", 'button button-selected');
        this.entranceShown = true;
      }
    },

    hideEntrance: function() {
      entrance.removeAttribute('src');
      notification.style.display = 'none';
      accept.className = 'button-success';
      refuse.className = 'button-error';
      this.entranceShown = false;

    },

    switchToRefuse: function() {
      console.log("refuse");
      accept.className = "button";
      refuse.className += "button-selected";
    },

    switchToAccept: function() {
      console.log("accept");
      refuse.className = "button";
      accept.className += "button-selected";
    },

    validateChoice: function() {
      this.getActiveButton() === accept ? this.openDoor() : this.closeDoor();
      this.hideEntrance();
    },

    getActiveButton: function() {
      return $('#accept').hasClass("button-selected") ? accept : refuse;
    }
  }
});
