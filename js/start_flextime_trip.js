var user = ls('user');

function goto_commute_log() {
    //jQuery.mobile.navigate('/commute_log_calendar.html');
    setTimeout(function () {
        window.location.href = "commute_log_calendar.html";
    }, 50);
}

$(document).ready(function () {

    var addressArray = JSON.parse(window.localStorage.getItem("addresses"));

    window.localStorage.setItem("startingTime", "9:00 AM");
    window.localStorage.setItem("endingTime", "5:00 PM");

    setTimeout(() => {
        $('#startAddress').selectmenu('refresh');
        $('#endAddress').selectmenu('refresh');
    }, 2000);

    var enrolled = JSON.parse(window.localStorage.getItem("enrolled"));

    $(function () {
        if (enrolled) {
            $("#panel_welcomeuser").popup({transition: 'pop', history: false});
            $("#panel_welcomeuser").popup('open', {transition: 'pop', history: false, positionTo: 'window'});
            // $('#welcomeMsg').popup('open', {transition: 'pop',history:false, positionTo: 'window'});
        }

        if (Number(window.localStorage.getItem("justLoggedIn")) == 1) {
            window.localStorage.setItem("justLoggedIn", 0);
        } else {
            // $('#welcomeMsg').css('display', 'none');
        }

        var mins = ['0', '5', '15', '30', '60', '90', '120'],
            mins_options = '';

        for (var i = 0; i < mins.length; i++) {
            mins_options += '<option value="' + mins[i] + '"' + ((window.localStorage.getItem("arriveAfter") == mins[i]) ? ' selected="selected"' : '') + '>' + mins[i] + ' Minutes</option>';
        }

        setTimeout(()=>$('#flexibility').html(mins_options).selectmenu("refresh"), 1500);
        if (User.hasOwnProperty('commuter_data') && User.commuter_data.hasOwnProperty('firstName')) {
            $('#first_name').html(_.upperFirst(User.commuter_data.firstName.toLowerCase()));
        }

    });

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

/**
 * Determine if now is around `from`
 * @returns {boolean}
 */
window.first_of_the_day = function () {
    let result = false;
    if (user.hasOwnProperty('from')){
        let from = moment(user.from, 'HHmmss');
        let today_minus1h = moment().subtract(1, 'hour');
        let today_plus1h = moment().add(1, 'hour');
        result = from.isAfter(today_minus1h) && from.isBefore(today_plus1h);
    }

    return result;
};