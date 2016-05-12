/*global  $, Skycons*/
(function () {
    'use strict';
    
    var App = {

        APIKEY: "da8215b998571f21d1d7a56e4e15292e",
        GOOGLE_APIKEY: "AIzaSyDLGN8IiGzCW66CwM7eFyP-WVqnLXDvABs",
        lat: "",
        lng: "",
        temp: "",
        
        init: function () {
            //kickstart the app
            App.getLocation();
        },
        
        getLocation: function () {
            //get the current user position
            if (navigator.geolocation) {
                
                navigator.geolocation.getCurrentPosition(App.foundPosition);

            } else {
                
                $(".weather-summary").text("Geolocation is not supported by this browser.");
                
            }
        },
        
        foundPosition: function (pos) {
            //found the current user position
            App.lat = pos.coords.latitude;
            App.lng = pos.coords.longitude;
            App.getCity(App.lat, App.lng);
            App.getWeather();
        },
        
        
        getCity: function (latitude, longitude){
            
            var request = new XMLHttpRequest();

            var method = 'GET';
            var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
            var async = true;

            request.open(method, url, async);
            request.onreadystatechange = function(){
              if(request.readyState == 4 && request.status == 200){
                var data = JSON.parse(request.responseText);
                var address = data.results[1];
                $("#city").text(address.formatted_address);
              }
            };
            request.send();
        },
        
        getWeather: function () {
            //get the current weather for my location
            
            var URL = "https://api.forecast.io/forecast/" + App.APIKEY + "/" + App.lat + "," + App.lng;
            //Mechelen: https://api.forecast.io/forecast/da8215b998571f21d1d7a56e4e15292e/51.0258790,4.4775370
            
            
            //JASONP
            window.jQuery.ajax({
                url: URL,
                dataType: "jsonp",
                success: function (data) {
                    
                    var tempF = data.currently.temperature;
                    var tempC = ((tempF - 32)/1.8).toFixed(1);
                    
                    $("#temperature").text(tempC + " °");
                    $("#weather-summary").text(data.currently.summary);
                    
                    
                    var skycons = new Skycons({"color": "white"});
                    skycons.add("weather-icon", data.currently.icon);
                    skycons.play();
                }
            });
        }
        
    };
    
    App.init();
    
}());