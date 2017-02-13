
function showRidematch() {

    window.localStorage.setItem("startAddress", $("#startAddress option:selected").text());
    window.localStorage.setItem("endAddress", $("#endAddress option:selected").text());
    window.localStorage.setItem("startAddressIndex", $("#startAddress option:selected").val());
    window.localStorage.setItem("endAddressIndex", $("#endAddress option:selected").val());
    window.localStorage.setItem("startRadius", $("#startRadius option:selected").text());
    window.localStorage.setItem("endRadius", $("#endRadius option:selected").text());

    window.location = "rideshare.html";
}

function showParkAndRide() {

    window.localStorage.setItem("startAddress", $("#startAddress option:selected").text());
    window.localStorage.setItem("endAddress", $("#endAddress option:selected").text());
    window.localStorage.setItem("startAddressIndex", $("#startAddress option:selected").val());
    window.localStorage.setItem("endAddressIndex", $("#endAddress option:selected").val());


    window.location = "park_and_ride.html";
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

//todob debugging
if (IS_DEBUG) {
    // setTimeout(function () {
    //     $('#commute_log_calendar').trigger('click');
    // }, 200);
}