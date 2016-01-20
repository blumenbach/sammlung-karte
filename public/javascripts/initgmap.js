

function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(52.516667, 13.383333),
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    var markers = [];
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    $.getJSON('http://localhost:3000/javascripts/blumenbach.geojson', function(data) {
        console.log('JSON data received:', data);
        for (i = 0; i < data.features.length; i++) {
            var coords = data.features[i].geometry.coordinates;
            var latLng = new google.maps.LatLng(coords[1], coords[0]);
            var label = data.features[i].properties.title;
            marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: label
            });
            markers.push(marker);
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(marker.title);
                    infowindow.open(map, marker);
                };
            })(marker, i));
        }



    });
}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
        'callback=initialize';
    document.body.appendChild(script);
}

window.onload = loadScript;
