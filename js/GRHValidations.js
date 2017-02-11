function editRidesAvailable(formObj) {
 	formObj.action.value="editridesavailable";
	formObj.submit();
	return true;
}

/****** process one time excep regn *********/
function checkOTERegistration(formObj) {
	// Improve data validation -- ensure they choose GRHW or GRHB
	var grhappval = document.getElementById("grhapp").value;
	if (grhappval == "none" || grhappval == "" || grhappval == null) {
		alert ("Please choose a GRH appform code (Washington or Baltimore).");
		document.getElementById("grhapp").focus();
		return false;
	}
 	formObj.action.value="onetimeexception";
	formObj.submit();
	return true;
}

function saveSupervisor(formObj) {
 	formObj.action.value="savesupervisor";
	formObj.submit();
	return true;
}
/****** process grh registrations ***********/
function processGRHQueue(formObj) {
	document.getElementById("action").value="processqueue";
	formObj.submit();
	return true;
}

function processGRHRegistration(formObj) {
	document.getElementById("action").value="processregistration";
	formObj.submit();
	return true;
}


function processreg(formObj) {
	document.getElementById("action").value="processreg";
	formObj.submit();
	return true;
}

/************ create trip requests ************/
function createTripRequest(formObj) {
	if (formObj.commuterId.value == null || formObj.commuterId.value == '') {
		alert("Please select a commuter from the list.");
		return false;
	}
	document.getElementById("action").value="triprequest";
	
	
	formObj.submit();
	return true;
}

/*********** process trip requests ************/
function saveTripDetails(formObj) {
	//formObj.action.value="savetripdetails";
	document.getElementById("action").value="savetripdetails";

	formObj.submit();
	return true;
}

function addRideLeg(formObj) {
	//formObj.action.value="addrideleg";
	document.getElementById("action").value="addrideleg";
	formObj.submit();
	return true;
}

function saveRideLeg(formObj) {
	//formObj.action.value="saverideleg";
	// Validate the input coming in from the provider dropdown
	var providerDropdownList = document.getElementsByClassName("providerDropdown");
	if (providerDropdownList != null) {
		var kount = providerDropdownList.length;
		for (var i = 0; i < kount; i++) {
			//alert (providerDropdownList[i].name + " == " + providerDropdownList[i].value);
			// I despise this hard coding of a value for the "Choose One"
			// provider.  Also hate having added it to the TBLSERVICE_PROVIDER.
			// Might have to revisit this.
			if (providerDropdownList[i].value == 200001) {
				alert ("Please choose a provider from the list.");
				providerDropdownList[i].focus();
				return false;
			}
		}
	}

	document.getElementById("action").value="saverideleg";
	formObj.submit();
	return true;
}

function deleteRideLeg(formObj) {
	var legno = null;
	for (var i=0; i < document.processtrips.legNo.length; i++) {
		if (document.processtrips.legNo[i].checked) {
			legno = document.processtrips.legNo[i].value;
		}
	}
	if (legno == null && document.processtrips.legNo.checked) {
		legno = 0;
	}
	if (legno == null) {
		alert("Please select the leg to delete.");
		return false;
	}
	//formObj.action.value="deleterideleg";	
	document.getElementById("action").value="deleterideleg";

	formObj.submit();
	return true;
}


function checkEstMiles(estMiles) {
	re = /[0-9]/;
	if (estMiles != "") {
		if(!re.test(estMiles)) {
			alert("Estimated miles must be numeric.");
			return false;
		}
		return true;
	}
}

function checkHours(hourEntered) {
	if (hourEntered != "") {
		if (hourEntered.length == 1)
			hourEntered = "0"+hourEntered;
		var hrs1 = hourEntered.substring(0,1);
		var hrs2 = hourEntered.substring(1,2);
		if (hrs1 < '0' || hrs1 > '1' || hrs2 < '0' || hrs2 > '9') {
			alert("Please enter valid hour (0 to 12) for time.");
			return false;
		}
		if (hrs1 == '1' && (hrs2 < '0' || hrs2 > '2')) {
			alert("Please enter valid hour (0 to 12) for time.");
			return false;
		}
		return true;
	}
}

function checkMinutes(minsEntered) {
	if (minsEntered != "") {
		if (minsEntered.length == 1)
			minsEntered = "0"+minsEntered;
		var mns1 = minsEntered.substring(0,1);
		var mns2 = minsEntered.substring(1,2);
		if (mns1 < '0' || mns1 > '5' || mns2 < '0' || mns2 > '9') {
			alert("Please enter valid minutes (0 to 59) for time.");
			return false;
		}
		return true;
	}
}

/************ process invoices ************/
function processTrips(formObj) {
	document.getElementById("action").value="processridequeue";
	formObj.submit();
	return true;
}

function processInvoices(formObj) {
	document.getElementById("action").value="processinvqueue";
	formObj.submit();
	return true;
}

function checkRideAmount(formObj) {
	if (formObj.amount.value == null || formObj.amount.value == '') {
		alert("Please enter the invoice amount.");
		formObj.amount.focus();
		return false;
	} 
	if (!checkMoney(formObj.amount.value)) {
		formObj.amount.focus();
		return false;
	}		
	document.getElementById("action").value="saverideamount";
	formObj.submit();
	return true;
}

function createInvoice(formObj) {
	document.getElementById("action").value="createinvoice";
	formObj.submit();
	return true;
}

function submitInvoice(formObj) {
	if (formObj.invNumber.value == null || formObj.invNumber.value=="") {
		alert("Please enter the invoice number.");
		formObj.invNumber.focus();
		return false;
	}
	if (formObj.amount.value == null || formObj.amount.value=="") {
		alert("Please enter the invoice amount.");
		formObj.amount.focus();
		return false;
	} 
	if (!checkMoney(formObj.amount.value)) {
		formObj.amount.focus();
		return false;
	}	
	if (formObj.invDateSub.value == null || formObj.invDateSub.value=="") {
		alert("Please enter the invoice submission date.");
		formObj.invDateSub.focus();
		return false;
	}
	if (formObj.invDateRec.value == null || formObj.invDateRec.value=="") {
		alert("Please enter the invoice receipt date.");
		formObj.invDateRec.focus();
		return false;
	}
	document.getElementById("action").value="submitinvoice";
	formObj.submit();
	return true;
}

function searchRides(formObj) {
	formObj.action.value="searchrides";
	formObj.submit();
	return true;
}

function submitVoucher(formObj) {
	if (formObj.amount.value == null || formObj.amount.value == '') {
		alert("Please enter the voucher amount.");
		formObj.amount.focus();
		return false;
	}
	if (!checkMoney(formObj.amount.value)) {
		formObj.amount.focus();
		return false;
	}
	document.getElementById("action").value="submitvoucher";

	formObj.submit();
	return true;
}

function checkMoney(amount) {
	str = amount.replace("$", "");
	str = str.replace(",",""); 
	var myexp = /^\d+\.\d{0,2}$/;
	var regex = new RegExp(myexp);
	if (!regex.test(str)) { 
		alert("Please enter amount in a valid format. \nEx: 123.00 or 123.45");
		return false;
	} else 
		return true;
}

/*

	else {
		for(var i=0; i<rideamount.length; i++) {
			var oneChar = rideamount.substring(i, i+1);
			if (oneChar < '0' || oneChar > '9') {
				alert("Please enter a valid amount for the invoice. \nEx: 99 or 999 (no decimals please)");
				formObj.amount.focus();
				return false;
			}
		}
	}


	else {
		var rideamount = formObj.invAmount.value;
		for(var i=0; i<rideamount.length; i++) {
			var oneChar = rideamount.substring(i, i+1);
			if (oneChar < '0' || oneChar > '9') {
				alert("Please enter a valid amount for the invoice. \nEx: 99 or 999 (no decimals please)");
				formObj.amount.focus();
				return false;
			}
		}
	}

*/