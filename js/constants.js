/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var IS_DEBUG = false;
var USE_MWCOG = true;
var MAX_IMAGES_IN_BG = 3;
// var BG_FOLDER = '/img/bg/';

var baseUrl = 'https://tdm.commuterconnections.org/mwcog/';
if (USE_MWCOG) {
    baseUrl = 'http://mwcog.mediabeef.com/mwcog/';
}

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
    navigator.app.backHistory();
}
function logout() {
    var popup_active = $('.ui-popup-active>[data-role="popup"]');
    if (popup_active.length > 0) {
        popup_active.one("popupafterclose", function (event, ui) {
            confirmDialog("Logout", "Are you sure you want to Log Out?", function () {
                jQuery.mobile.navigate('index.html');
                setTimeout(function(){window.location.href="index.html";}, 500);
            });
        });
        popup_active.popup('close',{history:false});
    } else {
        confirmDialog("Logout", "Are you sure you want to Log Out?", function () {
            jQuery.mobile.navigate('index.html');
            setTimeout(function(){window.location.href="index.html";}, 500);
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
