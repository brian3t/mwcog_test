//todob IMPORTANT: override use MWCOG here
var USE_MWCOG = false;
baseUrl = 'https://tdm.commuterconnections.org/mwcog/';
ie511_url = 'https://tdm.commuterconnections.org/mwcog/integrate';
// ie511_url = 'https://www.ie511.org/iecommuter/integrate';
//ie511_url = 'http://mwcog.mediabeef.com/mwcog/integrate';

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
var is_latlng_ridematch = false;

if (IS_DEBUG) {
    is_latlng_ridematch = 1;
    window.localStorage.setItem('latlng', '{"pickup_lat":"38.892949","pickup_lng":"-77.018179","dropoff_lat":"38.899949","dropoff_lng":"-77.011179","pickup_full_address":"5995 Dandridge Ln, San Diego, CA 92115, USA","dropoff_full_address":"4501 Norwood St, San Diego, CA 92115, USA"}');
}

function pull_latlng(){
    var latlng_obj = window.localStorage.getItem('latlng');
    console.info('Latlng from localstorage: ' + latlng_obj);
    try {
        latlng_obj = JSON.parse(latlng_obj);
    }
    catch (e) {
        console.error('Cant pull latlng object');
        console.error(e);
    }
    return latlng_obj;
}

function init() {
	try {
		Keyboard.hide();
	} catch (e) {
		console.info(e);
	}

    adjustWindowheight($('.fullscreenelement'));
    var ridematch_url = baseUrl + '/json?action=ridematch&idCommuter=' + idCommuter + '&userName=' + userName + "&startAddressIndex=" + startAddressIndex + '&endAddressIndex=' + endAddressIndex + params;
    var latlng = pull_latlng();
    is_latlng_ridematch = (_.isObject(latlng) && latlng.hasOwnProperty('pickup_lat') && latlng.hasOwnProperty('dropoff_lat'));
    if (is_latlng_ridematch) {
        ridematch_url = ie511_url;
        console.info('Ridematch latlng from deeplink');
        ridematch_params = {
            action: 'findRidematchesRadiusLatLng',
            start_lat: latlng.pickup_lng,//todob here API is wrong
            start_lng: latlng.pickup_lat,
            start_radius: 5,
            end_lat: latlng.dropoff_lng,
            end_lng: latlng.dropoff_lat,
            end_radius: 3,
            carpool: 'RCC_1_5',
            vanpool: 'RCC_2_4',
            work_start_time: '0900',
            work_end_time: '1700',
            arrive_before_time: 90,
            arrive_after_time: 90,
            leave_before_time: 90,
            leave_after_time: 90
        };
    } else {
        ridematch_params = {};
    }
    $.get(ridematch_url, ridematch_params, function (res) {
        if (is_latlng_ridematch) {
            try {
                if (res.is_valid === true) {
                    matches = res.ridematches;
                    window.localStorage.removeItem('latlng');
                } else {
                    console.error('ridematch latlng return bad is_valid');
                    return;
                }
            }
            catch (e) {
                console.error(e);
                return;
            }
        } else {
            matches = res;
        }
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
                var startTime = match.work_start_time;
                var endTime = match.work_end_time;
                var smokingPref = 'None';

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


                var show_commuterName = 'Anonymous';
                var email = match.email;
                var commuterName = match.commuter_name;
                var commuterId = match.id_commuter;
                var sharesNothing = true;

                if (match.share_hphone === "Y" && text_hphone.length > 0) {
                    show_hphone = "Home: " + text_hphone + "<br />";
                    link_hphone = "Home: <a href='tel:" + text_hphone + "'>" + text_hphone + "</a><br />";
                    sharesNothing = false;
                }
                if (match.share_wphone === "Y" && text_wphone.length > 0) {
                    show_wphone = "Work: " + text_wphone + "<br />";
                    link_wphone = "Work: <a href='tel:" + text_wphone + "'>" + text_wphone + "</a><br />";
                    matchlistURL = "tel:" + text_wphone;
                    sharesNothing = false;
                }
                if (match.share_cphone === "Y" && text_cphone.length > 0) {
                    show_cphone = "Cell: " + text_cphone + "<br />";
                    link_cphone = "Cell: <a href='tel:" + text_cphone + "'>" + text_cphone + "</a><br />";
                    sharesNothing = false;
                }

                if (match.share_email === "Y" && text_email.length > 0) {
                    show_email = "Email: " + text_email + "<br />";
                    link_email = "Email: <a href='mailto:" + text_email + "'>" + text_email + "</a><br />";
                    sharesNothing = false;
                }
                if (match.share_name === "Y") {
                    show_commuterName = commuterName;
                }


                if (match.smoke_pref === "SMK_2_1") {
                    smokingPref = "smoker";
                }
                else if (match.smoke_pref === "SMK_2_3") {
                    smokingPref = "I dont care";
                }
                else {
                    smokingPref = "non-smoker";
                }

                var firstLine = '<li><a class="list_item_contact" data-index="' + i + '" >';
                var lastLine = '</p></a></li>';
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
                var point1 = new google.maps.LatLng(match.addr_lat, match.addr_lng);//todob waiting for latlng to return from API (in case of ridematch latlng)
                var startMarker = createStartMarker(point1, matchNum);
                displayInfoWindow(startMarker, matchNum, '<div class="info_window"><strong>' + show_commuterName + '</strong><br>Work Hours:' + startTime + ' - ' + endTime + '<br>' + ((sharesNothing) ? 'Call Commuter Connections to obtain this commuter\'s contact information at <a href="tel:800-745-7433">800-745-7433</a>' : link_email + link_cphone + link_hphone + link_wphone));
            }
        }


        $("#list ul").listview("refresh");
        $("#footer").css({position: 'relative'});

        //determine what contact method to use
        $('a.list_item_contact').on('click touch', function (e) {
            var $e = $(e.target), contact_link = '', action = '', $ul = $('#contact_options #contact_details');
            $e = $($e.closest('a'));
            var index = $e.data('index');
            if (!$.isNumeric(index)) {
                return;
            }
            var match = matches[index];
            $('#contact_options #match_firstname').html(match.firstName);
            var contact_options = {
                has_hphone: {
                    is_available: (match.shareHPhone === "Y" && match.hphone.length > 2),
                    type: 'phone',
                    type_detail: 'Home Phone',
                    detail: match.hphone
                },
                has_wphone: {
                    is_available: (match.shareWPhone === "Y" && match.wphone.length > 2),
                    type: 'phone',
                    type_detail: 'Work Phone',
                    detail: match.wphone
                },
                has_cphone: {
                    is_available: (match.shareCPhone === "Y" && match.cphone.length > 2),
                    type: 'phone',
                    type_detail: 'Cell Phone',
                    detail: match.cphone
                },
                has_email: {is_available: (match.shareEmail === "Y" && match.email.length > 2), type: 'email', type_detail: 'Email', detail: match.email}
            };
            contact_options = _.filter(contact_options, function (v) {
                return v.is_available;
            });
            if (_.size(contact_options) === 0) {
                document.location.href = 'tel:8007457433';
                return;
            }
            if (_.size(contact_options) === 1) {
                var contact = contact_options[Object.keys(contact_options)[0]];//get first object
                if (contact.type == 'email') {
                    document.location.href = 'mailto:' + contact.detail;
                }
                if (contact.type == 'phone') {
                    document.location.href = 'tel:' + contact.detail;
                }
                return;
            }
            $ul.listview('destroy');
            $ul.empty();
            $.each(contact_options, function (i, v) {
                if (!v.is_available) {
                    return;
                }
                if (v.type == 'phone') {
                    contact_link = 'CALL ' + v.type_detail;
                    //contact_link = 'CALL ' + v.type_detail + ' ' + v.detail;
                    action = 'tel:' + v.detail;
                } else {
                    contact_link = 'SEND EMAIL';
                    //contact_link = 'EMAIL ' + v.detail;
                    action = 'mailto:' + v.detail;
                }
                $ul.append($('<li>').append('<a href="' + action + '" >' + contact_link + '</a>'));//<li><a href="tel:5593474767"> Call home phone 559</a></li>
            });
            $ul.listview();
            $ul.listview('refresh');
            $('#contact_options').popup();
            $('#contact_options').popup('open', {transition: 'pop', history: false, positionTo: "window"});
        });
        hideSpinner();
    }, 'json');

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
    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    directionsService = new google.maps.DirectionsService();
    infowindow = new google.maps.InfoWindow({size: new google.maps.Size(100, 100)});
    initialize();
}


function createStartMarker(point, index) {
    var marker;
    var i = index + 1;
    var imageUrl = "img/marker_circle_light_blue.svg";
    marker = new google.maps.Marker({
        position: point,
        map: map,
        draggable: false,
        icon: imageUrl,
        label: {text: String(i), color: 'white', fontWeight: 'bold'}
    });
    return marker;
}

function createDestnMarker(point, index) {
    var marker;
    var i = index + 1;
    var imageUrl = "img/marker_circle_blue.svg";
    marker = new google.maps.Marker({
        position: point,
        map: map,
        draggable: false,
        icon: imageUrl,
        label: {text: String(i), color: 'white', fontWeight: 'bold'}
    });
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
	//deeplink 
	var latlng = pull_latlng();
	if (_.isObject(latlng) && latlng.hasOwnProperty('pickup_lat')) {
		start = new google.maps.LatLng(latlng.pickup_lat, latlng.pickup_lng);
		end = new google.maps.LatLng(latlng.dropoff_lat, latlng.dropoff_lng);
		rs_draw_directions(start, end);
	}

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
            //deeplink
            var latlng = pull_latlng();
            if (_.isObject(latlng) && latlng.hasOwnProperty('pickup_lat')) {
                start = new google.maps.LatLng(latlng.pickup_lat, latlng.pickup_lng);
                end = new google.maps.LatLng(latlng.dropoff_lat, latlng.dropoff_lng);
            }

            map.setCenter(end);
            map.setZoom(12);

            rs_draw_directions(start, end);

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
		
function rs_draw_directions(start, end){
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
                        labelContent: 'hey',
                        icon: 'img/marker_ab_green.svg',
                        label: {text: 'A', color: 'white', 'fontWeight': 'bold'}
                    });
                    map.dropoff_marker = new google.maps.Marker({
                        map: map,
                        position: end,
                        labelContent: 'hey',
                        icon: 'img/marker_ab_red.svg',
                        label: {text: 'B', color: 'white', 'fontWeight': 'bold'}
                    });

                }
            });
}