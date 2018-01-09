function clearCommuter(formObj) {
	formObj.commuterId.value=""; 
	formObj.userName.value="";
	formObj.firstName.value="";
	formObj.lastName.value="";
}

function searchCommuter(formObj) {
	formObj.action.value="search";
	formObj.submit();
	return true;
}

function updateCommuter(formObj) {
	if (formObj.commuterId.value == null || formObj.commuterId.value == '') {
		alert("Please select a commuter from the list.");
		return false;
	}
	formObj.action.value="update";
	formObj.submit();
	return true;
}

function editCommuter(formObj) {
	formObj.action.value="editcommuter";
	formObj.submit();
	return true;
}

function selectCommuter(formObj) {
	if (formObj.commuterId.value == null || formObj.commuterId.value == '') {
		alert("Please select a commuter from the list.");
		return false;
	}
	formObj.action.value="selectcommuter";
	formObj.submit();
	return true;
}

function fillCommuter(commuter) {
	var formObj  = commuter.form;
	var formName = commuter.form.name;
	switch(commuter.options[commuter.selectedIndex].value) {
	    case '0':
	    	alert('Please select a commuter from the list.');
	    	break;
	 	case '1': 
			formObj.commuterId.value=formObj.commuterId1.value;
			formObj.commIdOrig.value=formObj.commIdOrig1.value;
			formObj.userName.value=formObj.userName1.value;
			formObj.firstName.value=formObj.firstName1.value;
			formObj.lastName.value=formObj.lastName1.value;
			formObj.email.value=formObj.email1.value;
			formObj.phone.value=formObj.phone1.value;
			formObj.zipCode.value=formObj.zipCode1.value;
			break;
	 	case '2': 
			formObj.commuterId.value=formObj.commuterId2.value; 
			formObj.commIdOrig.value=formObj.commIdOrig2.value;
			formObj.userName.value=formObj.userName2.value;
			formObj.firstName.value=formObj.firstName2.value;
			formObj.lastName.value=formObj.lastName2.value;
			formObj.email.value=formObj.email2.value;
			formObj.phone.value=formObj.phone2.value;
			formObj.zipCode.value=formObj.zipCode2.value;
			break;
	 	case '3': 
			formObj.commuterId.value=formObj.commuterId3.value; 
			formObj.commIdOrig.value=formObj.commIdOrig3.value;
			formObj.userName.value=formObj.userName3.value;
			formObj.firstName.value=formObj.firstName3.value;
			formObj.lastName.value=formObj.lastName3.value;
			formObj.email.value=formObj.email3.value;
			formObj.phone.value=formObj.phone3.value;
			formObj.zipCode.value=formObj.zipCode3.value;
			break;
	 	case '4': 
			formObj.commuterId.value=formObj.commuterId4.value;
			formObj.commIdOrig.value=formObj.commIdOrig4.value; 
			formObj.userName.value=formObj.userName4.value;
			formObj.firstName.value=formObj.firstName4.value;
			formObj.lastName.value=formObj.lastName4.value;
			formObj.email.value=formObj.email4.value;
			formObj.phone.value=formObj.phone4.value;
			formObj.zipCode.value=formObj.zipCode4.value;
			break;
	 	case '5': 
			formObj.commuterId.value=formObj.commuterId5.value;
			formObj.commIdOrig.value=formObj.commIdOrig5.value;
			formObj.userName.value=formObj.userName5.value;
			formObj.firstName.value=formObj.firstName5.value;
			formObj.lastName.value=formObj.lastName5.value;
			formObj.email.value=formObj.email5.value;
			formObj.phone.value=formObj.phone5.value;
			formObj.zipCode.value=formObj.zipCode5.value;
			break;
	 	case '6': 
			formObj.commuterId.value=formObj.commuterId6.value;
			formObj.commIdOrig.value=formObj.commIdOrig6.value;
			formObj.userName.value=formObj.userName6.value;
			formObj.firstName.value=formObj.firstName6.value;
			formObj.lastName.value=formObj.lastName6.value;
			formObj.email.value=formObj.email6.value;
			formObj.phone.value=formObj.phone6.value;
			formObj.zipCode.value=formObj.zipCode6.value;
			break;
	 	case '7': 
			formObj.commuterId.value=formObj.commuterId7.value;
			formObj.commIdOrig.value=formObj.commIdOrig7.value;
			formObj.userName.value=formObj.userName7.value;
			formObj.firstName.value=formObj.firstName7.value;
			formObj.lastName.value=formObj.lastName7.value;
			formObj.email.value=formObj.email7.value;
			formObj.phone.value=formObj.phone7.value;
			formObj.zipCode.value=formObj.zipCode7.value;
			break;
	 	case '8': 
			formObj.commuterId.value=formObj.commuterId8.value; 
			formObj.commIdOrig.value=formObj.commIdOrig8.value;
			formObj.userName.value=formObj.userName8.value;
			formObj.firstName.value=formObj.firstName8.value;
			formObj.lastName.value=formObj.lastName8.value;
			formObj.email.value=formObj.email8.value;
			formObj.phone.value=formObj.phone8.value;
			formObj.zipCode.value=formObj.zipCode8.value;
			break;
	 	case '9': 
			formObj.commuterId.value=formObj.commuterId9.value; 
			formObj.commIdOrig.value=formObj.commIdOrig9.value;
			formObj.userName.value=formObj.userName9.value;
			formObj.firstName.value=formObj.firstName9.value;
			formObj.lastName.value=formObj.lastName9.value;
			formObj.email.value=formObj.email9.value;
			formObj.phone.value=formObj.phone9.value;
			formObj.zipCode.value=formObj.zipCode9.value;
			break;
	 	case '10': 
			formObj.commuterId.value=formObj.commuterId10.value; 
			formObj.commIdOrig.value=formObj.commIdOrig10.value;
			formObj.userName.value=formObj.userName10.value;
			formObj.firstName.value=formObj.firstName10.value;
			formObj.lastName.value=formObj.lastName10.value;
			formObj.email.value=formObj.email10.value;
			formObj.phone.value=formObj.phone10.value;
			formObj.zipCode.value=formObj.zipCode10.value;
			break;
	 	case '11': 
			formObj.commuterId.value=formObj.commuterId11.value; 
			formObj.commIdOrig.value=formObj.commIdOrig11.value;
			formObj.userName.value=formObj.userName11.value;
			formObj.firstName.value=formObj.firstName11.value;
			formObj.lastName.value=formObj.lastName11.value;
			formObj.email.value=formObj.email11.value;
			formObj.phone.value=formObj.phone11.value;
			formObj.zipCode.value=formObj.zipCode11.value;
			break;
	 	case '12': 
			formObj.commuterId.value=formObj.commuterId12.value;
			formObj.commIdOrig.value=formObj.commIdOrig12.value; 
			formObj.userName.value=formObj.userName12.value;
			formObj.firstName.value=formObj.firstName12.value;
			formObj.lastName.value=formObj.lastName12.value;
			formObj.email.value=formObj.email12.value;
			formObj.phone.value=formObj.phone12.value;
			formObj.zipCode.value=formObj.zipCode12.value;
			break;
	 	case '13': 
			formObj.commuterId.value=formObj.commuterId13.value; 
			formObj.commIdOrig.value=formObj.commIdOrig13.value;
			formObj.userName.value=formObj.userName13.value;
			formObj.firstName.value=formObj.firstName13.value;
			formObj.lastName.value=formObj.lastName13.value;
			formObj.email.value=formObj.email13.value;
			formObj.phone.value=formObj.phone13.value;
			formObj.zipCode.value=formObj.zipCode13.value;
			break;
	 	case '14': 
			formObj.commuterId.value=formObj.commuterId14.value; 
			formObj.commIdOrig.value=formObj.commIdOrig14.value;
			formObj.userName.value=formObj.userName14.value;
			formObj.firstName.value=formObj.firstName14.value;
			formObj.lastName.value=formObj.lastName14.value;
			formObj.email.value=formObj.email14.value;
			formObj.phone.value=formObj.phone14.value;
			formObj.zipCode.value=formObj.zipCode14.value;
			break;
	 	case '15': 
			formObj.commuterId.value=formObj.commuterId15.value;
			formObj.commIdOrig.value=formObj.commIdOrig15.value; 
			formObj.userName.value=formObj.userName15.value;
			formObj.firstName.value=formObj.firstName15.value;
			formObj.lastName.value=formObj.lastName15.value;
			formObj.email.value=formObj.email15.value;
			formObj.phone.value=formObj.phone15.value;
			formObj.zipCode.value=formObj.zipCode15.value;
			break;
	 	case '16': 
			formObj.commuterId.value=formObj.commuterId16.value; 
			formObj.commIdOrig.value=formObj.commIdOrig16.value;
			formObj.userName.value=formObj.userName16.value;
			formObj.firstName.value=formObj.firstName16.value;
			formObj.lastName.value=formObj.lastName16.value;
			formObj.email.value=formObj.email16.value;
			formObj.phone.value=formObj.phone16.value;
			formObj.zipCode.value=formObj.zipCode16.value;
			break;
	 	case '17': 
			formObj.commuterId.value=formObj.commuterId17.value; 
			formObj.commIdOrig.value=formObj.commIdOrig17.value;
			formObj.userName.value=formObj.userName17.value;
			formObj.firstName.value=formObj.firstName17.value;
			formObj.lastName.value=formObj.lastName17.value;
			formObj.email.value=formObj.email17.value;
			formObj.phone.value=formObj.phone17.value;
			formObj.zipCode.value=formObj.zipCode17.value;
			break;
	 	case '18': 
			formObj.commuterId.value=formObj.commuterId18.value; 
			formObj.commIdOrig.value=formObj.commIdOrig18.value;
			formObj.userName.value=formObj.userName18.value;
			formObj.firstName.value=formObj.firstName18.value;
			formObj.lastName.value=formObj.lastName18.value;
			formObj.email.value=formObj.email18.value;
			formObj.phone.value=formObj.phone18.value;
			formObj.zipCode.value=formObj.zipCode18.value;
			break;
	 	case '19': 
			formObj.commuterId.value=formObj.commuterId19.value; 
			formObj.commIdOrig.value=formObj.commIdOrig19.value;
			formObj.userName.value=formObj.userName19.value;
			formObj.firstName.value=formObj.firstName19.value;
			formObj.lastName.value=formObj.lastName19.value;
			formObj.email.value=formObj.email19.value;
			formObj.phone.value=formObj.phone19.value;
			formObj.zipCode.value=formObj.zipCode19.value;
			break;
	 	case '20': 
			formObj.commuterId.value=formObj.commuterId20.value;
			formObj.commIdOrig.value=formObj.commIdOrig20.value; 
			formObj.userName.value=formObj.userName20.value;
			formObj.firstName.value=formObj.firstName20.value;
			formObj.lastName.value=formObj.lastName20.value;
			formObj.email.value=formObj.email20.value;
			formObj.phone.value=formObj.phone20.value;
			formObj.zipCode.value=formObj.zipCode20.value;
			break;
	 	case '21': 
			formObj.commuterId.value=formObj.commuterId21.value;
			formObj.commIdOrig.value=formObj.commIdOrig21.value; 
			formObj.userName.value=formObj.userName21.value;
			formObj.firstName.value=formObj.firstName21.value;
			formObj.lastName.value=formObj.lastName21.value;
			formObj.email.value=formObj.email21.value;
			formObj.phone.value=formObj.phone21.value;
			formObj.zipCode.value=formObj.zipCode21.value;
			break;
	 	case '22': 
			formObj.commuterId.value=formObj.commuterId22.value; 
			formObj.commIdOrig.value=formObj.commIdOrig22.value;
			formObj.userName.value=formObj.userName22.value;
			formObj.firstName.value=formObj.firstName22.value;
			formObj.lastName.value=formObj.lastName22.value;
			formObj.email.value=formObj.email22.value;
			formObj.phone.value=formObj.phone22.value;
			formObj.zipCode.value=formObj.zipCode22.value;
			break;
	 	case '23': 
			formObj.commuterId.value=formObj.commuterId23.value; 
			formObj.commIdOrig.value=formObj.commIdOrig23.value;
			formObj.userName.value=formObj.userName23.value;
			formObj.firstName.value=formObj.firstName23.value;
			formObj.lastName.value=formObj.lastName23.value;
			formObj.email.value=formObj.email23.value;
			formObj.phone.value=formObj.phone23.value;
			formObj.zipCode.value=formObj.zipCode23.value;
			break;
	 	case '24': 
			formObj.commuterId.value=formObj.commuterId24.value; 
			formObj.commIdOrig.value=formObj.commIdOrig24.value;
			formObj.userName.value=formObj.userName24.value;
			formObj.firstName.value=formObj.firstName24.value;
			formObj.lastName.value=formObj.lastName24.value;
			formObj.email.value=formObj.email24.value;
			formObj.phone.value=formObj.phone24.value;
			formObj.zipCode.value=formObj.zipCode24.value;
			break;
	 	case '25': 
			formObj.commuterId.value=formObj.commuterId25.value; 
			formObj.commIdOrig.value=formObj.commIdOrig25.value;
			formObj.userName.value=formObj.userName25.value;
			formObj.firstName.value=formObj.firstName25.value;
			formObj.lastName.value=formObj.lastName25.value;
			formObj.email.value=formObj.email25.value;
			formObj.phone.value=formObj.phone25.value;
			formObj.zipCode.value=formObj.zipCode25.value;
			break;
		default:
			alert('Commuter not found. Please select again.');
			break;
	}
}

function checkRequest(formObj) {
	if (formObj.rideExp.value == null || formObj.rideExp.value == "") {
		alert("Please enter the reason for ride request.");
		formObj.rideExp.focus();
		return false;
	}
	formObj.submit();
	return true;
}

function checkMatchRequest(formObj) {
	var message = "";
	// check work start time
	var hrsfrom = formObj.fromHRS.value;
	var mnsfrom = formObj.fromMNS.value;
	if (hrsfrom != "" && mnsfrom != "") {
		// check hour entered
		if (hrsfrom.length == 1)
			hrsfrom = "0"+hrsfrom;
		var hrs1 = hrsfrom.substring(0,1);
		var hrs2 = hrsfrom.substring(1,2);
		if (hrs1 < '0' || hrs1 > '1' || hrs2 < '0' || hrs2 > '9') {
			alert("Please enter valid hour in \nwork start time.");
			formObj.fromHRS.focus();
			return false;
		}
		if (hrs1 == '1' && (hrs2 < '0' || hrs2 > '2')) {
			alert("Please enter valid hour in \nwork start time.");
			formObj.fromHRS.focus();
			return false;
		}
		// check minutes entered
		if (mnsfrom.length == 1)
			mnsfrom = "0"+mnsfrom;
		var mns1 = mnsfrom.substring(0,1);
		var mns2 = mnsfrom.substring(1,2);
		if (mns1 < '0' || mns1 > '5' || mns2 < '0' || mns2 > '9') {
			alert("Please enter valid minutes in \nwork start time.");
			formObj.fromMNS.focus();
			return false;
		}
		formObj.fromHRS.value = hrsfrom;
		formObj.fromMNS.value = mnsfrom;
	} else {
		alert(message+"Please enter time in  \nwork start time.");
		formObj.fromHRS.focus();
		return false;
	}

	// check work end time
	var hrsto = formObj.toHRS.value;
	var mnsto = formObj.toMNS.value;
	if (hrsto != "" && mnsto != "") {
		// check hour entered
		if (hrsto.length == 1)
			hrsto = "0"+hrsto;
		var hrs1 = hrsto.substring(0,1);
		var hrs2 = hrsto.substring(1,2);
		if (hrs1 < '0' || hrs1 > '1' || hrs2 < '0' || hrs2 > '9') {
			alert("Please enter valid hour in \nwork end time.");
			formObj.toHRS.focus();
			return false;
		}
		if (hrs1 == '1' && (hrs2 < '0' || hrs2 > '2')) {
			alert("Please enter valid hour in \nwork end time.");
			formObj.toHRS.focus();
			return false;
		}
		// check minutes entered
		if (mnsto.length == 1)
			mnsto = "0"+mnsto;
		var mns1 = mnsto.substring(0,1);
		var mns2 = mnsto.substring(1,2);
		if (mns1 < '0' || mns1 > '5' || mns2 < '0' || mns2 > '9') {
			alert("Please enter valid minutes in \nwork end time.");
			formObj.toMNS.focus();
			return false;
		}
		formObj.toHRS.value = hrsto;
		formObj.toMNS.value = mnsto;
	} else {
		alert(message+"Please enter time in  \nwork end time.");
		formObj.toHRS.focus();
		return false;
	}

	if (formObj.sstreet.value == null || formObj.sstreet.value == "") {
		alert("Please enter street for starting address.");
		formObj.sstreet.focus();
		return false;
	}
	if (formObj.scity.value == null || formObj.scity.value == "") {
		alert("Please enter city for starting address.");
		formObj.scity.focus();
		return false;
	}
	if (formObj.sstate.value == null || formObj.sstate.value == "") {
		alert("Please enter state for starting address.");
		formObj.sstate.focus();
		return false;
	}
	/*
	if (formObj.szip.value == null || formObj.szip.value == "") {
		alert("Please enter zip code for starting address.");
		formObj.szip.focus();
		return false;
	} else {
		// check zip code
		re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
		if (!re.test(formObj.szip.value)) {
			alert("Please enter a valid zip code for starting address. \nEx: 12345 or 12345-6789.");
			formObj.szip.focus();
			return false;
		}
	}
	*/
	if (formObj.dstreet.value == null || formObj.dstreet.value == "") {
		alert("Please enter street for destination address.");
		formObj.dstreet.focus();
		return false;
	}
	if (formObj.dcity.value == null || formObj.dcity.value == "") {
		alert("Please enter city for destination address.");
		formObj.dcity.focus();
		return false;
	}
	if (formObj.dstate.value == null || formObj.dstate.value == "") {
		alert("Please enter state for destination address.");
		formObj.dstate.focus();
		return false;
	}
	/*
	if (formObj.dzip.value == null || formObj.dzip.value == "") {
		alert("Please enter zip code for destination address.");
		formObj.dzip.focus();
		return false;
	} else {
		// check zip code
		re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
		if (!re.test(formObj.dzip.value)) {
			alert("Please enter a valid zip code for destination address. \nEx: 12345 or 12345-6789.");
			formObj.dzip.focus();
			return false;
		}
	}
	*/
	document.getElementById('status').style.display = 'block';
	document.getElementById('inputs').style.display = 'none';
	formObj.submit();
	return true;
}

function reregisterForCcrs(formObj) {
//	formObj.action.value="reregister";
	document.getElementById("action").value="reregister";
	formObj.submit();
	return true;
}
