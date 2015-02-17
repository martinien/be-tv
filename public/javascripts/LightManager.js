var jsonString;
var lightUrl;
var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
var colorTab = [
  [0, "0xFF0000"],
  [6375, "0xFF9000"],
  [12750, "0xFFFF00"],
  [19125, "0x9ACD32"],
  [25500, "0x00FF00"],
  [30855, "0x008000"],
  [36210, "0x00FFFF"],
  [41565, "0x6495ED"],
  [46920, "0x0000FF"],
  [51573, "0x800080"],
  [56227, "0xFFC0CB"],
  [60881, "0xEE82EE"]
];
var light1HueValue, light2HueValue, light1on, light2on;
var light1bri = 150;
var light2bri = 150;
var objectName;


function initLight(initUrl) {
  var command = 'GET';
  if (window.XMLHttpRequest) {
    var http = new XMLHttpRequest();
    http.open(command, initUrl, false);

    http.onreadystatechange = function() {
      if (http.readyState == 4) {
        if (http.status == 200) {
          var jstring = JSON.parse(http.responseText);

          if (initUrl.substring(initUrl.length - 1, initUrl.length) == "1") {
            light1HueValue = jstring.state.hue;
            light1on = jstring.state.on;
            light1bri = jstring.state.bri;

          } else if (initUrl.substring(initUrl.length - 1, initUrl.length) == "2") {
            light2HueValue = jstring.state.hue;
            light2on = jstring.state.on;
            light2bri = jstring.state.bri;
          }
        } else {
          console.log("Error " + http.status);
        }
      }
    }
    http.send("");
  }
  return false;
}

function clickOnLight(obj) {
  objectName = obj.name;
  var mainConteneur = document.createElement('div');
  mainConteneur.id = objectName;
  mainConteneur.className += "conteneur overlay window-base";
  mainConteneur.style.width = "205px";
  mainConteneur.style.height = "126px";
  var colorsConteneur = document.createElement('div');

  var crossImg = document.createElement("img");
  crossImg.src = "img/logo-cross.png";
  crossImg.className += "window-close cross2";

  var barre = document.createElement("div");
  barre.className += "window-move barre";
  mainConteneur.appendChild(barre);

  barre.appendChild(crossImg);
  document.body.appendChild(mainConteneur);

  var onOffButton = document.createElement('img');
  onOffButton.id = objectName + "button";
  onOffButton.className += "colorDiv";

  var dataSliderValue;

  if (objectName == "light1") {
    dataSliderValue = Math.floor((light1bri * 100 / 253));

    if (light1on) {
      onOffButton.src = "img/lighton.png";
      onOffButton.state = "on";
    } else {
      onOffButton.src = "img/lightoff.png";
      onOffButton.state = "off";
    }

  } else if (objectName == "light2") {
    dataSliderValue = Math.floor((light2bri * 100 / 253));

    if (light2on) {
      onOffButton.src = "img/lighton.png";
      onOffButton.state = "on";
    } else {
      onOffButton.src = "img/lightoff.png";
      onOffButton.state = "off";
    }
  }

  onOffButton.style.backgroundColor = "black";
  colorsConteneur.appendChild(onOffButton);
  colorsConteneur.className += "colorsConteneur";
  colorsConteneur.style.width = "150px";


  mainConteneur.appendChild(colorsConteneur);

  document.getElementById(objectName + "button").onclick = function() {


    if (this.state == "on") {
      this.src = "img/lightoff.png";
      this.state = "off";
      jsonString = '{"hue":' + colorTab[0][0] + ',"on": false,"bri": 1 }';
      obj.material.color.setHex("0xd3d3d3");
    } else {
      this.src = "img/lighton.png";
      this.state = "on";
      jsonString = '{"hue":' + colorTab[0][0] + ',"on": true,"bri": 10 }';
      obj.material.color.setHex(colorTab[0][1]);
    }

    if (objectName == "light1") {
      lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/1/state";
      if (this.state == "on") {
        light1on = true;
      } else {
        light1on = false;
      }
    } else if (objectName == "light2") {
      lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/2/state";
      if (this.state == "on") {
        light2on = true;
      } else {
        light2on = false;
      }
    }
    getHTML('PUT');
  }

  // création de la palette de couleurs
  for (i = 0; i < 11; i++) {
    var colorConteneur = document.createElement('div');
    colorConteneur.id = "divColor" + i;
    colorConteneur.className += "colorDiv";
    var hexColor = colorTab[i][1];
    hexColor = hexColor.slice(2, 8);
    hexColor = "#" + hexColor;
    colorConteneur.style.backgroundColor = hexColor;

    colorsConteneur.appendChild(colorConteneur);

    document.getElementById("divColor" + i).onclick = function() {

      var value = this.style.backgroundColor; //rgb
      var bri;

      if (objectName == "light1") {
        light1HueValue = hexToHue(rgb2hex(this.style.backgroundColor));
        lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/1/state";
        bri = light1bri;
      } else if (objectName == "light2") {
        light2HueValue = hexToHue(rgb2hex(this.style.backgroundColor));
        lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/2/state";
        bri = light2bri;
      }

      jsonString = '{"hue":' + hexToHue(rgb2hex(value)) + ',"on": true,"bri":' + bri + '}';

      getHTML('PUT');
      obj.material.color.setHex(rgb2hex(value));

    };
  }

  var sliderDiv = document.createElement('div');
  sliderDiv.id = "sliderDiv" + objectName;
  sliderDiv.className += "sliderDiv";

  var fieldvalue = '<div id="slider" class="sliderBar range-slider vertical-range" data-slider="' + dataSliderValue + '" data-options="vertical: true; step: 20;"> <span id="sliderButton" class="range-slider-handle" role="slider" tabindex="0"></span>  <span class="range-slider-active-segment"></span><input type="hidden"></div>';

  mainConteneur.appendChild(sliderDiv);

  $('#sliderDiv' + objectName).html(fieldvalue);


  $(document).foundation();

  // on rentre trop souvent ici (pas qu'à la modif du slider)
  $(document).foundation({
    slider: {

      on_change: function() {

        var oldValue1 = light1bri;
        var oldValue2 = light2bri;

        if (objectName == "light1") {
          light1bri = Math.floor(($('#slider').attr('data-slider')) * 253 / 100) + 1;
          jsonString = '{"hue":' + light1HueValue + ',"on":' + light1on + ',"bri":' + light1bri + '}';
          lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/1/state";
        } else if (objectName == "light2") {

          light2bri = Math.floor(($('#slider').attr('data-slider')) * 253 / 100) + 1;
          jsonString = '{"hue":' + light2HueValue + ',"on":' + light2on + ',"bri":' + light2bri + '}';
          lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/2/state";
        }

        if (oldValue1 != light1bri || oldValue2 != light2bri) {
          getHTML('PUT');
        }
      }
    }
  });
}

function startBlink(color) {
  jsonString = '{"hue": ' + color + ',"on": true,"bri": 10,"alert": "lselect"}';
  lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/1/state";
  getHTML('PUT');
  lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/2/state";
  getHTML('PUT');
}

function stopBlink() {
  jsonString = '{"hue":' + light1HueValue + ',"on":' + light1on + ',"bri": ' + light1bri + '}';
  lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/1/state";
  getHTML('PUT');

  jsonString = '{"hue":' + light2HueValue + ',"on":' + light2on + ',"bri": ' + light2bri + '}';
  lightUrl = "http://10.134.15.60/api/2fe88a512405b6771b4ed88524094ab/lights/2/state";
  getHTML('PUT');
}

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return "0x" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function getHTML(command) {
  if (window.XMLHttpRequest) {
    var http = new XMLHttpRequest();
    http.open(command, lightUrl, true);

    http.onreadystatechange = function() {
      if (http.readyState == 4) {
        if (http.status == 200) {

        } else {
          console.log("Error " + http.status);
        }
      }
    }

    http.send(jsonString);
  }
  return false;
}

function hueToHex(hueValue) {
  for (var i = 0; i < colorTab.length; i++) {
    if (colorTab[i][0] == hueValue) {
      return colorTab[i][1]
    }
  }
}

function hexToHue(hueValue) {
  for (var i = 0; i < colorTab.length; i++) {
    if (colorTab[i][1].toUpperCase() == hueValue.toUpperCase()) {
      return colorTab[i][0]
    }
  }
}

function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}
