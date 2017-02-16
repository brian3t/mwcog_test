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
                    leg_index = 1;
                    for (var trip_num = 1; trip_num <= 2; trip_num++) {
                        trip = {
                            index: trip_num,
                            commute: (User['trip' + trip_num + 'NoCommute'] === 'N'),
                            legs: []
                        };
                        still_has_leg = false;
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
                                $('.select').selectmenu('refresh');
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
function addLeg(tripno, fromSelectionID, fromSelectionDesc, modeID, modeDesc) {
    var myTable = document.getElementById("LegCommuteTable" + tripno);
    var currentRowCount = document.getElementById("LegCommuteTable" + tripno).rows.length - 4;


    var row = myTable.insertRow(currentRowCount + 3);
    row.setAttribute("style", "line-height:30px");
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);

    cell0.setAttribute("class", "center");
    cell0.innerHTML = "<b>" + (currentRowCount + 3) + "&nbsp;</b>";

    var fromLength = fromSelectionID.length;

    cell1.setAttribute("class", "data");
    var cell1InnerHtml = "<select style='font-size:8pt; height:25px' name='T" + tripno + "L" + (currentRowCount + 3) + "From' id='T" + tripno + "L" + (currentRowCount + 3) + "From' class='select1' onchange='placeholder'>";
    cell1InnerHtml += "<option value='0'></option>";

    for (var i = 0; i < fromLength; i++) {
        cell1InnerHtml += "<option value ='" + fromSelectionID[i] + "''";
        cell1InnerHtml += ">" + fromSelectionDesc[i] + "</option>";
    }
    cell1InnerHtml = cell1InnerHtml + "</select>";
    cell1.innerHTML = cell1InnerHtml;


    cell2.setAttribute("class", "data");
    var cell2InnerHtml = "<select style='font-size:8pt; height:25px' name='T" + tripno + "L" + (currentRowCount + 3) + "To' id='T" + tripno + "L" + (currentRowCount + 3) + "To' class='select1' onchange='placeholder'>";
    cell2InnerHtml += "<option value='0'></option>";

    for (i = 0; i < fromLength; i++) {
        cell2InnerHtml += "<option value ='" + fromSelectionID[i] + "''";
        cell2InnerHtml += ">" + fromSelectionDesc[i] + "</option>";
    }

    cell2InnerHtml += "</select>";
    cell2.innerHTML = cell2InnerHtml;


    var modeLength = modeID.length;
    cell3.setAttribute("class", "data");
    var cell3InnerHtml = "<select style='font-size:8pt; height:25px' name='T" + tripno + "L" + (currentRowCount + 3) + "Mode' id='T" + tripno + "L" + (currentRowCount + 3) + "Mode' class='select1' onchange='placeholder'>";
    cell3InnerHtml += "<option value='0'></option>";

    for (i = 0; i < modeLength; i++) {
        cell3InnerHtml += "<option value ='" + modeID[i] + "''";
        cell3InnerHtml += ">" + modeDesc[i] + "</option>";
    }
    cell3InnerHtml += "</select>";
    cell3.innerHTML = cell3InnerHtml;


    cell4.setAttribute("class", "data");
    cell4.innerHTML = "<input class='textsm' type='text' style='height:25px' size='1' maxlength='3' name='T" + tripno + "L" + (currentRowCount + 3) + "Distance' id='T" + tripno + "L" + (currentRowCount + 3) + "Distance'> miles ";

}
function selectAllPassenger() {
    var is_checked = document.getElementById("selectAll").checked;
    $('.passenger .toWork,.passenger .toHome').prop('checked', is_checked);

}
$(document).ready(function () {
});
