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

    setTimeout(function(){window.location.href="/rideshare.html";}, 500);
    // window.location="/rideshare.html";
}

function showParkAndRide() {

    window.localStorage.setItem("startAddress", $("#startAddress option:selected").text());
    window.localStorage.setItem("endAddress", $("#endAddress option:selected").text());
    window.localStorage.setItem("startAddressIndex", $("#startAddress option:selected").val());
    window.localStorage.setItem("endAddressIndex", $("#endAddress option:selected").val());


    jQuery.mobile.navigate('park_and_ride.html');
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
        url: baseUrl + 'json?action=editworkschedule&idCommuter=' + idCommuter + '&userName=' + userName + '&fromHRS=' + startHour + '&fromMNS=' + startMin
        + '&fromAMPM=' + startAmPm + '&toHRS=' + endHour + '&toMNS=' + endMin + '&toAMPM=' + endAmPm + '&arriveBefore=' + flexibility + '&arriveAfter=' + flexibility + '&leaveBefore=' + flexibility + '&leaveAfter=' + flexibility,
        type: 'GET',
        success: function (data) {
        },
        error: function (data) {


        }
    });
}

function hideWelcomeMsg() {
    $('#welcomeMsg').remove();
}
function toggle_panel_options() {
    "use strict";
    $('#popup_menu').popup('close');
    $("#popup_menu").one("popupafterclose", function (event, ui) {
        $('#panel_options').popup('open');
    });

}

$(document).ready(function () {

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

    $('#startAddress').selectmenu('refresh');
    $('#endAddress').selectmenu('refresh');

    var enrolled = JSON.parse(window.localStorage.getItem("enrolled"));

    $(function () {
        if (enrolled) {
            $("#panel_welcomeuser").popup();$("#panel_welcomeuser").popup('open',{positionTo: 'window'});
            $('#welcomeMsg').popup('open', {positionTo: 'window'});
        }

        if (Number(window.localStorage.getItem("justLoggedIn")) == 1) {
            window.localStorage.setItem("justLoggedIn", 0);
        } else {
            $('#welcomeMsg').css('display', 'none');
        }

        var mins = ['0', '5', '15', '30', '60', '90', '120'],
            mins_options = '';

        for (var i = 0; i < mins.length; i++) {
            mins_options += '<option value="' + mins[i] + '"' + ((window.localStorage.getItem("arriveAfter") == mins[i]) ? ' selected="selected"' : '') + '>' + mins[i] + ' Minutes</option>';
        }

        $('#flexibility').html(mins_options).selectmenu("refresh");
        if (User.hasOwnProperty('commuter_data') && User.commuter_data.hasOwnProperty('firstName')) {
            $('#first_name').html(_.upperFirst(User.commuter_data.firstName.toLowerCase()));
        }

    });

//todob debugging
    if (IS_DEBUG) {
        setTimeout(function () {
            $('#commute_log_calendar').trigger('click');
        }, 200);
    }


});