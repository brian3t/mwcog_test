"use strict";
var C = C || {};
var DATE_FORMAT = 'MM/DD/YYYY';
var DATE_FORMAT_API = 'M/DD/YYYY';
var DATE_FORMAT_HTML = 'M/D/YYYY';
var User = User || {
        type: -1,
        days: [],
        pool_id: ''
    };
var today = moment.utc(), _10_days_ago = moment.utc().subtract(10, "days"), _11_days_ago = moment.utc().subtract(11, "days");

var mwcog_root = 'https://tdm.commuterconnections.org/mwcog/calendarservicecontrol';
if (USE_MWCOG) {
    mwcog_root = baseUrl + 'calendarservicecontrol';
}
var CM_HOME = 101, CM_WORK = 102, CM_PNR_LOT = 103, CM_BUS_STOP = 104, CM_TELEWORK = 106, CM_OTHER = 107, CM_DRIVE_ALONE = 78, CM_TRANSIT = 79, CM_CARPOOL = 80,
    CM_VANPOOL = 81
    , CM_BIKE = 82, CM_WALK = 83, CM_TRAVEL_TELEWORK = 84;
var COMMUTE_PLACE = {101: 'Home', 102: 'Work', 103: 'Park & Ride Lot', 104: 'Bus Stop', 106: 'Telework Center', 107: 'Other'};
var COMMUTE_TRAVEL_MODE = {0: 'TRAVEL MODE:', 78: 'Drive Alone', 79: 'Transit', 80: 'Carpool', 81: 'Vanpool', 82: 'Bike', 83: 'Walk', 84: 'Telework'};
function build_query(extra_params) {
    var params = extra_params || {};
    if (typeof params === 'object') {
        params.username = window.localStorage.getItem('userName');
        params.hashedpassword = window.localStorage.getItem('hashedPassword');
    }
    else {
        params.push({username: window.localStorage.getItem('userName')});
        params.push({hashedpassword: window.localStorage.getItem('hashedPassword')});
    }
    return $.param(params);
}
function triggerDialogClose() {
    $('div.ui-dialog-contain a.ui-icon-delete').trigger('click');
}
function goto_search() {
    //jQuery.mobile.navigate('search.html');
    setTimeout(function () {
        window.location.href = "search.html";
    }, 500);
}
function add_button_to_calendar() {
    if (typeof User === "undefined" || !User) {
        return false;
    }
    User.days = User.days || [];
    for (var i = 0, day = _.cloneDeep(_10_days_ago); i <= 10; i++, day.add(1, "days")) {
        var date_td = $('td.fc-day-top[data-date="' + day.format('YYYY-MM-DD') + '"]');
        if (!_.isArray(User.days)) {
            continue;
        }
        if (User.days.indexOf(day.format('DD-MM-YYYY')) !== -1) {
            date_td.append('<br><button class="button">Edit</button>');
            $('td.fc-day[data-date="' + day.format('YYYY-MM-DD') + '"]').addClass('has_log');
        } else {
            date_td.append('<br><button class="button">Add</button>');
        }
        date_td.on('click', edit_log);
    }
}
/**
 * This also destroys and recreates FullCalendar
 */
function get_saved_days() {
    $('#calendar').fullCalendar('destroy');
    var url = mwcog_root + "?action=getcalendar&" + build_query();
    var days_return = $.get(url, {}, function (data) {
        User.days = data;
        $('#calendar').fullCalendar({
            height: 470,
            dayRender: function (date, cell) {
                if (date < _10_days_ago || date > today) {
                    $(cell).addClass('disabled');
                }
            },
            viewRender: add_button_to_calendar
            // put your options and callbacks here
        });
    }, 'json').fail(function (jqXHR, textStatus, errorThrown) {
        console.log('Can\'t get days');
    });
}
function initialize() {
    $.ajaxSetup({crossDomain: true});
    var yesterday = moment.utc().subtract(1, "days");
    //call API to retrieve list of the days (within the last 10 days) that have saved data so those days can be marked green on the calendar
    get_saved_days();
    get_commute_type(today, false);//first call, don't update html yet

}
function get_commute_type(log_date, is_update_html) {
    var leg = {}, trip = {}, leg_index = 1, trip_index = 1, still_has_trip = false, still_has_leg = false, trip_n_leg = '';
    if (typeof is_update_html === "undefined" || !is_update_html) {
        is_update_html = false;
    }
    //get commute log type
    if (typeof log_date === 'undefined') {
        log_date = moment().format('M/D/YYYY');
    }
    if (typeof log_date === 'object' && (log_date.constructor.name === 'moment' || log_date._isAMomentObject )) {
        log_date = log_date.format('M/D/YYYY');
    }
    var url = mwcog_root + "?action=getCommuteLogType&" + build_query({'log_date': log_date});
    // $('body').addClass('whirl');
    showSpinner();
    var type_return = $.ajax(url);
    type_return.then(function (data) {
            User = data;
            if (typeof User.type === "undefined" || !User.type) {
                User.type = 0;
            }
            switch (User.type) {
                case C.TYPE_GENERAL:
                case C.TYPE_CIP: {
                    User.trips = [];
                    leg = {};
                    trip = {};
                    still_has_trip = User.hasOwnProperty('trip' + trip_index + 'leg1From');
                    while (still_has_trip) {
                        trip = {
                            index: trip_index,
                            commute: (User['trip' + trip_index + 'NoCommute'] === 'N'),
                            legs: []
                        };
                        still_has_leg = false;
                        leg_index = 1;
                        do {
                            trip_n_leg = 'trip' + trip_index + 'leg' + leg_index;
                            leg = {
                                index: leg_index,
                                distance: User[trip_n_leg + 'Distance'],
                                from: User[trip_n_leg + 'From'],
                                mode: User[trip_n_leg + 'Mode'],
                                to: User[trip_n_leg + 'To']
                            };
                            if (!(leg.from === 0 || leg.to === 0 || leg.mode === '0')) {
                                trip.legs.push(leg);
                            }
                            leg_index++;
                            still_has_leg = User.hasOwnProperty('trip' + trip_index + 'leg' + leg_index + 'From');
                        } while (still_has_leg);
                        User.trips.push(trip);
                        trip_index++;
                        still_has_trip = User.hasOwnProperty('trip' + trip_index + 'leg1From');
                    }
                    if (!is_update_html) {
                        break;
                    }
                    // if (User.trips.length < 2 && User.type === 0) {//for this date there's no data, but this is general log, so we default some values here
                    //     User.trips = [{legs: [{from: CM_HOME, to: CM_WORK, mode: CM_CARPOOL, distance: null}]},
                    //         {legs: [{from: CM_WORK, to: CM_HOME, mode: CM_CARPOOL, distance: null}]}];
                    // }
                    //now assign to html
                    var $trips = $('tbody.trip_table');

                    for (trip_index = 1; trip_index <= User.trips.length; trip_index++) {
                        trip = User.trips[trip_index - 1];
                        var $trip = $($trips[trip_index - 1]);
                        $trip.find('tr.leg').remove();
                        for (leg_index = 1; leg_index <= trip.legs.length; leg_index++) {
                            $trip.find('tr:last').before(print_leg(leg_index, trip_index, trip.legs[leg_index - 1]));
                        }
                        $('select').selectmenu();
                        $('input[type=number]').textinput();
                    }
                    break;
                }
                case C.TYPE_VIEW_ONLY_VIP:
                case C.TYPE_VIP: {
                    User.pool_id = User.commuter1PoolID;
                    User.commuters = [];
                    var still_has_commuter = false;
                    var index = 1;

                    do {
                        var commuter = {
                            index: index,
                            id: User['commuter' + index + 'Id'],
                            first_name: User['commuter' + index + 'FirstName'],
                            last_name: User['commuter' + index + 'LastName'],
                            pool_id: User['commuter' + index + 'PoolID'],
                            hb_miles: User['commuter' + index + 'hbMiles'],
                            hb_commute: (User['commuter' + index + 'hbNoCommute'] === 'N'),
                            wb_miles: User['commuter' + index + 'wbMiles'],
                            wb_commute: (User['commuter' + index + 'wbNoCommute'] === 'N')
                        };
                        User.commuters.push(commuter);
                        index++;
                        still_has_commuter = User.hasOwnProperty('commuter' + index + 'Id');

                    } while (still_has_commuter);
                    //populating HTML
                    $('.passenger').remove();
                    var $passenger_table = $('#passenger_table');
                    for (var i = 0; i < User.commuters.length; i++) {
                        var passenger = User.commuters[i];
                        var $tr = $('<tr/>').addClass('passenger');
                        $tr.attr('data-index', passenger.index - 1);
                        var $td = $('<td/>');
                        $td.append($('<input/>').addClass('id').prop('type', 'hidden').prop('value', passenger.id));
                        $td.append($('<span/>').addClass('name').html(passenger.first_name + ' ' + passenger.last_name));
                        $tr.append($td);

                        $td = $('<td/>');
                        $td.append($('<input/>').addClass('wbMiles').prop('type', 'text').prop('size', 4).val(passenger.wb_miles));
                        $tr.append($td);

                        $td = $('<td/>');
                        $td.append($('<input/>').addClass('wbCommute toWork').prop('type', 'checkbox').val('present').prop('checked', passenger.wb_commute));
                        $tr.append($td);

                        $td = $('<td/>');
                        $td.append($('<input/>').addClass('hbMiles').prop('type', 'text').prop('size', 4).val(passenger.hb_miles));
                        $tr.append($td);

                        $td = $('<td/>');
                        $td.append($('<input/>').addClass('hbCommute toHome').prop('type', 'checkbox').val('present').prop('checked', passenger.hb_commute));
                        $tr.append($td);
                        $passenger_table.append($tr);
                    }
                    if (User.type === C.TYPE_VIEW_ONLY_VIP) {
                        $('#view_only_vip_message').show();
                        $('#updateVIPlogButton').hide();
                    } else {
                        $('#view_only_vip_message').hide();
                        $('#updateVIPlogButton').show();
                    }
                    var User_wo_commuter = _.pickBy(User, function (v, k) {
                        return k.indexOf('commuter') === -1;
                    });
                    var van_log_inputs = $('#van_log :input[data-api_field]');
                    _.each(van_log_inputs, function (v) {
                        var api_key = $(v).data('api_field');
                        if (User.hasOwnProperty(api_key)){
                            $(v).val(User[api_key]);
                        } else {
                            console.info('v: ' + v);
                            //START add custom defaults if value = null
                            switch (v.id) {
                                case 'other':
                                case 'toll':
                                case 'park':
                                case 'pricePerGallon':
                                case 'gallons':
                                case 'gas':
                                    $(v).val('0');
                                    break;
                                default:
                                $(v).val('');    
                            }
                            // END 
                        }
                    });
                    break;
                }
                default:
                    break;
            }
            if (User.type === C.TYPE_CIP) {
                $('#cip_message').show();
            } else {
                $('#cip_message').hide();
            }

            // $('body').removeClass('whirl');
            hideSpinner();
        }
        ,
        function (jqXHR, textStatus, errorThrown) {
            // $('body').removeClass('whirl');
            hideSpinner();
            console.log('Can\'t get user type, assume 0');
        }
    );
}
function edit_log(e) {
    var $e = $($(e.target).closest('td'));
    var date = moment($e.data().date, 'YYYY-MM-DD').format(DATE_FORMAT_API);
    $('body').addClass('has_dialog');
    $('.cur_date').html(date);
    $('.cur_date_mdy').html(moment($e.data().date, 'YYYY-MM-DD').format(DATE_FORMAT_HTML));
    $('.cur_date_val').val(date);
    $('#createdBy').val(window.localStorage.getItem('userName'));
    $('.idPool').val(User.pool_id);
    switch (User.type) {
        case 0: {
            $("body").pagecontainer("change", "#commute_log_entry_page", {role: "dialog"});
            $('.addLegButton').show();
            $(document).on("pagecontainershow", function (event, ui) {
                get_commute_type(date, true);
                get_saved_days();
            });
            break;
        }
        case 1: {
            $("body").pagecontainer("change", "#commute_log_entry_page", {role: "dialog"});
            $('.addLegButton').hide();
            $(document).on("pagecontainershow", function (event, ui) {
                get_commute_type(date, true);
                get_saved_days();
            });
            break;
        }
        case 2:
        case 3: {
            $("body").pagecontainer("change", "#commute_log_van", {role: "dialog"});
            $(document).on("pagecontainershow", function (event, ui) {
                get_commute_type(date, true);
                get_saved_days();
            });
            break;
        }
        default:
            break;
    }

}

// function save_and_close() {
//     $('#commute_log_entry_page').dialog('close');
//     $('body').removeClass('has_dialog');
// }

function showHideDropDown(box, id) {
    if (box.checked) {
        document.getElementById('noCommuteDropDown').style.display = '';

        document.getElementById("T1L1From").value = '0';
        document.getElementById("T1L1From").disabled = true;
        document.getElementById("T1L1From").style.backgroundColor = '#C4C4C4';
        document.getElementById("T1L2From").value = '0';
        document.getElementById("T1L2From").disabled = true;
        document.getElementById("T1L2From").style.backgroundColor = '#C4C4C4';
        document.getElementById("T2L1From").value = '0';
        document.getElementById("T2L1From").disabled = true;
        document.getElementById("T2L1From").style.backgroundColor = '#C4C4C4';
        document.getElementById("T2L2From").value = '0';
        document.getElementById("T2L2From").disabled = true;
        document.getElementById("T2L2From").style.backgroundColor = '#C4C4C4';

        document.getElementById("T1L1To").value = '0';
        document.getElementById("T1L1To").disabled = true;
        document.getElementById("T1L1To").style.backgroundColor = '#C4C4C4';
        document.getElementById("T1L2To").value = '0';
        document.getElementById("T1L2To").disabled = true;
        document.getElementById("T1L2To").style.backgroundColor = '#C4C4C4';
        document.getElementById("T2L1To").value = '0';
        document.getElementById("T2L1To").disabled = true;
        document.getElementById("T2L1To").style.backgroundColor = '#C4C4C4';
        document.getElementById("T2L2To").value = '0';
        document.getElementById("T2L2To").disabled = true;
        document.getElementById("T2L2To").style.backgroundColor = '#C4C4C4';

        document.getElementById("T1L1Mode").value = '0';
        document.getElementById("T1L1Mode").disabled = true;
        document.getElementById("T1L1Mode").style.backgroundColor = '#C4C4C4';
        document.getElementById("T1L2Mode").value = '0';
        document.getElementById("T1L2Mode").disabled = true;
        document.getElementById("T1L2Mode").style.backgroundColor = '#C4C4C4';
        document.getElementById("T2L1Mode").value = '0';
        document.getElementById("T2L1Mode").disabled = true;
        document.getElementById("T2L1Mode").style.backgroundColor = '#C4C4C4';
        document.getElementById("T2L2Mode").value = '0';
        document.getElementById("T2L2Mode").disabled = true;
        document.getElementById("T2L2Mode").style.backgroundColor = '#C4C4C4';


        document.getElementById("T1L1Distance").value = '0';
        document.getElementById("T1L2Distance").value = '0';
        document.getElementById("T2L1Distance").value = '0';
        document.getElementById("T2L2Distance").value = '0';
        document.getElementById("T1L1Distance").readOnly = true;
        document.getElementById("T1L2Distance").readOnly = true;
        document.getElementById("T2L1Distance").readOnly = true;
        document.getElementById("T2L2Distance").readOnly = true;
        document.getElementById("T1L1Distance").style.backgroundColor = '#C4C4C4';
        document.getElementById("T1L2Distance").style.backgroundColor = '#C4C4C4';
        document.getElementById("T2L1Distance").style.backgroundColor = '#C4C4C4';
        document.getElementById("T2L2Distance").style.backgroundColor = '#C4C4C4';
    } else {
        document.getElementById('noCommuteDropDown').style.display = 'none';

        document.getElementById("T1L1From").disabled = false;
        document.getElementById("T1L1From").style.backgroundColor = 'white';
        document.getElementById("T1L2From").disabled = false;
        document.getElementById("T1L2From").style.backgroundColor = 'white';
        document.getElementById("T2L1From").disabled = false;
        document.getElementById("T2L1From").style.backgroundColor = 'white';
        document.getElementById("T2L2From").disabled = false;
        document.getElementById("T2L2From").style.backgroundColor = 'white';

        document.getElementById("T1L1To").disabled = false;
        document.getElementById("T1L1To").style.backgroundColor = 'white';
        document.getElementById("T1L2To").disabled = false;
        document.getElementById("T1L2To").style.backgroundColor = 'white';
        document.getElementById("T2L1To").disabled = false;
        document.getElementById("T2L1To").style.backgroundColor = 'white';
        document.getElementById("T2L2To").disabled = false;
        document.getElementById("T2L2To").style.backgroundColor = 'white';


        document.getElementById("T1L1Mode").disabled = false;
        document.getElementById("T1L1Mode").style.backgroundColor = 'white';
        document.getElementById("T1L2Mode").disabled = false;
        document.getElementById("T1L2Mode").style.backgroundColor = 'white';
        document.getElementById("T2L1Mode").disabled = false;
        document.getElementById("T2L1Mode").style.backgroundColor = 'white';
        document.getElementById("T2L2Mode").disabled = false;
        document.getElementById("T2L2Mode").style.backgroundColor = 'white';

        document.getElementById("T1L1Distance").readOnly = false;
        document.getElementById("T1L2Distance").readOnly = false;
        document.getElementById("T2L1Distance").readOnly = false;
        document.getElementById("T2L2Distance").readOnly = false;
        document.getElementById("T1L1Distance").style.backgroundColor = 'white';
        document.getElementById("T1L2Distance").style.backgroundColor = 'white';
        document.getElementById("T2L1Distance").style.backgroundColor = 'white';
        document.getElementById("T2L2Distance").style.backgroundColor = 'white';

    }

}
function print_leg(index, trip_index, data) {
    if (data.from === null) {
        data.from = 0;
    }
    if (data.to === null) {
        data.to = 0;
    }
    if (data.mode === null) {
        data.mode = 0;
    }
    var tr = $('<tr class="leg" data-leg-index="' + index + '">'), i = 0, T1L1 = 'T' + trip_index + 'L' + index;
    tr.html('<td class="header"><b class="ui-table-cell-label">LEG <span class="index">' + index + '</span></b></td>');
    var td_from = $('<td class="w48 data">');
    var select = $('<select name="' + T1L1 + 'From" class=" select1 from">').attr('onchange', 'checkSecondLeg(this,' + trip_index + ')');
    select.append('<option value="0">FROM:</option>');
    $.each(COMMUTE_PLACE, function (k, v) {
        select.append('<option value="' + k + '">' + v + '</option>');
    });
    select.val(data.from);
    td_from.append(select);
    tr.append(td_from);

    var td_to = $('<td class="w48 data pull-right">');
    select = $('<select name="' + T1L1 + 'To" class="select1 to">').attr('onchange', 'checkSecondLeg(this,' + trip_index + ')');
    select.append('<option value="0">TO:</option>');
    $.each(COMMUTE_PLACE, function (k, v) {
        select.append('<option value="' + k + '">' + v + '</option>');
    });
    select.val(data.to);
    td_to.append(select);
    tr.append(td_to);

    var td_mode = $('<td class="w48">');
    select = $('<select name="' + T1L1 + 'Mode" class="select1 mode">').attr('onchange', 'checkCommuteMode(this,"T' + trip_index + 'L' + index + 'Distance")');
    $.each(COMMUTE_TRAVEL_MODE, function (k, v) {
        select.append('<option value="' + k + '">' + v + '</option>');
    });
    select.val(data.mode);
    td_mode.append(select);
    tr.append(td_mode);

    tr.append('<td class="w48 pull-right"><input class="textsm distance" name="' + T1L1 + 'Distance" type="number" size="1" maxlength="3" ' +
        'id="' + T1L1 + 'Distance" value="' + data.distance + '" placeholder="Distance (miles):"></td>');
    $('select').on('change', function () {
        $(this).selectmenu('refresh');
    });

    return tr;
}
function addLeg(e) {
    var $tbody = $(e.target).closest('tbody.trip_table');
    var trip_index = $tbody.data('trip-index');
    var num_leg = $tbody.find('tr.leg').length;//e.g. 2
    $tbody.find('tr.leg:last').after(print_leg(num_leg + 1, trip_index, {from: 0, to: 0, mode: 0, distance: ''}));
    $('select').selectmenu();
    $('input[type=number]').textinput();
}
function selectAllPassenger() {
    var is_checked = document.getElementById("selectAll").checked;
    $('.passenger .toWork,.passenger .toHome').prop('checked', is_checked);

}
$(document).ready(function () {
});
