
function checkLoginFunction(formObj) {
	if (formObj.userName.value==null || formObj.userName.value=="") {
		alert("User Name is required.");
		formObj.userName.focus();
		return false;
	} else {
		re = /^([a-zA-Z0-9_]+)$/;
		if(!re.test(formObj.userName.value)) {
			alert("User Name must be alphanumeric only.");
			formObj.userName.focus();
			return false;
		}
	}
	if (formObj.password.value==null || formObj.password.value=="") {
		alert("Password is required.");
		formObj.password.focus();
		return false;
	} else {
		re = /^([a-zA-Z0-9_]+)$/;
		if(!re.test(formObj.password.value)) {
			alert("Password must be alphanumeric only.");
			formObj.password.focus();
			return false;
		}
	}
	formObj.submit();
	return true;
}

function backButtonOverride() {
	setTimeout("backButtonOverrideBody()", 1);
}

function setCMSHeight(){
	var divHeight = ((document.getElementById('cmsportal').offsetHeight));
var portal=document.getElementById('portal');
			if( portal !=null && typeof portal!= "undefined") {

	portal.style.top = 165+divHeight + 'px';
}
}

function backButtonOverrideBody() {
	try {
		history.forward();
	} catch (e) { }
	setTimeout("backButtonOverrideBody()", 500);
}

// open a new window to display the content for requested link
function open_window(url,win) {
	mywin = window.open(url,win,"toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=no,resizable=no,width=300,height=300,screenX=0,screenY=0,top=0,left=0");
	mywin.focus();
}

// open a new window to display the content for requested link
function open_window1(url,win) {
	mywin1 = window.open(url,win,"toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes,resizable=no,width=900,height=600,screenX=0,screenY=0,top=0,left=0");
	mywin1.focus();
}

// open a new window to display the content for requested link
function open_window2(url,win) {
	mywin2 = window.open(url,win);
	mywin2.focus();
}

// open a new window to display the content for requested link
function open_window3(url,win) {
	mywin3 = window.open(url,win,"toolbar=0,menubar=0,scrollbars=0,location=0,directories=0,status=0,resizable=no,width=640,height=600,screenX=0,screenY=0,top=0,left=0");
	mywin3.focus();
}

// open a new window to display the content for requested link
function open_window4(url, win) {
	mywin4 = window.open(url, win, "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=no,resizable=no,width=640,height=300,screenX=0,screenY=0,top=200,left=200");
	mywin4.focus();
}

function open_map_window(url, win) {
	mapWin = window.open(url, win, "location=no, menubar=no, resizable=yes, scrollbars=yes, status=no, titlebar=no, toolbar=no");
}

// show under construction alert
function show_alert() {
	alert("This control will be activated soon. In the meantime, \nplease call 1-800-745-RIDE if you need assistance or have questions.");
}

function checkEmailForm(formObj) {
	if (formObj.recipient.value == null || formObj.recipient.value == "") {
		alert("Please enter recipients email address.");
		formObj.recipient.focus();
		return false;
	}
	var str = formObj.recipient.value;
	if ((str.indexOf('@',0) == -1 || str.indexOf('.',0) == -1) && str.value != "") {
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
	window.close();
	return true;
}

function checkCRMForm(formObj) {
	formObj.submit();
	return true;
}

