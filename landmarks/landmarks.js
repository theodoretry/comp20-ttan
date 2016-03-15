// Script for Assignment 2: Historic Landmarks

var myLat = 0.0;
var myLong = 0.0;
var myLogin = "RACHAEL_EDWARDS";
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
                });
        }
        else {
                alert("Geolocation is not supported.");
        }
}

function parse() {
        params = "login=" + myLogin + "&lat=" + myLat + "&lng=" + myLong;
        request.open("POST", "https://defense-in-derpth.herokuapp.com/sendLocation", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.onreadystatechange = function() {
                if (request.readyState == 4) {
                        data = request.responseText;
                        locations = JSON.parse(data);
                        console.log(locations); // DEBUG
                        renderMap();
                }
        };
        request.send(params);
}

function renderMap() {
        myPos = new google.maps.LatLng(myLat, myLong);
        map.panTo(myPos);

        selfimage = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569";
        peopleimage = "http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=wc-male|ADDE63";
        landmarkimage = "http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=civic-building|3498DB";

        // Self Marker
        selfmarker = new google.maps.Marker({
                position: myPos,
                icon: selfimage
        });
        selfmarker.setMap(map);

        // Classmates Marker
        for (i = 0; i < locations.people.length; i++) {
                var LatLng = new google.maps.LatLng(locations.people[i].lat, 
                                                    locations.people[i].lng);

                peoplemarker = new google.maps.Marker({
                position: LatLng,
                icon: peopleimage
                });

                if (locations.people[i].login != myLogin) {
                        peoplemarker.setMap(map);
                } 
        }

        // Landmarks Marker
        for (i = 0; i < locations.landmarks.length; i++) {
                var LatLng = new google.maps.LatLng(locations.landmarks[i].geometry.coordinates[1], 
                                                    locations.landmarks[i].geometry.coordinates[0]);
                landmarkmarker = new google.maps.Marker({
                position: LatLng,
                icon: landmarkimage
                });
                landmarkmarker.setMap(map); 
        }
                
        // // Open info window on click of marker
        // google.maps.event.addListener(marker, 'click', function() {
        //         infowindow.setContent(marker.title);
        //         infowindow.open(map, marker);
        // });
}