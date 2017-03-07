isInWeb = !(document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
var User = User || {};
try {
    User.commuter_data = JSON.parse(window.localStorage.getItem('commuterData'));
} catch (e){
    console.error('Cant get commuter data' + commuter_data);
}

document.addEventListener('deviceready', function () {
    if (window.width < 768 || window.height < 768){
        window.screen.lockOrientation('portrait');
    }
    try{
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString('#8199af');
        StatusBar.hide();
    } catch (e){
        console.error("Error " + e);
    }

}, false);
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
