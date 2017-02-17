"use strict";
var DATE_FORMAT = 'MM/DD/YYYY';
var DATE_FORMAT_API = 'M/DD/YYYY';
var User = User || {
        type: -1,
        days: [],
        pool_id: ''
    };
var today = moment();
var mwcog_root = 'https://tdm.commuterconnections.org/mwcog/calendarservicecontrol';
if (USE_MWCOG3) {
    mwcog_root = 'http://mwcog3.mediabeef.com/mwcog/calendarservicecontrol';
}
var COMMUTE_PLACE = {0: '', 101: 'Home', 102: 'Work', 103: 'Park & Ride Lot', 104: 'Bus Stop', 106: 'Telework Center', 107: 'Other'};
var COMMUTE_TRAVEL_MODE = {0: '', '78': 'Drive Alone', 79: 'Transit', 80: 'Carpool', 81: 'Vanpool', 82: 'Bike', 83: 'Walk', 84: 'Telework'};
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

function initialize() {
    var _11_days_ago = moment().subtract(11, "days");
    $.ajaxSetup({crossDomain: true});

    //call API to retrieve list of the days (within the last 10 days) that have saved data so those days can be marked green on the calendar
    var url = mwcog_root + "?action=getcalendar&" + build_query();
    var days_return = $.get(url, {}, function (data) {
        User.days = data;
        $('#calendar').fullCalendar({
            height: 470,
            dayRender: function (date, cell) {
                if (date < _11_days_ago.toDate() || date > today.toDate()) {
                    $(cell).addClass('disabled');
                }
            },
            viewRender: add_button_to_calendar
            // put your options and callbacks here
        });
    }, 'json').fail(function (jqXHR, textStatus, errorThrown) {
        console.log('Can\'t get days');
    });
    get_commute_type(today, false);//first call, don't update html yet

}
function add_button_to_calendar() {
    if (typeof User === "undefined" || !User) {
        return false;
    }
    var _10_days_ago = moment().subtract(10, "days");
    for (var i = 0, day = _10_days_ago; i <= 10; i++, day.add(1, "days")) {
        var date_td = $('td.fc-day-top[data-date="' + day.format('YYYY-MM-DD') + '"]');
        if (User.days.indexOf(day.format('DD-MM-YYYY')) !== -1) {
            date_td.append('<br><button class="button">Edit</button>');
        } else {
            date_td.append('<br><button class="button">Add</button>');
        }
        date_td.on('click', edit_log);
    }
}
function get_commute_type(log_date, is_update_html) {
    var leg = {}, trip = {}, leg_index = 1, trip_index = 1, still_has_leg = false, trip_n_leg = '';
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
    User.type = 0;
    $('body').addClass('whirl');
    var type_return = $.ajax(url);
    type_return.then(function (data) {
            User = data;
            if (typeof User.type === "undefined" || !User.type) {
                User.type = 0;
            }
            switch (User.type) {
                case 0:
                case 1: {
                    User.trips = [];
                    leg = {};
                    trip = {};
                    for (var trip_num = 1; trip_num <= 2; trip_num++) {
                        trip = {
                            index: trip_num,
                            commute: (User['trip' + trip_num + 'NoCommute'] === 'N'),
                            legs: []
                        };
                        still_has_leg = false;
                        leg_index = 1;
                        do {
                            trip_n_leg = 'trip' + trip_num + 'leg' + leg_index;
                            leg = {
                                index: leg_index,
                                distance: User[trip_n_leg + 'Distance'],
                                from: User[trip_n_leg + 'From'],
                                mode: User[trip_n_leg + 'Mode'],
                                to: User[trip_n_leg + 'To']
                            };
                            trip.legs.push(leg);
                            leg_index++;
                            still_has_leg = User.hasOwnProperty('trip' + trip_num + 'leg' + leg_index + 'From');
                        } while (still_has_leg);
                        User.trips.push(trip);
                    }
                    if (User.trips.length < 2 || !is_update_html) {
                        // || typeof User.trips.legs === 'undefined' || User.trips.legs.length < 2) {
                        break;
                    }
                    //now assign to html
                    var $trips = $('tbody.trip_table');
                    for (trip_num = 1; trip_num <= 2; trip_num++) {
                        trip = User.trips[trip_num - 1];
                        var $trip = $($trips[trip_num - 1]);
                        for (leg_index = 1; leg_index <= trip.legs.length; leg_index++) {
                            leg = trip.legs[leg_index - 1];
                            var $leg = $trip.find('tr.leg[data-leg-index=' + leg_index + ']');
                            $($leg.find('.distance')).val(leg.distance);
                            $($leg.find('.from')).val(leg.from);
                            $($leg.find('.mode')).val(leg.mode);
                            setTimeout(function () {
                                $('select').selectmenu().selectmenu('refresh');
                            }, 3000);
                            //loop through mode, if it's not selectmenu then init, otherwise refresh it
                            $($leg.find('.to')).val(leg.to);
                        }
                    }
                    break;
                }
                case
                2
                : {
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
                    for (var i = 1; i < User.commuters.length; i++) {
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
                    break;
                }
                default:
                    break;
            }

            $('body').removeClass('whirl');
        }
        ,
        function (jqXHR, textStatus, errorThrown) {
            $('body').removeClass('whirl');
            console.log('Can\'t get user type, assume 0');
        }
    );
}
function edit_log(e) {
    var $e = $($(e.target).closest('td'));
    var date = moment($e.data().date, 'YYYY-MM-DD').format(DATE_FORMAT_API);
    $('body').addClass('has_dialog');
    $('.cur_date').html(date);
    $('.cur_date_val').val(date);
    $('#createdBy').val(window.localStorage.getItem('userName'));
    $('.idPool').val(User.pool_id);
    switch (User.type) {
        case 0: {
            $("body").pagecontainer("change", "#commute_log_entry_page", {role: "dialog"});
            $('.addLegButton').show();
            $(document).on("pagecontainershow", function (event, ui) {
                get_commute_type(date, true);
            });
            break;
        }
        case 1: {
            $("body").pagecontainer("change", "#commute_log_entry_page", {role: "dialog"});
            $('.addLegButton').hide();
            $(document).on("pagecontainershow", function (event, ui) {
                get_commute_type(date, true);
            });
            break;
        }
        case 2: {
            $("body").pagecontainer("change", "#commute_log_van", {role: "dialog"});
            $(document).on("pagecontainershow", function (event, ui) {
                get_commute_type(date, true);
            });
            break;
        }
        default:
            break;
    }

}

function save_and_close() {
    $('#commute_log_entry_page').dialog('close');
    $('body').removeClass('has_dialog');
}

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
function printLeg(index, trip_index, data) {
    var tr = $('<tr class="leg" data-leg-index="' + index + '">'), i = 0;
    tr.html('<td class="header"><b class="ui-table-cell-label">Leg</b><b><span class="index">' + index + '</span>&nbsp;<span class="red">*</span></b></td>');
    var td_from = $('<td>').html('<b class="ui-table-cell-label">From</b>');
    var select = $('<select class="select1 from">').attr('onchange', 'checkSecondLeg(this,' + trip_index + ')');
    $.each(COMMUTE_PLACE, function (k, v) {
        select.append('<option value="' + k + '">' + v + '</option>');
    });
    select.val(data.from);
    td_from.append(select);
    tr.append(td_from);

    var td_to = $('<td>').html('<b class="ui-table-cell-label">To</b>');
    select = $('<select class="select1 to">').attr('onchange', 'checkSecondLeg(this,' + trip_index + ')');
    $.each(COMMUTE_PLACE, function (k, v) {
        select.append('<option value="' + k + '">' + v + '</option>');
    });
    select.val(data.to);
    td_to.append(select);
    tr.append(td_to);

    var td_mode = $('<td>').html('<b class="ui-table-cell-label">Travel Mode</b>');
    select = $('<select class="select1 mode">').attr('onchange', 'checkCommuteMode(this,"T' + trip_index + 'L' + index + 'Distance")');
    $.each(COMMUTE_TRAVEL_MODE, function (k, v) {
        select.append('<option value="' + k + '">' + v + '</option>');
    });
    select.val(data.mode);
    td_mode.append(select);
    tr.append(td_mode);

    tr.append('<td><b class="ui-table-cell-label">Distance (miles)</b><input class="textsm distance" type="number" size="1" maxlength="3" ' +
        'id="T' + trip_index + 'L' + index + 'Distance" name="T' + trip_index + 'L' + index + 'Distance" value="' + data.distance + '"></td>');

    return tr;
}
function addLeg(e) {
    var $tbody = $(e.target).closest('tbody.trip_table');
    var trip_index = $tbody.data('trip-index');
    var num_leg = $tbody.find('tr.leg').length;//e.g. 2
    $tbody.find('tr.leg:last').after(printLeg(num_leg + 1, trip_index, {from: 0, to: 0, mode: 0, distance: ''}));
    $('select').selectmenu();
    $('input[type=number]').textinput();
}
function selectAllPassenger() {
    var is_checked = document.getElementById("selectAll").checked;
    $('.passenger .toWork,.passenger .toHome').prop('checked', is_checked);

}
$(document).ready(function () {
});
