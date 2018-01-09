function searchEmployers(formObj) {
	if (isNaN(formObj.empId.value)) {
		alert("Please enter a valid employer Id (numerics only).");
		formObj.empId.focus();
		return false;
	}
	document.getElementById("action").value="searchemployers";
	formObj.submit();
	return true;
}

function saveEmployer(formObj) {
	document.getElementById("action").value="saveemployer";
	formObj.submit();
	return true;
}

function addNewEmployer(formObj) {
	document.getElementById("action").value="addNewemployer";
	formObj.submit();
	return true;
}

function searchAdmEmployers(formObj) {
	 if((formObj.empId.value     == "" || formObj.empId.value     == null) &&
		(formObj.empName.value   == "" || formObj.empName.value   == null) &&
		(formObj.empStreet.value == "" || formObj.empStreet.value == null) &&
		(formObj.empCity.value   == "" || formObj.empCity.value   == null) &&
		(formObj.empState.value  == "" || formObj.empState.value  == null) &&
		(formObj.empZip.value    == "" || formObj.empZip.value    == null) &&
		(formObj.empJur.value    == "" || formObj.empJur.value    == null) ){
		
		alert("Please enter search parameter(s).");
		formObj.empId.focus();
		return false;
	} else {
		if (isNaN(formObj.empId.value)) {
			alert("Please enter a valid employer Id (numerics only).");
			formObj.empId.focus();
			return false;
		}
		document.getElementById("action").value="searchadmemployers";
		formObj.submit();
		return true;
	}
}

function reviewAdmEmployers(formObj) {
	var checked = false; 
	var buttons = formObj.elements.index; 
	if(buttons.checked) {
		checked = true; 
	} else {
		for (var i=0; i<buttons.length; i++) {
			if (buttons[i].checked) {  
				checked = true; 
				break;  
			}  
		}
	}
	if(!checked) {
		alert("Please select an employer.");  
		return false;
	}
	document.getElementById("action").value="reviewadmemployers";
	formObj.submit();
	return true;
}

function selectAdmLocation(formObj) {
	var checked = false; 
	var buttons = formObj.elements.index; 
	if(buttons.checked) {
		checked = true; 
	} else {
		for (var i=0; i<buttons.length; i++) {
			if (buttons[i].checked) {  
				checked = true; 
				break;  
			}  
		}
	}
	if(!checked) {
		alert("Please select a location.");  
		return false;
	}
	document.getElementById("action").value="reviewadmemplocation";
	formObj.submit();
	return true;
}

function updateEmployerName(formObj) {
	if (formObj.empName.value == "") {
		alert("Please enter employer name.");
		formObj.empName.focus();
		return false;
	}
	document.getElementById("action").value="updateemployername";
	formObj.submit();
	return true;
}

function checkAdmAddEmployer(formObj) {
	if (formObj.empName.value == "") {
		alert("Please enter employer name.");
		formObj.empName.focus();
		return false;
	}
	if (formObj.empStreet.value == "") {
		alert("Please enter employer's street address.");
		formObj.empStreet.focus();
		return false;
	}
	if (formObj.empCity.value == "") {
		alert("Please enter employer's city.");
		formObj.empCity.focus();
		return false;
	}
	if (formObj.empState.value == "") {
		alert("Please select employer's state.");
		formObj.empState.focus();
		return false;
	}
	if (formObj.empZip.value == "") {
		alert("Please enter employer's zip code.");
		formObj.empZip.focus();
		return false;
	} else {
		re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
		if (!re.test(formObj.empZip.value)) {
			alert("Please enter a valid zip code. \nEx: 12345 or 12345-6789.");
			formObj.empZip.focus();
			return false;
		}
	}
	document.getElementById("action").value="addnewemployer";
	formObj.submit();
	return true;
}

function checkAdmAddLocation(formObj) {
	if (formObj.empStreet.value == "") {
		alert("Please enter employer's street address.");
		formObj.empStreet.focus();
		return false;
	}
	if (formObj.empCity.value == "") {
		alert("Please enter employer's city.");
		formObj.empCity.focus();
		return false;
	}
	if (formObj.empState.value == "") {
		alert("Please select employer's state.");
		formObj.empState.focus();
		return false;
	}
	if (formObj.empZip.value == "") {
		alert("Please enter employer's zip code.");
		formObj.empZip.focus();
		return false;
	} else {
		re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
		if (!re.test(formObj.empZip.value)) {
			alert("Please enter a valid zip code. \nEx: 12345 or 12345-6789.");
			formObj.empZip.focus();
			return false;
		}
	}
	document.getElementById("action").value="addnewlocation";
	formObj.submit();
	return true;
}

function updateLocation(formObj) {
	if (formObj.empStreet.value == "") {
		alert("Please enter employer's street address.");
		formObj.empStreet.focus();
		return false;
	}
	if (formObj.empCity.value == "") {
		alert("Please enter employer's city.");
		formObj.empCity.focus();
		return false;
	}
	if (formObj.empState.value == "") {
		alert("Please select employer's state.");
		formObj.empState.focus();
		return false;
	}
	if (formObj.empZip.value == "") {
		alert("Please enter employer's zip code.");
		formObj.empZip.focus();
		return false;
	} else {
		re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
		if (!re.test(formObj.empZip.value)) {
			alert("Please enter a valid zip code. \nEx: 12345 or 12345-6789.");
			formObj.empZip.focus();
			return false;
		}
	}
	document.getElementById("action").value="updatelocation";
	formObj.submit();
	return true;
}

function mergeAdmEmployers1(formObj) {
	var checked = false; 
	var buttons = formObj.elements.index; 
	if(buttons.checked) {
		checked = true; 
	} else {
		for (var i=0; i<buttons.length; i++) {
			if (buttons[i].checked) {  
				checked = true; 
				break;  
			}  
		}
	}
	if(!checked) {
		alert("Select the duplicate or incorrect employer.");  
		return false;
	}
	
	var answer = confirm("WARNING! \n\nSelected duplicate or incorrect employer, it's locations and associated employees \n will be merged with the correct employer selected in next step.\n\n"
				 		+"Click on 'OK' to continue.\n\n"
				 		+"Click on 'Cancel' to go back.");
	if (answer){
		//formObj.action.value="mergeemployerselect";
		document.getElementById("action").value="mergeemployerselect";

		formObj.submit();
		return true;
	}
	else{
		return false;
	}	
}

function mergeAdmEmployers2(formObj) {
	var checked = false; 
	var buttons = formObj.elements.index; 
	if(buttons.checked) {
		checked = true; 
	} else {
		for (var i=0; i<buttons.length; i++) {
			if (buttons[i].checked) {  
				checked = true; 
				break;  
			}  
		}
	}
	if(!checked) {
		alert("Select the correct employer where incorrect or duplicate employer will be merged.");  
		return false;
	}
	
	var answer = confirm("Do you want to complete the merger?");
	if (answer){
		//formObj.action.value="mergeemployers";
		document.getElementById("action").value="mergeemployers";

		formObj.submit();
		return true;
	}
	else{
		return false;
	}	
}

function searchEmployersForMerge(formObj) {
	 if((formObj.empId.value     == "" || formObj.empId.value     == null) &&
		(formObj.empName.value   == "" || formObj.empName.value   == null) &&
		(formObj.empStreet.value == "" || formObj.empStreet.value == null) &&
		(formObj.empCity.value   == "" || formObj.empCity.value   == null) &&
		(formObj.empState.value  == "" || formObj.empState.value  == null) &&
		(formObj.empZip.value    == "" || formObj.empZip.value    == null) &&
		(formObj.empJur.value    == "" || formObj.empJur.value    == null) ){

		alert("Please enter search parameter(s).");
		formObj.empId.focus();
		return false;
	} else {
		if (isNaN(formObj.empId.value)) {
			alert("Please enter a valid employer Id (numerics only).");
			formObj.empId.focus();
			return false;
		}
		document.getElementById("action").value="searchemployersformerger";
		formObj.submit();
		return true;
	}
}

function deleteEmployer(formObj, str) {
	formObj.idemployer.value=str;
	alert("1. "+formObj.idemployer.value);
	var answer = confirm("Do you want to delete the employer?"+str);
	if (answer){
		document.getElementById("action").value="deleteemployer";
		formObj.submit();
		return true;
	}
	else{
		return false;
	}	
}

function deleteEmployer(str) {
	var index = str;
	var element1 = document.getElementById("idempl");
	element1.value = index+"";

	var answer = confirm("Do you want to continue with delete employer?");
	if (answer){
		document.getElementById("action").value="deleteemployer";
		document.forms["employersearch"].submit();
		return true;
	}
	else{
		return false;
	}	
}

function deleteLocation(str) {
	var index = str;
	var element1 = document.getElementById("idaddr");
	element1.value = index+"";

	var answer = confirm("Do you want to continue with delete employer location?");
	if (answer){
		document.getElementById("action").value="deleteemployerlocation";
		document.forms["reviewEmployer"].submit();
		return true;
	}
	else{
		return false;
	}	
}

function mergeAdmEmployerLocation2(formObj) {
	var checked = false; 
	var buttons = formObj.elements.index; 
	if(buttons.checked) {
		checked = true; 
	} else {
		for (var i=0; i<buttons.length; i++) {
			if (buttons[i].checked) {  
				checked = true; 
				break;  
			}  
		}
	}
	if(!checked) {
		alert("Select the correct location where you to want merge the incorrect location.");  
		return false;
	}
	
	var answer = confirm("Do you want to continue with merge location?");
	if (answer){
		document.getElementById("action").value="mergeemployerlocations";
		formObj.submit();
		return true;
	}
	else{
		return false;
	}
}

function mergeAdmEmployerLocation1(formObj) {
	var checked = false; 
	var buttons = formObj.elements.index; 
	if(buttons.checked) {
		checked = true; 
	} else {
		for (var i=0; i<buttons.length; i++) {
			if (buttons[i].checked) {  
				checked = true; 
				break;  
			}  
		}
	}
	if(!checked) {
		alert("Select the duplicate or incorrect location.");  
		return false;
	}
	
	var answer = confirm("WARNING! \n\nSelected duplicate or incorrect location and it's associated employees \n will be merged with the correct location selected in next step.\n\n"
				 		+"Click on 'OK' to continue.\n\n"
				 		+"Click on 'Cancel' to go back.");
	if (answer){
		document.getElementById("action").value="mergeemployerlocationselect";
		formObj.submit();
		return true;
	}
	else{
		return false;
	}	
}