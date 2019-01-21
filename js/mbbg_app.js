const MWCOG_GEO_API = 'http://mwcogapi.mediabeef.com/v1/geolocation';
var map,
    previousLocation,
    locationMarkers = [],
    stationaryCircles = [],
    currentLocationMarker,
    locationAccuracyCircle,
    path,
    userStartIntent,
    isStarted = false,
    isLocationEnabled = false,
    configHasChanges = false;

var bgOptions = {
    stationaryRadius: 0,
    distanceFilter: 30,
    desiredAccuracy: 100,
    debug: false,
    // debug: true,
    notificationTitle: 'MWCOG background tracking',
    notificationText: 'enabled',
    notificationIconColor: '#FEDD1E',
    notificationIconLarge: 'mappointer_large',
    notificationIconSmall: 'mappointer_small',
    locationProvider: 0,//backgroundGeolocation.provider.ANDROID_DISTANCE_FILTER_PROVIDER,
    interval: 10,
    fastestInterval: 5,
    activitiesInterval: 10,
    stopOnTerminate: false,
    startOnBoot: true,
    startForeground: true,
    stopOnStillActivity: false,
    // activityType: 'Other',
    activityType: 'OtherNavigation',//Mike 01/15
    //url: 'http://192.168.168.136/v1/geolocation',//brianserver
    // url: 'http://192.168.1.9/v1/geolocation',//server1234
    url: MWCOG_GEO_API,//server1234
    // url: 'http://192.168.1.3/v1/geolocation',//brianmsi
    //syncUrl: 'http://192.168.3.185:3000/sync',
    // syncThreshold: 10,
    syncThreshold: 5,//Mike 01/15
    commuter_id: 123789,
    trip_id: 'test1234',
    start_lat: 999998,
    start_lng: 999997,
    end_lat: 51.5099,//london uk
    end_lng: 0.1337,//london uk
    httpHeaders: {
        'X-FOO': 'bar'
    },
    pauseLocationUpdates: false,
    saveBatteryOnBackground: false,
    maxLocations: 1000
};

var mapOptions = {
    center: {lat: 32.3318907, lng: -122.0318303},
    zoom: 12,
    disableDefaultUI: false
};

try {
    Object.assign(bgOptions, ls('bgOptions'));
} catch (err) {
    console.log(err.message);
}

// myApp.onPageInit('map', function (page) {
function mapinitdone(page) {

    if (typeof backgroundGeolocation === 'undefined') {
        app_alert('Plugin has not been initialized properly!');
        return;
    }

    bgConfigure();
    backgroundGeolocation.onStationary(setStationary);
    backgroundGeolocation.watchLocationMode(
        function (enabled) {
            isLocationEnabled = enabled;
            if (enabled && userStartIntent) {
                startTracking();
            } else if (isStarted) {
                stopTracking();
                app_alert('Location tracking has been stopped');
            }
        },
        function (error) {
            app_alert(error, 'Error watching location mode');
        }
    );


}

// myApp.onPageInit('settings', function (page) {
function init_settings() {
    var options = Object.assign({}, bgOptions);
    var locationProviders = [
        {name: 'ANDROID_DISTANCE_FILTER_PROVIDER', value: 0, selected: false, index: 0},
        {name: 'ANDROID_ACTIVITY_PROVIDER', value: 1, selected: false, index: 1},
    ];
    var selectedProvider = 0;

    if (options.locationProvider) {
        selectedProvider = Number(options.locationProvider);
        locationProviders[Number(options.locationProvider)].selected = true;
    }
    options.locationProvider = locationProviders[selectedProvider].name;
    options.locationProviders = locationProviders;
    fill_option_to_inputs($('#bg_settings'));
}

/**
 * Grab settings from form. Then send it to bg plugin using bgConfigure
 */
function send_settings() {
    let config = Array.prototype.reduce.call(
        $('#bg_settings :input'),
        function (values, el) {
            if ($(el).data('type') === 'float') {
                values[el.name] = parseFloat(el.value);
            } else if (el.type === 'checkbox') {
                values[el.name] = el.checked;
            } else {
                if (!isNaN(parseInt(el.value))) {
                    values[el.name] = parseInt(el.value);
                } else {
                    values[el.name] = el.value;
                }
            }
            return values;
        },
        {});
    bgConfigure(config);
    startTracking();
}

/**
 * We fill options back to our config form
 * @param form
 */
function fill_option_to_inputs(form) {
    let options = ls('bsOptions');
    if (options === null) return false;
    $.each(options, (name, value) => {
        //todob restore config here
    });
}

/*
$$('[data-page="settings"]').on('keyup keydown change', '[data-type="config"]', function(ev) {
    console.log('changed', this.name, this.checked, this.value);
    configHasChanges = true;
});*/

function toggleTracking(shouldStart) {
    if (shouldStart) {
        startTracking();
    } else {
        stopTracking();
    }
}

function bgConfigure(config) {
    Object.assign(bgOptions, config);
    ls('bgOptions', bgOptions);

    let options = Object.assign({}, bgOptions);
    if (options.interval) {
        options.interval *= 1000;
    }
    if (options.fastestInterval) {
        options.fastestInterval *= 1000;
    }
    if (options.activitiesInterval) {
        options.activitiesInterval *= 1000;
    }

    if (isStarted) {
        stopTracking();
        backgroundGeolocation.configure(
            setCurrentLocation,
            function (err) {
                console.log('Error occured', err);
            },
            options
        );
        startTracking();
    } else {
        backgroundGeolocation.configure(
            setCurrentLocation,
            function (err) {
                console.log('Error occured', err);
            },
            options
        );
    }
}

function startTracking() {
    if (typeof plugins === "object" && plugins.hasOwnProperty('appMinimize') && typeof plugins.appMinimize === "object" && plugins.appMinimize.hasOwnProperty('minimize')) {
        plugins.appMinimize.minimize();
    }

    if (isStarted) {
        return;
    }

    backgroundGeolocation.isLocationEnabled(
        function (enabled) {
            isLocationEnabled = enabled;
            if (enabled) {
                backgroundGeolocation.start(
                    null,
                    function (error) {
                        stopTracking();
                        if (error.code === 2) {
                            app_confirm('Would you like to open app settings to enable Geolocation?', function () {
                                backgroundGeolocation.showAppSettings();
                            }, 'Permission denied');
                        } else {
                            app_alert('Start failed' + error.message);
                        }
                    }
                );
                isStarted = true;
            } else {
                app_confirm('Would you like to open settings to enable Geolocation?', function () {
                    backgroundGeolocation.showLocationSettings();
                }, 'Location Services are disabled');
            }
        },
        function (error) {
            app_alert('Error detecting status of location settings' + error);
        }
    );
}

function stopTracking() {
    if (!isStarted) {
        return;
    }

    backgroundGeolocation.stop();
    isStarted = false;
}

function setStationary(location) {
    console.log('[DEBUG] stationary received', location);
    var latlng = new google.maps.LatLng(Number(location.latitude), Number(location.longitude));
    var stationaryCircle = new google.maps.Circle({
        fillColor: 'pink',
        fillOpacity: 0.4,
        strokeOpacity: 0,
        map: map,
    });
    stationaryCircle.setCenter(latlng);
    stationaryCircle.setRadius(location.radius);
    stationaryCircles.push(stationaryCircle);
    backgroundGeoLocation.finish();
}

function setCurrentLocation(location) {
    console.log('[DEBUG] location recieved', location);
    if (!currentLocationMarker) {
        currentLocationMarker = new google.maps.Marker({
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#ec0070', //'gold',
                fillOpacity: 1,
                strokeColor: '#22e2c5',
                strokeWeight: 3
            }
        });
        locationAccuracyCircle = new google.maps.Circle({
            fillColor: 'purple',
            fillOpacity: 0.4,
            strokeOpacity: 0,
            map: map
        });
    }
    if (!path) {
        path = new google.maps.Polyline({
            map: map,
            strokeColor: 'blue',
            fillOpacity: 0.4
        });
    }
    var latlng = new google.maps.LatLng(Number(location.latitude), Number(location.longitude));

    if (previousLocation) {
        // Drop a breadcrumb of where we've been.
        locationMarkers.push(new google.maps.Marker({
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: 'green',
                fillOpacity: 1,
                strokeColor: 'white',
                strokeWeight: 3
            },
            map: map,
            position: new google.maps.LatLng(previousLocation.latitude, previousLocation.longitude)
        }));
    } else {
        /*if (map.getZoom() < 15) {
            map.setZoom(15);
        }*/
    }
    // map.setCenter(latlng);

    // Update our current position marker and accuracy bubble.
    currentLocationMarker.setPosition(latlng);
    locationAccuracyCircle.setCenter(latlng);
    locationAccuracyCircle.setRadius(location.accuracy);

    // Add breadcrumb to current Polyline path.
    path.getPath().push(latlng);
    previousLocation = location;

    backgroundGeoLocation.finish();
}

function onDeviceReady() {
    backgroundGeolocation = window.backgroundGeolocation || window.universalGeolocation || window.navigator.geolocation;

    if (backgroundGeolocation.hasOwnProperty('isLocationEnabled')) {
        backgroundGeolocation.isLocationEnabled((is_enabled) => {
            if (is_enabled) {

            } else {

            }
        }, () => console.error(`no idea location enabled`));
    }
    if (backgroundGeolocation.hasOwnProperty('getLocations')) {
        backgroundGeolocation.getLocations(function (locs) {
            var now = Date.now();
            var sameDayDiffInMillis = 24 * 3600 * 1000;
            locs.forEach(function (loc) {
                if ((now - loc.time) <= sameDayDiffInMillis) {
                    setCurrentLocation(loc);
                }
            });
        });
    }
    // myApp.init();
    //todob debug
}

document.addEventListener('deviceready', onDeviceReady, false);
var isInWeb = !(document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
if (isInWeb) {
    window.backgroundGeolocation = {
        configure: () => {
        },
        isLocationEnabled: () => {
        }
    };
    onDeviceReady();
}
$(document).on('pageshow', () => {
    console.log(`page show mbbg`);
    $('#bgapp').on({
        popupbeforeposition: function () {
            var maxHeight = $(window).height() - 30;
            $('#bgapp').css('max-height', maxHeight + 'px');
        }
    });
    //todob debug
    // setTimeout(dev, 1000);
});

//enable developer mode
function dev() {
    $('#bgapp').popup('open');
}