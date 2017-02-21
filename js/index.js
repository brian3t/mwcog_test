if (typeof navigator.notification !== 'object') {
    navigator.notification = {
        alert: function () {
        }
    }
}
var app = {
    // Application Constructor
    initialize: function () {
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        var remember = window.localStorage.getItem("rememberCheckbox");
        var username = window.localStorage.getItem("username");
        var hashedPassword = window.localStorage.getItem("hashedPassword");
        var hashed = false;
        if (remember === "true") {
            $("#remember").prop('checked', true);
            $("#username").val(username);
            hashed = true;
            $("#password").val(hashedPassword);
        }


        $("#loginForm").on("submit", function (e) {
            if (window.is_login_and_commute_log) {
                e.preventDefault();
                console.log('Login check only');
            }
            //disable the button so we can't resubmit while we wait
            $("#submitButton", this).attr("disabled", "disabled");
            var u = $("#username", this).val();
            var p = $("#password").val();
            var rememberMe = $("#remember").prop('checked');

            if (!rememberMe) {

                window.localStorage.setItem("hashedPassword", "");
                window.localStorage.setItem("rememberCheckbox", false);
                window.localStorage.setItem("username", "");
                $("#password").val("");
                hashed = false;
            }
            showSpinner();
            if (hashedPassword === p) {
                p = hashedPassword;
            }
            else {
                hashed = false;

            }
            if (IS_DEBUG) {
                // u = 'redgar942';
                u = 'fakehemrycc';//mwcog type 0
                // u = 'jitubats';//mwcog type 1
                // u = 'cpnowtest';//tdm type 2
                // u = 'SteveOsborn';//mwcog type 2
                p = 'changeme4';
                hashed = false;
            }


            if (u !== '' && p !== '') {

                $.get(baseUrl + "json?action=login&username=" + u + "&password=" + p + '&password_saved=' + hashed, function (res) {

                    if (res.statusCode === 1) {
                        var addresses = res.addresses;
                        window.localStorage.setItem("idCommuter", res.commuter);
                        window.localStorage.setItem("enrolled", res.enrolled);
                        window.localStorage.setItem("userName", u);
                        window.localStorage.setItem("addresses", JSON.stringify(addresses));
                        window.localStorage.setItem("commuterData", JSON.stringify(res.commuterData));
                        window.localStorage.setItem("arriveAfter", res.commuterData.arriveAfter);
                        window.localStorage.setItem("hashedPassword", res.hashedPassword);
                        if (rememberMe) {
                            window.localStorage.setItem("rememberCheckbox", true);
                            window.localStorage.setItem("username", u);
                        }

                        window.localStorage.setItem("justLoggedIn", 1);
                        if (!window.is_login_and_commute_log) {
                            window.location = "search.html";
                        } else {
                            window.location = 'commute_log_calendar.html';
                        }

                    } else {
                        hideSpinner();
                        $("#submitButton").removeAttr("disabled");
                        navigator.notification.alert(
                            'You have entered an invalid username and password, please try again', // message
                            null, // callback
                            'Invalid Login', // title
                            'Ok'                  // buttonName
                        );
                    }
                    hideSpinner();

                    $("#submitButton").removeAttr("disabled");
                }, "json").error(
                    function () {
                        hideSpinner();
                        $("#submitButton").removeAttr("disabled");

                        navigator.notification.alert(
                            'An error has occured, please try again.', // message
                            null, // callback
                            'Error', // title
                            'Ok'                  // buttonName
                        );
                    });

            }
            return false;
        });

        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');

        //console.log('Received Event: ' + id);
    }


};


window.is_login_and_commute_log = false;
function startCommuteLog() {
    //try logging in first
    window.is_login_and_commute_log = false;
    $('#loginForm').submit();
    // window.location = 'commute_log_calendar.html';
}


/*
 debugging
 */
$('document').ready(function () {

    if (IS_DEBUG) {
        // $('#username').val('SteveOsborn');
        $('#username').val('fakehemrycc');
        // $('#username').val('jitubats');
        // $('#username').val('cpnowtest');
        $("#password").val('changeme4');
        setTimeout(function () {
            startCommuteLog();
        }, 200);
    }
});