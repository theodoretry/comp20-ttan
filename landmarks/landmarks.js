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
        getMyLocation();
}

function getMyLocation() {
        if (navigator.geolocation) { 
                navigator.geolocation.getCurrentPosition(function(position) {
                        myLat = position.coords.latitude;
                        myLong = position.coords.longitude;
                        renderMap();
                });
        }
        else {
                alert("Geolocation is not supported.");
        }
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