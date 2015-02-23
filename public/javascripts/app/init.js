define(["jquery", "door"], function($, door) {
  return {
    notification: $("#notification"),
    entrance: $("#entrance"),
    accept: $('#accept'),
    refuse: $('#refuse'),
    vlc: $("#vlc")[0],
    entranceShown: false,

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
      accept.className = "button";
      refuse.className += "button-selected";
    },

    switchToAccept: function() {
      refuse.className = "button";
      accept.className += "button-selected";
    },

    validateChoice: function() {
      getActiveButton() === accept ? door.openDoor() : door.closeDoor();
      this.hideEntrance();
    },

    getActiveButton: function() {
      return $('#accept').hasClass("button-selected") ? accept : refuse;
    }
  }
});