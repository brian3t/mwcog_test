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
jQuery(document).on("pagechange", function (event) {
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
});

function jqm_resize_content() {
    let screen = $.mobile.getScreenHeight(),
        header = $(".ui-header").hasClass("ui-header-fixed") ? $(".ui-header").outerHeight() - 1 : $(".ui-header").outerHeight(),
        footer = $(".ui-footer").hasClass("ui-footer-fixed") ? $(".ui-footer").outerHeight() - 1 : $(".ui-footer").outerHeight(),
        contentCurrent = $(".ui-content").outerHeight() - $(".ui-content").height(),
        content = screen - header - footer - contentCurrent;
    $(".ui-content").height(content);
}

$(document).on("pagecontainertransition", jqm_resize_content);
$(window).on("resize", jqm_resize_content);
$(window).on("orientationchange", jqm_resize_content);
if (isInWeb) {
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
        } else (alert(message));
    }
};

/**
 * parse home and work addresses from addresses array
 * @returns {*[]}
 */
function user_get_home_work(address = null) {
    /*if (typeof user !== 'undefined' || user === null || !user.hasOwnProperty('commuter_data')){
        return [null, null];
    }*/
    let addresses = ls('addresses');
    if (typeof addresses !== "object") return [null, null];
    let home_addr = addresses.find((address) => address.addrType === 'HOME');
    let work_addr = addresses.find((address) => address.addrType === 'WORK');
    return [home_addr, work_addr];
}

var Model = function (attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId(this.cidPrefix);
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    var defaults = _.result(this, 'defaults');
    attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
    this.initialize.apply(this, arguments);
};
// Helper function to correctly set up the prototype chain for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
var extend = function (protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function () {
            return parent.apply(this, arguments);
        };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function and add the prototype properties.
    child.prototype = _.create(parent.prototype, protoProps);
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
};
_.extend(Model.prototype, {
    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function () {
    }
});
Model.extend = extend;

var Address = Model.extend({
    initialize: function () {

    },
    trim_data: function () {
        $.each(['addrCity', 'addrLocation', 'addrState', 'addrStreet1', 'addrStreet2', 'addrSuite', 'addrType', 'addrZip'], (index, value) => {
            if (typeof this[value] === "string" && this[value] !== null) {
                this[value] = this[value].trim();
            }
        });
    },
    pull_full_address: function () {
        return this.addrStreet1 + ' ' + this.addrStreet2 + ', ' + this.addrSuite + ', ' + this.addrCity + ', ' + this.addrState + ' ' + this.addrZip;
    },
    addrCity: null,
    addrLocation: null,
    addrState: null,
    addrStreet1: null,
    addrStreet2: null,
    addrSuite: null,
    addrType: null,
    addrZip: null,
    idAddress: -1,
});

/**
 * Determine if now is around `from`
 * @returns {boolean}
 */
window.first_of_the_day = function () {
    let result = false;
    if (user.hasOwnProperty('from')) {
        let from = moment(user.from, 'HHmmss');
        let today_minus1h = moment().subtract(1, 'hour');
        let today_plus1h = moment().add(1, 'hour');
        result = from.isAfter(today_minus1h) && from.isBefore(today_plus1h);
    }

    return result;
};

