define(["jquery", "jqueryweather"],
  function($, simpleWeather) {
    return {
      load: function() {
        $.simpleWeather({
          woeid: '608105', //2357536
          location: '',
          unit: 'c',
          success: function(weather) {
            var date = new Date();
            html = '<h3>' + weather.city + '</h3>';
            html += '<h4>' + date.getDate() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + '</h4>'
            html += '<h2><i class="icon-' + weather.code + '"></i>';
            html += weather.temp + '&deg;' + weather.units.temp + '</h2>';
            html += '<table>';
            html += '<tr>';
            for (var i = 0; i < weather.forecast.length; i++) {
              html += '<td>' + weather.forecast[i].day + '</td>';
            }
            html += '</tr>';
            html += '<tr>';
            for (var i = 0; i < weather.forecast.length; i++) {
              html += '<td><i class="icon-' + weather.forecast[i].code + '"></i></td>';
            }
            html += '</tr>';
            html += '<tr>';
            for (var i = 0; i < weather.forecast.length; i++) {
              html += '<td>' + weather.forecast[i].high + '&deg;' + weather.units.temp + '</td>';
            }
            html += '</tr>';
            html += '</table>';
            $("#weather").html(html);
          },
          error: function(error) {
            $("#weather").html('<p>' + error + '</p>');
          }
        });
      }
    }
  }
);
