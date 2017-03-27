function setLogDate(formObj) {
    if (formObj.tripDate.value == null || formObj.tripDate.value == "") {
        alert("Select the commute trip date and click on 'Continue' button.");
        return false;
    }
    var dateVal = document.getElementById("tripDate");
    var dateExp = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/;
    var myDate = new Date(dateVal.value);
    var today = new Date();

    if (!dateVal.value.match(dateExp)) {
        alert("Please enter the date in MM/DD/YYYY format or select from calendar widget.");
        dateVal.focus();
        return false;
    } else if (myDate > today) {
        alert("Trip Date cannot be later than today.");
        dateVal.focus();
        return false;
    }

    formObj.action.value = "setlogdate";
    formObj.submit();
    return true;
}

function checkSecondLeg(point, str) {
    var formObj = point.form;
    var formName = point.form.name;
    if (formObj.T1L1From.value == '101' && formObj.T1L1To.value == '102') {
        formObj.T1L2From.value = "0";
        $(formObj.T1L2From).selectmenu('refresh');
        formObj.T1L2To.value = "0";
        $(formObj.T1L2To).selectmenu('refresh');
        formObj.T1L2Mode.value = "0";
        $(formObj.T1L2Mode).selectmenu('refresh');
        formObj.T1L2Distance.value = "";
    }
    if (formObj.T2L1From.value == '102' && formObj.T2L1To.value == '101') {
        formObj.T2L2From.value = "0";
        $(formObj.T2L2From).selectmenu('refresh');
        formObj.T2L2To.value = "0";
        $(formObj.T2L2To).selectmenu('refresh');
        formObj.T2L2Mode.value = "0";
        $(formObj.T2L2Mode).selectmenu('refresh');
        formObj.T2L2Distance.value = "";
    }

    if (formObj.T1L1From.value == '101' && formObj.T1L1To.value == '106') {
        formObj.T1L2From.value = "0";
        $(formObj.T1L2From).selectmenu('refresh');
        formObj.T1L2To.value = "0";
        $(formObj.T1L2To).selectmenu('refresh');
        formObj.T2L1From.value = "106";
        $(formObj.T2L1From).selectmenu('refresh');
        formObj.T2L1To.value = "101";
        $(formObj.T2L1To).selectmenu('refresh');
        formObj.T2L2From.value = "0";
        $(formObj.T2L2From).selectmenu('refresh');
        formObj.T2L2To.value = "0";
        $(formObj.T2L2To).selectmenu('refresh');
        formObj.T1L2Mode.value = "0";
        $(formObj.T1L2Mode).selectmenu('refresh');
        formObj.T1L2Distance.value = "";
    }
    return true;
}

function checkCommuteMode(cmode, str) {
    if (cmode.options[cmode.selectedIndex].value == '109' ||
        cmode.options[cmode.selectedIndex].value == '110') {
        $('[name="T1L1To"]').val(102).selectmenu('refresh');
        $('[name="T1L2From"]').val(0).selectmenu('refresh');
        $('[name="T1L2To"]').val(0).selectmenu('refresh');
        $('[name="T2L1From"]').val(102).selectmenu('refresh');
        $('[name="T2L1To"]').val(101).selectmenu('refresh');
        $('[name="T2L2From"]').val(0).selectmenu('refresh');
        $('[name="T2L2To"]').val(0).selectmenu('refresh');
        $('[name="T1L2Mode"]').val(0).selectmenu('refresh');
        $('[name="T2L2Mode"]').val(0).selectmenu('refresh');
        $('[name="T1L2Distance"]').val();
        $('[name="T2L2Distance"]').val();
        $('[name="T2L1Mode"]').val(cmode.options[cmode.selectedIndex].value);
        $('[name="T1L1Distance"]').val($('[name="tripDist"]').value); //"0).selectmenu('refresh');
        $('[name="T2L1Distance"]').val($('[name="tripDist"]').value); //"0).selectmenu('refresh');
        $('[name="T2L1Mode"]').prop('disabled', true); //**
        $('[name="T1L1Distance"]').prop('disabled', true);
        $('[name="T1L2Distance"]').prop('disabled', true);
        $('[name="T2L1Distance"]').prop('disabled', true);
        $('[name="T2L2Distance"]').prop('disabled', true);
    } else if (cmode.options[cmode.selectedIndex].value == '111') {
        $('[name="T1L1From"]').val(101).selectmenu('refresh');
        $('[name="T1L1To"]').val(102).selectmenu('refresh');
        $('[name="T1L2From"]').val(0).selectmenu('refresh');
        $('[name="T1L2To"]').val(0).selectmenu('refresh');
        $('[name="T2L1From"]').val(102).selectmenu('refresh');
        $('[name="T2L1To"]').val(101).selectmenu('refresh');
        $('[name="T2L2From"]').val(0).selectmenu('refresh');
        $('[name="T2L2To"]').val(0).selectmenu('refresh');
        $('[name="T1L2Mode"]').val(0).selectmenu('refresh');
        $('[name="T2L1Mode"]').val(111).selectmenu('refresh');
        $('[name="T2L2Mode"]').val(0).selectmenu('refresh');
        $('[name="T1L1Distance"]').val(0);
        $('[name="T1L2Distance"]').val();
        $('[name="T2L1Distance"]').val(0);
        $('[name="T2L2Distance"]').val();
        $('[name="T2L1Mode"]').prop('disabled', true); //**
        $('[name="T1L1Distance"]').prop('disabled', true);
        $('[name="T1L2Distance"]').prop('disabled', true);
        $('[name="T2L1Distance"]').prop('disabled', true);
        $('[name="T2L2Distance"]').prop('disabled', true);
    } else {
        //$('[name=str).prop('disabled', false);
        $('[name="T2L1Mode"]').prop('disabled', false);
        $('[name="T1L1Distance"]').prop('disabled', false);
        $('[name="T1L2Distance"]').prop('disabled', false);
        $('[name="T2L1Distance"]').prop('disabled', false);
        $('[name="T2L2Distance"]').prop('disabled', false);
    }
    return true;
}

//TODO
//add return false if failed to selection
function saveCommuteLogsWithAdditionalLegs(formObj) {

    if (document.getElementById("noCommute") !== null && document.getElementById("noCommute").checked === true) {
        if (formObj.noCommuteReason.value == '0') {
            alert("no commute reason must be selected");
            return false;
        } else {
            save_commute_logs_ajax(formObj);
            return true;
        }
    }
    if (document.getElementById("T1L3From") === null && document.getElementById("T1L3To") === null && document.getElementById("T2L3From") === null && document.getElementById("T2L3To") === null) {
        saveCommuteLogs(formObj);
    } else {
        //alert("multi leg verification");
        //check for start location
        if (formObj.T1L1From.value == '0') {
            alert("Select Start for Leg 1 of Trip 1.");
            formObj.T1L1From.focus();
            return false;
        }
        if (formObj.T1L1To.value == '0') {
            alert("Select To for Leg 1 of Trip 1.");
            formObj.T1L1To.focus();
            return false;
        }

        if (typeof formObj.T1L2From !== 'undefined' && formObj.T1L2From.value == '101') {
            alert("Start of leg 2 of Trip 1 cannot be from 'Home'.");
            formObj.T1L2From.value = formObj.T1L1To.value;
            return false;
        }

        if (formObj.T1L1Mode.value == '0') {
            alert("Select Commute Mode for Leg 1 of Trip 1.");
            formObj.T1L1Mode.focus();
            return false;
        }
        if (formObj.T1L1Distance.value == '') {
            alert("Enter Commute Distance for Leg 1 of Trip 1.");
            formObj.T1L1Distance.focus();
            return false;
        }
        if (formObj.T2L1From.value == '0') {
            alert("Select Start for Leg 1 of Trip 2.");
            formObj.T2L1From.focus();
            return false;
        }
        if (formObj.T2L1To.value == '0') {
            alert("Select To for Leg 1 of Trip 2.");
            formObj.T2L1To.focus();
            return false;
        }
        if (formObj.T2L1Mode.value == '0') {
            alert("Select Commute Mode for Leg 1 of Trip 2.");
            formObj.T2L1Mode.focus();
            return false;
        }
        if (formObj.T2L1Distance.value == '') {
            alert("Enter Commute Distance for Leg 1 of Trip 2.");
            formObj.T2L1Distance.focus();
            return false;
        }

        //leg 2 cannot be null if leg 3 is added
        if (document.getElementById("T1L3From") != null || document.getElementById("T1L3To") != null || document.getElementById("T1L3Mode") != null || document.getElementById("T1L3Distance") != null) {
            if (formObj.T1L2From.value == '0') {
                alert("Select Start for Leg 2 of Trip 1.");
                formObj.T1L2From.focus();
                return false;
            }
            if (formObj.T2L1To.value == '0') {
                alert("Select To for Leg 2 of Trip 1.");
                formObj.T1L2To.focus();
                return false;
            }

            if (formObj.T1L2Mode.value == '0') {
                alert("Select Commute Mode for Leg 2 of Trip 1.");
                formObj.T1L2Mode.focus();
                return false;
            }
            if (formObj.T1L2Distance.value == '') {
                alert("Enter Commute Distance for Leg 2 of Trip 1.");
                formObj.T1L2Distance.focus();
                return false;
            }
        }

        //leg 2 cannot be null if leg 3 is added
        if (document.getElementById("T2L3From") != null || document.getElementById("T2L3To") != null || document.getElementById("T2L3Mode") != null || document.getElementById("T2L3Distance") != null) {

            //leg 2 can be null if leg3 is empty
            if (document.getElementById("T2L3From").value == '0' && document.getElementById("T2L3To").value == '0' && document.getElementById("T2L3Mode").value == '0' && document.getElementById("T2L3Distance").value == '') {

            } else {
                if (formObj.T2L2From.value == '0') {
                    alert("Select Start for Leg 2 of Trip 2.");
                    formObj.T2L1From.focus();
                    return false;
                }
                if (formObj.T2L2To.value == '0') {
                    alert("Select To for Leg 2 of Trip 2.");
                    formObj.T2L2To.focus();
                    return false;
                }
                if (formObj.T2L2Mode.value == '0') {
                    alert("Select Commute Mode for Leg 2 of Trip 2.");
                    formObj.T2L2Mode.focus();
                    return false;
                }
                if (formObj.T2L1Distance.value == '') {
                    alert("Enter Commute Distance for Leg 2 of Trip 2.");
                    formObj.T2L1Distance.focus();
                    return false;
                }
            }
        }


        for (i = 1; i < 3; i++) {
            //number of legs for each table
            var tableRowCount = document.getElementById("LegCommuteTable" + i).rows.length - 2;


            //iterate thru each of legs for table i
            for (j = 1; j <= tableRowCount; j++) {

                //if from to are the same, and not unselected
                if (document.getElementById("T" + i + "L" + j + "From").value == document.getElementById("T" + i + "L" + j + "To").value) {
                    if (document.getElementById("T" + i + "L" + j + "From").value != '0') {
                        alert("Start and destination for Leg" + j + "of Trip " + i + " cannot be the same.");
                        return false;
                    }
                }

                if (j > 1) {
                    if (document.getElementById("T" + i + "L" + j + "From").value != '0') {
                        if (document.getElementById("T" + i + "L" + j + "From").value != document.getElementById("T" + i + "L" + (j - 1) + "To").value) {
                            alert("Start for Leg " + j + " must match Destination for leg " + (j - 1) + " on Trip " + i);
                            return false;
                        }
                    }
                }


                if (j > 2) {
                    if (document.getElementById("T" + i + "L" + j + "From").value == '0' && document.getElementById("T" + i + "L" + j + "To").value == '0' && document.getElementById("T" + i + "L" + j + "Mode").value == '0' && document.getElementById("T" + i + "L" + j + "Distance").value == '') {

                    }
                    else {

                        if (document.getElementById("T" + i + "L" + j + "From").value == '0') {
                            alert("Select Start for Leg " + j + " of Trip " + i + ".");
                            return false;
                        }
                        if (document.getElementById("T" + i + "L" + j + "To").value == '0') {
                            alert("Select To for Leg " + j + " of Trip " + i + ".");
                            return false;
                        }
                        if (document.getElementById("T" + i + "L" + j + "Mode").value == '0') {
                            alert("Select Mode for Leg " + j + " of Trip " + i + ".");
                            return false;
                        }
                        if (document.getElementById("T" + i + "L" + j + "Distance").value == '') {
                            alert("Enter Commute Distance for Leg " + j + " of Trip " + i + ".");
                            return false;
                        }
                    }
                }

                //final row check for table1
                if (j == tableRowCount && i == 1) {

                }
            }

        }

        //round all distance numbers
        return save_commute_logs_ajax(formObj);
    }

}

//now submit to calendar API service
function save_commute_logs_ajax(formObj, is_update) {
    var form_array = $(formObj).serializeArray(), success = false;
    if (typeof is_update == "undefined") {
        is_update = false;
    }
    for (var i = 0; i < form_array.length; i++) {
        var v = form_array[i];
        if (typeof v != "undefined") {
            if (v.name == 'idPool' || v.name == 'logType') {
                form_array.splice(i, 1);
                i--;
                continue;
            }
            v.name = v.name.replace('T1L', 'toWorkleg');
            v.name = v.name.replace('T2L', 'toHomeleg');
        }
    }
    var url = mwcog_root;
    var extra_params = {};
    extra_params.action = 'saveCommuteLog';
    extra_params.noCommute = false;
    switch (User.type) {
        case 0:
            extra_params.action += 'General';
            $.each(form_array, function (i, v) {
                if (v.name == 'tripDate') {
                    v.value = moment(v.value, 'M/DD/YYYY').format('MM/DD/YYYY');
                }
            });
            if (User.trips[0].legs.length == 1) {
                extra_params = $.extend(extra_params, {
                    toHomeleg2From: 0,
                    toHomeleg2To: 0,
                    toHomeleg2Mode: 0,
                    toHomeleg2Distance: 0,
                    toWorkleg2From: 0,
                    toWorkleg2To: 0,
                    toWorkleg2Mode: 0,
                    toWorkleg2Distance: 0
                });
            }
            break;
        case 1:
            extra_params.action += 'CIP';
            break;
        case 2:
            extra_params.action += 'VIP';
            break;
    }
    var params = build_query(extra_params) + '&' + $.param(form_array);
    $.get(url + '?' + params, {}, function (result) {
        console.info(result);
        if (result.status === 200 || result.status.indexOf('success') !== -1) {
            app_toast('Your commute log has been saved. Click OK to return to the Commute Log Calendar.');
            $('div.ui-dialog-contain a.ui-icon-delete').trigger('click');

        }
    }, 'json').fail(function (error) {
        console.info(error);
        window.error = error.responseText;
        if (error.status === 200 || result.status.indexOf('success') !== -1) {
            app_toast('Your commute log has been saved. Click OK to return to the Commute Log Calendar.');
            $('div.ui-dialog-contain a.ui-icon-delete').trigger('click');
        }
    });

    //fix weird validation
    $('#T1L2From').val(0);
    $('#T2L2From').val(0);
    return false;
}

function saveCommuteLogs(formObj) {
    if (formObj.T1L1From.value == '0') {
        alert("Select Start for Leg 1 of Trip 1.");
        formObj.T1L1From.focus();
        return false;
    }
    if (formObj.T1L1To.value == '0') {
        alert("Select To for Leg 1 of Trip 1.");
        formObj.T1L1To.focus();
        return false;
    }
    if (formObj.T1L1Mode.value == '0') {
        alert("Select Commute Mode for Leg 1 of Trip 1.");
        formObj.T1L1Mode.focus();
        return false;
    }
    if (formObj.T1L1Distance.value == '') {
        alert("Enter Commute Distance for Leg 1 of Trip 1.");
        formObj.T1L1Distance.focus();
        return false;
    } else
        formObj.T1L1Distance.value = Math.round(formObj.T1L1Distance.value);

    if (formObj.T2L1From.value == '0') {
        alert("Select Start for Leg 1 of Trip 2.");
        formObj.T2L1From.focus();
        return false;
    }
    if (formObj.T2L1To.value == '0') {
        alert("Select To for Leg 1 of Trip 2.");
        formObj.T2L1To.focus();
        return false;
    }
    if (formObj.T2L1Mode.value == '0') {
        alert("Select Commute Mode for Leg 1 of Trip 2.");
        formObj.T2L1Mode.focus();
        return false;
    }
    if (formObj.T2L1Distance.value == '') {
        alert("Enter Commute Distance for Leg 1 of Trip 2.");
        formObj.T2L1Distance.focus();
        return false;
    } else
        formObj.T2L1Distance.value = Math.round(formObj.T2L1Distance.value);

    if ((formObj.T1L1From.value == '101' || formObj.T1L1From.value == '102') &&
        (formObj.T1L1From.value == formObj.T1L1To.value)) {
        alert("Start and destination for Leg 1 of Trip 1 cannot be same.");
        formObj.T1L1From.focus();
        return false;
    }
    if ((formObj.T2L1From.value == '101' || formObj.T2L1From.value == '102') &&
        (formObj.T2L1From.value == formObj.T2L1To.value)) {
        alert("Start and destination for Leg 1 of Trip 2 cannot be same.");
        formObj.T2L1From.focus();
        return false;
    }

    if (typeof formObj.T1L2From !== 'undefined') {
        if ((formObj.T1L2From.value == '101' || formObj.T1L2From.value == '102') &&
            (formObj.T1L2From.value == formObj.T1L2To.value)) {
            alert("Start and destination for Leg 2 of Trip 1 cannot be same.");
            formObj.T1L2From.focus();
            return false;
        }
        // added to verify leg2 validity
        if ((formObj.T1L2From.value == '0' || formObj.T1L2To.value == '0') &&
            (formObj.T1L2Mode.value != 0 || formObj.T1L2Distance.value != '' || formObj.T1L2Distance.value > 0)) {
            alert("Leg 2 of Trip 1 is not valid.");
            formObj.T1L2Mode.value = '0';
            formObj.T1L2Distance.value = '';
            formObj.T1L2From.focus();
            return false;
        }
    }
    if (typeof formObj.T2L2From !== 'undefined') {
        if ((formObj.T2L2From.value == '101' || formObj.T2L2From.value == '102') &&
            (formObj.T2L2From.value == formObj.T2L2To.value)) {
            alert("Start and destination for Leg 2 of Trip 2 cannot be same.");
            formObj.T2L2From.focus();
            return false;
        }

        if ((formObj.T2L2From.value == '0' || formObj.T2L2To.value == '0') &&
            (formObj.T2L2Mode.value != 0 || formObj.T2L2Distance.value != '' || formObj.T2L2Distance.value > 0)) {
            alert("Leg 2 of Trip 2 is not valid.");
            formObj.T2L2Mode.value = '0';
            formObj.T2L2Distance.value = '';
            formObj.T2L2From.focus();
            return false;
        }
    }
    if (formObj.T1L1From.value == '101' && formObj.T1L1To.value != '102' && formObj.T1L1To.value != '106' && typeof formObj.T1L2From !== 'undefined') {
        if (formObj.T1L2From.value == '101') {
            alert("Start of leg 2 of Trip 1 cannot be from 'Home'.");
            formObj.T1L2From.value = formObj.T1L1To.value;
            return false;
        }
        if (formObj.T1L2From.value == '0' || formObj.T1L2From.value != formObj.T1L1To.value) {
            alert("Trip 1 is not complete. Final destination must be either 'Work' or 'Telework Center'. \nStart of Leg 2 must be same as Destination of leg 1");
            formObj.T1L2From.value = formObj.T1L1To.value;
            return false;
        }
        if (formObj.T1L2To.value != '102' && formObj.T1L2To.value != '106') {
            alert("Trip 1 is not complete. Final destination must be either 'Work' or 'Telework Center'.");
            formObj.T1L2To.value = '102';
            return false;
        }
        if (formObj.T1L2Mode.value == '0') {
            alert("Select travel mode for Leg 2 of Trip 1.");
            formObj.T1L2Mode.focus();
            return false;
        }
        if (formObj.T1L2Distance.value == '' || formObj.T1L2Distance.value == '0') {
            alert("Travel distance of leg 2 of Trip 1 must be greater than zero.");
            formObj.T1L2Distance.focus();
            return false;
        }
    }

    if ((formObj.T2L1From.value == '102' || formObj.T2L1From.value == '106') && formObj.T2L1To.value != '101' && typeof formObj.T2L2From !== 'undefined') {
        if (formObj.T2L2From.value == '102') {
            alert("Start of leg 2 of Trip 2 cannot be from 'Work'.");
            formObj.T2L2From.value = formObj.T2L1To.value;
            return false;
        }
        if (formObj.T2L2From.value == '0' || formObj.T2L2From.value != formObj.T2L1To.value) {
            alert("Trip 2 is not complete. Final destination must be 'Home'. \nStart of Leg 2 must be same as Destination of leg 1.");
            formObj.T2L2From.value = formObj.T2L1To.value;
            return false;
        }
        if (formObj.T2L2To.value != '101') {
            alert("Trip 2 is not complete. Final destination must be 'Home'.");
            formObj.T2L2To.value = '101';
            return false;
        }
        if (formObj.T2L2Mode.value == '0') {
            alert("Select travel mode for Leg 2 of Trip 2.");
            formObj.T2L2Mode.focus();
            return false;
        }
        if (formObj.T2L2Distance.value == '' || formObj.T2L2Distance.value == '0') {
            alert("Travel distance of leg 2 of Trip 2 must be greater than zero.");
            formObj.T2L2Distance.focus();
            return false;
        }
    }
    // end of verify leg2 validity
    $.each($(':input.distance'), function (i, v) {
        $(v).val(Math.round(v.value));
    });

    // formObj.submit();
    save_commute_logs_ajax(formObj);
    return true;
}

function updateCommuteLogs(formObj) {
    if (formObj.T1L1From.value == '0') {
        alert("Select Start for Leg 1 of Trip 1.");
        formObj.T1L1From.focus();
        return false;
    }
    if (formObj.T1L1To.value == '0') {
        alert("Select To for Leg 1 of Trip 1.");
        formObj.T1L1To.focus();
        return false;
    }
    if (formObj.T1L1Mode.value == '0') {
        alert("Select Commute Mode for Leg 1 of Trip 1.");
        formObj.T1L1Mode.focus();
        return false;
    }
    if (formObj.T1L1Distance.value == '') {
        alert("Enter Commute Distance for Leg 1 of Trip 1.");
        formObj.T1L1Distance.focus();
        return false;
    } else
        formObj.T1L1Distance.value = Math.round(formObj.T1L1Distance.value);

    if (formObj.T2L1From.value == '0') {
        alert("Select Start for Leg 1 of Trip 2.");
        formObj.T2L1From.focus();
        return false;
    }
    if (formObj.T2L1To.value == '0') {
        alert("Select To for Leg 1 of Trip 2.");
        formObj.T2L1To.focus();
        return false;
    }
    if (formObj.T2L1Mode.value == '0') {
        alert("Select Commute Mode for Leg 1 of Trip 2.");
        formObj.T2L1Mode.focus();
        return false;
    }
    if (formObj.T2L1Distance.value == '') {
        alert("Enter Commute Distance for Leg 1 of Trip 2.");
        formObj.T2L1Distance.focus();
        return false;
    } else
        formObj.T2L1Distance.value = Math.round(formObj.T2L1Distance.value);

    if ((formObj.T1L1From.value == '101' || formObj.T1L1From.value == '102') &&
        (formObj.T1L1From.value == formObj.T1L1To.value)) {
        alert("Start and destination for Leg 1 of Trip 1 cannot be same.");
        formObj.T1L1From.focus();
        return false;
    }
    if ((formObj.T2L1From.value == '101' || formObj.T2L1From.value == '102') &&
        (formObj.T2L1From.value == formObj.T2L1To.value)) {
        alert("Start and destination for Leg 1 of Trip 2 cannot be same.");
        formObj.T2L1From.focus();
        return false;
    }

    if ((formObj.T1L2From.value == '101' || formObj.T1L2From.value == '102') &&
        (formObj.T1L2From.value == formObj.T1L2To.value)) {
        alert("Start and destination for Leg 2 of Trip 1 cannot be same.");
        formObj.T1L2From.focus();
        return false;
    }
    if ((formObj.T2L2From.value == '101' || formObj.T2L2From.value == '102') &&
        (formObj.T2L2From.value == formObj.T2L2To.value)) {
        alert("Start and destination for Leg 2 of Trip 2 cannot be same.");
        formObj.T2L2From.focus();
        return false;
    }

    // added to verify leg2 validity
    if ((formObj.T1L2From.value == '0' || formObj.T1L2To.value == '0') &&
        (formObj.T1L2Mode.value != 0 || formObj.T1L2Distance.value != '' || formObj.T1L2Distance.value > 0)) {
        alert("Leg 2 of Trip 1 is not valid.");
        formObj.T1L2Mode.value = '0';
        formObj.T1L2Distance.value = '';
        formObj.T1L2From.focus();
        return false;
    }

    if ((formObj.T2L2From.value == '0' || formObj.T2L2To.value == '0') &&
        (formObj.T2L2Mode.value != 0 || formObj.T2L2Distance.value != '' || formObj.T2L2Distance.value > 0)) {
        alert("Leg 2 of Trip 2 is not valid.");
        formObj.T2L2Mode.value = '0';
        formObj.T2L2Distance.value = '';
        formObj.T2L2From.focus();
        return false;
    }

    if (formObj.T1L1From.value == '101' && formObj.T1L1To.value != '102' && formObj.T1L1To.value != '106') {
        if (formObj.T1L2From.value == '101') {
            alert("Start of leg 2 of Trip 1 cannot be from 'Home'.");
            formObj.T1L2From.value = formObj.T1L1To.value;
            return false;
        }
        if (formObj.T1L2From.value == '0' || formObj.T1L2From.value != formObj.T1L1To.value) {
            alert("Trip 1 is not complete. Final destination must be either 'Work' or 'Telework Center'. \nStart of Leg 2 must be same as Destination of leg 1.");
            formObj.T1L2From.value = formObj.T1L1To.value;
            return false;
        }
        if (formObj.T1L2To.value != '102' && formObj.T1L2To.value != '106') {
            alert("Trip 1 is not complete. Final destination must be either 'Work' or 'Telework Center'.");
            formObj.T1L2To.value = '102';
            return false;
        }
        if (formObj.T1L2Mode.value == '0') {
            alert("Select travel mode for Leg 2 of Trip 1.");
            formObj.T1L2Mode.focus();
            return false;
        }
        if (formObj.T1L2Distance.value == '' || formObj.T1L2Distance.value == '0') {
            alert("Travel distance of leg 2 of Trip 1 must be greater than zero.");
            formObj.T1L2Distance.focus();
            return false;
        }
    }

    if ((formObj.T2L1From.value == '102' || formObj.T2L1From.value == '106') && formObj.T2L1To.value != '101') {
        if (formObj.T2L2From.value == '102') {
            alert("Start of leg 2 of Trip 2 cannot be from 'Work'.");
            formObj.T2L2From.value = formObj.T2L1To.value;
            return false;
        }
        if (formObj.T2L2From.value == '0' || formObj.T2L2From.value != formObj.T2L1To.value) {
            alert("Trip 2 is not complete. Final destination must be 'Home'. \nStart of Leg 2 must be same as Destination of leg 1.");
            formObj.T2L2From.value = formObj.T2L1To.value;
            return false;
        }
        if (formObj.T2L2To.value != '101') {
            alert("Trip 2 is not complete. Final destination must be 'Home'.");
            formObj.T2L2To.value = '101';
            return false;
        }
        if (formObj.T2L2Mode.value == '0') {
            alert("Select travel mode for Leg 2 of Trip 2.");
            formObj.T2L2Mode.focus();
            return false;
        }
        if (formObj.T2L2Distance.value == '' || formObj.T2L2Distance.value == '0') {
            alert("Travel distance of leg 2 of Trip 2 must be greater than zero.");
            formObj.T2L2Distance.focus();
            return false;
        }
    }
    // end of verify leg2 validity

    if (formObj.T1L2Distance.value == '')
        formObj.T1L2Distance.value = "0";
    else
        formObj.T1L2Distance.value = Math.round(formObj.T1L2Distance.value);
    if (formObj.T2L2Distance.value == '')
        formObj.T2L2Distance.value = "0";
    else
        formObj.T2L2Distance.value = Math.round(formObj.T2L2Distance.value);

    save_commute_logs_ajax(formObj, true);
    return true;
}

function clearLogs(formObj) {
    formObj.T1L1From.value = "0";
    formObj.T1L1To.value = "0";
    formObj.T1L1Mode.value = "0";
    formObj.T1L1Distance.value = "";
    formObj.T1L2From.value = "0";
    formObj.T1L2To.value = "0";
    formObj.T1L2Mode.value = "0";
    formObj.T1L2Distance.value = "";
    formObj.T2L1From.value = "0";
    formObj.T2L1To.value = "0";
    formObj.T2L1Mode.value = "0";
    formObj.T2L1Distance.value = "";
    formObj.T2L2From.value = "0";
    formObj.T2L2To.value = "0";
    formObj.T2L2Mode.value = "0";
    formObj.T2L2Distance.value = "";

    var table1RowCount = document.getElementById("LegCommuteTable1").rows.length - 2;

    var table2RowCount = document.getElementById("LegCommuteTable2").rows.length - 2;


    for (i = 3; i <= table1RowCount; i++) {
        document.getElementById("T1" + "L" + i + "From").value = "0";
        document.getElementById("T1" + "L" + i + "To").value = "0";
        document.getElementById("T1" + "L" + i + "Mode").value = "0";
        document.getElementById("T1" + "L" + i + "Distance").value = "";
    }

    for (j = 3; j <= table2RowCount; j++) {
        document.getElementById("T2" + "L" + j + "From").value = "0";
        document.getElementById("T2" + "L" + j + "To").value = "0";
        document.getElementById("T2" + "L" + j + "Mode").value = "0";
        document.getElementById("T2" + "L" + j + "Distance").value = "";
    }

}

var httpRequest;
function getTripDetails(url, event) {
    var url = url;
    try {
        httpRequest = new XMLHttpRequest();
    } catch (e) {
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("Your browser does not support AJAX!");
                return false;
            }
        }
    }
    httpRequest.open("GET", url, true);
    httpRequest.onreadystatechange = function () {
        stateChanged();
    };
    httpRequest.send(null);

    function stateChanged() {
        if (httpRequest.readyState == 4) {
            if (event)
                document.getElementById("tooltip").innerHTML = url;
            else
                document.getElementById("tooltip").innerHTML = httpRequest.responseText;
        }
    }

    function GetXmlHttpObject() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
        if (window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
        return null;
    }
}

// new tooltip functionality to display daily logs
if (typeof document.attachEvent != 'undefined') {
    window.attachEvent('onload', init);
    document.attachEvent('onmousemove', moveMouse);
    document.attachEvent('onclick', checkMove);
}
else {
    window.addEventListener('load', init, false);
    document.addEventListener('mousemove', moveMouse, false);
    document.addEventListener('click', checkMove, false);
}

var oDv = document.createElement("div");
var dvHdr = document.createElement("div");
var dvBdy = document.createElement("div");
dvBdy.id = 'tooltip';

var windowlock, boxMove, fixposx, fixposy, lockX, lockY, fixx, fixy, ox, oy, boxLeft, boxRight, boxTop, boxBottom, evt, mouseX, mouseY, boxOpen, totalScrollTop, totalScrollLeft;
boxOpen = false;
ox = 10;
oy = 10;
lockX = 0;
lockY = 0;

function init() {
    oDv.appendChild(dvHdr);
    oDv.appendChild(dvBdy);
    oDv.style.position = "absolute";
    oDv.style.visibility = 'hidden';
    document.body.appendChild(oDv);
}

function defHdrStyle() {
    dvHdr.innerHTML = '<img  style="vertical-align:middle"  src="info.gif">&nbsp;&nbsp;' + dvHdr.innerHTML;
    dvHdr.style.fontWeight = 'bold';
    dvHdr.style.width = '150px';
    dvHdr.style.fontFamily = 'arial';
    dvHdr.style.border = '1px solid #A5CFE9';
    dvHdr.style.padding = '3';
    dvHdr.style.fontSize = '11';
    dvHdr.style.color = '#4B7A98';
    dvHdr.style.background = '#D5EBF9';
    dvHdr.style.filter = 'alpha(opacity=85)'; // IE
    dvHdr.style.opacity = '0.85'; // FF
}

function defBdyStyle() {
    dvBdy.style.borderBottom = '1px solid #A5CFE9';
    dvBdy.style.borderLeft = '1px solid #A5CFE9';
    dvBdy.style.borderRight = '1px solid #A5CFE9';
    dvBdy.style.width = '150px';
    dvBdy.style.fontFamily = 'arial';
    dvBdy.style.fontSize = '11';
    dvBdy.style.padding = '3';
    dvBdy.style.color = '#1B4966';
    dvBdy.style.background = '#FFFFFF';
    dvBdy.style.filter = 'alpha(opacity=85)'; // IE
    dvBdy.style.opacity = '0.85'; // FF
}

function checkElemBO(txt) {
    if (!txt || typeof(txt) != 'string') return false;
    if ((txt.indexOf('header') > -1) && (txt.indexOf('body') > -1) && (txt.indexOf('[') > -1) && (txt.indexOf('[') > -1))
        return true;
    else
        return false;
}

function scanBO(curNode) {
    if (checkElemBO(curNode.title)) {
        curNode.boHDR = getParam('header', curNode.title);
        curNode.boBDY = getParam('body', curNode.title);
        curNode.boCSSBDY = getParam('cssbody', curNode.title);
        curNode.boCSSHDR = getParam('cssheader', curNode.title);
        curNode.IEbugfix = (getParam('hideselects', curNode.title) == 'on') ? true : false;
        curNode.fixX = parseInt(getParam('fixedrelx', curNode.title));
        curNode.fixY = parseInt(getParam('fixedrely', curNode.title));
        curNode.absX = parseInt(getParam('fixedabsx', curNode.title));
        curNode.absY = parseInt(getParam('fixedabsy', curNode.title));
        curNode.offY = (getParam('offsety', curNode.title) != '') ? parseInt(getParam('offsety', curNode.title)) : 10;
        curNode.offX = (getParam('offsetx', curNode.title) != '') ? parseInt(getParam('offsetx', curNode.title)) : 10;
        curNode.fade = (getParam('fade', curNode.title) == 'on') ? true : false;
        curNode.fadespeed = (getParam('fadespeed', curNode.title) != '') ? getParam('fadespeed', curNode.title) : 0.04;
        curNode.delay = (getParam('delay', curNode.title) != '') ? parseInt(getParam('delay', curNode.title)) : 0;
        if (getParam('requireclick', curNode.title) == 'on') {
            curNode.requireclick = true;
            document.all ? curNode.attachEvent('onclick', showHideBox) : curNode.addEventListener('click', showHideBox, false);
            document.all ? curNode.attachEvent('onmouseover', hideBox) : curNode.addEventListener('mouseover', hideBox, false);
        }
        else {// Note : if requireclick is on the stop clicks are ignored
            if (getParam('doubleclickstop', curNode.title) != 'off') {
                document.all ? curNode.attachEvent('ondblclick', pauseBox) : curNode.addEventListener('dblclick', pauseBox, false);
            }
            if (getParam('singleclickstop', curNode.title) == 'on') {
                document.all ? curNode.attachEvent('onclick', pauseBox) : curNode.addEventListener('click', pauseBox, false);
            }
        }
        curNode.windowLock = getParam('windowlock', curNode.title).toLowerCase() == 'off' ? false : true;
        curNode.title = '';
        curNode.hasbox = 1;
    }
    else
        curNode.hasbox = 2;
}


function getParam(param, list) {
    var reg = new RegExp('([^a-zA-Z]' + param + '|^' + param + ')\\s*=\\s*\\[\\s*(((\\[\\[)|(\\]\\])|([^\\]\\[]))*)\\s*\\]');
    var res = reg.exec(list);
    var returnvar;
    if (res)
        return res[2].replace('[[', '[').replace(']]', ']');
    else
        return '';
}

function Left(elem) {
    var x = 0;
    if (elem.calcLeft)
        return elem.calcLeft;
    var oElem = elem;
    while (elem) {
        if ((elem.currentStyle) && (!isNaN(parseInt(elem.currentStyle.borderLeftWidth))) && (x != 0))
            x += parseInt(elem.currentStyle.borderLeftWidth);
        x += elem.offsetLeft;
        elem = elem.offsetParent;
    }
    oElem.calcLeft = x;
    return x;
}

function Top(elem) {
    var x = 0;
    if (elem.calcTop)
        return elem.calcTop;
    var oElem = elem;
    while (elem) {
        if ((elem.currentStyle) && (!isNaN(parseInt(elem.currentStyle.borderTopWidth))) && (x != 0))
            x += parseInt(elem.currentStyle.borderTopWidth);
        x += elem.offsetTop;
        elem = elem.offsetParent;
    }
    oElem.calcTop = x;
    return x;

}

var ah, ab;
function applyStyles() {
    if (ab)
        oDv.removeChild(dvBdy);
    if (ah)
        oDv.removeChild(dvHdr);
    dvHdr = document.createElement("div");
    dvBdy = document.createElement("div");
    CBE.boCSSBDY ? dvBdy.className = CBE.boCSSBDY : defBdyStyle();
    CBE.boCSSHDR ? dvHdr.className = CBE.boCSSHDR : defHdrStyle();
    dvHdr.innerHTML = CBE.boHDR;
    dvBdy.innerHTML = CBE.boBDY;
    ah = false;
    ab = false;
    if (CBE.boHDR != '') {
        oDv.appendChild(dvHdr);
        ah = true;
    }
    if (CBE.boBDY != '') {
        oDv.appendChild(dvBdy);
        ab = true;
    }
}

var CSE, iterElem, LSE, CBE, LBE, totalScrollLeft, totalScrollTop, width, height;
var ini = false;

// Customised function for inner window dimension
function SHW() {
    if (document.body && (document.body.clientWidth != 0)) {
        width = document.body.clientWidth;
        height = document.body.clientHeight;
    }
    if (document.documentElement && (document.documentElement.clientWidth != 0) && (document.body.clientWidth + 20 >= document.documentElement.clientWidth)) {
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
    }
    return [width, height];
}


var ID = null;
function moveMouse(e) {
    //boxMove=true;
    e ? evt = e : evt = event;

    CSE = evt.target ? evt.target : evt.srcElement;

    if (!CSE.hasbox) {
        // Note we need to scan up DOM here, some elements like TR don't get triggered as srcElement
        iElem = CSE;
        while ((iElem.parentNode) && (!iElem.hasbox)) {
            scanBO(iElem);
            iElem = iElem.parentNode;
        }
    }

    if ((CSE != LSE) && (!isChild(CSE, dvHdr)) && (!isChild(CSE, dvBdy))) {
        if (!CSE.boxItem) {
            iterElem = CSE;
            while ((iterElem.hasbox == 2) && (iterElem.parentNode))
                iterElem = iterElem.parentNode;
            CSE.boxItem = iterElem;
        }
        iterElem = CSE.boxItem;
        if (CSE.boxItem && (CSE.boxItem.hasbox == 1)) {
            LBE = CBE;
            CBE = iterElem;
            if (CBE != LBE) {
                applyStyles();
                if (!CBE.requireclick)
                    if (CBE.fade) {
                        if (ID != null)
                            clearTimeout(ID);
                        ID = setTimeout("fadeIn(" + CBE.fadespeed + ")", CBE.delay);
                    }
                    else {
                        if (ID != null)
                            clearTimeout(ID);
                        COL = 1;
                        ID = setTimeout("oDv.style.visibility='visible';ID=null;", CBE.delay);
                    }
                if (CBE.IEbugfix) {
                    hideSelects();
                }
                fixposx = !isNaN(CBE.fixX) ? Left(CBE) + CBE.fixX : CBE.absX;
                fixposy = !isNaN(CBE.fixY) ? Top(CBE) + CBE.fixY : CBE.absY;
                lockX = 0;
                lockY = 0;
                boxMove = true;
                ox = CBE.offX ? CBE.offX : 10;
                oy = CBE.offY ? CBE.offY : 10;
            }
        }
        else if (!isChild(CSE, dvHdr) && !isChild(CSE, dvBdy) && (boxMove)) {
            // The conditional here fixes flickering between tables cells.
            if ((!isChild(CBE, CSE)) || (CSE.tagName != 'TABLE')) {
                CBE = null;
                if (ID != null)
                    clearTimeout(ID);
                fadeOut();
                showSelects();
            }
        }
        LSE = CSE;
    }
    else if (((isChild(CSE, dvHdr) || isChild(CSE, dvBdy)) && (boxMove))) {
        totalScrollLeft = 0;
        totalScrollTop = 0;

        iterElem = CSE;
        while (iterElem) {
            if (!isNaN(parseInt(iterElem.scrollTop)))
                totalScrollTop += parseInt(iterElem.scrollTop);
            if (!isNaN(parseInt(iterElem.scrollLeft)))
                totalScrollLeft += parseInt(iterElem.scrollLeft);
            iterElem = iterElem.parentNode;
        }
        if (CBE != null) {
            boxLeft = Left(CBE) - totalScrollLeft;
            boxRight = parseInt(Left(CBE) + CBE.offsetWidth) - totalScrollLeft;
            boxTop = Top(CBE) - totalScrollTop;
            boxBottom = parseInt(Top(CBE) + CBE.offsetHeight) - totalScrollTop;
            doCheck();
        }
    }

    if (boxMove && CBE) {
        // This added to alleviate bug in IE6 w.r.t DOCTYPE
        bodyScrollTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        bodyScrollLet = document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
        mouseX = evt.pageX ? evt.pageX - bodyScrollLet : evt.clientX - document.body.clientLeft;
        mouseY = evt.pageY ? evt.pageY - bodyScrollTop : evt.clientY - document.body.clientTop;
        if ((CBE) && (CBE.windowLock)) {
            mouseY < -oy ? lockY = -mouseY - oy : lockY = 0;
            mouseX < -ox ? lockX = -mouseX - ox : lockX = 0;
            mouseY > (SHW()[1] - oDv.offsetHeight - oy) ? lockY = -mouseY + SHW()[1] - oDv.offsetHeight - oy : lockY = lockY;
            mouseX > (SHW()[0] - dvBdy.offsetWidth - ox) ? lockX = -mouseX - ox + SHW()[0] - dvBdy.offsetWidth : lockX = lockX;
        }
        oDv.style.left = ((fixposx) || (fixposx == 0)) ? fixposx : bodyScrollLet + mouseX + ox + lockX + "px";
        oDv.style.top = ((fixposy) || (fixposy == 0)) ? fixposy : bodyScrollTop + mouseY + oy + lockY + "px";

    }
}

function doCheck() {
    if ((mouseX < boxLeft) || (mouseX > boxRight) || (mouseY < boxTop) || (mouseY > boxBottom)) {
        if (!CBE.requireclick)
            fadeOut();
        if (CBE.IEbugfix) {
            showSelects();
        }
        CBE = null;
    }
}

function pauseBox(e) {
    e ? evt = e : evt = event;
    boxMove = false;
    evt.cancelBubble = true;
}

function showHideBox(e) {
    oDv.style.visibility = (oDv.style.visibility != 'visible') ? 'visible' : 'hidden';
}

function hideBox(e) {
    oDv.style.visibility = 'hidden';
}

var COL = 0;
var stopfade = false;
function fadeIn(fs) {
    ID = null;
    COL = 0;
    oDv.style.visibility = 'visible';
    fadeIn2(fs);
}

function fadeIn2(fs) {
    COL = COL + fs;
    COL = (COL > 1) ? 1 : COL;
    oDv.style.filter = 'alpha(opacity=' + parseInt(100 * COL) + ')';
    oDv.style.opacity = COL;
    if (COL < 1)
        setTimeout("fadeIn2(" + fs + ")", 20);
}


function fadeOut() {
    oDv.style.visibility = 'hidden';

}

function isChild(s, d) {
    while (s) {
        if (s == d)
            return true;
        s = s.parentNode;
    }
    return false;
}

var cSrc;
function checkMove(e) {
    e ? evt = e : evt = event;
    cSrc = evt.target ? evt.target : evt.srcElement;
    if ((!boxMove) && (!isChild(cSrc, oDv))) {
        fadeOut();
        if (CBE && CBE.IEbugfix) {
            showSelects();
        }
        boxMove = true;
        CBE = null;
    }
}

function showSelects() {
    var elements = document.getElementsByTagName("select");
    for (i = 0; i < elements.length; i++) {
        elements[i].style.visibility = 'visible';
    }
}

function hideSelects() {
    var elements = document.getElementsByTagName("select");
    for (i = 0; i < elements.length; i++) {
        elements[i].style.visibility = 'hidden';
    }
}

function hideTooltip() {
    if (document.getElementById("tooltip").style.display == 'block')
        document.getElementById("tooltip").style.display = 'none';
}