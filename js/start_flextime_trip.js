window.user = ls('user');
GEOCODER = new google.maps.Geocoder();
window.home_addr_obj = new Address();
window.work_addr_obj = new Address();


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
function data_availability_watcher(){
    return home_addr_obj.is_latlng_ready() && work_addr_obj.is_latlng_ready();
}

$(document).ready(function () {

    let [home_addr, work_addr] = user_get_home_work();
    _.extend(home_addr_obj, home_addr);
    home_addr_obj.trim_data();
    home_addr_obj.geocode(GEOCODER);


//todob debugging
    if (IS_DEBUG) {
        /*setTimeout(function () {
            $('#commute_log_calendar').trigger('click');
            // $('#findRidematch').trigger('click');
        }, 200);*/
    }

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

    if (first_of_the_day()){
        $('#destination').val(102).trigger('change');//WORK
    } else {
        $('#destination').val(101).trigger('change');//HOME
    }
});

/**
 * Start bg
 */
function starttrip(){
    app_alert('Please begin your commute now and your trip will be saved automatically once you reach your destination' +
        'if your device remains turned on with geolocation services active',
        () => {
            let config = bgOptions;
            config.commuter_id = user.commuter;
                // trip_id: 'test1234',
                // start_lat: 999998,
                // start_lng: 999997,
                // end_lat: 51.5099,//london uk
                // end_lng: 0.1337,//london uk

            bgConfigure(config);
            // startTracking();
        },
        '', 'OK');
}

