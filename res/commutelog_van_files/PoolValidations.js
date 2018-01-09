function setContacts(formObj) {
    var j = 0;
    var email1 = "";
    var email2 = "";
    for (var i = 0; i < formObj.elements.length; i++) {
		if (formObj.elements[i].type == 'checkbox') {
			if (formObj.elements[i].checked == true) {
                email1 += document.getElementById("emailid" + j).value + ";";
                email2 += document.getElementById("commtid" + j).value + ";";
			}
			j++;
		}
	}
	document.getElementById("recipient").value = email1;
	document.getElementById("emailto").value = email2;
	return true;
}

function emailMatchLetter(formObj) {
	if (formObj.recipient.value == null || formObj.recipient.value == "") {
		alert("Please enter recipients email address.");
		formObj.recipient.focus();
		return false;
	}
	var str = formObj.recipient.value;
    if ((str.indexOf('@', 0) == -1 || str.indexOf('.', 0) == -1) && str.value != "") {
		alert("Plaese enter a valid email address.");
		formObj.recipient.focus();
		return false;
	}
	if (formObj.subject.value == null || formObj.subject.value == "") {
		alert("Please enter email subject.");
		formObj.subject.focus();
		return false;
	}
	formObj.submit();
	return true;
}

function prepEmailMatchLetter(formObj) {
    document.getElementById("action").value = "prepemail";
	formObj.submit();
	return true;
}

function saveGeocodes(formObj) {
	if (formObj.latitude.value == null || formObj.latitude.value == "") {
        alert("Please select the location on map to get the coordinates.");
		return false;
	}
    document.getElementById("action").value = "savegeocodes";
	formObj.submit();
	return true;
}

function setAddresses(formObj) {
	var addressno = null;
    for (var i = 0; i < document.addressprofile.start.length; i++) {
		if (document.addressprofile.start[i].checked) {
			addressno = document.addressprofile.start[i].value;
		}
	}
	if (addressno == null && document.addressprofile.start.checked) {
		addressno = 0;
	}
	if (addressno == null) {
		alert("Please select a start address.");
		return false;
	}
	var addressno1 = null;
    for (var i = 0; i < document.addressprofile.destn.length; i++) {
		if (document.addressprofile.destn[i].checked) {
			addressno1 = document.addressprofile.destn[i].value;
		}
	}
	if (addressno1 == null && document.addressprofile.destn.checked) {
		addressno1 = 0;
	}
	if (addressno1 == null) {
		alert("Please select a destination address.");
		return false;
	}
    document.getElementById("action").value = "setaddresses";
	formObj.submit();
	return true;
}

function addAltAddress(formObj) {
	if (formObj.street1.value == "" || formObj.street1.value == null) {
		alert("Please enter the street name.");
		return false;
	}
	if (formObj.city.value == "" || formObj.city.value == null) {
		alert("Please enter the city.");
		return false;
	}
    document.getElementById("action").value = "addaltaddress";
	formObj.submit();
	return true;
}

function searchAddresses(formObj) {
    document.getElementById("action").value = "searchaddresses";
	formObj.submit();
	return true;
}

function retrySearchAddresses(formObj) {
    document.getElementById("action").value = "retrysearchaddresses";
	formObj.submit();
	return true;
}

function refreshAddresses(formObj) {
    document.getElementById("action").value = "refreshaddrprofile";
	formObj.submit();
	return true;
}

function addAddress(formObj) {
    document.getElementById("action").value = "addaddress";
	formObj.submit();
	return true;
}

function deleteAddress(formObj) {
	var addrno = null;
    for (var i = 0; i < document.addressprofile.addridx.length; i++) {
		if (document.addressprofile.addridx[i].checked) {
			addrno = document.addressprofile.addridx[i].value;
		}
	}
	if (addrno == null && document.addressprofile.addridx.checked) {
		addrno = 0;
	}
	if (addrno == null) {
		alert("Please select the address to delete.");
		return false;
	}
    document.getElementById("action").value = "deleteaddress";
	formObj.submit();
	return true;
}

function checkNewMatchRequest(formObj) {
	var message = "";
	// check work start time
	var hrsfrom = formObj.fromHRS.value;
	var mnsfrom = formObj.fromMNS.value;
	if (hrsfrom != "" && mnsfrom != "") {
		// check hour entered
		if (hrsfrom.length == 1)
            hrsfrom = "0" + hrsfrom;
        var hrs1 = hrsfrom.substring(0, 1);
        var hrs2 = hrsfrom.substring(1, 2);
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
            mnsfrom = "0" + mnsfrom;
        var mns1 = mnsfrom.substring(0, 1);
        var mns2 = mnsfrom.substring(1, 2);
		if (mns1 < '0' || mns1 > '5' || mns2 < '0' || mns2 > '9') {
			alert("Please enter valid minutes in \nwork start time.");
			formObj.fromMNS.focus();
			return false;
		}
		formObj.fromHRS.value = hrsfrom;
		formObj.fromMNS.value = mnsfrom;
	} else {
        alert(message + "Please enter time in  \nwork start time.");
		formObj.fromHRS.focus();
		return false;
	}

	// check work end time
	var hrsto = formObj.toHRS.value;
	var mnsto = formObj.toMNS.value;
	if (hrsto != "" && mnsto != "") {
		// check hour entered
		if (hrsto.length == 1)
            hrsto = "0" + hrsto;
        var hrs1 = hrsto.substring(0, 1);
        var hrs2 = hrsto.substring(1, 2);
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
            mnsto = "0" + mnsto;
        var mns1 = mnsto.substring(0, 1);
        var mns2 = mnsto.substring(1, 2);
		if (mns1 < '0' || mns1 > '5' || mns2 < '0' || mns2 > '9') {
			alert("Please enter valid minutes in \nwork end time.");
			formObj.toMNS.focus();
			return false;
		}
		formObj.toHRS.value = hrsto;
		formObj.toMNS.value = mnsto;
	} else {
        alert(message + "Please enter time in  \nwork end time.");
		formObj.toHRS.focus();
		return false;
	}
	document.getElementById('status').style.display = 'block';
	//document.getElementById('status').style.visibility = 'visible';
	document.getElementById('inputs').style.display = 'none';
	//document.getElementById("action").value="setaddresses";
	formObj.submit();
	return true;
}

function runDynReport(formObj) {
    if (formObj.select.value == "" || formObj.select.value == "") {
		alert("Please enter sql statement.");
		formObj.select.focus();
 		return false;
 	}
    document.getElementById("action").value = "runDynamicReport";
	formObj.submit();
	return true;
}

function saveDynReport(formObj) {
	if (formObj.saveas.value == "") {
		alert("Please enter a name in 'Save Report As'.");
		formObj.saveas.focus();
		return false;
	}
    document.getElementById("action").value = "saveDynamicReport";
	formObj.submit();
	return true;
}

function searchPool(formObj) {
    document.getElementById("action").value = "searchPool";
	formObj.submit();
	return true;
}

function searchVanPool(formObj) {
// alert("searchVanPool reached!");		// debugging
    document.getElementById("action").value = "searchVanPool";
	formObj.submit();
	return true;
}

function updatePool(formObj) {
	if (formObj.idPool.value == "" || formObj.idPool.value == null) {
		alert("Please select a pool from the list.");
		return false;
	}
    document.getElementById("action").value = "updatePool";
	formObj.submit();
	return true;
}

function reviewPool(formObj) {
	if (formObj.idPool.value == "" || formObj.idPool.value == null) {
		alert("Please select a pool from the list.");
		return false;
	}
    document.getElementById("action").value = "reviewPool";
	formObj.submit();
	return true;
}

function savePool(formObj) {
    if (document.getElementById("poolType").value == "I" && document.getElementById("poolStatusA").value == "E") {
        if (document.getElementById("pStartDate").value == null || document.getElementById("pStartDate").value == "") {
			alert("Please select the pool start date.");
			return false;
		}	
        if (document.getElementById("poolCorridor").value == null || document.getElementById("poolCorridor").value == "0") {
			alert("Please select the corridor used.");
			document.getElementById("poolCorridor").focus();
			return false;
		}	
	}
    document.getElementById("action").value = "savePool";

	
	document.getElementById("poolinfo").submit();

	
	return true;
}

function addPool(formObj) {
    document.getElementById("action").value = "addPool";
	formObj.submit();
	return true;
}

function createPool(formObj) {
    document.getElementById("action").value = "createPool";
	formObj.submit();
	return true;
}

/* old addNewMember function
 function addNewMember(formObj) {
	if (formObj.poolCapacity.value == null || formObj.poolCapacity.value == "") {
		alert("Pool maximum size is not defined. Please set pool maximum size \nand save changes before adding new members.");
		formObj.poolCapacity.focus();
		return false; 
	}
	if (formObj.poolSize.value >= formObj.poolCapacity.value) {
		alert("Pool is already filled to the maximum size.");
		return false;
	}
	document.getElementById("action").value="addNewMember";
	formObj.submit();
	return true;
 }*/

function addNewMember(formObj) {
      var capacity = formObj.poolCapacity.value;
      var poolsize = formObj.poolSize.value;
      if (capacity == null || capacity == "") {
            alert("Pool maximum size is not defined. Please set pool maximum size \nand save changes before adding new members.");
            formObj.poolCapacity.focus();
            return false; 
      }
      if (capacity.length == 2 && poolsize.length < 2)
        poolsize = "0" + poolsize;
      if (poolsize >= capacity) {
            alert("Pool is already filled to the maximum size.");
            return false;
      }
    document.getElementById("action").value = "addNewMember";
      formObj.submit();
      return true;
}


function searchMembers(formObj) {
    document.getElementById("action").value = "searchMembers";
	formObj.submit();
	return true;
}

function addMember(formObj) {
    document.getElementById("action").value = "addMember";
	formObj.submit();
	return true;
}

function updateMember(formObj) {
	var memberId = checkRadioSelection(formObj.memberIndex);
	if (!memberId) {
		if (!formObj.memberIndex.checked) {
			alert("Please select a member to update.");
			return false;
		}
	}
    document.getElementById("action").value = "updateMember";
	formObj.submit();
	return true;
}

function saveMember(formObj) {
    document.getElementById("action").value = "saveMember";
	formObj.submit();
	return true;
}

function removeMember(formObj) {
	var memberId = checkRadioSelection(formObj.memberIndex);
	if (!memberId) {
		if (!formObj.memberIndex.checked) {
			alert("Please select a member to remove.");
			return false;
		}
	}
    document.getElementById("action").value = "removeMember";
	formObj.submit();
	return true;
}

function checkRadioSelection(radioButton) {
    for (var i = 0; i < radioButton.length; i++) {
		if (radioButton[i].checked) {
			return true;
		}
	} 
	return false;
}


function displayOptions1() {
	
	
    var element = document.getElementById('poolType');
    //alert(element.value);
    if (element.value == 'C' || element.value == 'V' || element.value == 'T' || element.value == 'O')  {
    	//alert(element.value);
    	//document.poolsearch.poolStatus.options[0].selected = true;
        document.poolsearch.poolStatusA.value = "";
        document.poolsearch.poolStatusB.value = "";
        document.poolsearch.poolStatusC.value = "";
            document.getElementById('carpool').style.display = '';
            document.getElementById('cip').style.display = 'none';
            document.getElementById('vip').style.display = 'none';

    } else if (element.value == 'I') {
        document.poolsearch.poolStatusA.value = "";
        document.poolsearch.poolStatusB.value = "";
        document.poolsearch.poolStatusC.value = "";

        document.getElementById('carpool').style.display = 'none';
        document.getElementById('cip').style.display = '';
        document.getElementById('vip').style.display = 'none';
    } else if (element.value == 'N') {
        document.poolsearch.poolStatusA.value = "";
        document.poolsearch.poolStatusB.value = "";
        document.poolsearch.poolStatusC.value = "";
      	
        document.getElementById('carpool').style.display = 'none';
        document.getElementById('cip').style.display = 'none';
        document.getElementById('vip').style.display = '';
    }

	// }
   // setPageHeight();
}


function displayOptions2() {
	
	
          
            document.getElementById('carpool').style.display = '';
            document.getElementById('cip').style.display = 'none';
            document.getElementById('vip').style.display = 'none';
            document.getElementById('vanpoolIP').style.display = 'none';



	// }
   // setPageHeight();
}

function displayOptions3() {
	
	
    var element = document.getElementById('poolType');
    //alert(element.value);
    if (element.value == 'C' || element.value == 'V' || element.value == 'T' || element.value == 'O')  {
    	//alert(element.value);
    	//document.poolsearch.poolStatus.options[0].selected = true;
          
            document.getElementById('carpool').style.display = '';
            document.getElementById('cip').style.display = 'none';
            document.getElementById('vip').style.display = 'none';
            document.getElementById('vanpoolIP').style.display = 'none';

    } else if (element.value == 'I') {
    	

        document.getElementById('carpool').style.display = 'none';
        document.getElementById('cip').style.display = '';
        document.getElementById('vip').style.display = 'none';
        document.getElementById('vanpoolIP').style.display = 'none';
    } else if (element.value == 'N') {

        document.getElementById('carpool').style.display = 'none';
        document.getElementById('cip').style.display = 'none';
        document.getElementById('vip').style.display = '';
        document.getElementById('vanpoolIP').style.display = '';
    }

	// }
   // setPageHeight();
}

function displayOptions4() {
	
	
    var element = document.getElementById('poolType');
  //  alert(element.value);
    if (element.value == 'C' || element.value == 'V' || element.value == 'T' || element.value == 'O')  {
    	//alert(element.value);
    	//document.poolsearch.poolStatus.options[0].selected = true;
        document.poolinfo.poolStatusA.value = "";
        document.poolinfo.poolStatusB.value = "";
        document.poolinfo.poolStatusC.value = "";
            document.getElementById('carpool').style.display = '';
            document.getElementById('cip').style.display = 'none';
            document.getElementById('vip').style.display = 'none';

    } else if (element.value == 'I') {
        document.poolinfo.poolStatusA.value = "";
        document.poolinfo.poolStatusB.value = "";
        document.poolinfo.poolStatusC.value = "";

        document.getElementById('carpool').style.display = 'none';
        document.getElementById('cip').style.display = '';
        document.getElementById('vip').style.display = 'none';
    } else if (element.value == 'N') {
        document.poolinfo.poolStatusA.value = "";
        document.poolinfo.poolStatusB.value = "";
        document.poolinfo.poolStatusC.value = "";
      	
        document.getElementById('carpool').style.display = 'none';
        document.getElementById('cip').style.display = 'none';
        document.getElementById('vip').style.display = '';
    }

	// }
   // setPageHeight();
}


function safetyNSecForm(formObj) {
	numb = /^[0-9]+$/;

    if (!formObj.occurVech.value == null || !formObj.occurVech.value == "") {
        if (!formObj.occurVech.value.match(numb)) {
			formObj.occurVech.focus();
			alert("Please enter a number in the 'In transit vehicles' row under the  'Occurrences' column.");
			return false;
		}
	}
	
    if (!formObj.custVech.value == null || !formObj.custVech.value == "") {
        if (!formObj.custVech.value.match(numb)) {
			formObj.custVech.focus();
			alert("Please enter a number in the 'In transit vehicles' row under the 'Customers' column.");
			return false;
		}
	}
	
    if (!formObj.workVech.value == null || !formObj.workVech.value == "") {
        if (!formObj.workVech.value.match(numb)) {
			formObj.workVech.focus();
			alert("Please enter a number in the 'In transit vehicles' row under the 'Workers' column.");
			return false;
		}
	}
	
    if (!formObj.otherVech.value == null || !formObj.otherVech.value == "") {
        if (!formObj.otherVech.value.match(numb)) {
			formObj.otherVech.focus();
			alert("Please enter a number in the 'In transit vehicles' row under the 'Other' column.");
			return false;
		}
	}
	
	
	
	
	
	
    if (!formObj.occurWstairs.value == null || !formObj.occurWstairs.value == "") {
        if (!formObj.occurWstairs.value.match(numb)) {
			formObj.occurWstairs.focus();
			alert("Please enter a number in the 'Boarding / alighting: With stairs' row under the  'Occurrences' column.");
			return false;
		}
	}
	
    if (!formObj.custWstairs.value == null || !formObj.custWstairs.value == "") {
        if (!formObj.custWstairs.value.match(numb)) {
			formObj.custWstairs.focus();
			alert("Please enter a number in the 'Boarding / alighting: With stairs' row under the 'Customers' column.");
			return false;
		}
	}
	
    if (!formObj.workWstairs.value == null || !formObj.workWstairs.value == "") {
        if (!formObj.workWstairs.value.match(numb)) {
			formObj.workWstairs.focus();
			alert("Please enter a number in the 'Boarding / alighting: With stairs' row under the 'Workers' column.");
			return false;
		}
	}
	
    if (!formObj.otherWstairs.value == null || !formObj.otherWstairs.value == "") {
        if (!formObj.otherWstairs.value.match(numb)) {
			formObj.otherWstairs.focus();
			alert("Please enter a number in the 'Boarding / alighting: With stairs' row under the 'Other' column.");
			return false;
		}
	}	
	
	
    if (!formObj.occurLRamp.value == null || !formObj.occurLRamp.value == "") {
        if (!formObj.occurLRamp.value.match(numb)) {
			formObj.occurLRamp.focus();
			alert("Please enter a number in the 'Boarding / alighting: With lift or ramp' row under the  'Occurrences' column.");
			return false;
		}
	}
	
    if (!formObj.custLRamp.value == null || !formObj.custLRamp.value == "") {
        if (!formObj.custLRamp.value.match(numb)) {
			formObj.custLRamp.focus();
			alert("Please enter a number in the 'Boarding / alighting: With lift or ramp' row under the 'Customers' column.");
			return false;
		}
	}
	
    if (!formObj.workLRamp.value == null || !formObj.workLRamp.value == "") {
        if (!formObj.workLRamp.value.match(numb)) {
			formObj.workLRamp.focus();
			alert("Please enter a number in the 'Boarding / alighting: With lift or ramp' row under the 'Workers' column.");
			return false;
		}
	}
	
    if (!formObj.otherLRamp.value == null || !formObj.otherLRamp.value == "") {
        if (!formObj.otherLRamp.value.match(numb)) {
			formObj.otherLRamp.focus();
			alert("Please enter a number in the 'Boarding / alighting: With lift or ramp' row under the 'Other' column.");
			return false;
		}
	}	
	
	
    if (!formObj.occurBAOther.value == null || !formObj.occurBAOther.value == "") {
        if (!formObj.occurBAOther.value.match(numb)) {
			formObj.occurBAOther.focus();
			alert("Please enter a number in the 'Boarding / alighting: Other' row under the  'Occurrences' column.");
			return false;
		}
	}
	
    if (!formObj.custBAOther.value == null || !formObj.custBAOther.value == "") {
        if (!formObj.custBAOther.value.match(numb)) {
			formObj.custBAOther.focus();
			alert("Please enter a number in the 'Boarding / alighting: Other' row under the 'Customers' column.");
			return false;
		}
	}
	
    if (!formObj.workBAOther.value == null || !formObj.workBAOther.value == "") {
        if (!formObj.workBAOther.value.match(numb)) {
			formObj.workBAOther.focus();
			alert("Please enter a number in the 'Boarding / alighting: Other' row under the 'Workers' column.");
			return false;
		}
	}
	
    if (!formObj.otherBAOther.value == null || !formObj.otherBAOther.value == "") {
        if (!formObj.otherBAOther.value.match(numb)) {
			formObj.otherBAOther.focus();
			alert("Please enter a number in the 'Boarding / alighting: Other' row under the 'Other' column.");
			return false;
		}
	}
	
	
    if (!formObj.occurSecure.value == null || !formObj.occurSecure.value == "") {
        if (!formObj.occurSecure.value.match(numb)) {
			formObj.occurSecure.focus();
			alert("Please enter a number in the 'Other in vehicle: Securement issue' row under the  'Occurrences' column.");
			return false;
		}
	}
	
    if (!formObj.custSecure.value == null || !formObj.custSecure.value == "") {
        if (!formObj.custSecure.value.match(numb)) {
			formObj.custSecure.focus();
			alert("Please enter a number in the 'Other in vehicle: Securement issue' row under the 'Customers' column.");
			return false;
		}
	}
	
    if (!formObj.workSecure.value == null || !formObj.workSecure.value == "") {
        if (!formObj.workSecure.value.match(numb)) {
			formObj.workSecure.focus();
			alert("Please enter a number in the 'Other in vehicle: Securement issue' row under the 'Workers' column.");
			return false;
		}
	}
	
    if (!formObj.otherSecure.value == null || !formObj.otherSecure.value == "") {
        if (!formObj.otherSecure.value.match(numb)) {
			formObj.otherSecure.focus();
			alert("Please enter a number in the 'Other in vehicle: Securement issue' row under the 'Other' column.");
			return false;
		}
	}
	
	
	
	
    if (!formObj.occurNonSecure.value == null || !formObj.occurNonSecure.value == "") {
        if (!formObj.occurNonSecure.value.match(numb)) {
			formObj.occurNonSecure.focus();
			alert("Please enter a number in the 'Other in vehicle: Not a securement issue' column.");
			return false;
		}
	}
	
    if (!formObj.custNonSecure.value == null || !formObj.custNonSecure.value == "") {
        if (!formObj.custNonSecure.value.match(numb)) {
			formObj.custNonSecure.focus();
			alert("Please enter a number in the 'Other in vehicle: Not a securement issue' row under the 'Customers' column.");
			return false;
		}
	}
	
    if (!formObj.workNonSecure.value == null || !formObj.workNonSecure.value == "") {
        if (!formObj.workNonSecure.value.match(numb)) {
			formObj.workNonSecure.focus();
			alert("Please enter a number in the 'Other in vehicle: Not a securement issue' row under the 'Workers' column.");
			return false;
		}
	}
	
    if (!formObj.otherNonSecure.value == null || !formObj.otherNonSecure.value == "") {
        if (!formObj.otherNonSecure.value.match(numb)) {
			formObj.otherNonSecure.focus();
			alert("Please enter a number in the 'Other in vehicle: Not a securement issue' row under the 'Other' column.");
			return false;
		}
	}
	
	
    if (!formObj.occurRecFac.value == null || !formObj.occurRecFac.value == "") {
        if (!formObj.occurRecFac.value.match(numb)) {
			formObj.occurRecFac.focus();
			alert("Please enter a number in the 'In revenue facilities' row under the 'Occurrence' column.");
			return false;
		}
	}
	
    if (!formObj.custRecFac.value == null || !formObj.custRecFac.value == "") {
        if (!formObj.custRecFac.value.match(numb)) {
			formObj.custRecFac.focus();
			alert("Please enter a number in the 'In revenue facilities' row under the 'Customers' column.");
			return false;
		}
	}
	
    if (!formObj.workRecFac.value == null || !formObj.workRecFac.value == "") {
        if (!formObj.workRecFac.value.match(numb)) {
			formObj.workRecFac.focus();
			alert("Please enter a number in the 'In revenue facilitiese' row under the 'Workers' column.");
			return false;
		}
	}
	
    if (!formObj.otherRecFac.value == null || !formObj.otherRecFac.value == "") {
        if (!formObj.otherRecFac.value.match(numb)) {
			formObj.otherRecFac.focus();
			alert("Please enter a number in the 'In revenue facilities' row under the 'Other' column.");
			return false;
		}
	}
		
    if (!formObj.occurRamp.value == null || !formObj.occurRamp.value == "") {
        if (!formObj.occurRamp.value.match(numb)) {
			formObj.occurRamp.focus();
			alert("Please enter a number in the 'Ramps' row under the  'Occurrences' column.");
			return false;
		}
	}
	
    if (!formObj.custRamp.value == null || !formObj.custRamp.value == "") {
        if (!formObj.custRamp.value.match(numb)) {
			formObj.custRamp.focus();
			alert("Please enter a number in the 'Ramps' row under the 'Customers' column.");
			return false;
		}
	}
	
    if (!formObj.workRamp.value == null || !formObj.workRamp.value == "") {
        if (!formObj.workRamp.value.match(numb)) {
			formObj.workRamp.focus();
			alert("Please enter a number in the 'Ramps' row under the 'Workers' column.");
			return false;
		}
	}
	
    if (!formObj.otherRamp.value == null || !formObj.otherRamp.value == "") {
        if (!formObj.otherRamp.value.match(numb)) {
			formObj.otherRamp.focus();
			alert("Please enter a number in the 'Ramps' row under the 'Other' column.");
			return false;
		}
	}
	
	
	
    if (!formObj.occurStairs.value == null || !formObj.occurStairs.value == "") {
        if (!formObj.occurStairs.value.match(numb)) {
			formObj.occurStairs.focus();
			alert("Please enter a number in the 'Stairs' row under the  'Occurrences' column.");
			return false;
		}
	}
	
    if (!formObj.custStairs.value == null || !formObj.custStairs.value == "") {
        if (!formObj.custStairs.value.match(numb)) {
			formObj.custStairs.focus();
			alert("Please enter a number in the 'Stairs' row under the 'Customers' column.");
			return false;
		}
	}
	
    if (!formObj.workStairs.value == null || !formObj.workStairs.value == "") {
        if (!formObj.workStairs.value.match(numb)) {
			formObj.workStairs.focus();
			alert("Please enter a number in the 'Stairs' row under the 'Workers' column.");
			return false;
		}
	}
	
    if (!formObj.otherStairs.value == null || !formObj.otherStairs.value == "") {
        if (!formObj.otherStairs.value.match(numb)) {
			formObj.otherStairs.focus();
			alert("Please enter a number in the 'Stairs' row under the 'Other' column.");
			return false;
		}
	}
	
	
    if (!formObj.occurEscalator.value == null || !formObj.occurEscalator.value == "") {
        if (!formObj.occurEscalator.value.match(numb)) {
			formObj.occurEscalator.focus();
			alert("Please enter a number in the 'Escalator' row under the  'Occurrences' column.");
			return false;
		}
	}
	
    if (!formObj.custEscalator.value == null || !formObj.custEscalator.value == "") {
        if (!formObj.custEscalator.value.match(numb)) {
			formObj.custEscalator.focus();
			alert("Please enter a number in the 'Escalator' row under the 'Customers' column.");
			return false;
		}
	}
	
    if (!formObj.workEscalator.value == null || !formObj.workEscalator.value == "") {
        if (!formObj.workEscalator.value.match(numb)) {
			formObj.workEscalator.focus();
			alert("Please enter a number in the 'Escalator' row under the 'Workers' column.");
			return false;
		}
	}
	
    if (!formObj.otherEscalator.value == null || !formObj.otherEscalator.value == "") {
        if (!formObj.otherEscalator.value.match(numb)) {
			formObj.otherEscalator.focus();
			alert("Please enter a number in the 'Escalator' row under the 'Other' column.");
			return false;
		}
	}
	
	
	
    if (!formObj.occurElevate.value == null || !formObj.occurElevate.value == "") {
        if (!formObj.occurElevate.value.match(numb)) {
			formObj.occurElevate.focus();
			alert("Please enter a number in the 'Elevators' row under the  'Occurrences' column.");
			return false;
		}
	}
	
    if (!formObj.custElevate.value == null || !formObj.custElevate.value == "") {
        if (!formObj.custElevate.value.match(numb)) {
			formObj.custElevate.focus();
			alert("Please enter a number in the 'Elevators' row under the 'Customers' column.");
			return false;
		}
	}
	
    if (!formObj.workElevate.value == null || !formObj.workElevate.value == "") {
        if (!formObj.workElevate.value.match(numb)) {
			formObj.workElevate.focus();
			alert("Please enter a number in the 'Elevators' row under the 'Workers' column.");
			return false;
		}
	}
	
    if (!formObj.otherElevate.value == null || !formObj.otherElevate.value == "") {
        if (!formObj.otherElevate.value.match(numb)) {
			formObj.otherElevate.focus();
			alert("Please enter a number in the 'Elevators' row under the 'Other' column.");
			return false;
		}
	}
	

		
    if (!formObj.occurRFOther.value == null || !formObj.occurRFOther.value == "") {
        if (!formObj.occurRFOther.value.match(numb)) {
				formObj.occurRFOther.focus();
				alert("Please enter a number in the 'Other' row under the  'Occurrences' column.");
				return false;
			}
		}
	
    if (!formObj.custRFOther.value == null || !formObj.custRFOther.value == "") {
        if (!formObj.custRFOther.value.match(numb)) {
			formObj.custRFOther.focus();
			alert("Please enter a number in the 'Other' row under the 'Customers' column.");
			return false;
		}
	}
	
    if (!formObj.workRFOther.value == null || !formObj.workRFOther.value == "") {
        if (!formObj.workRFOther.value.match(numb)) {
			formObj.workRFOther.focus();
			alert("Please enter a number in the 'Other' row under the 'Workers' column.");
			return false;
		}
	}
	
    if (!formObj.otherRFOther.value == null || !formObj.otherRFOther.value == "") {
        if (!formObj.otherRFOther.value.match(numb)) {
			formObj.otherRFOther.focus();
			alert("Please enter a number in the 'Other' row under the 'Other' column.");
			return false;
		}
	}	
	
    if (!formObj.occurNonRecFac.value == null || !formObj.occurNonRecFac.value == "") {
        if (!formObj.occurNonRecFac.value.match(numb)) {
				formObj.occurNonRecFac.focus();
				alert("Please enter a number in the 'In non-revenue facilities' row under the  'Occurrences' column.");
				return false;
			}
		}
	
    if (!formObj.custNonRecFac.value == null || !formObj.custNonRecFac.value == "") {
        if (!formObj.custNonRecFac.value.match(numb)) {
			formObj.custNonRecFac.focus();
			alert("Please enter a number in the 'In non-revenue facilities' row under the 'Customers' column.");
			return false;
		}
	}
	
    if (!formObj.workNonRecFac.value == null || !formObj.workNonRecFac.value == "") {
        if (!formObj.workNonRecFac.value.match(numb)) {
			formObj.workNonRecFac.focus();
			alert("Please enter a number in the 'In non-revenue facilities' row under the 'Workers' column.");
			return false;
		}
	}
	
    if (!formObj.otherNonRecFac.value == null || !formObj.otherNonRecFac.value == "") {
        if (!formObj.otherNonRecFac.value.match(numb)) {
			formObj.otherNonRecFac.focus();
			alert("Please enter a number in the 'In non-revenue facilities' row under the 'Other' column.");
			return false;
		}
	}
	
	
    if (!formObj.occurNRFOther.value == null || !formObj.occurNRFOther.value == "") {
        if (!formObj.occurNRFOther.value.match(numb)) {
				formObj.occurNRFOther.focus();
				alert("Please enter a number in the 'Other' row under the  'Occurrences' column.");
				return false;
			}
		}
	
    if (!formObj.custNRFOther.value == null || !formObj.custNRFOther.value == "") {
        if (!formObj.custNRFOther.value.match(numb)) {
			formObj.custNRFOther.focus();
			alert("Please enter a number in the 'Other' row under the 'Customers' column.");
			return false;
		}
	}
	
    if (!formObj.workNRFOther.value == null || !formObj.workNRFOther.value == "") {
        if (!formObj.workNRFOther.value.match(numb)) {
			formObj.workNRFOther.focus();
			alert("Please enter a number in the 'Other' row under the 'Workers' column.");
			return false;
		}
	}
	
    if (!formObj.otherNRFOther.value == null || !formObj.otherNRFOther.value == "") {
        if (!formObj.otherNRFOther.value.match(numb)) {
			formObj.otherNRFOther.focus();
			alert("Please enter a number in the 'Other' row under the 'Other' column.");
			return false;
		}
	}	
	
	
    if (!formObj.fireVech.value == null || !formObj.fireVech.value == "") {
        if (!formObj.fireVech.value.match(numb)) {
			formObj.fireVech.focus();
			alert("Please enter a number for the number of fires in transit vehicles.");
			return false;
		}
	}
	
    if (!formObj.fireInRevFac.value == null || !formObj.fireInRevFac.value == "") {
        if (!formObj.fireInRevFac.value.match(numb)) {
			formObj.fireInRevFac.focus();
			alert("Please enter a number for the number of fires in revenue facilities.");
			return false;
		}
	}
	
    if (!formObj.fireNonInRevFac.value == null || !formObj.fireNonInRevFac.value == "") {
        if (!formObj.fireNonInRevFac.value.match(numb)) {
			formObj.fireNonInRevFac.focus();
			alert("Please enter a number for the number of fires in non-revenue facilities.");
			return false;
		}
	}
    if (!formObj.fireRight.value == null || !formObj.fireRight.value == "") {
        if (!formObj.fireRight.value.match(numb)) {
			formObj.fireRight.focus();
			alert("Please enter a number for the number of fires On right-of-way.");
			return false;
		}
	}
	
    if (!formObj.mechanical.value == null || !formObj.mechanical.value == "") {
        if (!formObj.mechanical.value.match(numb)) {
			formObj.mechanical.focus();
			alert("Please enter a number of mechanical failures.");
			return false;
		}
	}
	
    if (!formObj.otherMechanical.value == null || !formObj.otherMechanical.value == "") {
        if (!formObj.otherMechanical.value.match(numb)) {
			formObj.otherMechanical.focus();
			alert("Please enter a number of other mechanical failures.");
			return false;
		}
	}
	
    if (!formObj.total.value == null || !formObj.total.value == "") {
        if (!formObj.total.value.match(numb)) {
			formObj.total.focus();
			alert("Please enter the total number of vehicle system failures.");
			return false;
		}
	}
	
    j = 0;
    for (i = 0; i < 68; i++) {
			types = document.safetysecurity.elements[i];
			
			if (types.value) {
            j = j + 1;
			}
		}
	
    if (j <= 4) {
		formObj.occurVech.focus();
		alert("Please fill out a least one row of fields.");
		return false;
	}
	
	
	formObj.submit();
	return true;
}

// Validation for the widgets on PAVASafetyNSecurityMajorForm.jsp.  At least 1 
// checkbox must be chosen, and the description must be filled in.
function secMajorForm(formObj) {
	if (formObj.collision.checked == false && 
			formObj.fire.checked == false && 
			formObj.spill.checked == false && 
			formObj.actGod.checked == false && 
			formObj.sysSecurity.checked == false && 
            formObj.perSecurity.checked == false &&
            formObj.otherSafety.checked == false) {
        alert('What type of incident do you want to report?  Please Choose one of the radio buttons!');
        return false;
	}
	if (formObj.incidentRpt.value == null || formObj.incidentRpt.value == "") {
		formObj.incidentRpt.focus();
        alert("Please provide a description of the incident.");
		return false;
	}
	
	formObj.submit();
	return true;
	
}

// Watch as they type into the major incident description on 
// PAVASafetyNSecurityMajorForm.jsp.  Limit input to 2000 chars.
// It works for any textarea.
function limitText(limitField, limitCount, limitNum) {
	if (limitField.value.length > limitNum) {
		limitField.value = limitField.value.substring(0, limitNum);
    } else {
		limitCount.value = limitNum - limitField.value.length;
	}
}


//---------------------------------------------------------------------------------
// This group of functions computes the total occurrences in the first part of 
// the Safety and Security Report.  Each row has 4 widgets -- 3 for data entry, 
// and 1 that stores the sum of those 3.  There are 14 rows.  The first 2 functions 
// are the workhorses.  The rest are there to give the page some entry points.
//---------------------------------------------------------------------------------
function accumulateSumFor1Widget(inAddendWidgetID, inTotal) {
	// If the input is invalid, let the user know.
	// Then just keep processing, as this isn't fatal.
    var theWidget = document.getElementById(inAddendWidgetID);
	var val = theWidget.value;
    if (val == "" || val == null)
        val = 0;
	inTotal += parseInt(val);
	return inTotal;
}

function computeSumForRow(inCustomersWidgetID,
		inWorkersWidgetID, inOthersWidgetID, inTotalWidgetID) {
	var total = 0;
    total = accumulateSumFor1Widget(inCustomersWidgetID, total);
    total = accumulateSumFor1Widget(inWorkersWidgetID, total);
    total = accumulateSumFor1Widget(inOthersWidgetID, total);
    document.getElementById(inTotalWidgetID).value = total;
}

function computeTransitVehicleOccurrences() {
    computeSumForRow("custVech", "workVech", "otherVech", "occurVech");
}

function computeBoardingStairsOccurrences() {
    computeSumForRow("custWstairs", "workWstairs", "otherWstairs", "occurWstairs");
}

function computeBoardingLiftRampOccurrences() {
    computeSumForRow("custLRamp", "workLRamp", "otherLRamp", "occurLRamp");
}

function computeBoardingAlightingOtherOccurrences() {
    computeSumForRow("custBAOther", "workBAOther", "otherBAOther", "occurBAOther");
}

function computeOtherInVehicleSecurementOccurrences() {
    computeSumForRow("custSecure", "workSecure", "otherSecure", "occurSecure");
}

function computeOtherInVehicleNonSecurementOccurrences() {
    computeSumForRow("custNonSecure", "workNonSecure", "otherNonSecure", "occurNonSecure");
}

function computeInRevenueFacilityOccurrences() {
    computeSumForRow("custRevFac", "workRevFac", "otherRevFac", "occurRevFac");
}

function computeInRevRampOccurrences() {
    computeSumForRow("custRamp", "workRamp", "otherRamp", "occurRamp");
}

function computeInRevStairsOccurrences() {
    computeSumForRow("custStairs", "workStairs", "otherStairs", "occurStairs");
}

function computeInRevEscalatorsOccurrences() {
    computeSumForRow("custEscalator", "workEscalator", "otherEscalator", "occurEscalator");
}

function computeInRevElevatorsOccurrences() {
    computeSumForRow("custElevator", "workElevator", "otherElevator", "occurElevator");
}

function computeInRevOtherOccurrences() {
    computeSumForRow("custRFOther", "workRFOther", "otherRFOther", "occurRFOther");
}

function computeInNonRevOccurrences() {
    computeSumForRow("custNonRevFac", "workNonRevFac", "otherNonRevFac", "occurNonRevFac");
}

function computeOtherInNonRevOccurrences() {
    computeSumForRow("custNRFOther", "workNRFOther", "otherNRFOther", "occurNRFOther");
}

// Compute total in the "Maintenance Performance" section.
function computeTotalRevenueVehicleSystemFailures() {
	var total = 0;
    total = accumulateSumFor1Widget("mechanical", total);
    total = accumulateSumFor1Widget("otherMechanical", total);
    document.getElementById("total").value = total;
}

//---------------------------------------------------------------------------------


//---------------------------------------------------------------------------------
//Make sure input is numeric OR blank:
function validateAddendWidgetValue(widgetValue) {
	if (widgetValue == "" || widgetValue == null)
		return true;
	
	return widgetValue.match(/^[0-9]+$/g);
}

function validate1SafetySecurityInput(inWidgetID) {
	var theWidget;
    theWidget = document.getElementById(inWidgetID);
	var val = theWidget.value;
    if (!validateAddendWidgetValue(val)) {
        alert("Illegal input.  Please enter a number.");
        theWidget.focus();
		return false;		// INVALID
	}

	return true;			// OK
}

function validateRowWidgets(inCustomersWidgetID,
				inWorkersWidgetID, inOthersWidgetID) {
    var status = validate1SafetySecurityInput(inCustomersWidgetID);
	if (status == true) {
        status = validate1SafetySecurityInput(inWorkersWidgetID);
		if (status == true) {
            status = validate1SafetySecurityInput(inOthersWidgetID);
		}
	}
	return status;
}

// Validate all the widgets on the form.  If they pass muster, submit it 
// to get the user's inputs into the database.
function validateSafetySecurityForm(formObj) {
    if (!validateRowWidgets("custVech", "workVech", "otherVech"))
		return false;
    if (!validateRowWidgets("custWstairs", "workWstairs", "otherWstairs"))
		return false;
    if (!validateRowWidgets("custLRamp", "workLRamp", "otherLRamp"))
		return false;
    if (!validateRowWidgets("custBAOther", "workBAOther", "otherBAOther"))
		return false;
    if (!validateRowWidgets("custSecure", "workSecure", "otherSecure"))
		return false;
    if (!validateRowWidgets("custNonSecure", "workNonSecure", "otherNonSecure"))
		return false;
    if (!validateRowWidgets("custRevFac", "workRevFac", "otherRevFac"))
		return false;
    if (!validateRowWidgets("custRamp", "workRamp", "otherRamp"))
		return false;
    if (!validateRowWidgets("custStairs", "workStairs", "otherStairs"))
		return false;
    if (!validateRowWidgets("custEscalator", "workEscalator", "otherEscalator"))
		return false;
    if (!validateRowWidgets("custElevator", "workElevator", "otherElevator"))
		return false;
    if (!validateRowWidgets("custRFOther", "workRFOther", "otherRFOther"))
		return false;
    if (!validateRowWidgets("custNonRevFac", "workNonRevFac", "otherNonRevFac"))
		return false;
    if (!validateRowWidgets("custNRFOther", "workNRFOther", "otherNRFOther"))
		return false;
	
	// Check the group of 4 textboxes under "Number of Occurrences of Fire":
    if (!validate1SafetySecurityInput("fireVech"))
		return false;
    if (!validate1SafetySecurityInput("fireInRevFac"))
		return false;
    if (!validate1SafetySecurityInput("fireNonInRevFac"))
		return false;
    if (!validate1SafetySecurityInput("fireRight"))
		return false;
	
	// Finally, the 2 addends under "Maintenance Performance":
    if (!validate1SafetySecurityInput("mechanical"))
		return false;
    if (!validate1SafetySecurityInput("otherMechanical"))
		return false;
	
	// Make sure they entered something in at least 1 widget:
	var elements = document.forms["safetysecurity"].getElementsByTagName("input");
//	alert ("count of elements = " + elements.length);
	var isAnyWidgetFilledIn = false;
	var j;
	for (j = 0; j < elements.length; j++) {
		// Do not process BTI's hidden widgets used for messaging or buttons.
		// Luckily there are no other types of <input> tags on the page.
		if ("hidden" == elements[j].type || 
				"button" == elements[j].type)
			continue;
//debugging		alert (elements[j].name + " =  " + elements[j].value);
		if (elements[j].value != null && 
				elements[j].value != "" && 
				elements[j].value != "0") {
			isAnyWidgetFilledIn = true;
			break;
		}
	}
	if (!isAnyWidgetFilledIn) {
//		alert ("j = " + j + "  isAnyWidgetFilledIn =  " + isAnyWidgetFilledIn);
        alert("Please enter data in at least one box.");
		formObj.custVech.focus();	// Just go to the first widget.
		return false;
	}
	
	// If we get this far, the whole form is valid.
	formObj.submit();
	return true;
}

function demoSearchCommuter(formObj) {
    formObj.action.value = "demoSearch";
    formObj.submit();
    return true;
}
