"use strict";
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
        user: {
            set_commuter_data: function (commuter_data) {
                this.commuter_data = commuter_data;
                if (commuter_data.hasOwnProperty('fromAMPM') && commuter_data.hasOwnProperty('fromHRS') && commuter_data.hasOwnProperty('fromMNS')) {
                    let from_string = commuter_data.fromAMPM + commuter_data.fromHRS + commuter_data.fromMNS;
                    this.from = moment(from_string, 'HmmA').format('HHmmss');
                }
            }
        },
        bg_loop: function () {
            app.cur_bg_image_index = (Math.ceil(Math.random() * (app.count_bg_images - 1)) + (app.cur_bg_image_index - 1)) % app.count_bg_images + 1;
            $('#homepage_bg').prop('src', 'img/bg/' + app.cur_bg_image_index + '.jpg').fadeIn('medium');
        },
        start_bg_loop: function () {
            if (app.count_bg_images === 0) {
                return false;
            }
            app.cur_bg_image_index = Math.ceil(Math.random() * app.count_bg_images);
            $('#homepage_bg').prop('src', 'img/bg/' + app.cur_bg_image_index + '.jpg');
            $('#homepage_bg').show();

            this.bg_loop_id = setInterval(app.bg_loop, 5000);
        },
        stop_bg_loop: function () {
            window.clearTimeout(app.bg_loop_id);
        },
        /**
         * Login. Also tell destination page to show popup based on user's type
         */
        login: function (e, destination_page) {
            if (window.is_login_and_commute_log) {
                e.preventDefault();
                console.log('Login check only');
            }
            if (typeof destination_page === 'undefined') {
                destination_page = 'search.html';
            }
            //disable the button so we can't resubmit while we wait
            $("#submitButton", this).prop("disabled", "disabled");
            var u = $("#username", this).val();
            var p = $("#password").val();
            let hashed = false;
            console.info("Password b4 login: " + p);
            var rememberMe = $("#remember").prop('checked');

            if (!rememberMe) {//clear everything if not remember
                window.localStorage.setItem("hashedPassword", "");
                window.localStorage.setItem("rememberCheckbox", false);
                window.localStorage.setItem("username", "");
                $("#password").val("");
                hashed = false;
            }
            if (app.saved_hashedpassword === p) {
                // p = app.saved_hashedpassword;
            } else {
                hashed = false;
            }
            if (IS_DEBUG) {
                // alert('debug mode on');
                // u = 'redgar942';//tdm only, type 0
                // u = 'sfinafroc246';//tdm only, type ??
                // u = 'fakehemrycc';//mwcog type 0
                // u = 'jitubats';//mwcog type 1
                // u = 'cpnowtest';//tdm type 2
                // u = 'SteveOsborn';//mwcog type 2
                // p = 'changeme4';
                // hashed = false;
            }

            if (u !== '' && p !== '') {
                showSpinner();
                $.get(BASEURL_LOGIN + "json?action=login&username=" + u + "&password=" + p + '&password_saved=' + hashed, function (res) {
                    // var passwordToSave = '';//0407 fix saving both hashed pw and plain pw. Because API fails to process hashed pw
                    if (res.statusCode === 1) {
                        // fix for saving wrong hashed pw
                        /*if (hashed) {
                            passwordToSave = p;
                        } else {
                            passwordToSave = res.hashedPassword;
                        }*/
                        var addresses = res.addresses;
                        var res_hashed_password = ''; //response's hashed_pw
                        if (res.hasOwnProperty('hashedPassword')) {
                            res_hashed_password = res.hashedPassword;
                        }
                        window.localStorage.setItem("idCommuter", res.commuter);
                        window.localStorage.setItem("enrolled", res.enrolled);
                        window.localStorage.setItem("userName", u);
                        window.localStorage.setItem("addresses", JSON.stringify(addresses));
                        window.localStorage.setItem("commuterData", JSON.stringify(res.commuterData));
                        window.localStorage.setItem("arriveAfter", res.commuterData.arriveAfter);
                        if (rememberMe) {
                            window.localStorage.setItem("rememberCheckbox", true);
                            window.localStorage.setItem("username", u);
                            window.localStorage.setItem("hashedPassword", res_hashed_password);
                            window.localStorage.setItem("password", p);//0407 save plain pw too
                        }
                        window.localStorage.setItem("hashedPassword", res_hashed_password);//08/12 quickfix for calendar

                        window.localStorage.setItem("justLoggedIn", 1);

                        //ttodob debugging
                        // res.is_flex = true;
                        // res.is_flex = false;
                        if (res.hasOwnProperty('is_flex')) {
                            app.user.is_flex = res.is_flex;
                        } else {
                            app.user.is_flex = false;
                        }
                        if (res.hasOwnProperty('commuter')) {
                            app.user.set_commuter_data(res.commuterData);
                        }
                        ls.set('user', app.user);
                        if (!window.is_login_and_commute_log) {
                            window.location = destination_page;
                        } else {
                            window.location = 'commute_log_calendar.html';
                        }
                    } else {
                        if (res.statusCode === 0 && res.statusDescription === 'This account has not yet been activated.') {
                            $('#activate_account_popup').popup('open');
                            return;
                        } else {
                            $("#submitButton").removeAttr("disabled");
                            navigator.notification.alert(
                                'You have entered an invalid username and password, please try again', // message
                                null, // callback
                                'Invalid Login', // title
                                'Ok'                  // buttonName
                            );
                        }
                    }

                    $("#submitButton").removeAttr("disabled");
                }, "json").error(
                    function () {
                        $("#submitButton").removeAttr("disabled");
                        navigator.notification.alert(
                            'An error has occured, please try again.', // message
                            null, // callback
                            'Error', // title
                            'Ok'                  // buttonName
                        );
                    }).always(hideSpinner);

            }
            return false;
        },
        // Application Constructor
        initialize: function () {
            var remember_sw = {};
            var remember = window.localStorage.getItem("rememberCheckbox");
            var username = window.localStorage.getItem("username");
            var saved_password = window.localStorage.getItem("password");
            app.saved_hashedpassword = window.localStorage.getItem("hashedPassword");
            var hashed = false;
            var $img_lazy_loader = $('#lazy_loader');
            $.support.cors = true;
            $.mobile.allowCrossDomainPages = true;
            if (remember === "true") {
                $("#remember").prop('checked', true);
                $("#username").val(username);
                // hashed = true;//0407
                $("#password").val(saved_password);
            }
            remember_sw = new Switchery(document.querySelector('#remember'));

            /*
            Login. If successful, go to destination_page, e.g. search.html
             */
            $("#loginForm").on("submit", app.login);
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
            setTimeout(this.start_bg_loop, 500);
            if (IS_SIMULATE_DEEPLINK) {
                console.warn('IS SIMULATE DEEPLINK');
                // window.handleOpenURL('commuterconnections://{"pickup_lat":"32.74776940000000","pickup_lng":"-117.06786960000000","dropoff_lat":"32.75160600000000"' +
                // ',"dropoff_lng":"-117.10714100000000","pickup_full_address":"5995 Dandridge Ln, San Diego, CA 92115, USA","dropoff_full_address":"4102 41st St, San Diego, CA 92105, USA"}');
                // window.handleOpenURL('commuterconnections://%7B%22pickup_lat%22:39.0238254,%22pickup_lng%22:-77.0250847,%22dropoff_lat%22:38.8999134,%22dropoff_lng%22:-77.0084632,%22pickup_full_address%22:%221002%20Carson%20St,%20Silver%20Spring,%20Md%2020901%22,%22dropoff_full_address%22:%22777%20North%20Capitol%20St%20Ne%20Ste%20300,%20Washington,%20Dc%2020002%22%7D');
                window.handleOpenURL('commuterconnections://%7B%22pickup_lat%22:38.8586131,%22pickup_lng%22:-77.1130333,%22dropoff_lat%22:38.8999134,%22dropoff_lng%22:-77.0084632,%22pickup_full_address%22:%22820%20S%20Arlington%20Mill%20Drive,%20Arlington,%20Va%2022204%22,%22dropoff_full_address%22:%22777%20North%20Capitol%20St%20Ne%20Ste%20300,%20Washington,%20Dc%2020002%22%7D');
            }
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

            if (window.width < 768 || window.height < 768 || window.innerWidth < 768 || window.innerHeight < 768 ||
                (device.platform === 'iOS' && device.model.indexOf('iPad') !== -1)) {
                window.screen.lockOrientation('portrait');
            }
            // try {
            //     StatusBar.hide();
            // } catch (e) {
            //     console.error("Error: " + e);
            // }
            if (typeof window.plugins.intentShim == "object" && window.plugins.intentShim !== null && window.plugins.intentShim !== undefined) {
                window.plugins.intentShim.getIntent(
                    function (intent) {
                        console.log('Action' + JSON.stringify(intent.action));
                        var intentExtras = intent.extras;
                        console.log('Launch Intent Extras: ' + JSON.stringify(intentExtras));
                        if (intentExtras === null) {
                            intentExtras = "No extras in intent";
                            return true;
                        }
                        if (intentExtras && intentExtras.hasOwnProperty('launcher') && intentExtras.launcher === 'mwcbg') {//this notification comes from MWCOG BG process
                            if (intentExtras.hasOwnProperty('reason')) {
                                let intent_reason = intentExtras.reason;
                                ls('intent_reason', intent_reason);
                                goto_start_flextime_trip();
                            }
                        }
                    }
                    ,

                    function () {
                        console.log('Error getting launch intent');
                    }
                );
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


    }
;


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

    if (IS_LOCAL) {
        // $('#username').val('SteveOsborn');
        // $('#username').val('fakehemrycc');//mwcog type 0
        // $('#username').val('jitubats');//mwcog type 1
        // $('#username').val('cpnowtest');//tdm type 2
        // $('#username').val('redgar942');//tdm type 0
        // $('#username').val('sfinafroc246');//tdm type ??
        // $('#username').val('activate1234');//NR
        // $("#password").val('changeme4');
        // $('#username').val('ngxtri01');//NR
        // $("#password").val('cTrapok01');
        // $('#username').val('flexmedia');//Flex
        // $("#password").val('changeme4');
        // $('#loginForm').submit();
        // window.location = 'search.html';
        /*setTimeout(function () {
            startCommuteLog();
        }, 200);*/
        /*setTimeout(function () {
            $('#activate_account_popup').popup('open', {
                positionTo: "window"
            });
        }, 800);*/
    }
});

/**
 * Convert jQuery serializeArray() to Assoc array
 * e.g. [0=>['name'=>'email', 'value'=>'a@b.com']
 * will become
 * ['email'=>'a@b.com']
 */
function jq_serial_array_to_assoc(arr) {
    var result = {};
    arr.forEach(function (e) {
        result[e.name] = e.value;
    });
    return result;
}

function activate_account(btn) {
    if (verify_reg_acnt(btn)) {
        var form = $(btn).closest('form');
        var form_vars = jq_serial_array_to_assoc(form.serializeArray());
        $.extend(form_vars, {action: "activateNewCommuter", siteId: 10001, userName: $('#username').val()});
        $.mobile.loading("show");
        $.ajax(baseUrl + 'mobileapicontroller', {
            data: form_vars, error: function (data) {
            }, success: function (data) {
                if (data.hasOwnProperty('activation') && data.activation === 'failed') {
                    app_alert('We apologize but there has been an error in processing your account activation.  Please call Commuter Connections at 1-800-745-RIDE for assistance with your account.');
                } else {
                    app_toast('Validation successful. Logging you in...');
                    $('#password').val($('#password1').val());
                    setTimeout(function () {
                            $("#loginForm").submit();
                            $('#activate_account_popup').popup('close');
                        }, 2000
                    );
                }
            }
        }).done(function () {
            $.mobile.loading("hide");
        });
    }
}

function verify_reg_acnt(btn) {
    var formObj = $(btn).closest('form').get(0), re = null;
    // check password for validity and compare with confirmation password
    if (formObj.password1.value !== "" && formObj.password1.value != null) {
        if (formObj.password1.value.length < 8) {
            app_alert("Password must contain at least eight alphanumeric characters!");
            formObj.password1.focus();
            return false;
        }
        re = /^([a-zA-Z0-9_]+)$/;
        if (!re.test(formObj.password1.value)) {
            app_alert("Password must be alphanumeric only.");
            formObj.password1.focus();
            return false;
        }
        re = /[0-9]/;
        if (!re.test(formObj.password1.value)) {
            app_alert("Password must contain at least one number (0-9).");
            formObj.password1.focus();
            return false;
        }
        re = /[a-zA-Z]/;
        if (!re.test(formObj.password1.value)) {
            app_alert("Password must contain at least one letter (a-z).");
            formObj.password1.focus();
            return false;
        }
    } else {
        app_alert("Please enter a password.");
        formObj.password1.focus();
        return false;
    }
    if (formObj.password2.value === "" || formObj.password2.value == null) {
        app_alert("Please enter confirmation password.\n(Must be same as password)");
        formObj.password2.focus();
        return false;
    }
    if (formObj.password1.value !== "" && formObj.password1.value !== formObj.password2.value) {
        app_alert("Password and confirmation password must be same.");
        formObj.password2.focus();
        return false;
    }

    // check password recovery question
    if (formObj.pwdQuestion.value === "") {
        app_alert("Please select a password recovery question.");
        formObj.pwdQuestion.focus();
        return false;
    }
    // check password recovery answer
    if (formObj.pwdAnswer.value === "") {
        app_alert("Please enter password recovery answer.");
        formObj.pwdAnswer.focus();
        return false;
    }
    return true;
}

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

    window.localStorage.removeItem('latlng');

    if (latlng.length < 2) {
        return false;//at least {}
    } else {
        window.localStorage.setItem('latlng', latlng);
    }
    //now try logging in
    var username_saved = window.localStorage.getItem("username");
    var saved_hashed_password = window.localStorage.getItem("hashedPassword");
    var saved_password = window.localStorage.getItem("password");

    if (is_nonempty_str(username_saved) && (is_nonempty_str(saved_password) || is_nonempty_str(saved_hashed_password))) {
        $('#loginForm :input').blur();
        $("#loginForm").trigger('submit', ['rideshare.html']);
    }

};
