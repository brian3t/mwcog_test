function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function showRidematch() {

    window.localStorage.setItem("startAddress", $("#startAddress option:selected").text());
    window.localStorage.setItem("endAddress", $("#endAddress option:selected").text());
    window.localStorage.setItem("startAddressIndex", $("#startAddress option:selected").val());
    window.localStorage.setItem("endAddressIndex", $("#endAddress option:selected").val());
    window.localStorage.setItem("startRadius", $("#startRadius option:selected").text());
    window.localStorage.setItem("endRadius", $("#endRadius option:selected").text());

    //jQuery.mobile.navigate('/rideshare.html');
    setTimeout(function () {
        window.location.href = "rideshare.html";
    }, 50);
    // window.location="/rideshare.html";
}

function showParkAndRide() {

    window.localStorage.setItem("startAddress", $("#startAddress option:selected").text());
    window.localStorage.setItem("endAddress", $("#endAddress option:selected").text());
    window.localStorage.setItem("startAddressIndex", $("#startAddress option:selected").val());
    window.localStorage.setItem("endAddressIndex", $("#endAddress option:selected").val());


    //jQuery.mobile.navigate('/park_and_ride.html');
    setTimeout(function () {
        window.location.href = "park_and_ride.html";
    }, 50);

}

function goto_commute_log() {
    //jQuery.mobile.navigate('/commute_log_calendar.html');
    setTimeout(function () {
        window.location.href = "commute_log_calendar.html";
    }, 50);
}

function start_flextimetrip() {
    if (isInWeb) {
        return goto_start_flextime_trip();
    }
    if (typeof backgroundGeolocation !== "object" || !backgroundGeolocation.hasOwnProperty('isLocationEnabled')) return;
    backgroundGeolocation.isLocationEnabled(
        function (result) {
            console.log(`isLocationEnabled result: ` + result);
            if (!result) {
                app_alert('Please go to Settings and allow Commuter Connections to access geolocation', () => {
                }, '', 'OK');
            } else {
                goto_start_flextime_trip();
            }
        },
        function (error) {
            console.log(`Error finding bg geo is enabled`);
        }
    );
}

function saveCommuterProfile() {
    var idCommuter = window.localStorage.getItem("idCommuter");
    var userName = window.localStorage.getItem("userName");
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    var startHour = startTime.split(":")[0];
    var startMin = startTime.split(":")[1];
    var endHour = endTime.split(":")[0];
    var endMin = endTime.split(":")[1];
    var flexibility = $("#flexibility").val();
    var startAmPm = "AM";
    var endAmPm = "AM";
    if (startHour > 12) {
        startHour = startHour - 12;
        startAmPm = "PM";
    }
    if (endHour > 12) {
        endHour = endHour - 12;
        endAmPm = "PM";
    }

    window.localStorage.setItem("startingTime", startHour + ":" + startMin + " " + startAmPm);
    window.localStorage.setItem("endingTime", endHour + ":" + endMin + " " + endAmPm);
    window.localStorage.setItem("arriveAfter", flexibility);

//                window.localStorage.setItem("endingTime", $("#startAddress option:selected").text());


    $.ajax({
        url: baseUrl + 'json?action=editworkschedule&idCommuter=' + idCommuter + '&userName=' + userName + '&fromHRS=' + startHour + '&fromMNS=' + startMin +
            '&fromAMPM=' + startAmPm + '&toHRS=' + endHour + '&toMNS=' + endMin + '&toAMPM=' + endAmPm + '&arriveBefore=' + flexibility + '&arriveAfter=' +
            flexibility + '&leaveBefore=' + flexibility + '&leaveAfter=' + flexibility,
        type: 'GET',
        success: function (data) {
        },
        error: function (data) {

        },
        complete: function (data) {
            $.mobile.navigate('');
        }
    });
}

function hideWelcomeMsg() {
    $('#welcomeMsg').remove();
}

function show_welcome_msg() {
    var popup_active = $('.ui-popup-active>[data-role="popup"]');
    if (popup_active.length > 0) {
        popup_active.one('popupafterclose', function () {
            $('#welcomeMsg').popup('open', {transition: 'pop'});
        });
        popup_active.popup('close', {transition: 'pop'});
    } else {
        $('#welcomeMsg').popup('open', {transition: 'pop'});
    }
}

function toggle_panel_options() {
    "use strict";
    $('#popup_menu').popup('close', {transition: 'pop'});
    $("#popup_menu").one("popupafterclose", function (event, ui) {
        $('#panel_options').popup('open', {transition: 'pop'});
    });
}

function toggle_auto_commute_log() {
    "use strict";
    $('#popup_menu').popup('close', {transition: 'pop'});
    $("#popup_menu").one("popupafterclose", function (event, ui) {
        $('#auto_commute_log_popup').popup('open', {transition: 'pop'});
    });
}

$(document).ready(function () {
    //start polling for current_address
    window.navigator.geolocation.getCurrentPosition(() => {
        console.log(`Success. Starting heartbeat..`);
        start_heartbeat();
    }, () => {
        console.log(`Error. Starting heartbeat..`);
        start_heartbeat();
    }, GEOLOCATION_OPTIONS);//ask for permission
    /*if (heartbeat.interval === -1) {
        console.log(`Seems like asking for permission didn't work..`);
        start_heartbeat();
    }*/

    var addressArray = JSON.parse(window.localStorage.getItem("addresses"));

    window.localStorage.setItem("startingTime", "9:00 AM");
    window.localStorage.setItem("endingTime", "5:00 PM");
    $.each(addressArray, function (a, b) {
        b.addrStreet1 = toTitleCase(b.addrStreet1.toLowerCase());
        b.addrCity = toTitleCase(b.addrCity.toLowerCase());
        b.addrState = toTitleCase(b.addrState.toLowerCase());
        b.addrZip = toTitleCase(b.addrZip.toLowerCase());
        var option1 = $('<option />');
        if (b.addrType == "HOME") {
            option1.attr('value', a).text(b.addrStreet1 + ' ' + b.addrCity + ' ' + b.addrState + ", " + b.addrZip).attr("selected", "selected");
        } else {
            option1.attr('value', a).text(b.addrStreet1 + ' ' + b.addrCity + ' ' + b.addrState + ", " + b.addrZip);
        }
        var option2 = $('<option />');
        if (b.addrType == "WORK") {
            option2.attr('value', a).text(b.addrStreet1 + ' ' + b.addrCity + ' ' + b.addrState + ", " + b.addrZip).attr("selected", "selected");
        } else {
            option2.attr('value', a).text(b.addrStreet1 + ' ' + b.addrCity + ' ' + b.addrState + ", " + b.addrZip);
        }

        $('#startAddress').append(option1);
        $('#endAddress').append(option2);
    });

    setTimeout(() => {
        $('#startAddress').selectmenu('refresh');
        $('#endAddress').selectmenu('refresh');
    }, 2000);

    var enrolled = JSON.parse(window.localStorage.getItem("enrolled"));

    $(function () {
        if (enrolled) {
            $("#panel_welcomeuser").popup({transition: 'pop', history: false});
            $("#panel_welcomeuser").popup('open', {transition: 'pop', history: false, positionTo: 'window'});
            // $('#welcomeMsg').popup('open', {transition: 'pop',history:false, positionTo: 'window'});
        }

        if (Number(window.localStorage.getItem("justLoggedIn")) == 1) {
            window.localStorage.setItem("justLoggedIn", 0);
        } else {
            // $('#welcomeMsg').css('display', 'none');
        }

        var mins = ['0', '5', '15', '30', '60', '90', '120'],
            mins_options = '';

        for (var i = 0; i < mins.length; i++) {
            mins_options += '<option value="' + mins[i] + '"' + ((window.localStorage.getItem("arriveAfter") == mins[i]) ? ' selected="selected"' : '') + '>' + mins[i] + ' Minutes</option>';
        }

        setTimeout(() => $('#flexibility').html(mins_options).selectmenu("refresh"), 1500);
        if (User.hasOwnProperty('commuter_data') && User.commuter_data.hasOwnProperty('firstName')) {
            $('#first_name').html(_.upperFirst(User.commuter_data.firstName.toLowerCase()));
        }

    });

//ttodob debugging
    if (IS_DEBUG) {
        /*setTimeout(function () {
            $('#commute_log_calendar').trigger('click');
            // $('#findRidematch').trigger('click');
        }, 200);*/
    }

    $('.popup_dismiss').click(function (e) {
        e.preventDefault();
        $('.ui-popup-active>[data-role="popup"]').popup('close', {transition: 'pop', history: false});
    });

    var latlng = window.localStorage.getItem('latlng');
    if (is_nonempty_str(latlng)) {
        try {
            latlng = JSON.parse(latlng);
            console.log('latlng: ');
            console.info(latlng);
        } catch (e) {
            console.error(e);
        }
    }
    window.auto_commute_log_sw = new Switchery(document.querySelector('#auto_commute_log_sw'));
    $('#auto_commute_log_sw').on('change', function () {
        console.log(`checked: ` + window.auto_commute_log_sw.isChecked());
    });
    $('#save_autocomlog_setting_btn').on('click', function (e) {
        // console.log(`checked: ` + window.auto_commute_log_sw.isChecked());
    });
});

window.handleOpenURL = function (url) {
    /*setTimeout(function() {
        alert("this URL:"+url);
    }, 500);*/

    console.log("App launched via custom URL. Url: ");
    console.log(url);
    var latlng = url.replace('commuterconnections://', '');//{"pickup_lat":"32.74776940000000","pickup_lng":"-117.06786960000000","dropoff_lat":"32.75160600000000",
    // "dropoff_lng":"-117.10714100000000","pickup_full_address":"5995 Dandridge Ln, San Diego, CA 92115, USA","dropoff_full_address":"4102 41st St, San Diego, CA 92105, USA"}
    latlng = decodeURI(decodeURI(decodeURI(latlng)));
    // console.warn(latlng);
    try {
        JSON.parse(latlng);
    } catch (e) {
        console.error(e);
        return false;
    }
    if (latlng.length < 2) {
        return false;//at least {}
    }
    if (window.location.href.indexOf('search.html') !== -1) {
        //at search page
        window.location.href = 'rideshare.html';//ttodob should login here too
        return;
    }
    //else, we are at index page
    //now try logging in
    var username_saved = window.localStorage.getItem("username");
    var saved_hashed_password = window.localStorage.getItem("hashedPassword");
    var saved_password = window.localStorage.getItem("password");
    if (is_nonempty_str(username_saved) && (is_nonempty_str(saved_password) || is_nonempty_str(saved_hashed_password))) {
        window.localStorage.setItem('latlng', latlng);
        $("#loginForm").trigger('submit', ['rideshare.html']);
    }

};
