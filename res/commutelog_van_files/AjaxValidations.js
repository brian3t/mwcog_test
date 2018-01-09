/**
 * 
 */
//send error message to the system administrator
function sendErrmsgtoSysAdmin(baseURL){
	var httpRequest;
	var message=document.getElementById("senderrmsg").value;
	var url = baseURL+message+"&ajaxFunction=sendErrorMessage";
	document.getElementById("sentMsg").innerHTML="<p class=red>Sending Error to Admin, please wait</p>";
	try {
		httpRequest = new XMLHttpRequest();
	} catch(e) {
		try {
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				alert("Your browser does not support AJAX!");
				return false;
			}
		}
	}
    httpRequest.open("POST", url, true); 
    httpRequest.onreadystatechange = function() { 
    	document.getElementById("sentMsg").innerHTML="<b class=red>Error reported to Admin successfully.</b>";
    	document.getElementById("errorMsgPlaceHolder").style.display="none";
    } ; 
    httpRequest.send(null); 
}

//send error message to the system administrator
function checkAddressBoundary(baseURL){
	var httpRequest;
	var addrStreet1	= document.getElementById("addrStreet1").value;
	var addrStreet2	= document.getElementById("addrStreet2").value;
	var addrCity	= document.getElementById("addrCity").value;
	var addrState	= document.getElementById("addrState").value;
	var addrZip		= document.getElementById("addrZip").value;
	
	var url = baseURL+addrStreet1.toUpperCase()+"&addrStreet2="+addrStreet2.toUpperCase()+"&addrCity="+addrCity.toUpperCase()+"&addrState="+addrState.toUpperCase()+"&addrZip="+addrZip.toUpperCase()+"&ajaxFunction=checkBoundaryRegion";
	try {
		httpRequest = new XMLHttpRequest();
	} catch(e) {
		try {
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				alert("Your browser does not support AJAX!");
				return false;
			}
		}
	}
    httpRequest.open("POST", url, true); 
    httpRequest.onreadystatechange = function() { 
    	document.getElementById("addressBoundary").innerHTML=httpRequest.responseText;
    } ; 
    httpRequest.send(null); 
}

//update text area for CMS Message Editor
function updateTextArea(baseURL, siteId, idScreen){
	var httpRequest;
	
	var url = baseURL+idScreen+"&siteId="+siteId+"&ajaxFunction=cmsMessageUpdate";
	try {
		httpRequest = new XMLHttpRequest();
	} catch(e) {
		try {
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				alert("Your browser does not support AJAX!");
				return false;
			}
		}
	}
    httpRequest.open("POST", url, true); 
    httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState==4 && httpRequest.status==200){
    	document.getElementById("textarea2").value=httpRequest.responseText;
     	window.location.reload();  
  	}
    } ; 
    httpRequest.send(null); 
}

//display list of employers during registration
function searchEmployerDuringRegn(baseURL, employerStNo, employerStreet){
	if(employerStNo!=null && employerStreet!=null){
		var httpRequest;
		var url = baseURL+"?employerStNo="+employerStNo+"&employerStreet="+employerStreet+"&ajaxFunction=employerSearchforReg";
		document.getElementById("loadingMessage").innerHTML="<b style='color: red;'>Searching for Employers please wait.</b>";
		try {
			httpRequest = new XMLHttpRequest();
		} catch(e) {
			try {
				httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					alert("Your browser does not support AJAX!");
					return false;
				}
			}
		}
	    httpRequest.open("POST", url, true); 
	    httpRequest.onreadystatechange = function() {
			document.getElementById("loadingMessage").innerHTML="";
	    	document.getElementById("employerDetails").innerHTML=httpRequest.responseText;
	    } ; 
	    httpRequest.send(null); 
	}else{
		alert("Please enter atleast employer name or employer streets");
		return false;
	}
}

//add new employer during registration
function addNewEmployerDuringRegn(elemId){
	if(document.getElementById(elemId).checked==true){
		document.getElementById("addNewEmployer").style.display="";
	}else {
		document.getElementById("addNewEmployer").style.display="none";
	}
}

function hideAddNewEmployer(){
	var radiobuttons = document.getElementsByName("empIndex");
	for(var i=0;i<radiobuttons.length;i++){
		if(radiobuttons[i].checked==true){
			document.getElementById("addNewEmployer").style.display="none";
		}
	}
}

//filter the reports based on filter selection group
function displayReportsforAdmins(baseURL1, baseURL, reportFilter){
	var httpRequest;
	if(reportFilter==0){
		alert("Please select a filter.");
		return false;
	}else{
		var url = baseURL1+reportFilter+"&baseURL="+baseURL+"&ajaxFunction=getReportListbasedOnFilter";
		try {
			httpRequest = new XMLHttpRequest();
		} catch(e) {
			try {
				httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					alert("Your browser does not support AJAX!");
					return false;
				}
			}
		}
	    httpRequest.open("POST", url, true); 
	    httpRequest.onreadystatechange = function() { 
	    	if (httpRequest.readyState==4 && httpRequest.status==200){
	    		document.getElementById("displayReports").innerHTML=httpRequest.responseText;
	    	}
	   	 } ; 
		document.getElementById("profileSection").style.display="none";
	    httpRequest.send(null); 
	}
}

function getReportProfile2(siteurl, reportSelected){
	if(reportSelected!=10){
		var url = siteurl+reportSelected;
		try {
			httpRequest = new XMLHttpRequest();
		} catch(e) {
			try {
				httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					alert("Your browser does not support AJAX!");
					return false;
				}
			}
		}
	    httpRequest.open("GET", url, true); 
	    httpRequest.onreadystatechange = function() {
			document.getElementById("profileSection").style.display="";
			document.getElementById("profileSection").innerHTML=httpRequest.responseText;
	    } ; 
	    httpRequest.send(null); 
	}else{
			document.getElementById("profileSection").innerHTML=" ";
		return false;
	}
}