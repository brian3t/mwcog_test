isInWeb = !(document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
var C = {
    TYPE_GENERAL: 0,
    TYPE_CIP: 1,
    TYPE_VIP: 2,
    TYPE_VIEW_ONLY_VIP: 3,
    TYPE_FLEX: 4
};
var User = User || {};
try {
    User.commuter_data = JSON.parse(window.localStorage.getItem('commuterData'));
} catch (e) {
    console.error('Cant get commuter data' + commuter_data);
}

document.addEventListener('deviceready', function () {
    if (window.width < 768 || window.height < 768) {
        window.screen.lockOrientation('portrait');
    }
    //try {
    //     // StatusBar.overlaysWebView(false);
    //     // StatusBar.backgroundColorByHexString('#8199af');
    //     StatusBar.show();
    //} catch (e) {
    //    console.error("Error " + e);
    //}
    if (typeof device !== "undefined" && device.platform === 'Android') {
        $(':input[type!=submit]').on('focus', function (e) {
                $('body').addClass('offset_input');
            }
        ).on('blur', function (e) {
                $('body').removeClass('offset_input');
            }
        );
    }
    window.MOBILE_DETECT = new MobileDetect(window.navigator.userAgent);
    switch (MOBILE_DETECT.os()) {
        case 'androidOS':
        case 'iOS':
            $('html').addClass('ios');
            break;
        default:
            $('html').addClass('android');
            break;
    }
}, false);
if (isInWeb){
    document.dispatchEvent(new Event('deviceready'));
}
app_alert = function (message, alertCallback, title, buttonName) {
    if (buttonName === null) {
        buttonName = "OK";
    }
    if (isInWeb) {
        alert(message);
        if (_.isFunction(alertCallback)) {
            alertCallback();
        }
    } else {
        navigator.notification.alert(message, alertCallback, title, buttonName);
    }
};
app_confirm = function (message, callback, title) {
    if (isInWeb) {
        var response = confirm(message);
        callback(response);

    } else {
        if (app.is_notification_active) {
            return true;
        }
        app.is_notification_active = true;
        navigator.notification.confirm(message, callback, title, ["Yes", "No"]);
    }
};
app_toast = function (message) {
    if (isInWeb) {
        $.jGrowl(message, {position: 'center'});
    } else {
        if (typeof window.plugins == 'object' && typeof window.plugins.toast == 'object') {
            window.plugins.toast.showLongCenter(message);
        }
        else (alert(message));
    }
};
