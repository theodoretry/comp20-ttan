// Script for Assignment 2: Historic Landmarks

var myLat = 0.0;
var myLong = 0.0;
var request = new XMLHttpRequest();
var myPos = new google.maps.LatLng(myLat, myLong);
var setup = {
        zoom: 10,
        center: myPos,
        mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map;
var marker;
var window = new google.maps.InfoWindow();

function init() {
        map = new google.maps.Map(document.getElementById("map"), setup);
        setMyLocation();
}

function setMyLocation() {
        if (navigator.geolocation) { 
                navigator.geolocation.getCurrentPosition(function(position) {
                        myLat = position.coords.latitude;
                        myLong = position.coords.longitude;
                        parse();
                        renderMap();
                });
        }
        else {
                alert("Geolocation is not supported.");
        }
}

function parse() {
        params = "login=RACHAEL_EDWARDS&lat=" + myLat + "&lng=" + myLong;
        request.open("POST", "https://defense-in-derpth.herokuapp.com/sendLocation", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.onreadystatechange = function() {
                if (request.readyState == 4) {
                        data = request.responseText;
                        locations = JSON.parse(data);
                        console.log(locations); // DEBUG
                }
        };
        request.send(params);
}

function renderMap() {
        myPos = new google.maps.LatLng(myLat, myLong);
        map.panTo(myPos);

        // // Create a marker
        // marker = new google.maps.Marker({
        //         position: me,
        //         title: "Here I Am!"
        // });
        // marker.setMap(map);
                
        // // Open info window on click of marker
        // google.maps.event.addListener(marker, 'click', function() {
        //         infowindow.setContent(marker.title);
        //         infowindow.open(map, marker);
        // });
}