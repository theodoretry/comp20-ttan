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
var infowindow = new google.maps.InfoWindow();

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
        request.open("POST", "https://fathomless-waters-11607.herokuapp.com/sendLocation", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.onreadystatechange = function() {
                if (request.readyState == 4) {
                        data = request.responseText;
                        locations = JSON.parse(data);
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

        // Find the closest landmark and the distance from me
        var dist = 100;
        for (i = 0; i < locations.landmarks.length; i++) {
                curr_dist = haversine(locations.landmarks[i].geometry.coordinates[1], 
                                      locations.landmarks[i].geometry.coordinates[0]);
                if (curr_dist < dist) {
                        dist = curr_dist;
                        closest = locations.landmarks[i].properties.Location_Name;
                        clat = locations.landmarks[i].geometry.coordinates[1];
                        clong = locations.landmarks[i].geometry.coordinates[0];
                }
        }

        // Draw polyline from closest landmark to me
        var distCoordinates = [
                {lat: clat, lng: clong},
                {lat: myLat, lng: myLong}
        ];
        
        var toLandmark = new google.maps.Polyline({
                path: distCoordinates,
                strokeColor: '#000000',
                strokeOpacity: 1.0,
                strokeWeight: 2
        });

        toLandmark.setMap(map);

        // Self Marker
        selfmarker = new google.maps.Marker({
                position: myPos,
                icon: selfimage,
                initcontent: myLogin,
                content: "Closest Landmark: " + closest + "<br \>" + "Distance Away: " + dist + " miles"
        });
        
        selfmarker.setMap(map);
        infowindow.setContent(selfmarker.initcontent);
        infowindow.open(map, selfmarker);

        google.maps.event.addListener(selfmarker, 'click', function() {
                infowindow.setContent(this.content);
                infowindow.open(map, selfmarker);
        });

        // Classmates Marker
        for (i = 0; i < locations.people.length; i++) {
                var LatLng = new google.maps.LatLng(locations.people[i].lat, locations.people[i].lng);
                var id = locations.people[i].login;
                var dist = haversine(locations.people[i].lat, locations.people[i].lng);

                peoplemarker = new google.maps.Marker({
                        position: LatLng,
                        icon: peopleimage,
                        content: "Login: " + id + "<br \>" + "Distance Away: " + dist + " miles"
                });

                if (locations.people[i].login != myLogin) {
                        peoplemarker.setMap(map);
                } 

                google.maps.event.addListener(peoplemarker, 'click', (function(peoplemarker, i) {
                        return function() {
                                infowindow.setContent(this.content);
                                infowindow.open(map, peoplemarker);
                        }
                })(peoplemarker, i));
        }

        // Landmarks Marker
        for (i = 0; i < locations.landmarks.length; i++) {
                var LatLng = new google.maps.LatLng(locations.landmarks[i].geometry.coordinates[1], 
                                                    locations.landmarks[i].geometry.coordinates[0]);
                landmarkmarker = new google.maps.Marker({
                        position: LatLng,
                        icon: landmarkimage,
                        content: locations.landmarks[i].properties.Details
                });

                landmarkmarker.setMap(map); 
                google.maps.event.addListener(landmarkmarker, 'click', (function(landmarkmarker, i) {
                        return function() {
                                infowindow.setContent(this.content);
                                infowindow.open(map, landmarkmarker);
                        }
                })(landmarkmarker, i));
        }
}

function haversine(lat, lng) {
  
        function toRad(x) {
                return x * Math.PI / 180;
        }

        var lon1 = lng;
        var lat1 = lat;
        var lon2 = myLong;
        var lat2 = myLat;

        var R = 6371; // km

        var x1 = lat2 - lat1;
        var dLat = toRad(x1);
        var x2 = lon2 - lon1;
        var dLon = toRad(x2)
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var dist = R * c;

        dist /= 1.60934;
        dist = dist.toFixed(2);

        return dist;
}

