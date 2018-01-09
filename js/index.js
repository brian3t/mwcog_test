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
                // u = 'sfinafroc246';//tdm only, type ??
                // u = 'fakehemrycc';//mwcog type 0
                // u = 'jitubats';//mwcog type 1
                u = 'cpnowtest';//tdm type 2
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
                        //todob debugging
                        /*if (!window.is_login_and_commute_log) {
                            window.location = "search.html";
                        } else {
                            window.location = 'commute_log_calendar.html';
                        }*/

                    } else {
                        if (res.statusCode === 0 && res.statusDescription === 'This account has not yet been activated.') {
                            hideSpinner();
                            $('#activate_account_popup').popup('open');
                            return;
                        }
                        else {
                            hideSpinner();
                            $("#submitButton").removeAttr("disabled");
                            navigator.notification.alert(
                                'You have entered an invalid username and password, please try again', // message
                                null, // callback
                                'Invalid Login', // title
                                'Ok'                  // buttonName
                            );
                        }
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
        setTimeout(this.start_bg_loop, 500);
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
        if (window.width < 768 || window.height < 768 || window.innerWidth < 768 || window.innerHeight < 768 ||
            (device.platform === 'iOS' && device.model.indexOf('iPad') !== -1)) {
            window.screen.lockOrientation('portrait');
        }
        // try {
        //     StatusBar.hide();
        // } catch (e) {
        //     console.error("Error: " + e);
        // }

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

    if (IS_LOCAL) {
        // $('#username').val('SteveOsborn');
        // $('#username').val('fakehemrycc');//mwcog type 0
        // $('#username').val('jitubats');//mwcog type 1
        // $('#username').val('cpnowtest');//tdm type 2
        // $('#username').val('redgar942');//tdm type 0
        // $('#username').val('sfinafroc246');//tdm type ??
        $('#username').val('activate1234');//NR
        $("#password").val('changeme4');
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
        console.log("all ok");
        var form = $(btn).closest('form');
        var form_vars = jq_serial_array_to_assoc(form.serializeArray());
        $.extend(form_vars, {action: "activateNewCommuter", siteId: 10001, username: $('#username').val(), commuterId: 12345});//todob get commuterID
        console.info(form_vars);
        $.mobile.loading( "show");
        $.ajax(baseUrl + 'mobileapicontroller', {
            data: form_vars, error: function (data) {
                console.error(data);
            }, success: function (data) {
                console.info(data);
                if (data.hasOwnProperty('activation') && data.activation === 'failed') {
                    app_alert('We apologize but there has been an error in processing your account activation.  Please call Commuter Connections at 1-800-745-RIDE for assistance with your account.');
                } else {
                    app_toast('Validation successful. Logging you in...');
                    setTimeout(function () {
                        $("#loginForm").submit();
                        $('#activate_account_popup').popup('close');
                        }, 2000
                    );
                }
            }
        }).done(function () {
            $.mobile.loading( "hide");
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