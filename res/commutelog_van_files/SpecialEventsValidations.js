function searchEvent(formObj) {
    document.getElementById("action").value = "searchevents";
    formObj.submit();
    return true;
}

function searchNewEvent(formObj) {
    document.getElementById("action").value = "searchnewevents";
    formObj.submit();
    return true;
}

function selectEvent(formObj) {
    document.getElementById("action").value = "selectevent";
    formObj.submit();
    return true;
}

function updateEvent(formObj) {
    if (formObj.eventLocation.value == null || formObj.eventLocation.value == "") {
        alert("Event location is required.");
        formObj.eventLocation.focus();
        return false;
    }
    if (formObj.eventName.value == null || formObj.eventName.value == "") {
        alert("Event name is required.");
        formObj.eventName.focus();
        return false;
    }
    if (formObj.eventDate.value == null || formObj.eventDate.value == "") {
        alert("Event date is required.");
        formObj.eventDate.focus();
        return false;
    }
    if (formObj.eventDesc.value == null || formObj.eventDesc.value == "") {
        alert("Event description is required.");
        formObj.eventDesc.focus();
        return false;
    }

    document.getElementById("action").value = "updateevent";
    formObj.submit();
    return true;
}

function processEvent(formObj) {
    document.getElementById("action").value = "processevent";
    formObj.submit();
    return true;
}

function approveEvent(formObj) {
    if (formObj.eventLocation.value == null || formObj.eventLocation.value == "") {
        alert("Event location is required.");
        formObj.eventLocation.focus();
        return false;
    }
    if (formObj.eventName.value == null || formObj.eventName.value == "") {
        alert("Event name is required.");
        formObj.eventName.focus();
        return false;
    }
    if (formObj.eventDate.value == null || formObj.eventDate.value == "") {
        alert("Event date is required.");
        formObj.eventDate.focus();
        return false;
    }
    if (formObj.eventDesc.value == null || formObj.eventDesc.value == "") {
        alert("Event description is required.");
        formObj.eventDesc.focus();
        return false;
    }
    document.getElementById("action").value = "approveevent";
    formObj.eventStatus.value = "A";
    formObj.submit();
    return true;
}

function rejectEvent(formObj) {
    var temp = prompt("Reason For Rejection: ", "");
    formObj.rejectedBecause.value = temp;
    document.getElementById("action").value = "approveevent";
    formObj.eventStatus.value = "R";
    formObj.submit();
    return true;
}

function createEvent1(formObj) {
    if (formObj.eventLocation.value == null || formObj.eventLocation.value == "") {
        alert("Please select event location.");
        formObj.eventLocation.focus();
        return false;
    }
    if (formObj.eventName.value == null || formObj.eventName.value == "") {
        alert("Please enter event name.");
        formObj.eventName.focus();
        return false;
    }
    if (formObj.eventDate.value == null || formObj.eventDate.value == "") {
        alert("Please enter event date.");
        formObj.eventDate.focus();
        return false;
    }
    if (formObj.eventDesc.value == null || formObj.eventDesc.value == "") {
        alert("Please enter description for the event.");
        formObj.eventDesc.focus();
        return false;
    }
    document.getElementById("action").value = "createevent";
    formObj.submit();
    return false;
}

function createEvent(formObj) {
    if (formObj.eventLocation.value == null || formObj.eventLocation.value == "") {
        alert("Please select event location.");
        formObj.eventLocation.focus();
        return false;
    }
    if (formObj.eventName.value == null || formObj.eventName.value == "") {
        alert("Please enter event name.");
        formObj.eventName.focus();
        return false;
    }
    if (formObj.eventDate.value == null || formObj.eventDate.value == "") {
        alert("Please enter event date.");
        formObj.eventDate.focus();
        return false;
    }
    //if(formObj.eventWebsite.value==null || formObj.eventWebsite.value=="") {
    //	alert("Please enter the link for event website.");
    //	formObj.eventWebsite.focus();
    //	return false;
    //}
    if (formObj.eventDesc.value == null || formObj.eventDesc.value == "") {
        alert("Please enter description for the event.");
        formObj.eventDesc.focus();
        return false;
    }

    document.getElementById("action").value = "createevent";
    formObj.submit();
    return true;
}

function addEvents(formObj) {
    document.getElementById("action").value = "addnewevents";
    formObj.submit();
    return true;
}

function removeEvents(formObj) {
    document.getElementById("action").value = "removeevents";
    formObj.submit();
    return true;
}

function addLocation(formObj) {
    if (formObj.locationName.value == null || formObj.locationName.value == "") {
        alert("Please enter location name.");
        formObj.locationName.focus();
        return false;
    }
    if (formObj.locationStreet.value == null || formObj.locationStreet.value == "") {
        alert("Please enter location street address.");
        formObj.locationStreet.focus();
        return false;
    }
    if (formObj.locationCity.value == null || formObj.locationCity.value == "") {
        alert("Please enter location city.");
        formObj.locationCity.focus();
        return false;
    }
    if (formObj.locationState.value == null || formObj.locationState.value == "") {
        alert("Please select location state.");
        formObj.locationState.focus();
        return false;
    }
    /*
     if (formObj.latitude.value == null || formObj.latitude.value == "") {
     alert ("Please select the location on map to get the coordinates.");
     return false;
     }
     */
    document.getElementById("action").value = "addlocation";
    formObj.submit();
    return true;
}

function addLocation2(formObj) {
    if (formObj.latitude.value == null || formObj.latitude.value == "") {
        alert("Please select the location on map to get the coordinates.");
        return false;
    }
    document.getElementById("action").value = "saverelocation";
    formObj.submit();
    return true;
}

function findEventMatches(formObj) {
    var addressno = null;
    for (var i = 0; i < document.eventmatchreq.start.length; i++) {
        if (document.eventmatchreq.start[i].checked) {
            addressno = document.eventmatchreq.start[i].value;
        }
    }
    if (addressno == null && document.eventmatchreq.start.checked) {
        addressno = 0;
    }
    if (addressno == null) {
        alert("Please select a start address.");
        return false;
    }
    var addressno1 = null;
    for (var i = 0; i < document.eventmatchreq.destn.length; i++) {
        if (document.eventmatchreq.destn[i].checked) {
            addressno1 = document.eventmatchreq.destn[i].value;
        }
    }
    if (addressno1 == null && document.eventmatchreq.destn.checked) {
        addressno1 = 0;
    }
    if (addressno1 == null) {
        alert("Please select an event as destination address.");
        return false;
    }
    document.getElementById("action").value = "performeventmatching";
    formObj.submit();
    return true;
}

function setEmailContacts(formObj) {
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

function contactEventMatches(formObj) {
    var temp1 = document.getElementById("recipient").value;
    var temp2 = document.getElementById("emailto").value;
    if (formObj.recipient.value == null || formObj.recipient.value == "") {
        alert("Please select recipients in match list.");
        return false;
    }
    if (formObj.subject.value == null || formObj.subject.value == "") {
        alert("Please enter email subject.");
        formObj.subject.focus();
        return false;
    }
    if (formObj.content.value == null || formObj.content.value == "") {
        alert("Please enter your message to ridematches \nwith your contact information.");
        formObj.content.focus();
        return false;
    }
    document.getElementById("action").value = "sendemail";
    formObj.submit();
    return true;
}

function display(id1, id2, id3, id4) {
    document.getElementById(id1).style.display = 'block';
    document.getElementById(id2).style.display = 'none';
    document.getElementById(id3).style.display = 'none';
    document.getElementById(id4).style.display = 'none';
}

function display(id1, id2, id3, id4, id5) {
    document.getElementById(id1).style.display = 'block';
    document.getElementById(id2).style.display = 'none';
    document.getElementById(id3).style.display = 'none';
    document.getElementById(id4).style.display = 'none';
    document.getElementById(id5).style.display = 'none';
}

function setBcc() {
    var email1 = "";
    var email2 = "";
    var elements = document.getElementById("searchResults").getElementsByTagName("div");
    for (var i = 0; i < elements.length; i++) {
        var checkbox = document.getElementById("mailing" + i);
        if ((checkbox != null) && (checkbox.checked == true)) {
            email1 += document.getElementById("emailid" + i).value + ";";
            email2 += document.getElementById("commtid" + i).value + ";";
        }
    }
    document.getElementById("emailBcc").value = email1;
    document.getElementById("emailBccMirror").value = email2;
    return true;
}

function emailMatches(formObj) {
    if (formObj.emailBcc.value == null || formObj.emailBcc.value == "") {
        alert("Please select recipients in match list.");
        return false;
    }
    if (formObj.emailSubject.value == null || formObj.emailSubject.value == "") {
        alert("Please enter email subject.");
        formObj.subject.focus();
        return false;
    }
    if (formObj.emailContent.value == null || formObj.emailContent.value == "") {
        alert("Please enter your message to ridematches \nwith your contact information.");
        formObj.content.focus();
        return false;
    }
    document.getElementById("action").value = "emailmaches";
    formObj.submit();
    return true;
}

