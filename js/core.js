isInWeb = !(document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
var cur_pos = {};
const GEOLOCATION_THRESHOLD = 1e-8;
var heartbeat = {interval: -1};
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
    // acknowledge that user responds to the trip_complete notification. Close popup
    if (typeof cordova === "object") {
        cordova.plugins.notification.local.on("click", function (notification) {
            console.log("noti clicked");
        });
    }
    // ===================================================
    // END idle notification monitoring functions

    //detect if app was launched via BG notification
    var app_status = ls('app_status');
    if (app_status === 'start_flextime_trip_trip_active' && //we have BG plugin trying to verify trip. Let's check whether it completed..
        typeof backgroundGeolocation === "object" && backgroundGeolocation.hasOwnProperty('getIsEndOfTrip') && typeof backgroundGeolocation.getIsEndOfTrip === 'function')
    {
        backgroundGeolocation.getIsEndOfTrip((response)=>{
            if (response.hasOwnProperty('is_end_of_trip') && response.is_end_of_trip === true) {
                console.log(`trip done - plugin confirmed`);
                ls('is_end_of_trip_plugin_confirmed', true);
                window.location.href = 'start_flextime_trip.html';
            }
        });
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
        if (response && (response === true || response === 1))
        {
            callback(response);
        }

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
    if (addresses === undefined || typeof addresses !== "object" || addresses === null) return [null, null];
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
    geocode: function(geocoder){
        geocoder.geocode({address: this.pull_full_address()}, (result) => {
            result = result.pop();
            if (typeof result !== "object" || !result.hasOwnProperty('geometry')) return;
            let geo = result.geometry;
            if (!geo.hasOwnProperty('location')) return;
            let location = geo.location;
            [this.lat, this.lng] = [location.lat(), location.lng()];
            data_availability_watcher();//trigger watcher. This can also be done via event bus
        });
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
    is_latlng_ready: function(){
        return _.isNumber(this.lat) && _.isNumber(this.lng);
    },
    /**
     * determines whether $this is close to current pos (cur_pos is polled by heartbeat)
     * @returns {boolean}
     */
    is_close_to_current_geo: function(){
        if (typeof cur_pos !== "object" || (! cur_pos.hasOwnProperty('lat'))){
            return false;
        }
        let result = Math.abs((this.lat - cur_pos.lat) * (this.lng - cur_pos.lng)) < GEOLOCATION_THRESHOLD;
        return result;
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
    lat: null,
    lng: null
});

/**
 * Determine if now is around `from`
 * @returns {boolean}
 */
window.first_of_the_day = function () {
    let result = false;
    if (typeof user !== "object" || user === null){
        return false;
    }
    if (user.hasOwnProperty('from')) {
        let from = moment(user.from, 'HHmmss');
        let today_minus1h = moment().subtract(1, 'hour');
        let today_plus1h = moment().add(1, 'hour');
        result = from.isAfter(today_minus1h) && from.isBefore(today_plus1h);
    }

    return result;
};

window.close_all_popups = function(){
    if (!$('.ui-popup-active').length) return true;
    $('.ui-popup').popup('close');


};

window.goto_search = function() {
    //jQuery.mobile.navigate('search.html');
    setTimeout(function () {
        window.location.href = "search.html";
    }, 500);
};

window.geolocation = {
    onSuccess: function (position) {
        let extra_param = {};
        let current_pos = position.coords;
        //save it to cur pos. Save lat lng to cur_user and publish to API
        if (_.isObject(cur_pos)) {
            cur_pos = {lat: current_pos.latitude, lng: current_pos.longitude};
        }
    },
// onError Callback receives a PositionError object
//
    onError: function (error) {
        console.error('Navigator Geolocation Error Code: ' + error.code + '\n' + 'Message: ' + error.message + '\n');
    }
};
window.start_heartbeat = function () {
    navigator.geolocation.getCurrentPosition(geolocation.onSuccess, geolocation.onError);
    heartbeat.interval = setInterval(function () {
        //get current pos
        navigator.geolocation.getCurrentPosition(geolocation.onSuccess, geolocation.onError);
    }, HEARTBEAT_INTERVAL);
};
window.stop_heartbeat = function () {
    clearInterval(heartbeat.interval);
    heartbeat.interval = -1;
};