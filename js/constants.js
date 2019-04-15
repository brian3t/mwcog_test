var IS_DEBUG = false;
// var IS_DEBUG = true;//ttodob debug
var IS_SIMULATE_DEEPLINK = false;
// var IS_SIMULATE_DEEPLINK = true;
var USE_MWCOG = false;
// var USE_MWCOG = true;
var MAX_IMAGES_IN_BG = 3;
var IS_LOCAL = (window.location.host.indexOf('mwcog') !== -1);

var MWCOG_GEO_API = 'http://mwcogapi.mediabeef.com/v1/geolocation';  // deprecated, replaced with FLEX_TRIP_API_URL
var IS_SHOW_BG_POPUP = false;//turn the popup to quickly launch BG geo
// var IS_SHOW_BG_POPUP = true;//ttodob debug


var baseUrl           = 'https://tdm.commuterconnections.org/mwcog/'; // production
var BASEURL_LOGIN     = 'https://tdm.commuterconnections.org/mwcog/'; // production
var BASEURL_CALENDAR  = 'https://tdm.commuterconnections.org/mwcog/calendarservicecontrol'; // production
var FLEX_TRIP_API_URL = 'https://tdm.commuterconnections.org/mwcog/verifiedtripservicecontrol'; // production
//var baseUrl             = 'http://mwcog2.mediabeef.com/mwcog/'; // DEV
//var BASEURL_LOGIN       = 'http://mwcog2.mediabeef.com/mwcog/'; // DEV
//var BASEURL_CALENDAR    = 'http://mwcog2.mediabeef.com/mwcog/calendarservicecontrol'; // DEV
//var FLEX_TRIP_API_URL   = 'http://mwcog2.mediabeef.com/mwcog/verifiedtripservicecontrol'; // DEV


if (IS_LOCAL){
    // USE_MWCOG = true;
    MWCOG_GEO_API = 'http://mwcapi/v1/geolocation';
}
if (USE_MWCOG) {
    // baseUrl = 'http://mwcog3.mediabeef.com/mwcog/';
    baseUrl = 'http://mwcog.mediabeef.com/mwcog/';
}
var HEARTBEAT_INTERVAL = 15000;

function showSpinner() {
    var $this = $(this),
        theme = $this.jqmData("theme") || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData("msgtext") || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData("textvisible") || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData("textonly");
    html = $this.jqmData("html") || "";
    $.mobile.loading("show", {
        text: msgText,
        textVisible: textVisible,
        theme: theme,
        textonly: textonly,
        html: html
    });
}

function hideSpinner() {
    $.mobile.loading("hide");
}
function goBack() {
    history.go(-1);
    if (typeof  navigator.app === 'object') {
        navigator.app.backHistory();
    }
}
function logout() {
    var popup_active = $('.ui-popup-active>[data-role="popup"]');
    if (popup_active.length > 0) {
        popup_active.one("popupafterclose", function (event, ui) {
            confirmDialog("Logout", "Are you sure you want to Log Out?", function () {
                jQuery.mobile.navigate('index.html');
                setTimeout(function () {
                    window.location.href = "index.html";
                }, 500);
            });
        });
        popup_active.popup('close', {history: false});
    } else {
        confirmDialog("Logout", "Are you sure you want to Log Out?", function () {
            jQuery.mobile.navigate('index.html');
            setTimeout(function () {
                window.location.href = "index.html";
            }, 500);
        });
    }
}

function register() {
    confirmDialog("Registration", "Would you like to open the Commuter Connection Registration site in your web browser?", function () {
        var ref = window.open(baseUrl + 'CCRegistration.jsp', '_blank', 'location=yes');
    });
}


function confirmDialog(windowTitle, text, callback) {
    var popupDialogId = 'popupDialog';
    $('<div data-role="popup" id="' + popupDialogId + '" data-confirmed="no" data-transition="none" data-theme="a" data-dismissible="false" style="max-width:350px;"> \
                        <div data-role="header" data-theme="a">\
                            <h1 style="overflow: visible; white-space: normal;">' + windowTitle + '</h1>\
                        </div>\
                        <div class="ui-body ui-body-a">\
                            <h3 class="ui-title">' + text + '</h3>\
                            <div class="ui-grid-a">\
                            <div class="ui-block-a"><a href="#" class="ui-btn ui-mini ui-shadow ui-corner-all optionConfirm" data-rel="back">Yes</a></div>\
                            <div class="ui-block-b"><a href="#" class="ui-btn ui-mini ui-shadow ui-corner-all optionCancel" data-rel="back" data-transition="flow">No</a></div>\
                        </div>\
                    </div>')
        .appendTo($.mobile.pageContainer);
    var popupDialogObj = $('#' + popupDialogId);
    popupDialogObj.trigger('create');
    popupDialogObj.popup({
        afterclose: function (event, ui) {
            popupDialogObj.find(".optionConfirm").first().off('click');
            var isConfirmed = popupDialogObj.attr('data-confirmed') === 'yes' ? true : false;
            $(event.target).remove();
            if (isConfirmed && callback) {
                callback();
            }
        }
    });
    popupDialogObj.popup('open');
    popupDialogObj.find(".optionConfirm").first().on('click', function () {
        popupDialogObj.attr('data-confirmed', 'yes');
    });
}


function alertDialog(windowTitle, text) {
    var popupDialogId = 'popupDialog';
    $('<div data-role="popup" id="' + popupDialogId + '" data-confirmed="no" data-transition="none" data-theme="a" data-dismissible="true" style="max-width:350px;"> \
                        <a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>\
                        <div data-role="header" data-theme="a">\
                            <h1 style="overflow: visible; white-space: normal;">' + windowTitle + '</h1>\
                        </div>\
                        <div class="ui-body ui-body-a">\
                            <p>' + text + '</p>\
                        </div>\
                    </div>')
        .appendTo($.mobile.pageContainer);
    var popupDialogObj = $('#' + popupDialogId);
    popupDialogObj.trigger('create');
    popupDialogObj.popup();
    popupDialogObj.popup('open');
}
