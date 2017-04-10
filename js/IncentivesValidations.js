// used for list format logs
function getWeekDays(days) {
    var noOfDays = days;
    var weekdaynames = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"); //predefine weekday names
    var monthnames = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"); //predefine month names
    var date = new Date();
    var today = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getYear();
    if (year < 2000)
        year = year + 1900;
    date.setDate(today - noOfDays);
    for (i = 1; i <= 7; i++) {
        var thisday = date.getDate();
        var week_day = date.getDay();
        var month1 = date.getMonth() + 1;
        var logDate = document.getElementById("logDate" + i);
        logDate.value = month + 1 + "/" + today + "/" + year;
        document.getElementById("date" + i).innerHTML = month1 + "/" + thisday + "/" + year;
        document.getElementById("day" + i).innerHTML = weekdaynames [week_day];
        date.setDate(thisday - 1);
    }
}

// used for calendar format
var mydate = new Date();
var year = mydate.getFullYear();
var month = mydate.getMonth();
var today = mydate.getDate();
var days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

var noOfDays = 7;
var coffdate = new Date();
var minyear = coffdate.getFullYear();
var minmonth = coffdate.getMonth();
var mindate = coffdate.getDate();

function calendar(id, d1) {
    this.id = id;
    this.dateObject = d1;
    this.write = writeCalendar;
    this.length = getLength;
    this.month = d1.getMonth();
    this.date = d1.getDate();
    this.day = d1.getDay();
    this.year = d1.getFullYear();
    this.getFormattedDate = getFormattedDate;
    d1.setDate(1);
    this.firstDay = d1.getDay();
    d1.setDate(this.date);
}

function calendar(id, d1, noOfDays) {
    this.id = id;
    this.dateObject = d1;
    this.write = writeCalendar;
    this.length = getLength;
    this.month = d1.getMonth();
    this.date = d1.getDate();
    this.day = d1.getDay();
    this.year = d1.getFullYear();
    this.getFormattedDate = getFormattedDate;
    d1.setDate(1);
    this.firstDay = d1.getDay();
    d1.setDate(this.date);

    this.noOfDays = noOfDays;
    this.coffdate = coffdate.setDate(new Date().getDate() - noOfDays);
    this.minyear = coffdate.getFullYear();
    this.minmonth = coffdate.getMonth();
    this.mindate = coffdate.getDate();
}

function getFormattedDate() {
    return this.month + '/' + this.date + '/' + this.year;
}

function display1(date) {
    var selDate = date;
    document.getElementById("selectdate").value = selDate;
    document.getElementById("tripDate").value = selDate;
}

function writeCalendar() {
    var calString = '<div id="calContainer">';
    //write month and year at top of table
    calString += '<table id="cal" cellpadding="0" cellspacing="0">';
    //write the month
    if (this.month <= this.minmonth && this.year <= this.minyear) {
        calString += '<th colspan=2 class=center><input type="button" value="&lt;&lt; Prev" disabled="true"></th>';
    } else {
        calString += '<th colspan=2 class=center><input type="button" value="&lt;&lt; Prev" onclick="changeMonth(-1,\'' + this.id + '\')"></th>';
    }
    calString += '<th colspan=3 class=center><b>' + months[this.month] + ', ' + this.year + '</b></th>';
    if (this.month == month && this.year == year) {
        calString += '<th colspan=2 class=center><input type="button" value="Next &gt;&gt;" disabled="true"></th>';
    } else {
        calString += '<th colspan=2 class=center><input type="button" value="Next &gt;&gt;" onclick="changeMonth(1,\'' + this.id + '\')"></th>';
    }
    //write a row containing days of the week
    calString += '<tr>';
    for (i = 0; i < days.length; i++) {
        calString += '<th class="dayHeader">' + days[i].substring(0, 3) + '</th>';
    }
    //write the body of the calendar
    calString += '<tr>';
    //create 6 rows so that the calendar doesn't resize
    for (j = 0; j < 42; j++) {
        var displayNum = (j - this.firstDay + 1);
        if (j < this.firstDay) {
            //write the leading empty cells
            calString += '<td class="empty">&nbsp;</td>';
        } else if (((displayNum >= this.mindate && this.month == this.minmonth && this.year == this.minyear) && (displayNum <= this.date && this.month == month && this.year == year)) ||
            (displayNum <= this.length() && this.month < month && this.year <= year)) {
            calString += '<td id="' + this.id + 'selected" class="date" <font color="red">' + displayNum + '<br><a href="#"><img src="./includes/images/Log.png" border="0" width=16px height=16px onclick="display1(\'' + (this.month + 1) + '/' + displayNum + '/' + this.year + '\');"></a></font></td>';
        } else if (displayNum > this.length()) {
            //Empty cells at bottom of calendar
            calString += '<td class="empty">&nbsp;</td>';
        } else if ((displayNum >= this.date && this.year == year && this.month == month) || (this.month > month) && (this.year >= year)) {
            calString += '<td class="days" disabled=true>' + displayNum + '<p>&nbsp;</p></td>';
        } else {
            calString += '<td class="days">' + displayNum + '<p>&nbsp;</p></td>';
        }
        if (j % 7 == 6) {
            calString += '</tr>';
        }
    }
    calString += '</table>';
    calString += '</div>';
    return calString;
}

function getLength() {
    switch (this.month) {
        case 1:
            if ((this.dateObject.getFullYear() % 4 == 0 && this.dateObject.getFullYear() % 100 != 0) || this.dateObject.getFullYear() % 400 == 0)
                return 29; //leap year
            else
                return 28;
        case 3:
            return 30;
        case 5:
            return 30;
        case 8:
            return 30;
        case 10:
            return 30;
        default:
            return 31;
    }
}

function changeDate(td, cal) {
    cal = eval(cal);
    document.getElementById(cal.id + "selected").className = "days";
    document.getElementById(cal.id + "selected").id = "";
    td.className = "date";
    td.id = cal.id + "selected";
    cal.dateObject.setDate(td.firstChild.nodeValue);
    cal = new calendar(cal.id, cal.dateObject, cal.pix);
    alert(cal.getFormattedDate());
}

function changeMonth(mo, cal) {
    cal = eval(cal);
    cal.dateObject.setMonth(cal.dateObject.getMonth() + mo);
    cal = new calendar(cal.id, cal.dateObject, cal.pix);
    cal.formattedDate = cal.getFormattedDate();
    document.getElementById('calContainer').innerHTML = cal.write();
}
// end of calendar format

// save daily commute logs
function saveDailyLogs(formObj) {
    if (formObj.tripMode1.value == null || formObj.tripMode1.value == "") {
        alert("Please select the commute mode used to travel from Home to Work.");
        formObj.tripMode1.focus();
        return false;
    }
    if (formObj.tripDist1.value == null || formObj.tripDist1.value == "") {
        alert("Please enter the distance traveled from Home to Work.");
        formObj.tripDist1.focus();
        return false;
    }
    if (formObj.tripMode2.value == null || formObj.tripMode2.value == "") {
        alert("Please select the commute mode used to travel from Work to Home.");
        formObj.tripMode2.focus();
        return false;
    }
    if (formObj.tripDist2.value == null || formObj.tripDist2.value == "") {
        alert("Please enter the distance traveled from Work to Home.");
        formObj.tripDist2.focus();
        return false;
    }
    var mode1 = formObj.tripMode1.value;
    var mode2 = formObj.tripMode2.value;
    if (mode1 == "77" || mode1 == "76" || mode1 == "75") {
        document.getElementById("tripDist1").value = "0";
    }
    if (mode2 == "77" || mode2 == "76" || mode2 == "75") {
        document.getElementById("tripDist2").value = "0";
    }
    var form = $(formObj);
    var form_array = form.serializeArray();
    var form_values = {};//todob turn array into object here
    var params = $.extend(form_values, {
        action: 'saveCommuteLogVIP',
        username: window.localStorage.getItem('userName'),
        hashedpassword: window.localStorage.getItem('hashedPassword')
        ,
        tripDate: moment().format('MM/DD/YYYY'),
        idPool: User.pool_id,
        milesDriven: parseFloat(form.find('#milesDriven').val())
        ,
        totVanDriveTime: parseFloat(form.find('#totVanDriveTime').val())
    });

    return true;
}
/*function stop{
 if(form.starttime.value != '') {
 if(regs = form.starttime.value.match(re)) {
 if(regs[3]) {
 // 12-hour value between 1 and 12
 if(regs[1] < 1 || regs[1] > 12) {
 alert("Invalid value for hours: " + regs[1]);
 form.starttime.focus();
 return false;
 }
 } else {
 // 24-hour value between 0 and 23
 if(regs[1] > 23) {
 alert("Invalid value for hours: " + regs[1]);
 form.starttime.focus();
 return false;
 }
 }
 // minute value between 0 and 59
 if(regs[2] > 59) {
 alert("Invalid value for minutes: " + regs[2]);
 form.starttime.focus();
 return false;
 }
 } else {
 alert("Invalid time format: " + form.starttime.value);
 form.starttime.focus();
 return false;
 }
 }

 alert("All input fields have been validated!");
 return true;
 }
 }


 function timeCheck(form,form1){
 re = /^(\d{1,2}):(\d{2})([ap]m)?$/;


 if(regs = form) {
 if(regs[3]) {
 //alert(reg[3]);
 // 12-hour value between 1 and 12
 if(regs[1] < 1 || regs[1] > 12) {
 alert("Invalid value for hours: " + regs[1]);
 form1.focus();
 return false;
 }
 } else {
 // 24-hour value between 0 and 23
 if(regs[1] > 12) {
 alert("Invalid value for hours: " + regs[1]);
 form1.focus();
 return false;
 }
 }
 // minute value between 0 and 59
 if(regs[2] > 59) {
 alert("Invalid value for minutes: " + regs[2]);
 form1.focus();
 return false;
 }
 } else {
 alert("Invalid time format: " + form1.value);
 form1.focus();
 return false;
 }


 return true;
 }

 */

//---------------------------------------------------------------------------------
//	http://stackoverflow.com/questions/1787939/check-time-difference-in-javascript
//---------------------------------------------------------------------------------
function parseTime(s) {
    var part = s.match(/(\d+):(\d+)(?: )?(am|pm)?/i);
    var hh = parseInt(part[1], 10);
    var mm = parseInt(part[2], 10);
    var ap = part[3] ? part[3].toUpperCase() : null;
    if (ap === "AM") {
        if (hh == 12) {
            hh = 0;
        }
    }
    if (ap === "PM") {
        if (hh != 12) {
            hh += 12;
        }
    }
    return {hh: hh, mm: mm};
}

// This code will produce correct results even when the times are on the opposite side of midnight.
// The inputs are expected to be military time.
function computeElapsedTime(inStartHour, inStartMinute, inEndHour, inEndMinute) {
    var date1 = new Date(2000, 0, 1, inStartHour, inStartMinute);
    var date2 = new Date(2000, 0, 1, inEndHour, inEndMinute);
    if (date2 < date1) {
        if ((parseInt(inStartHour) >= 12 && parseInt(inEndHour) >= 12) ||
            (parseInt(inStartHour) <= 12 && parseInt(inEndHour) <= 12)) {
            // Let user know the input looks weird, but accept/process it anyway.  We aren't asking
            // for a complete date as input, so it's impossible to validate this completely.
            alert("It looks as if the end time is before the start time for one of your " +
                "trips, or your trip was longer than 12 hours. Please double check.  " +
                "Consider using AM and PM to be clear if appropriate.");
        }
        // Assume trip began before midnight or noon and adjust by adding a day to end time.
        date2.setDate(date2.getDate() + 1);
    }
    return (date2 - date1);		// ET in milliseconds
}

// You can convert milliseconds to hour, minute and seconds like this:
function convertMillisecondsToHourMinutesSeconds(inMsec) {
    var msec = inMsec;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
    return {hh: hh, mm: mm, ss: ss};
}

//---------------------------------------------------------------------------------
//
//---------------------------------------------------------------------------------
function computeTotalVanDriveTime(formObj) {
//alert ("REACHED computeVanTotalDriveTime()");
    // Make sure all 4 widgets have input
    var timePattern = /^([1-9]|10|11|12):[0-5][0-9](\s?([AP]M|[ap]m))?$/g;
    if (validateAgainstRegex(formObj.twStart.value, timePattern) == "OK" &&
        validateAgainstRegex(formObj.twEnd.value, timePattern) == "OK" &&
        validateAgainstRegex(formObj.thStart.value, timePattern) == "OK" &&
        validateAgainstRegex(formObj.thEnd.value, timePattern) == "OK") {
//		alert ("YOU CAN NOW COMPUTE THE TOTAL TIME THE VAN WAS DRIVEN!");
//		alert (formObj.twStart.value + "    " + formObj.twEnd.value + "    " + formObj.thStart.value + "    " + formObj.thEnd.value);
        var twStartObj = parseTime(formObj.twStart.value);
//		alert ("Hours = " + twStartObj["hh"] + "    Minutes = " + twStartObj["mm"]);
        var twEndObj = parseTime(formObj.twEnd.value);
//		alert ("Hours = " + twEndObj["hh"] + "    Minutes = " + twEndObj["mm"]);
        var thStartObj = parseTime(formObj.thStart.value);
//		alert ("Hours = " + thStartObj["hh"] + "    Minutes = " + thStartObj["mm"]);
        var thEndObj = parseTime(formObj.thEnd.value);
//		alert ("Hours = " + thEndObj["hh"] + "    Minutes = " + thEndObj["mm"]);

        // Compute milliseconds of trip from home to work
        var etToWork = computeElapsedTime(twStartObj["hh"], twStartObj["mm"], twEndObj["hh"], twEndObj["mm"]);
//		alert (etToWork);
        // Compute milliseconds of trip from work back home
        var etToHome = computeElapsedTime(thStartObj["hh"], thStartObj["mm"], thEndObj["hh"], thEndObj["mm"]);
//		alert (etToHome);
        var totalTimeObj = convertMillisecondsToHourMinutesSeconds(etToWork + etToHome);
//		alert ("Hours = " + totalTimeObj["hh"] + "    Minutes = " + totalTimeObj["mm"]);
        document.getElementById("totVanDriveTime").value =
            totalTimeObj["hh"] + " hr " + totalTimeObj["mm"] + " min";
    }
}

//---------------------------------------------------------------------------------
//roundNumber
//
//Given a number and the count of digits desired following the decimal point,
//return a rounded number.  Note that inDigits is optional and defaults to zero.
//---------------------------------------------------------------------------------
function roundNumber(inNumber, inDigits) {
    var roundedNumber;
    if (arguments == 1 || inDigits == 0) {
        roundedNumber = Math.round(inNumber);
    }
    else {
        var multiple = Math.pow(10, inDigits);
        roundedNumber = Math.round(inNumber * multiple) / multiple;
    }
    return roundedNumber;
}

//---------------------------------------------------------------------------------
//	validateAgainstRegex
//
//	Ensure there is some input and that it matches a supplied regular expression.
//---------------------------------------------------------------------------------
function validateAgainstRegex(inSomethingToValidate, inRegex) {
    var retval = "OK";
    if (inSomethingToValidate == null || inSomethingToValidate == "") {
        retval = "NO_INPUT";
    }
    else {
        if (!inSomethingToValidate.match(inRegex)) {
            retval = "DOES_NOT_MATCH";
        }
    }
    return retval;
}

//---------------------------------------------------------------------------------
//	checkOdometerInput
//
//	Ensure the input is an odometer reading.  The decimal point is optional, but
//	if it's present, allow just 1 digit after it.  If the input does not conform,
//	put up an appropriate error message.
//---------------------------------------------------------------------------------
function checkOdometerInput(inWidget, inErrorDescriptiveText) {
    if (parseFloat(inWidget.value) <= 0.0) {
        alert("Please enter the odometer reading when " +
            inErrorDescriptiveText + ". Please do not enter zero.");
        inWidget.focus();
        return false;		// Didn't pass muster
    }
    var retval = true;
    switch (validateAgainstRegex(inWidget.value, /^([0-9]+(\.[0-9]?)?)$/g)) {
        case "NO_INPUT":
            alert("Please enter the odometer reading when " +
                inErrorDescriptiveText + ".");
            inWidget.focus();
            retval = false;
            break;
        case "DOES_NOT_MATCH":
            alert("The value you entered for the odometer reading when " +
                inErrorDescriptiveText + " does not look like an odometer " +
                "reading. Please enter a decimal or whole number only. " +
                "The decimal point is optional, but if you enter it, only " +
                "one digit is allowed after it."
            );
            inWidget.focus();
            retval = false;
            break;
        default:
            retval = true;
            break;
    }
    return retval;
}

//---------------------------------------------------------------------------------
//	checkTimeInput
//
//	Ensure the input looks like a time of day.  The timeOfDayRegex is supposed to
//	match a string that will allow 9:15,9:15 am, 9:15am, 9:15 AM, 9:15AM, 10:00am
//	and so on.  Trying to be liberal here.  Had to correct FALLAS's code, which
//	allowed a string like "98:15" to pass validation.
//---------------------------------------------------------------------------------
function checkTimeInput(inWidget, inErrorDescriptiveText) {
    var retval = true;
    switch (validateAgainstRegex(inWidget.value,
        /^([1-9]|10|11|12):[0-5][0-9](\s?([AP]M|[ap]m))?$/g)) {
        case "NO_INPUT":
            alert("Please enter the time for " + inErrorDescriptiveText + ".");
            inWidget.focus();
            retval = false;
            break;
        case "DOES_NOT_MATCH":
            alert("The value you entered for when " + inErrorDescriptiveText +
                " does not look like a time of day.  Please enter a " +
                "value like \"9:15\". You can specify AM or PM using " +
                "either uppercase or lowercase, but it isn\'t required."
            );
            inWidget.focus();
            retval = false;
            break;
        default:
            retval = true;
            break;
    }
    return retval;
}

//---------------------------------------------------------------------------------
//	validateInputAndHandleErrors
//
//	Determine whether the input is valid.  If it isn't, put up an error message
//	and position the cursor in the widget with the invalid data.
//
//	inWidget		The widget to check.
//	inRegex			The expression against which to validate.
//	inEmptyMsg		The message to display if the user didn't enter anything.
//	inBadDataMsg	The message to display if the input doesn't match inRegex.
//---------------------------------------------------------------------------------
function validateInputAndHandleErrors(inWidget,	// Widget to check.
                                      inRegex,	// Expression against which to validate.
                                      inEmptyMsg,	// Message to display if the user didn't enter anything.
                                      inBadDataMsg	// Message to display if the input doesn't match inRegex.
) {
    var retval = true;		// Default to "input is OK"
    switch (validateAgainstRegex(inWidget.value, inRegex)) {
        case "NO_INPUT":
            alert(inEmptyMsg);
            inWidget.focus();
            retval = false;
            break;
        case "DOES_NOT_MATCH":
            alert(inBadDataMsg);
            inWidget.focus();
            retval = false;
            break;
        default:
            retval = true;
            break;
    }
    return retval;
}

//---------------------------------------------------------------------------------
//	saveDailyVanLogs
//
//	Validate the input from vanpool daily logs entered on
//	VIPLogsCalendarFormat.jsp CIPCOMLOG1.  Once the input passes muster,
//	submit the form to have the input written to the database.
//---------------------------------------------------------------------------------
function saveDailyVanLogs(formObj) {
    numb = /^[0-9]+$/;						// Positive whole number
    mon = /^\d+(?:\.\d{0,2})$/;				// Money

    var homeToWorkStr = "the van left home to travel to work";
    var arrivedAtWorkStr = "the van arrived at work";
    var workToHomeStr = "the van left work to travel home";
    var arrivedAtHomeStr = "the van arrived back home from work";
    if (formObj.noCommute != null && formObj.noCommute.checked) {
        if (formObj.noCommuteReason == null) {
            alert("you must select the reason for Did not Operate");
            return false;
        } else if (formObj.noCommuteReason.value == '0' || formObj.noCommuteReason.value == '') {
            alert("you must select the reason for Did not Operate");
            return false;
        }

    } else {

        if (checkTimeInput(formObj.twStart, homeToWorkStr) == false)
            return false;
        if (checkTimeInput(formObj.twEnd, arrivedAtWorkStr) == false)
            return false;
        if (checkTimeInput(formObj.thStart, workToHomeStr) == false)
            return false;
        if (checkTimeInput(formObj.thEnd, arrivedAtHomeStr) == false)
            return false;
        if (checkOdometerInput(formObj.owStart, homeToWorkStr) == false)
            return false;
        if (checkOdometerInput(formObj.owEnd, arrivedAtWorkStr) == false)
            return false;
        if (checkOdometerInput(formObj.ohStart, workToHomeStr) == false)
            return false;
        if (checkOdometerInput(formObj.ohEnd, arrivedAtHomeStr) == false)
            return false;
        /*
         * NO NEED TO VALIDATE -- VALUE IS COMPUTED AND FORMATTED BY THE PROGRAM.
         // Validate total time van was on the road today.
         if ( validateInputAndHandleErrors (formObj.totVanDriveTime,
         /^([1-9]|10|11|12):[0-5][0-9]$/g,
         "Please enter the total time the van was on the road today.",
         "The value you entered for total time the van was on the road today " +
         "does not look like a time value.  Please enter a value like " +
         "\"1:45\" or, for part of an hour, \":45\" is 45 minutes."
         ) == false )
         return false;
         */
        /*
         * NO NEED TO VALIDATE -- VALUE IS COMPUTED AND FORMATTED BY THE PROGRAM.
         // Validate total miles driven today.
         if ( validateInputAndHandleErrors (
         formObj.milesDriven, /^[0-9]*\.?[0-9]?$/g,
         "Please enter the total miles the van travelled today.",
         "The value you entered for total miles the van was driven " +
         "today is invalid.  Please enter a number rounded to " +
         "the nearest nearest tenth. Please do not use commas, " +
         "negative numbers or zero."
         ) == false )
         return false;
         */
        // Validate value entered for gallons of fuel purchased.
        if (validateInputAndHandleErrors(
                formObj.gallons, /^0|([0-9]*\.[0-9]{1,3})$/g,
                "Please enter the amount in gallons for the fuel you purchased " +
                "today. If you did not buy fuel today, just type in a 0.",
                "The value you entered for gallons for your fuel purchase today " +
                "is invalid.  Please enter a number that has up to 3 digits " +
                "after the decimal point."
            ) == false)
            return false;

        // Validate price per gallon for fuel purchased today.  Allow anything up to $9.999.
        if (validateInputAndHandleErrors(
                formObj.pricePerGallon, /^0|([0-9]*\.[0-9]{1,3})$/g,
                "Please enter the price per gallon for the fuel you purchased " +
                "today. If you did not buy fuel today, just type in a 0.",
                "The value you entered for price per gallon for your fuel " +
                "purchase today is invalid.  Please enter a number between " +
                "0 and 9.999."
            ) == false)
            return false;

        // Validate amount spent on fuel.
        if (validateInputAndHandleErrors(
                formObj.gas, /^0|[0-9]*\.[0-9]{2}$/g,
                "Please enter the you spent for fuel today. If you did not " +
                "buy fuel today, just type in a 0.",
                "The amount you entered for your fuel purchase today " +
                "is invalid.  Please enter dollars and cents."
            ) == false)
            return false;

        // Validate amount spent on parking.
        if (validateInputAndHandleErrors(
                formObj.park, /^0|[0-9]*\.[0-9]{2}$/g,
                "Please enter the you spent for parking today. If you did not " +
                "pay for parking today, just type in a 0.",
                "The amount you entered for parking fees today " +
                "is invalid.  Please enter dollars and cents."
            ) == false)
            return false;

        // Validate amount spent for tolls.
        if (validateInputAndHandleErrors(
                formObj.toll, /^0|[0-9]*\.[0-9]{2}$/g,
                "Please enter the you spent on tolls today. If you " +
                "did not pay tolls today, just type in a 0.",
                "The amount you entered for tolls today " +
                "is invalid.  Please enter dollars and cents."
            ) == false)
            return false;

        // Add validate amount for OTHER
        if ( validateInputAndHandleErrors (
                    formObj.other, /^0|[0-9]*\.[0-9]{2}$/g,
                    "Please enter the amount in dollars and cents " +
                            "you spent on other expenses for " +
                            "this day. If you did not have other expenses just type in 0."
                ) == false )
            return false;
    

        // Validate amount spent for other expenses, if any.  It's OK if this
        // widget is blank or empty, but if a value is present, it must be currency.
        if (formObj.other.value != null) {
            if (formObj.other.value != "") {
                if (!(formObj.other.value.match(/^0|[0-9]*\.[0-9]{2}$/g))) {
                    alert("Please enter the amount in dollars and cents " +
                            "you spent on other expenses for " +
                            "this day. If you did not have other expenses just type in 0."
                    );
                    return false;
                }
                else {
                    // Either the user or the software entered a legal value
                    // for amount.  If that amount is nonzero, make sure
                    // (s)he entered a description of the other amount.
                    if (!(formObj.other.value.match(/^0*.?0*$/g))) {
                        var textBox = document.getElementById("specify");
                        var textLength = textBox.value.length;
                        // alert ("Legal value for OTHER amount entered, description length = " + textLength);
                        if (textLength < 1) {
                            formObj.specify.focus();
                            alert("You entered an amount for Other expense. " +
                                "Please enter a description of the other " +
                                "expense (200 characters maximum).");
                            return false;
                        }
                    }
                }
            }
            else {
                // alert ("formObj.other.value is BLANK"); // Blank is OK here.
            }
        }
        else {
            // alert ("formObj.other.value is NULL"); // Make sure we never get here.
        }
    }
    // formObj.submit();
    var form = $(formObj);
    var form_array = form.serializeArray();
    var form_values = {};
    $.each(form_array, function (i, v) {
        form_values[v['name']] = v['value'];
    });
    delete form_values.createdBy;
    delete form_values.createdT;
    delete form_values.isAdmin;
    $.each(['twStart', 'twEnd', 'thStart', 'thEnd'], function (i, v) {
        form_values[v] = form_values[v].toLowerCase();
        if (form_values[v].indexOf('am') === -1 && form_values[v].indexOf('pm') === -1) {
            form_values[v] += 'am';
        }
    });
    form_values.tripDate = moment($('#tripdDate').val(),'M/DD/YYYY').format('M/DD/YYYY');
    if (form_values.specify == '') {
        form_values.specify = ' ';
    }
    form_values = $.extend(form_values, {
        noCommute: $(form.find('#noCommute')).prop('checked')
    });

    //loop through commuters (passengers), and then populate form_values
    $.each(form.find('.passenger'), function (i, tr) {
        tr = $(tr);
        var index = tr.data('index') + 1;
        var pool_id = tr.find('.id').val();
        var wbMiles = tr.find('.wbMiles').val();
        var wbCommute = tr.find('.wbCommute').prop('checked');
        var hbMiles = tr.find('.hbMiles').val();
        var hbCommute = tr.find('.hbCommute').prop('checked');
        if (_.isBoolean(wbCommute)){
            wbMiles = wbMiles || 0;
        }
        if (_.isBoolean(hbCommute)){
            hbMiles = hbMiles || 0;
        }

        form_values['passenger' + index + 'id'] = pool_id;
        form_values['passenger' + index + 'wbMiles'] = wbMiles;
        form_values['passenger' + index + 'wbNoCommute'] = !wbCommute;
        form_values['passenger' + index + 'hbMiles'] = hbMiles;
        form_values['passenger' + index + 'hbNoCommute'] = !hbCommute;
    });
    var url = mwcog_root;
    var params = build_query(form_values);
    console.info(url + '?' + params);
    $.get(url + '?' + params, {}, function (result) {
        console.info(result);
        app_toast('Your commute log has been saved. Click OK to return to the Commute Log Calendar.');
        $('div.ui-dialog-contain a.ui-icon-delete').trigger('click');
    }, 'json').fail(function (error) {
        app_alert('There an error while saving your log. Please contact our support team');
        console.info(error);
    });

    return true;
}

// carpool registration for rewards
function registerPool(formObj, id) {

    var checkId = id;
    var message = "Fields marked with * are required.\n";

    /**** Pool Information ****/
    if (checkId == "yes") {
        if (formObj.idPool.value == null || formObj.idPool.value == "") {
            alert("Please enter the Pool Id from the e-mail.");
            formObj.idPool.focus();
            return false;
        }
    } else {
        if (formObj.poolName.value == null || formObj.poolName.value == "") {
            alert("please enter the pool name");
            formObj.poolName.focus();
            return false;
        }
    }

    /**** Applicant Information ****/
    var msg1 = "\nPlease click on the link 'Edit My Information' and update your profile.";
    // check first name
    if (formObj.firstName.value == "") {
        alert("First Name is required." + msg1);
        return false;
    }
    // check last name
    if (formObj.lastName.value == "") {
        alert("Last Name is required." + msg1);
        return false;
    }
    // check street address
    if (formObj.homeAddress.value == "" || formObj.homeAddress.value.length < 10) {
        alert("Home Address is required." + msg1);
        return false;
    }
    // enter atleast one personal contact number and work number
    if (formObj.hphone.value == "" || formObj.hphone.length < 10) {
        alert("Home or Cell Phone is required." + msg1);
        return false;
    }
    if (formObj.wphone.value == "" || formObj.wphone.length < 10) {
        alert("Work Phone is required." + msg1);
        return false;
    }
    // check email address
    if (formObj.email.value == "") {
        alert("E-mail Address is required." + msg1);
        return false;
    }

    /**** Employer Information ****/
    var msg2 = "\nPlease click on the link 'Edit Employer Information' and update your profile.";
    // check employer name
    if (formObj.empName.value == "") {
        alert("Employer Name is required." + msg2);
        return false;
    }
    // check employer city
    if (formObj.empAddress.value == "") {
        alert("Employer Address is required." + msg2);
        return false;
    }
    // check supervisor first name
    if (formObj.supFirstName.value == "") {
        alert("Supervisor's First Name is required." + msg2);
        return false;
    }
    // check supervisor last name
    if (formObj.supLastName.value == "") {
        alert("Supervisor's Last Name is required." + msg2);
        return false;
    }
    if (formObj.sphone.value == "" || formObj.sphone.length < 10) {
        alert("Supervisor's Phone is required." + msg2);
        return false;
    }
    // check supervisor email
    var note = "";
    if (formObj.supEmail.value == null || formObj.supEmail.value == "") {
        alert("Supervisor's e-mail is required." + msg2);
        formObj.supEmail.focus();
        return false;
    } else {
        note = checkEmail(formObj.supEmail.value);
        if (note != "") {
            alert(note);
            formObj.supEmail.focus();
            return false;
        }
    }

    /**** Demographic Information ****/
    // check sex
    if (formObj.sex.value == "") {
        alert(message + "Please select your sex.");
        formObj.sex.focus();
        return false;
    }
    // check age
    if (formObj.age.value == "") {
        alert(message + "Please select your age.");
        formObj.age.focus();
        return false;
    }
    // check household income
    if (formObj.income.value == "") {
        alert(message + "Please select your household income.");
        formObj.income.focus();
        return false;
    }
    // check ethnicity/race
    if (formObj.race.value == "") {
        alert(message + "Please select ethnicity/race.");
        formObj.race.focus();
        return false;
    }

    /***** Commute Information ****/
    // check commute mode
    if (formObj.commuteMode.value == "") {
        alert(message + "Please select the current commute mode.");
        formObj.commuteMode.focus();
        return false;
    }
    // check commute distance
    if (formObj.distance.value == "") {
        alert(message + "Please enter the commute distance.");
        formObj.distance.focus();
        return false;
    }
    // check commute modes used in past 30 days
    if (formObj.travelMode1.checked == false && formObj.travelMode2.checked == false &&
        formObj.travelMode3.checked == false && formObj.travelMode4.checked == false &&
        formObj.travelMode5.checked == false && formObj.travelMode6.checked == false &&
        formObj.travelMode7.checked == false && formObj.travelMode8.checked == false) {
        alert("Please check the commute modes used to \n travel to work in the past 30 days.");
        return false;
    }
    // check number of days alternate commute modes used in past 30 days
    if (formObj.past30Days.value == "") {
        alert("Please select the number of days you used \n an alternate commute mode (other than driving alone).");
        formObj.past30Days.focus();
        return false;
    }
    // check how heard
    if (formObj.howheard.value == "") {
        alert(message + "Please select how you heard about us.");
        formObj.howheard.focus();
        return false;
    }

    formObj.action.value = "registerpool";
    if (checkId == "yes") {
        formObj.action.value = "registermember";
    }
    formObj.submit();
    return true;
}

//VANpool registration for rewards
function registerVanPool(formObj, id) {

    var checkId = id;
    var message = "Fields marked with * are required.\n";
//alert("registerVanPool reached!  id = " + id); // REMOVE FOR PRODUCTION
    /**** Pool Information ****/
    if (checkId == "yes") {
        if (formObj.idPool.value == null || formObj.idPool.value == "") {
            alert("Please enter the Pool Id from the e-mail.");
            formObj.idPool.focus();
            return false;
        }
    } else {
        if (formObj.poolName.value == null || formObj.poolName.value == "") {
            alert("please enter the pool name");
            formObj.poolName.focus();
            return false;
        }
    }

    /**** Applicant Information ****/
    var msg1 = "\nPlease click on the link 'Edit My Information' and update your profile.";
    // check first name
    if (formObj.firstName.value == "") {
        alert("First Name is required." + msg1);
        return false;
    }
    // check last name
    if (formObj.lastName.value == "") {
        alert("Last Name is required." + msg1);
        return false;
    }
    // check street address
    if (formObj.homeAddress.value == "" || formObj.homeAddress.value.length < 10) {
        alert("Home Address is required." + msg1);
        return false;
    }
    // enter atleast one personal contact number and work number
    if (formObj.hphone.value == "" || formObj.hphone.length < 10) {
        alert("Home or Cell Phone is required." + msg1);
        return false;
    }
    if (formObj.wphone.value == "" || formObj.wphone.length < 10) {
        alert("Work Phone is required." + msg1);
        return false;
    }
    // check email address
    if (formObj.email.value == "") {
        alert("E-mail Address is required." + msg1);
        return false;
    }

    /**** Employer Information ****/
    var msg2 = "\nPlease click on the link 'Edit Employer Information' and update your profile.";
    // check employer name
    if (formObj.empName.value == "") {
        alert("Employer Name is required." + msg2);
        return false;
    }
    // check employer city
    if (formObj.empAddress.value == "") {
        alert("Employer Address is required." + msg2);
        return false;
    }
    // check supervisor first name
    if (formObj.supFirstName.value == "") {
        alert("Supervisor's First Name is required." + msg2);
        return false;
    }
    // check supervisor last name
    if (formObj.supLastName.value == "") {
        alert("Supervisor's Last Name is required." + msg2);
        return false;
    }
    if (formObj.sphone.value == "" || formObj.sphone.length < 10) {
        alert("Supervisor's Phone is required." + msg2);
        return false;
    }
    // check supervisor email
    var note = "";
    if (formObj.supEmail.value == null || formObj.supEmail.value == "") {
        alert("Supervisor's e-mail is required." + msg2);
        formObj.supEmail.focus();
        return false;
    } else {
        note = checkEmail(formObj.supEmail.value);
        if (note != "") {
            alert(note);
            formObj.supEmail.focus();
            return false;
        }
    }

    /**** Demographic Information ****/
    // check sex
    if (formObj.sex.value == "") {
        alert(message + "Please select your sex.");
        formObj.sex.focus();
        return false;
    }
    // check age
    if (formObj.age.value == "") {
        alert(message + "Please select your age.");
        formObj.age.focus();
        return false;
    }
    // check household income
    if (formObj.income.value == "") {
        alert(message + "Please select your household income.");
        formObj.income.focus();
        return false;
    }
    // check ethnicity/race
    if (formObj.race.value == "") {
        alert(message + "Please select ethnicity/race.");
        formObj.race.focus();
        return false;
    }

    /***** Commute Information ****/
    // check commute mode
    if (formObj.commuteMode.value == "") {
        alert(message + "Please select the current commute mode.");
        formObj.commuteMode.focus();
        return false;
    }
    // check commute distance
    if (formObj.distance.value == "") {
        alert(message + "Please enter the commute distance.");
        formObj.distance.focus();
        return false;
    }
    // check commute modes used in past 30 days
    if (formObj.travelMode1.checked == false && formObj.travelMode2.checked == false &&
        formObj.travelMode3.checked == false && formObj.travelMode4.checked == false &&
        formObj.travelMode5.checked == false && formObj.travelMode6.checked == false &&
        formObj.travelMode7.checked == false && formObj.travelMode8.checked == false) {
        alert("Please check the commute modes used to \n travel to work in the past 30 days.");
        return false;
    }
    // check number of days alternate commute modes used in past 30 days
    if (formObj.past30Days.value == "") {
        alert("Please select the number of days you used \n an alternate commute mode (other than driving alone).");
        formObj.past30Days.focus();
        return false;
    }
    // check how heard
    if (formObj.howheard.value == "") {
        alert(message + "Please select how you heard about us.");
        formObj.howheard.focus();
        return false;
    }

    formObj.action.value = "registerVanpool";
    if (checkId == "yes") {
        formObj.action.value = "registerVanmember";
    }
    formObj.submit();
    return true;
}


// invite members to join registered carpools
function checkInviteMembers(formObj) {

    if (formObj.poolPoint.value == null || formObj.poolPoint.value == "") {
        alert("Please select your primary meeting point.");
        formObj.poolPoint.focus();
        return false;
    }
    if (formObj.foundPartner1.checked == false && formObj.foundPartner2.checked == false &&
        formObj.foundPartner3.checked == false && formObj.foundPartner4.checked == false &&
        formObj.foundPartner5.checked == false) {
        alert("Please select how you found car pool partners.");
        return false;
    }

    /**** Partner Information ****/
    if (formObj.fName1.value == "") {
        alert("please enter first name of partner1");
        formObj.fName1.focus();
        return false;
    }
    if (formObj.lName1.value == "") {
        alert("please enter last name of partner1");
        formObj.lName1.focus();
        return false;
    }
    if (formObj.email1.value == "") {
        alert("please enter e-mail address of partner1");
        formObj.email1.focus();
        return false;
    }

    /**** Vehicle Information ****/
    if (formObj.vehicleType.value == "") {
        alert("Please enter your vehicle type.");
        formObj.vehicleType.focus();
        return false;
    }
    if (formObj.vehicleMake.value == "") {
        alert("Please enter your vehicle make.");
        formObj.vehicleMake.focus();
        return false;
    }
    if (formObj.vehicleModel.value == "") {
        alert("Please enter your vehicle model.");
        formObj.vehicleModel.focus();
        return false;
    }
    if (formObj.vehicleYear.value == "") {
        alert("Please enter your vehicle year.");
        formObj.vehicleYear.focus();
        return false;
    }
    if (formObj.averageGas.value == "") {
        alert("Please enter the average miles per gallon.");
        formObj.averageGas.focus();
        return false;
    }

    formObj.action.value = "invitemember";
    formObj.submit();
    return true;
}

// invite members to join registered carpools
function checkInviteMembers2(formObj) {

    /**** Partner Information ****/
    if (formObj.fName1.value == "") {
        alert("please enter first name of partner1");
        formObj.fName1.focus();
        return false;
    }
    if (formObj.lName1.value == "") {
        alert("please enter last name of partner1");
        formObj.lName1.focus();
        return false;
    }
    if (formObj.email1.value == "") {
        alert("please enter e-mail address of partner1");
        formObj.email1.focus();
        return false;
    }

    formObj.action.value = "invitemember2";
    formObj.submit();
    return true;
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

function showTooltip(htmlText) {
    document.getElementById("tooltip").innerHTML = htmlText;
}

function hideTooltip() {
    if (document.getElementById("tooltip").style.display == 'block') {
        document.getElementById("tooltip").style.display = 'none';
    }
}

function enterPassengerInfo(formObj) {
    document.getElementById("action").value = "saveVanlog";
    formObj.submit();
}

function enterPassengerInfoAdmin(formObj) {
    document.getElementById("action").value = "saveVanlogAdmin";
    formObj.submit();
}

function findMajor(formObj) {

    formObj.action.value = "editMajor";
    formObj.submit();
}

function findSSI(formObj) {
    formObj.action.value = "editSSI";
    formObj.submit();

}

// Fill in the widget for total miles driven with a value rounded to nearest 1/10th.
function sumupvalues() {
    var startToWork = parseFloat(document.getElementById("owStart").value);
    var endToWork = parseFloat(document.getElementById("owEnd").value);
    var startToHome = parseFloat(document.getElementById("ohStart").value);
    var endToHome = parseFloat(document.getElementById("ohEnd").value);
    // Fill in the widget, rounded to 10ths:
    document.vanlog.milesDriven.value = roundNumber(
        ((endToWork - startToWork) + (endToHome - startToHome)), 1
    );
}
