/* Script that deals with the map displayed on the localParks.html
*  @author Sam Royal
*  COSC212 Assignment 1
*/

var map = (function () {
    var pub = {};

    /* Displays a map with the various markers retrieved from
    *  the POI.geojson file. Also allows the user to display/hide
    *  some of the local parks in the area or local walking tracks.
    */
    function showMap() {
        var parksarray = L.layerGroup();
        var walksarray = L.layerGroup();
        map = L.map('map').setView([-45.862857, 170.51143], 15);
        $.getJSON("POI.geojson", function (data) {
            L.geoJson(data, {
                "pointToLayer": function (feature, latlng) {
                    return L.circleMarker(latlng, {"fillcolor": feature.properties.color, "color": "#000"});
                },
                "onEachFeature": function (feature, featureLayer) {
                    featureLayer.bindPopup(feature.properties.name);
                    if (feature.properties.type === "park") {
                        parksarray.addLayer(featureLayer);
                    }
                    if (feature.properties.type === "walking track") {
                        walksarray.addLayer(featureLayer);
                    }
                }

            }).addTo(map);
        });
        var overlayMaps = {
            "Parks": parksarray,
            "Walking Tracks": walksarray
        };
        L.control.layers(null, overlayMaps).addTo(map); // controls the show/hide of the walking/park markers.

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: 'Map data &copy; ' +
                    '<a href="http://www.openstreetmap.org/copyright">' +
                    'OpenStreetMap contributors</a> CC-BY-SA'
            }).addTo(map);

    }


    pub.setup = function () {
        showMap();
    };
        return pub;


}());

    if (document.getElementById) {
        if (document.getElementById) {
            if (window.addEventListener) {
                window.addEventListener('load', map.setup);
            } else if (window.attachEvent) {
                window.attachEvent('onload', map.setup);
            } else {
                alert("Could not attach 'Map.setup' to the 'window.onload' event");
            }
        }
    }





