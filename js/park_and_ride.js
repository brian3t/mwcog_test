
var matches;

var startAddress = window.localStorage.getItem('startAddress');
var endAddress = window.localStorage.getItem('endAddress');
var startAddressIndex = window.localStorage.getItem('startAddressIndex');
var endAddressIndex = window.localStorage.getItem('endAddressIndex');
var idCommuter = window.localStorage.getItem('idCommuter');
var userName = window.localStorage.getItem('userName');

//

var trafficLayer = new google.maps.TrafficLayer();
trafficLayer.setMap(map);

var toggleState = 0;
var map;
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var infowindow = new google.maps.InfoWindow({size: new google.maps.Size(50, 50), fullscreenControl:false});


function createStartMarker(point, index) {
    var marker;
    var i = index + 1;
    var imageUrl = baseUrl + "includes/images/StartPoint" + i + ".png";
    marker = new google.maps.Marker({position: point, map: map, draggable: false, icon: imageUrl});
    return marker;
}

function createDestnMarker(point, index) {
    var marker;
    var i = index + 1;
    var imageUrl = baseUrl + "includes/images/DestinationPoint" + i + ".png";
    marker = new google.maps.Marker({position: point, map: map, draggable: false, icon: imageUrl});
    return marker;
}

function displayMarker(point, mrkImage) {

    var marker;
    var imageUrl = baseUrl + "includes/images/" + mrkImage;
    marker = new google.maps.Marker({position: point, map: map, draggable: false, icon: imageUrl});
    return marker;
}

function displayInfoWindow(marker, count, infoHtl) {
    count = count + 1;
    var message = infoHtl;
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(message);
        infowindow.open(map, marker);
    });
}

function initialize() {
    showSpinner();
    directionsDisplay = new google.maps.DirectionsRenderer();
    var lineOptions = {strokeColor: "#08088A", zIndex: google.maps.Marker.MAX_ZINDEX + 1};
    var renderOptions = {draggable: false, polylineOptions: lineOptions};
    directionsDisplay.setOptions(renderOptions);

    var mapOptions = {
        zoom: 12,
        zoomControl: true,
        panControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT,
            position: google.maps.ControlPosition.LEFT_TOP
        },
        center: new google.maps.LatLng(38.899960, -77.008975),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('canvas'), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("route"));
    google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
    });

    var geocoder = new google.maps.Geocoder();
    var start = "";
    var end = "";

    // var addressArray  = JSON.parse(window.localStorage.getItem("addresses"));

    geocoder.geocode({'address': startAddress}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            start = results[0].geometry.location;
        } else {
            //alert("Geocode was not successful for the following reason: " + status);
        }
    });

    geocoder.geocode({'address': endAddress}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            end = results[0].geometry.location;
            map.setCenter(end);

//                        directionsService.route({origin: start, destination: end,
//                            travelMode: google.maps.DirectionsTravelMode.DRIVING
//                        }, function(result, status) {
//                            if (status === google.maps.DirectionsStatus.OK) {
//                                directionsDisplay.setDirections(result);
//                            }
//                        });

        } else {
            //alert("Geocode was not successful for the following reason: " + status);
        }
    });




    var addresses = JSON.parse(window.localStorage.getItem("addresses"));




    for (var i = 0; i < addresses.length; i++)
    {
        var address = addresses[i];
        if (address.addrType === "PARK&RIDE")
        {

            //var landmarks = new google.maps.LatLng(39.283936,-76.619554);
            var geo = address.addrGeocodes.split(",");
            var landmarks = new google.maps.LatLng(geo[0],geo[1]);

            var displayIcon = displayMarker(landmarks, 'ParkAndRide.png');
            var addrInfo = address.addrType + " - " + address.addrName + "<br>" + address.addrStreet1 + "<br>" + address.addrCity + "  " + address.addrState;
            displayInfoWindow(displayIcon, 0, addrInfo);

            var liAddrInfo =  "<li>" + address.addrType + " - " + address.addrName + "<br>" + address.addrStreet1 + "<br>" + address.addrCity + "  " + address.addrState + "</li>";

            $("#list ul").append(liAddrInfo);


        }

    }

    $("#list ul").listview("refresh");
    hideSpinner();

}




function toggleTraffic() {
    if (toggleState === 0) {
        trafficLayer.setMap(null);
        toggleState = 1;
    } else {
        trafficLayer.setMap(map);
        toggleState = 0;
    }
}




//$(document).on("pageshow", "#ridematch", resizeMap);

function resizeMap()
{
    var $page = $(this),
        vSpace = $page.children('#page-navbar').outerHeight() + $page.children('#page-footer').outerHeight() + $page.children('#canvas').height();

    if (vSpace < $(window).height()) {
        var vDiff = $(window).height() - $page.children('#page-navbar').outerHeight() - $page.children('#page-footer').outerHeight();
        $page.children('#canvas').height(vDiff);
    }
}



$(document).bind('pageshow', function() {
    adjustWindowheight($('.fullscreenelement'));
});
$(document).bind('orientationchange', function() {
    adjustWindowheight($('.fullscreenelement')); //#editDiv is the id of the CONTENT part
});

adjustWindowheight = function(current_page_content) {
    //Check whether its WP7
    var isWp7 = (window.navigator.userAgent.indexOf("IEMobile/9.0") != -1);
    current_page_content.each(function() {
        var containerHeight = parseInt($(this).css('height'));
        var windowHeight = parseInt(window.innerHeight);
        var newHeight = windowHeight - 110;

        if (containerHeight + 110 < windowHeight) {
            if (isWp7) {
                //offset the page since WP7 wrongly reports page height
                $(this).css('height', newHeight + 30 + 'px');
            }
            else {
                $(this).css('height', newHeight + 'px');
            }
        }
        else {
            $(this).css('height', newHeight + 'px');
        }

    });
};

        