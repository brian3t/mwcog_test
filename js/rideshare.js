//todob IMPORTANT: override use MWCOG here
var USE_MWCOG3 = false;
baseUrl = 'https://tdm.commuterconnections.org/mwcog/';


var matches;

var startAddress = window.localStorage.getItem('startAddress');
var endAddress = window.localStorage.getItem('endAddress');
var startAddressIndex = window.localStorage.getItem('startAddressIndex');
var endAddressIndex = window.localStorage.getItem('endAddressIndex');
var idCommuter = window.localStorage.getItem('idCommuter');
var userName = window.localStorage.getItem('userName');
var startingTime = window.localStorage.getItem("startingTime");
var endingTime = window.localStorage.getItem("endingTime");
var flexibility = window.localStorage.getItem("arriveAfter");
var startRadius = window.localStorage.getItem("startRadius");
var endRadius = window.localStorage.getItem("endRadius");

var params = "&workStartTime=" + startingTime + "&workEndTime=" + endingTime + "&flexibility=" + flexibility + "&endRadius=" + endRadius + "&startRadius=" + startRadius;


function init() {

    adjustWindowheight($('.fullscreenelement'));
    $.get(baseUrl + '/json?action=ridematch&idCommuter=' + idCommuter + '&userName=' + userName + "&startAddressIndex=" + startAddressIndex + '&endAddressIndex=' + endAddressIndex + params, function (res) {

        matches = res;
        if (matches === null || matches.length === 0) {
            var row = "<li>No Results Found</li>";
            $("#list ul").append(row);
        }
        else {
            for (var i = 0; i < matches.length; i++) {
                var match = matches[i];
                /*
                 *   I prefer to ride with
                 *   SMK_2_1 smoker
                 *   SMK_2_2 non smoker
                 *   SMK_2_3 dont care
                 */
                var startTime = match.fromHRS + ":" + match.fromMNS + match.fromAMPM;
                var endTime = match.toHRS + ":" + match.toMNS + match.toAMPM;
                var smokingPref = "None";

                var text_hphone = (match.hphone == "--" ? "" : match.hphone);
                var text_wphone = (match.wphone == "--" ? "" : match.wphone);
                var text_cphone = (match.cphone == "--" ? "" : match.cphone);
                var text_email = (match.email == "--" ? "" : match.email);

                var show_hphone = "";
                var show_wphone = "";
                var show_cphone = "";
                var show_email = "";
                var link_hphone = "";
                var link_wphone = "";
                var link_cphone = "";
                var link_email = "";


                var show_commuterName = "Anonymous";
                var email = match.email;
                var commuterName = match.commuterName;
                var commuterId = match.idCommuter;
                var matchlistURL = "tel:800-745-7433";
                var sharesNothing = true;


                if (match.shareHPhone === "Y" && text_hphone.length > 0) {
                    show_hphone = "Home: " + text_hphone + "<br />";
                    link_hphone = "Home: <a href='tel:" + text_hphone + "'>" + text_hphone + "</a><br />";
                    matchlistURL = "tel:" + text_hphone;
                    sharesNothing = false;
                }
                if (match.shareWPhone === "Y" && text_wphone.length > 0) {
                    show_wphone = "Work: " + text_wphone + "<br />";
                    link_wphone = "Work: <a href='tel:" + text_wphone + "'>" + text_wphone + "</a><br />";
                    matchlistURL = "tel:" + text_wphone;
                    sharesNothing = false;
                }
                if (match.shareCPhone === "Y" && text_cphone.length > 0) {
                    show_cphone = "Cell: " + text_cphone + "<br />";
                    link_cphone = "Cell: <a href='tel:" + text_cphone + "'>" + text_cphone + "</a><br />";
                    matchlistURL = "tel:" + text_cphone;
                    sharesNothing = false;
                }

                if (match.shareEmail === "Y" && text_email.length > 0) {
                    show_email = "Email: " + text_email + "<br />";
                    link_email = "Email: <a href='mailto:" + text_email + "'>" + text_email + "</a><br />";
                    matchlistURL = "mailto:" + text_email + "?subject=I found you on Commuter Connections";
                    sharesNothing = false;
                }
                if (match.shareName === "Y") {
                    show_commuterName = commuterName;
                }


                if (match.smokePref === "SMK_2_1") {
                    smokingPref = "smoker";
                }
                else if (match.smokePref === "SMK_2_3") {
                    smokingPref = "I dont care";
                }
                else {
                    smokingPref = "non-smoker";
                }

                var firstLine = '<li><a href="' + matchlistURL + '">';
                var lastLine = '</p></a></li>';
                /*if(email ==="")
                 {
                 firstLine = '<li>';
                 lastLine = '</p></li>';
                 }*/
                var row = firstLine +
                    '<h3>' + ((show_commuterName == 'Anonymous') ? 'Commuter #' + commuterId : show_commuterName) + '</h3>' +
                    '<p id="no-ellipsis" style="font-size: .9em;">' +
                    //'Start: '+startAddress+'<br />' +
                    //'End: '+endAddress+'<br />'+
                    show_email + show_cphone + show_wphone + show_hphone;
                if (sharesNothing) row += 'Call Commuter Connections to obtain<br />this commuter\'s contact information<br />at 800-745-7433';
                /*
                 'Carpool pref: '+match.RCC_1+'<br />' +
                 'Vanpool pref: '+match.RCC_2+'<br />' +
                 'Flex time: '+match.arriveAfter+' minutes<br />' +
                 'Schedule: '+startTime+'-'+endTime+'<br />' +
                 'Days: Mon, Tue, Wed, Thu, Fri <br />' +
                 'Smoking pref: '+smokingPref;
                 */


                row += lastLine;

                $("#list ul").append(row);


                var matchNum = i;
                var point1 = new google.maps.LatLng(match.match[3], match.match[2]);
                var point2 = new google.maps.LatLng(match.match[6], match.match[5]);
                var startMarker = createStartMarker(point1, matchNum);
                var destnMarker = createDestnMarker(point2, matchNum);
                displayInfoWindow(startMarker, matchNum, '<div class="info_window"><strong>' + show_commuterName + '</strong><br>Work Hours:' + startTime + ' - ' + endTime + '<br>' + ((sharesNothing) ? 'Call Commuter Connections to obtain this commuter\'s contact information at <a href="tel:800-745-7433">800-745-7433</a>' : link_email + link_cphone + link_hphone + link_wphone));
                displayInfoWindow(destnMarker, matchNum, '<div class="info_window"><strong>' + show_commuterName + '</strong><br>Work Hours:' + startTime + ' - ' + endTime + '<br>' + ((sharesNothing) ? 'Call Commuter Connections to obtain this commuter\'s contact information at <a href="tel:800-745-7433">800-745-7433</a>' : link_email + link_cphone + link_hphone + link_wphone));


            }
        }


        $("#list ul").listview("refresh");
        $("#footer").css({position: 'relative'});

        hideSpinner();

    }, "json");
    $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBY-L-HhMKsNOeMDqH1kJZP7hS3G2SATWQ&callback=gmap_ready');
//
}
var trafficLayer = {};
var toggleState = 0;
var map;
var directionsDisplay = {}, directionsService = {}, info = {};
function gmap_ready() {
    trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers:true});
    directionsService = new google.maps.DirectionsService();
    infowindow = new google.maps.InfoWindow({size: new google.maps.Size(100, 100)});
    initialize();
}


function createStartMarker(point, index) {
    var marker;
    var i = index + 1;
    var imageUrl = "img/marker_circle_light_blue.svg";
    marker = new google.maps.Marker({position: point, map: map, draggable: false, icon: imageUrl, label: {text: String(i), color: 'white', fontWeight: 'bold'}});
    return marker;
}

function createDestnMarker(point, index) {
    var marker;
    var i = index + 1;
    var imageUrl = "img/marker_circle_blue.svg";
    marker = new google.maps.Marker({position: point, map: map, draggable: false, icon: imageUrl, label: {text: String(i), color: 'white', fontWeight: 'bold'}});
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
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(message);
        infowindow.open(map, marker);
    });
}


function initialize() {
    showSpinner();

    var lineOptions = {strokeColor: "#08088A", zIndex: google.maps.Marker.MAX_ZINDEX + 1};
    var renderOptions = {draggable: false, polylineOptions: lineOptions};
    directionsDisplay.setOptions(renderOptions);

    var mapOptions = {
        zoom: 11,
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
    google.maps.event.addListener(map, 'click', function () {
        infowindow.close();
    });


    var geocoder = new google.maps.Geocoder();
    var start = "";
    var end = "";

    // var addressArray  = JSON.parse(window.localStorage.getItem("addresses"));

    geocoder.geocode({'address': startAddress}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            start = results[0].geometry.location;
        } else {
            //alert("Geocode was not successful for the following reason: " + status);
        }
    });

    geocoder.geocode({'address': endAddress}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            end = results[0].geometry.location;
            map.setCenter(end);
            map.setZoom(12);

            directionsService.route({
                origin: start, destination: end,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            }, function (result, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    //uncomment if the client requests manual zoom control
                    //directionsDisplay.setOptions({ preserveViewport: true });
                    directionsDisplay.setDirections(result);
                    //draw route info here
                    $('#route_info').show();
                    $('#pickup input').val(startAddress);
                    $('#dropoff input').val(endAddress);
                    map.pickup_marker = new google.maps.Marker({
                        map: map,
                        position: start,
                        labelContent:'hey',
                        icon: 'img/marker_ab_green.svg',
                        label: {text:'A', color:'white', 'fontWeight': 'bold'}
                    });
                    map.dropoff_marker = new google.maps.Marker({
                        map: map,
                        position: end,
                        labelContent:'hey',
                        icon: 'img/marker_ab_red.svg',
                        label: {text:'B', color:'white', 'fontWeight': 'bold'}
                    });

                }
            });

        } else {
            //alert("Geocode was not successful for the following reason: " + status);
        }
    });

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

function resizeMap() {
    var $page = $(this),
        vSpace = $page.children('#page-navbar').outerHeight() + $page.children('#page-footer').outerHeight() + $page.children('#canvas').height();

    if (vSpace < $(window).height()) {
        var vDiff = $(window).height() - $page.children('#page-navbar').outerHeight() - $page.children('#page-footer').outerHeight();
        $page.children('#canvas').height(vDiff);
    }
}

$(document).bind('pageinit', function () {
    init();
});
$(document).bind('orientationchange', function () {
    adjustWindowheight($('.fullscreenelement')); //#editDiv is the id of the CONTENT part
});

adjustWindowheight = function (current_page_content) {
    //Check whether its WP7
    var isWp7 = (window.navigator.userAgent.indexOf("IEMobile/9.0") != -1);
    current_page_content.each(function () {
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
		
        