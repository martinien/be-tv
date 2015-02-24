define([], function() {
  return {
    STATE: {
      TV: 1,
      BELL: 2,
      ALARM: 3
    },
    currentState: 1,
    soap: function(CMD) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://10.134.15.110/sony/IRCC', true);
      xmlhttp.setRequestHeader("X-Auth-PSK", "iamisen");
      var sr = '<?xml version="1.0"?>' +
        '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
        '<SOAP-ENV:Body>' + '<m:X_SendIRCC xmlns:m="urn:schemas-sony-com:service:IRCC:1">' +
        '<IRCCCode xmlns:dt="urn:schemas-microsoft-com:datatypes" dt:dt="string">' +
        CMD +
        '</IRCCCode>' +
        '</m:X_SendIRCC>' +
        '</SOAP-ENV:Body>' +
        '</SOAP-ENV:Envelope>';
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {}
        }
      }
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.send(sr);
    }
  }
});
