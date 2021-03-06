window.user = ls('user');
GEOCODER = new google.maps.Geocoder();
window.home_addr_obj = new Address();
window.work_addr_obj = new Address();
window.trip_verified_poller_timeout = -1;
window.trip_verified_poller_plugin_timeout = -1;
window.service_running_plugin_poller_timeout = -1;
window.service_recording_plugin_poller_timeout = -1;
const TRIP_VERIFIED_POLLER_FREQUENCY = 5000;
const TRIP_VERIFIED_PLUGIN_POLLER_FREQUENCY = 3000;
const SERVICE_RECORDING_PLUGIN_POLLER_FREQUENCY = 3000;
const SERVICE_RUNNING_PLUGIN_POLLER_FREQUENCY = 300000;
// const SERVICE_RECORDING_PLUGIN_POLLER_FREQUENCY = 7000;//ttodob debug every 7 seconds
const DEST_HOME = 101;
const DEST_WORK = 102;

$(document).ready(function () {
    document.addEventListener('deviceready', function () {
        //did we get here due to Android Intent?
        let intent_reason = ls('intent_reason');
        if (intent_reason) {
            switch (intent_reason) {
                case 'location_service_timeout_reached':
                    app_toast("Flextime trip logging timed out. Please log a new trip. Thanks");
                    break;
                case 'location_service_is_end_of_trip_true':
                    app_toast("Congratulations! Your trip has been verified!");
                    break;
                default:
                    break;
            }
        }
        start_heartbeat();
        let [home_addr, work_addr] = user_get_home_work();
        _.extend(home_addr_obj, home_addr);
        home_addr_obj.trim_data();
        home_addr_obj.geocode(GEOCODER);
        _.extend(work_addr_obj, work_addr);
        work_addr_obj.trim_data();
        work_addr_obj.geocode(GEOCODER);
        $('#travelmode').on('change', data_availability_watcher);
        $('#destination').on('change', data_availability_watcher);


        $('.popup_dismiss').click(function (e) {
            e.preventDefault();
            $('.ui-popup-active>[data-role="popup"]').popup('close', {transition: 'pop', history: false});
        });

        var latlng = window.localStorage.getItem('latlng');
        if (is_nonempty_str(latlng)) {
            try {
                latlng = JSON.parse(latlng);
                console.log('latlng: ');
                console.info(latlng);
            } catch (e) {
                console.error(e);
            }
        }
        window.auto_commute_log_sw = new Switchery(document.querySelector('#auto_commute_log_sw'));
        $('#auto_commute_log_sw').on('change', function () {
            console.log(`checked: ` + window.auto_commute_log_sw.isChecked());
        });
        $('#save_autocomlog_setting_btn').on('click', function (e) {
            // console.log(`checked: ` + window.auto_commute_log_sw.isChecked());
        });

        if (first_of_the_day()) {
            $('#destination').val(102).trigger('change');//WORK
        } else {
            $('#destination').val(101).trigger('change');//HOME
        }
        let is_end_of_trip_plugin_confirmed = ls('is_end_of_trip_plugin_confirmed');
        if (is_end_of_trip_plugin_confirmed === true) {
            app_toast('Your flextime trip has been verified. Thank you. ');
            ls('is_end_of_trip_plugin_confirmed', false);
            switch_mode('initial');
        }
    });
    /*document.addEventListener('backbutton', function (evt) {
        if (device.platform === 'Android' && $('#trip_active:visible').length === 1) {//trip is active. maybe show a reminder text here
        }
    }, false);*/

});

/**
 * Start bg
 */
function starttrip(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();
    //try to start verified trip
    let cur_pos = ls('cur_pos');
    if (typeof cur_pos !== "object" || ! cur_pos.hasOwnProperty('lat') || ! cur_pos.hasOwnProperty('lat')) {
        return app_alert('Please allow geolocation access and try again. Thank you');
    }
    let config = bgOptions;
    let today = moment();
    let home_or_work = ($('#destination').val() === "101" ? 'home' : 'work');
    config.commuter_id = parseInt(user.commuter_data.idCommuter);
    config.trip_id = config.commuter_id + $('#destination option:selected').text() + today.format('YYMMDDHHmmss');
    config.start_lat = cur_pos.lat;
    config.start_lng = cur_pos.lng;
    if (home_or_work === 'home') {
        config.end_lat = home_addr_obj.lat;
        config.end_lng = home_addr_obj.lng;
        // config.end_lat: 51.5099,//london uk
        // config.end_lng: 0.1337,//london uk
    }
    if (home_or_work === 'work') {
        config.end_lat = work_addr_obj.lat;
        config.end_lng = work_addr_obj.lng;
    }
    if (config.end_lat === -1 || config.end_lng === -1) {
        app_alert("Your destination address is invalid, please update it first. Thank you");
        return;
    }
    $.get(FLEX_TRIP_API_URL, {
        action: 'startVerifiedTrip',
        idCommuter: config.commuter_id,
        startLat: cur_pos.lat,
        startLng: cur_pos.lng,
        tripId: config.trip_id,
        tripDate: today.format('MM/DD/YYYY'),
        tripNum: (home_or_work === 'home' ? 2 : 1),
        tripMode: $('#travelmode').val()
    }, (response) => {
        console.log(`startVerifiedTrip result: `);
        console.log(response);
        if (typeof response !== "object") {
            app_alert("Cannot contact FlexTrip API. Please try again");
            console.error(response);
            return;
        }
        if (! response.hasOwnProperty('Success')) {
            app_toast('Failed to send starting signal to FlexTrip API. Please try again later or contact our support. Thank you.' + response.toString());
        } else {
            app_alert('Please begin your commute now and your trip will be saved automatically once you reach your destination' +
                '. If your device remains turned on with geolocation services active',
                () => {
                    console.log(`starting recording.. config: `);
                    console.info(config);
                    bgConfigure(config);
                    startTracking();
                    switch_mode('trip_active', config.trip_id);
                },
                '', 'OK');
        }
    });
    //try to start verified trip end


}

/**
 * poller func that polls server for trip that current id and has is_end_of_trip = true
 */
function trip_verified_poller(trip_id) {
    $.get(MWCOG_GEO_API, {trip_id: trip_id, 'is_end_of_trip': true},
        (response) => {
            if (_.isArray(response) && response.length > 0) {
                // detect trip done
                console.log(`trip done`);
                clearTimeout(trip_verified_poller_timeout);
                clearTimeout(service_running_plugin_poller_timeout);
                clearTimeout(service_recording_plugin_poller_timeout);
                clearTimeout(trip_verified_poller_plugin_timeout);
                app_alert('Congratulations! Your trip has been verified!', () => {
                    switch_mode('initial');
                    window.location = 'search.html';
                }, 'Trip verified');
            } else {
                window.trip_verified_poller_timeout = setTimeout(() => {
                    trip_verified_poller(trip_id);
                }, TRIP_VERIFIED_POLLER_FREQUENCY);
            }
        }, 'json');
}

/**
 * poller func that polls plugin for trip's is_end_of_trip
 */
function trip_verified_plugin_poller() {
    backgroundGeolocation.getIsEndOfTrip((response) => {
        if (response.hasOwnProperty('is_end_of_trip') && response.is_end_of_trip === true) {
            console.log(`trip done - plugin confirmed`);
            clearTimeout(trip_verified_poller_timeout);
            clearTimeout(service_running_plugin_poller_timeout);
            clearTimeout(service_recording_plugin_poller_timeout);
            clearTimeout(trip_verified_poller_plugin_timeout);
            app_alert('Congratulations! Your trip has been verified!', () => {
                switch_mode('initial');
                window.location = 'search.html';
            }, 'Trip verified');
        } else {
            window.trip_verified_poller_plugin_timeout = setTimeout(() => {
                trip_verified_plugin_poller();
            }, TRIP_VERIFIED_PLUGIN_POLLER_FREQUENCY);
        }
    });
}

/**
 * poller func that polls plugin to see if bg process is recording
 */
function service_recording_plugin_poller() {
    backgroundGeolocation.getIsServiceRecording((response) => {
        let is_service_recording_stopped = (typeof response !== 'undefined' && response !== null && response.length === 1 && (response.pop() === false));
        if (is_service_recording_stopped) {
            console.log(`bg process stopped recording - probably is_end_of_trip reached`);
            clearTimeout(trip_verified_poller_timeout);
            clearTimeout(service_running_plugin_poller_timeout);
            clearTimeout(service_recording_plugin_poller_timeout);
            clearTimeout(trip_verified_poller_plugin_timeout);
            app_alert('Congratulations! Your trip has been verified!', () => {
                switch_mode('initial');
                window.location = 'search.html';
            }, 'Trip verified');
        } else {
            window.service_recording_plugin_poller_timeout = setTimeout(() => {
                service_recording_plugin_poller();
            }, SERVICE_RECORDING_PLUGIN_POLLER_FREQUENCY);
        }
    });
}

/**
 * poller func that polls plugin to see if bg process is running
 */
function service_running_plugin_poller() {
    backgroundGeolocation.getIsServiceRunning((response) => {
        let is_service_stopped = (typeof response !== 'undefined' && response !== null && response.length === 1 && (response.pop() === false));
        if (is_service_stopped) {
            console.log(`bg process stopped - probably timeout`);
            clearTimeout(trip_verified_poller_timeout);
            clearTimeout(service_running_plugin_poller_timeout);
            clearTimeout(service_recording_plugin_poller_timeout);
            clearTimeout(trip_verified_poller_plugin_timeout);
            app_alert('Trip logging has ended!', () => {
                switch_mode('initial');
                window.location = 'search.html';
            }, 'Trip logging ended');
        } else {
            window.service_running_plugin_poller_timeout = setTimeout(() => {
                service_running_plugin_poller();
            }, SERVICE_RUNNING_PLUGIN_POLLER_FREQUENCY);
        }
    });
}

/**
 * Switch mode
 * @param mode 'initial', 'trip_active' //future: 'ready', 'verified'
 * @param trip_id
 */
function switch_mode(mode, trip_id = null) {
    if (mode === 'trip_active') {
        stop_heartbeat();
        $('#trip_active').show();
        $('#starttrip_form').hide();
        trip_verified_poller(trip_id);
        trip_verified_plugin_poller();
        setTimeout(service_running_plugin_poller, 2000);//wait for bg process to start before making first poll
        setTimeout(service_recording_plugin_poller, 4000);//wait for bg process to start before making first poll
    } else if (mode === 'initial') {
        start_heartbeat();
        $('#trip_active').hide();
        $('#starttrip_form').show();
        $('#travelmode').val(0).trigger('change');
        clearTimeout(trip_verified_poller_timeout);
        clearTimeout(service_running_plugin_poller_timeout);
        clearTimeout(service_recording_plugin_poller_timeout);
        clearTimeout(trip_verified_poller_plugin_timeout);
        if (typeof backgroundGeolocation === "object" && backgroundGeolocation.hasOwnProperty('resetIsEndOfTrip') && typeof backgroundGeolocation.resetIsEndOfTrip === 'function') {
            backgroundGeolocation.resetIsEndOfTrip();
        }
    }
    ls('app_status', 'start_flextime_trip_' + mode);
}

function stop_logging() {
    app_confirm('Are you sure you want to stop logging this trip?', (response) => {
        if (response) {
            stopTracking();
            switch_mode('initial');
        }
    }, 'Stop Logging Flextime Trip');
}

$(window).on("navigate", function (event, data) {
    console.log(data.state.trip_done_plugin_confirmed);
    console.log(data.state.direction);
    console.log(data.state.url);
});

function goto_commute_log() {
    //jQuery.mobile.navigate('/commute_log_calendar.html');
    setTimeout(function () {
        window.location.href = "commute_log_calendar.html";
    }, 50);
}

/**
 * Event handler
 * Watches for lat lng to be ready
 */
function data_availability_watcher() {
    let all_ready = home_addr_obj.is_latlng_ready() && work_addr_obj.is_latlng_ready() && $('#travelmode').val() !== "0";
    if (! all_ready) {
        return false;
    }
    let selected_dest = parseInt($('#destination').val());
    if (selected_dest === DEST_HOME && home_addr_obj.is_close_to_current_geo()) {
        app_toast('You are already at home! Flextime Trip does not work if you are already to close to your destination. Please try later or choose another destination');
        return false;
    }
    if (selected_dest === DEST_WORK && work_addr_obj.is_close_to_current_geo()) {
        app_toast('You are already at work! Flextime Trip does not work if you are already to close to your destination. Please try later or choose another destination');
        return false;
    }
    if (all_ready) {
        $('#starttrip_btn').removeAttr('disabled');
    } else {
        $('#starttrip_btn').attr('disabled', 'disabled');
    }
    $('#starttrip_btn').button('refresh');
    return all_ready;
}

