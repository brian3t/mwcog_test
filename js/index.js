if (typeof navigator.notification !== 'object') {
    navigator.notification = {
        alert: function () {
        }
    };
}
var app = {
    count_bg_images: 0,
    cur_bg_image_index: 0,
    bg_loop_id: null,
    bg_loop: function () {
        app.cur_bg_image_index = (Math.ceil(Math.random() * (app.count_bg_images - 1)) + (app.cur_bg_image_index -1)) % app.count_bg_images + 1;
        $('#homepage_bg').prop('src', 'img/bg/' + app.cur_bg_image_index + '.jpg').fadeIn('medium');
    },
    start_bg_loop: function () {
        if (app.count_bg_images === 0) {
            return false;
        }
        app.cur_bg_image_index = Math.ceil(Math.random() * app.count_bg_images);
        $('#homepage_bg').prop('src', 'img/bg/' + app.cur_bg_image_index + '.jpg');

        this.bg_loop_id = setInterval(app.bg_loop, 5000);
    },
    stop_bg_loop: function () {
        window.clearTimeout(app.bg_loop_id);
    },
    // Application Constructor
    initialize: function () {
        var remember_sw = {};
        var remember = window.localStorage.getItem("rememberCheckbox");
        var username = window.localStorage.getItem("username");
        var hashedPassword = window.localStorage.getItem("hashedPassword");
        var hashed = false;
        var $img_lazy_loader = $('#lazy_loader');
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        if (remember === "true") {
            $("#remember").prop('checked', true);
            $("#username").val(username);
            hashed = true;
            $("#password").val(hashedPassword);
        }
        remember_sw = new Switchery(document.querySelector('.js-switch'));

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
                u = 'redgar942';//tdm only, type 0
                u = 'sfinafroc246';//tdm only, type ??
                // u = 'fakehemrycc';//mwcog type 0
                // u = 'jitubats';//mwcog type 1
                // u = 'cpnowtest';//tdm type 2
                // u = 'SteveOsborn';//mwcog type 2
                p = 'changeme4';
                hashed = false;
            }


            if (u !== '' && p !== '') {

                $.get(baseUrl + "json?action=login&username=" + u + "&password=" + p + '&password_saved=' + hashed, function (res) {
                    var passwordToSave = '';
                    if (res.statusCode === 1) {
                        // fix for saving wrong hashed pw
                        if (hashed) {
                            passwordToSave = p;
                        } else {
                            passwordToSave = res.hashedPassword;
                        }
                        

                        var addresses = res.addresses;
                        window.localStorage.setItem("idCommuter", res.commuter);
                        window.localStorage.setItem("enrolled", res.enrolled);
                        window.localStorage.setItem("userName", u);
                        window.localStorage.setItem("addresses", JSON.stringify(addresses));
                        window.localStorage.setItem("commuterData", JSON.stringify(res.commuterData));
                        window.localStorage.setItem("arriveAfter", res.commuterData.arriveAfter);
                        window.localStorage.setItem("hashedPassword", passwordToSave);
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
        //get background images ready
        //find out how many images are there in bg folder
        for (var i = 1; i <= MAX_IMAGES_IN_BG; i++) {
            $.ajax({
                url: 'img/bg/' + i + '.jpg', //or your url
                success: function (data) {
                    app.count_bg_images++;
                },
                error: function (data) {
                }
            });
        }
        this.bindEvents();
        setTimeout(this.start_bg_loop, 50);
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
        if (window.width < 768 || window.height < 768 || window.innerWidth < 768 || window.innerHeight < 768) {
            window.screen.lockOrientation('portrait');
        }
        try {
            StatusBar.hide();
        } catch (e) {
            console.error("Error: " + e);
        }

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
        // $('#username').val('fakehemrycc');//mwcog type 0
        // $('#username').val('jitubats');
        // $('#username').val('cpnowtest');
        // $('#username').val('redgar942');//tdm type 0
        $('#username').val('sfinafroc246');//tdm type ??
        $("#password").val('changeme4');
        setTimeout(function () {
            startCommuteLog();
        }, 200);
    }
});