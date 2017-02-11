function searchEmployerForRegn(formObj) {
    formObj.action.value = "searchemployer";
    formObj.submit();
    return true;
}

function submitReregistrationRequest(formObj) {
    document.getElementById("action").value = "reregisterrequest";
    formObj.submit();
    return true;
}

function searchAdmin(formObj) {
    document.getElementById("action").value = "searchadmin";
    formObj.submit();
    return true;
}

function addAdmin(formObj) {
    document.getElementById("action").value = "addadmin";
    formObj.submit();
    return true;
}

function createAdmin(formObj) {
    var note = "Fields marked with * are required.\n";

    // check first name
    if (formObj.firstName.value == "") {
        alert(note + "Please enter Admin First Name.");
        formObj.firstName.focus();
        return false;
    }
    // check last name
    if (formObj.lastName.value == "") {
        alert(note + "Please enter Admin Last Name.");
        formObj.lastName.focus();
        return false;
    }

    // check user name for size
    if (formObj.adminId.value == "") {
        alert(note + "Please enter Admin User Name.");
        formObj.adminId.focus();
        return false;
    } else {
        if (formObj.adminId.value.length < 8 || formObj.adminId.value.length > 12) {
            alert("Admin User Name must be 8 to 12 characters.");
            formObj.adminId.focus();
            return false;
        } else {
            re = /^([a-zA-Z0-9_]+)$/;
            if (!re.test(formObj.adminId.value)) {
                alert("Admin User Name must be alphanumeric only.");
                formObj.adminId.focus();
                return false;
            }
        }
    }

    // check password for validity and compare with confirmation password
    if (formObj.password1.value == formObj.adminId.value) {
        alert("Password must be different from Admin User Name.");
        formObj.password1.focus();
        return false;
    }
    if (formObj.password1.value != "" && formObj.password1.value != null) {
        if (formObj.password1.value.length < 8) {
            alert("Password must contain at least eight alphanumeric characters!");
            formObj.password1.focus();
            return false;
        }
        re = /^([a-zA-Z0-9_]+)$/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must be alphanumeric only.");
            formObj.password1.focus();
            return false;
        }
        re = /[0-9]/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must contain at least one number (0-9).");
            formObj.password1.focus();
            return false;
        }
        re = /[a-zA-Z]/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must contain at least one letter (a-z).");
            formObj.password1.focus();
            return false;
        }
    } else {
        alert(note + "Please enter a password.");
        formObj.password1.focus();
        return false;
    }
    if (formObj.password2.value == "" || formObj.password2.value == null) {
        alert(note + "Please enter confirmation password.\n(Must be same as password)");
        formObj.password2.focus();
        return false;
    }
    if (formObj.password1.value != "" && formObj.password1.value != formObj.password2.value) {
        alert("Password and confirmation password must be same.");
        formObj.password2.focus();
        return false;
    }

    // check password recovery question
    if (formObj.pwdQuestion.value == "") {
        alert(note + "Please select a password recovery question.");
        formObj.pwdQuestion.focus();
        return false;
    }
    // check password recovery answer
    if (formObj.pwdAnswer.value == "") {
        alert(note + "Please enter password recovery answer.");
        formObj.pwdAnswer.focus();
        return false;
    }

    // check admin type
    if (formObj.adminType.value == "") {
        alert(note + "Please select admin type.");
        formObj.adminType.focus();
        return false;
    }

    document.getElementById("action").value = "createadmin";
    formObj.submit();
    return true;
}

function checkActivateAccount(formObj) {
    // check password for validity and compare with confirmation password
    if (formObj.password1.value == formObj.adminId.value) {
        alert("Password must be different from User Name.");
        formObj.password1.focus();
        return false;
    }
    if (formObj.password1.value != "" && formObj.password1.value != null) {
        if (formObj.password1.value.length < 8) {
            alert("Password must contain at least eight alphanumeric characters!");
            formObj.password1.focus();
            return false;
        }
        re = /^([a-zA-Z0-9_]+)$/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must be alphanumeric only.");
            formObj.password1.focus();
            return false;
        }
        re = /[0-9]/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must contain at least one number (0-9).");
            formObj.password1.focus();
            return false;
        }
        re = /[a-zA-Z]/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must contain at least one letter (a-z).");
            formObj.password1.focus();
            return false;
        }
    } else {
        alert("Please enter a password.");
        formObj.password1.focus();
        return false;
    }
    if (formObj.password2.value == "" || formObj.password2.value == null) {
        alert("Please enter confirmation password.\n(Must be same as password)");
        formObj.password2.focus();
        return false;
    }
    if (formObj.password1.value != "" && formObj.password1.value != formObj.password2.value) {
        alert("Password and confirmation password must be same.");
        formObj.password2.focus();
        return false;
    }

    // check password recovery question
    if (formObj.pwdQuestion.value == "") {
        alert("Please select a password recovery question.");
        formObj.pwdQuestion.focus();
        return false;
    }
    // check password recovery answer
    if (formObj.pwdAnswer.value == "") {
        alert("Please enter password recovery answer.");
        formObj.pwdAnswer.focus();
        return false;
    }
    formObj.submit();
    return true;
}

function checkRecoverPassword(formObj) {
    // check user name
    if (formObj.adminId.value == "") {
        alert("Please enter your user name.");
        formObj.adminId.focus();
        return false;
    }
    // check password recovery question
    if (formObj.pwdQuestion.value == "") {
        alert("Please select a password recovery question.");
        formObj.pwdQuestion.focus();
        return false;
    }
    // check password recovery answer
    if (formObj.pwdAnswer.value == "") {
        alert("Please enter password recovery answer.");
        formObj.pwdAnswer.focus();
        return false;
    }
    formObj.submit();
    return true;
}

function selectAdmin(formObj) {
    if (formObj.adminIndex.value == "" || formObj.adminIndex.value == null) {
        alert("Please select admin from the list.");
        return false;
    }
    document.getElementById("action").value = "selectadmin";
    formObj.submit();
    return true;
}

function updateAdmin(formObj) {
    document.getElementById("action").value = "updateadmin";
    formObj.submit();
    return true;
}

function checkProgramSelection(formObj) {
    if (document.managecommuter.joinGrh.checked == true) {
        if (formObj.employerName.value == "" || formObj.employerName.value == null ||
                formObj.supervisor.value == "" || formObj.supervisor.value == null ||
                formObj.superPhone.value == "" || formObj.superPhone.value == null) {

            alert("Employer and Supervisor information are required for joining GRH Program. \nPlease ensure this information is entered in Employer Information before joining the commuter to the program.");
            document.managecommuter.joinGrh.checked = false;
            return false;
        }
        if (formObj.homePhone.value == "" || formObj.homePhone.value == null ||
                formObj.workPhone.value == "" || formObj.workPhone.value == null ||
                formObj.homeAddress.value == "" || formObj.homeAddress.value == null) {

            alert("Home Address, Home Phone and Work Phone are required for joining GRH Program. \nPlease ensure this information is entered in Member Information before joining the commuter to the program.");
            document.managecommuter.joinGrh.checked = false;
            return false;
        }
        if (formObj.commuteDays.value == "" || formObj.commuteDays.value == null ||
                formObj.milesToWork.value == "" || formObj.milesToWork.value == null ||
                formObj.commuteMode.value == "" || formObj.commuteMode.value == null) {

            alert("Commute Mode, Commute Days and Miles are required for joining GRH Program. \nPlease ensure this information is entered in Commute Information before joining the commuter to the program.");
            document.managecommuter.joinGrh.checked = false;
            return false;
        }
        if (formObj.commuteDays.value == 0) {
            alert("Commute Days must be greater than zero(0) for joining for GRH Program. \nPlease ensure this information is entered in Commute Information before joining the commuter to the program.");
            document.managecommuter.joinGrh.checked = false;
            return false;
        }
    }
    formObj.submit();
    return true;
}

function requestAddlInfo(formObj) {
    if (formObj.bikeInfo.checked || formObj.walkInfo.checked ||
            formObj.teleInfo.checked || formObj.wmata.checked ||
            formObj.mta1.checked || formObj.mta2.checked ||
            formObj.mta3.checked || formObj.mta4.checked ||
            formObj.marc1.checked || formObj.marc2.checked ||
            formObj.vre.checked || formObj.local.checked) {
        //formObj.action.value="requestaddlinfo";
        document.getElementById("action").value = "requestaddlinfo";
        formObj.submit();
        return true;
    }
    else {
        alert("Please select the commute type.");
        return false;
    }
}

function requestDelawareAddlInfo(formObj) {
    if (formObj.delbikeInfo.checked || formObj.delwalkInfo.checked ||
            formObj.delteleInfo.checked || formObj.delvanpoolInfo.checked ||
            formObj.dart1.checked || formObj.dart2.checked ||
            formObj.dart3.checked || formObj.septa1.checked ||
            formObj.septa2.checked || formObj.septa3.checked ||
            formObj.septa4.checked || formObj.septa5.checked ||
            formObj.septa6.checked || formObj.septa7.checked ||
            formObj.amtrak.checked || formObj.mta1.checked ||
            formObj.mta2.checked || formObj.mta3checked ||
            formObj.mta4.checked || formObj.mta5.checked ||
            formObj.mta6.checked || formObj.mta7.checked ||
            formObj.mta8.checked) {
        //formObj.action.value="requestDelawareAddlInfo";
        document.getElementById("action").value = "requestDelawareAddlInfo";
        formObj.submit();
        return true;
    }
    else {
        alert("Please select the commute type.");
        return false;
    }
}

function requestAddlInf(formObj) {
    if (formObj.bikeInfo.checked || formObj.walkInfo.checked ||
            formObj.teleInfo.checked || formObj.tranInfo.checked) {
        formObj.action.value = "requestaddlinfo";
        formObj.submit();
        return true;
    }
    else {
        alert("Please select the info you are interested.");
        return false;
    }
}

/* CHECK NEW REGISTRATION */
function checkNewRegistration(formObj) {
    var note = "Fields marked with * are required.\n";

    // check first name
    if (formObj.firstName.value == "") {
        alert(note + "Please enter your first name.");
        formObj.firstName.focus();
        return false;

    }
    // check last name
    if (formObj.lastName.value == "") {
        alert(note + "Please enter your last name.");
        formObj.lastName.focus();
        return false;
    }

    // check user name for size
    if (formObj.userName.value == "") {
        alert(note + "Please enter a user name.");
        formObj.userName.focus();
        return false;
    } else {
        if (formObj.userName.value.length < 8 || formObj.userName.value.length > 12) {
            alert("User Name must be 8 to 12 characters.");
            formObj.userName.focus();
            return false;
        } else {
            re = /^([a-zA-Z0-9_]+)$/;
            if (!re.test(formObj.userName.value)) {
                alert("User name must be alphanumeric only.");
                formObj.userName.focus();
                return false;
            }
        }
    }

    // check password for validity and compare with confirmation password
    if (formObj.password1.value == formObj.userName.value) {
        alert("Password must be different from Username.");
        formObj.password1.focus();
        return false;
    }
    if (formObj.password1.value != "" && formObj.password1.value != null) {
        if (formObj.password1.value.length < 8) {
            alert("Password must contain at least eight alphanumeric characters!");
            formObj.password1.focus();
            return false;
        }
        re = /^([a-zA-Z0-9_]+)$/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must be alphanumeric only.");
            formObj.password1.focus();
            return false;
        }
        re = /[0-9]/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must contain at least one number (0-9).");
            formObj.password1.focus();
            return false;
        }
        re = /[a-zA-Z]/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must contain at least one letter (a-z).");
            formObj.password1.focus();
            return false;
        }
    } else {
        alert(note + "Please enter a password.");
        formObj.password1.focus();
        return false;
    }
    if (formObj.password2.value == "" || formObj.password2.value == null) {
        alert(note + "Please enter confirmation password.\n(Must be same as password)");
        formObj.password2.focus();
        return false;
    }
    if (formObj.password1.value != "" && formObj.password1.value != formObj.password2.value) {
        alert("Password and confirmation password must be same.");
        formObj.password2.focus();
        return false;
    }

    // check password recovery question
    if (formObj.pwdQuestion.value == "") {
        alert(note + "Please select a password recovery question.");
        formObj.pwdQuestion.focus();
        return false;
    }
    // check password recovery answer
    if (formObj.pwdAnswer.value == "") {
        alert(note + "Please enter password recovery answer.");
        formObj.pwdAnswer.focus();
        return false;
    }

    // Added for the Alexandria Challenge (and, as a side effect, fixes a bug
    // with Delaware) -- if email is required by the site or program,
    // ensure input is present.  Note the check for null is because I don't know
    // all the <form>s this function is used to validate.
    var isEmailRequired = (
            document.getElementById("is_email_required") != null &&
            document.getElementById("is_email_required").value.toLowerCase() === 'true');
    if (isEmailRequired && formObj.email1.value == "") {
        alert("Email address is required.");
        formObj.email1.focus();
        return false;
    }

    // If we get this far, continue with BTI's code to check email
    // for format and validity
    var message = "";
    if (formObj.email1.value != "" || formObj.email2.value != "") {
        message = checkEmail(formObj.email1.value);
        if (message != "") {
            alert(message);
            formObj.email1.focus();
            return false;
        }
        message = checkEmail(formObj.email2.value);
        if (message != "") {
            alert("Please enter a valid confirmation email address.");
            formObj.email2.focus();
            return false;
        }
        if (formObj.email1.value !== formObj.email2.value) {
            alert("Email and confirmation email must be same.");
            formObj.email2.focus();
            return false;
        }
    }

    // check phone number for format

    // check at least one phone number is entered
    if (formObj.phone1.value == "" && formObj.cphone1.value == "" && formObj.wphone1.value == "") {
        alert("Please enter at least one contact phone number");
        formObj.hphone1.focus();
        return false;
    }

    if (formObj.phone1.value != "") {
        var phone = formObj.phone1.value + formObj.phone2.value + formObj.phone3.value;
        if (phone.length < 10) {
            alert("Please enter a valid home phone number");
            formObj.phone1.focus();
            return false;
        } else {
            for (var i = 0; i < phone.length; i++) {
                var oneChar = phone.substring(i, i + 1);
                if (oneChar < '0' || oneChar > '9') {
                    alert("Please enter a valid home phone number");
                    formObj.phone1.focus();
                    return false;
                }
            }
        }
    }

    if (formObj.cphone1.value != "") {
        var phone = formObj.cphone1.value + formObj.cphone2.value + formObj.cphone3.value;
        if (phone.length < 10) {
            alert("Please enter a valid cell phone number");
            formObj.cphone1.focus();
            return false;
        } else {
            for (var i = 0; i < phone.length; i++) {
                var oneChar = phone.substring(i, i + 1);
                if (oneChar < '0' || oneChar > '9') {
                    alert("Please enter a valid cell phone number");
                    formObj.cphone1.focus();
                    return false;
                }
            }
        }
    }
    if (formObj.wphone1.value != "") {
        var phone = formObj.wphone1.value + formObj.wphone2.value + formObj.wphone3.value;
        if (phone.length < 10) {
            alert("Please enter a valid work phone number");
            formObj.wphone1.focus();
            return false;
        } else {
            for (var i = 0; i < phone.length; i++) {
                var oneChar = phone.substring(i, i + 1);
                if (oneChar < '0' || oneChar > '9') {
                    alert("Please enter a valid work phone number");
                    formObj.wphone1.focus();
                    return false;
                }
            }
        }
    }

    // check street
    if (formObj.addrStreet1.value.length < 5) {
        alert("Home address not found.");
        formObj.addrStreet1.focus();
        return false;
    }
    // check city
    if (formObj.addrCity.value == "") {
        alert(message + "Please enter the city.");
        formObj.addrCity.focus();
        return false;
    }
    // check state
    if (formObj.addrState.value == "") {
        alert(message + "Please select the state.");
        formObj.addrState.focus();
        return false;
    }
    // check zip code
    re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if (!re.test(formObj.addrZip.value)) {
        alert("Please enter a valid zip code. \nEx: 12345 or 12345-6789.");
        formObj.addrZip.focus();
        return false;
    }
    /*
     // check that at least one contact mode is entered
     if (formObj.email1.value == "" && formObj.phone1.value == "" && formObj.addrStreet1.value == "") {
     alert("A contact information is required for registration. \nPlease enter your email and/or phone number and/or address");
     formObj.email1.focus();
     return false;
     }
     */
    // check commute mode
    if (formObj.commuteMode.value == "") {
        alert("Please select an option that describes your current commute mode.");
        formObj.commuteMode.focus();
        return false;
    }

    // check awareness mode
    if (formObj.hearAboutUs.value == "") {
        alert("Please select an option that descibes how you learned about us.");
        formObj.hearAboutUs.focus();
        return false;
    }

    // Added for the Commuter Challenge employer dropdown
    /*
     alert ("line 572");
     alert (document.getElementById("commuter_challenge").value.toLowerCase()); 				displays "true"
     alert (document.getElementById("commuter_challenge").value.toLowerCase() === 'true');	displays "true"
     */
    if (document.getElementById("commuter_challenge") != null &&
            document.getElementById("commuter_challenge").value.toLowerCase() ===
            'true') {
        // Setup employer id and address id values for form submission
        document.getElementById("empIndex").value = "0";
        var empData = document.getElementById("challengeEmployer").value;
        var tokens = empData.split(" ");
        if (tokens[0] == "0" || tokens[1] == "0") {
            alert("You must choose an employer from the list to continue.");
            return false;
        }
        document.getElementById("employerId").value = tokens[0];
        document.getElementById("empAddrId").value = tokens[1];
    }
    else {
        // Do the "standard" validation that involves the employer search widgets
        //check if employer name and employer address are empty
        if (formObj.employerStNo.value == "" && formObj.employerStreet.value == "") {
            alert("Please enter either employer street number or employer street address");
            formObj.employerStreet.focus();
            return false;
        }

        //count if user selected atleast one employer radio button
        var countcheck = 0;
        var radiobuttons = document.getElementsByName("empIndex");
        if (radiobuttons.length > 0) {
            for (var i = 0; i < radiobuttons.length; i++) {
                if (radiobuttons[i].checked == true) {
                    countcheck = countcheck + 1;
                }
            }
        }

        //check if user selected atleast one employer or added a new employer
        if (countcheck == 0 && document.getElementById("addnewemp").checked == false) {
            alert("Please select atleast one employer or add a new employer.");
            return false;
        }

        if (document.getElementById("addnewemp").checked == true) {
            //check employer name
            if (formObj.empName.value == "") {
                alert("Please enter employer name.");
                formObj.empName.focus();
                return false;
            }
            // check employer address
            if (formObj.empStreet.value == "") {
                alert("Please enter employer address.");
                formObj.empStreet.focus();
                return false;
            }
            if (formObj.empCity.value == "") {
                alert("Please enter employer city.");
                formObj.empCity.focus();
                return false;
            }
            if (formObj.empState.value == "") {
                alert("Please enter employer state.");
                formObj.empState.focus();
                return false;
            }
            if (formObj.empZip.value == "") {
                alert("Please enter employer ZIP code.");
                formObj.empZip.focus();
                return false;
            }
        }
    }

    // check disclaimer
    if (!formObj.disclaimer.checked) {
        alert("Please read the terms of using Commuter Connections \nand select the check box for disclaimer.");
        formObj.disclaimer.focus();
        return false;
    }

    if (document.getElementById("addressBoundary").innerHTML == "The address you specified is outside the MWOCG boundary.") {
        alert("Please correct the address, Home Address should be within MWCOG boundary.");
        return false;
    }

    if (document.getElementById("marketingEmails").checked == true) {
        document.getElementById("marketingemailsflag").value = "Y";
    } else if (document.getElementById("marketingEmails").checked == false) {
        document.getElementById("marketingemailsflag").value = "N";
    }

    // submit the form, if all entries are valid
    formObj.submit();
    return true;
}

/* CHECK NEW REGISTRATION USING SINGLE FORM */
function checkOneFormRegistration(formObj) {
    var note = "Fields marked with * are required.\n";

    // check first name
    if (formObj.firstName.value == "") {
        alert(note + "Please enter your first name.");
        formObj.firstName.focus();
        return false;
    }
    // check last name
    if (formObj.lastName.value == "") {
        alert(note + "Please enter your last name.");
        formObj.lastName.focus();
        return false;
    }

    // check user name for size
    if (formObj.userName.value == "") {
        alert(note + "Please enter a user name.");
        formObj.userName.focus();
        return false;
    } else {
        if (formObj.userName.value.length < 8 || formObj.userName.value.length > 12) {
            alert("User Name must be 8 to 12 characters.");
            formObj.userName.focus();
            return false;
        } else {
            re = /^([a-zA-Z0-9_]+)$/;
            if (!re.test(formObj.userName.value)) {
                alert("User Name must be alphanumeric only.");
                formObj.userName.focus();
                return false;
            }
        }
    }

    // check password for validity and compare with confirmation password
    if (formObj.password1.value == formObj.userName.value) {
        alert("Password must be different from Username.");
        formObj.password1.focus();
        return false;
    }
    if (formObj.password1.value != "" && formObj.password1.value != null) {
        if (formObj.password1.value.length < 8) {
            alert("Password must contain at least eight alphanumeric characters!");
            formObj.password1.focus();
            return false;
        }
        re = /^([a-zA-Z0-9_]+)$/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must be alphanumeric only.");
            formObj.password1.focus();
            return false;
        }
        re = /[0-9]/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must contain at least one number (0-9).");
            formObj.password1.focus();
            return false;
        }
        re = /[a-zA-Z]/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must contain at least one letter (a-z).");
            formObj.password1.focus();
            return false;
        }
    } else {
        alert(note + "Please enter a password.");
        formObj.password1.focus();
        return false;
    }
    if (formObj.password2.value == "" || formObj.password2.value == null) {
        alert(note + "Please enter confirmation password.\n(Must be same as password)");
        formObj.password2.focus();
        return false;
    }
    if (formObj.password1.value != "" && formObj.password1.value != formObj.password2.value) {
        alert("Password and confirmation password must be same.");
        formObj.password2.focus();
        return false;
    }

    // check password recovery question
    if (formObj.pwdQuestion.value == "") {
        alert(note + "Please select a password recovery question.");
        formObj.pwdQuestion.focus();
        return false;
    }
    // check password recovery answer
    if (formObj.pwdAnswer.value == "") {
        alert(note + "Please enter password recovery answer.");
        formObj.pwdAnswer.focus();
        return false;
    }

    if (formObj.siteId.value == "10007") {
        // check name share flag
        if (document.getElementById("shareName").checked == true) {
            document.getElementById("nameshareflag").value = "Y";
        } else if (document.getElementById("shareName").checked == false) {
            document.getElementById("nameshareflag").value = "N";
        }

        // check address share flag
        if (document.getElementById("shareAddr").checked == true) {
            document.getElementById("addressshareflag").value = "Y";
        } else if (document.getElementById("shareAddr").checked == false) {
            document.getElementById("addressshareflag").value = "N";
        }

        // check email share flag
        if (document.getElementById("shareEmail").checked == true) {
            document.getElementById("emailidshareflag").value = "Y";
        } else if (document.getElementById("shareEmail").checked == false) {
            document.getElementById("emailidshareflag").value = "N";
        }

        // check phone share flag
        if (document.getElementById("sharePhone").checked == true) {
            document.getElementById("phoneshareflag").value = "Y";
        } else if (document.getElementById("sharePhone").checked == false) {
            document.getElementById("phoneshareflag").value = "N";
        }
    }
    // check email for format and validity
    var message = "";
    if (formObj.email1.value != "" || formObj.email2.value != "") {
        message = checkEmail(formObj.email1.value);
        if (message != "") {
            alert(message);
            formObj.email1.focus();
            return false;
        }
        message = checkEmail(formObj.email2.value);
        if (message != "") {
            alert("Please enter a valid confirmation email address.");
            formObj.email2.focus();
            return false;
        }
        if (formObj.email1.value !== formObj.email2.value) {
            alert("Email and confirmation email must be same.");
            formObj.email2.focus();
            return false;
        }
    }

    if (formObj.siteId.value == "10007") {
        if (formObj.email1.value == "" || formObj.email1.value == null) {
            alert("Please enter a valid email address.");
            formObj.email1.focus();
            return false;
        }
        if (formObj.email1.value !== formObj.email2.value) {
            alert("Email and confirmation email must be same.");
            formObj.email2.focus();
            return false;
        }
    }

    // check phone numbers for format
    if (formObj.siteId.value == "10005") {
        if (formObj.phone1.value == "" && formObj.cphone1.value == "" && formObj.wphone1.value == "") {
            alert("Please enter at least one contact telephone number.");
            formObj.phone1.focus();
            return false;
        }
    }
    if (formObj.phone1.value != "") {
        var phone = formObj.phone1.value + formObj.phone2.value + formObj.phone3.value;
        if (phone.length < 10) {
            alert("Please enter a valid phone number");
            formObj.phone1.focus();
            return false;
        } else {
            for (var i = 0; i < phone.length; i++) {
                var oneChar = phone.substring(i, i + 1);
                if (oneChar < '0' || oneChar > '9') {
                    alert("Please enter a valid home phone number");
                    formObj.phone1.focus();
                    return false;
                }
            }
        }
    }
    if (formObj.cphone1.value != "") {
        var cphone = formObj.cphone1.value + formObj.cphone2.value + formObj.cphone3.value;
        if (cphone.length < 10) {
            alert("Please enter a valid cell phone number");
            formObj.cphone1.focus();
            return false;
        } else {
            for (var i = 0; i < cphone.length; i++) {
                var oneChar = cphone.substring(i, i + 1);
                if (oneChar < '0' || oneChar > '9') {
                    alert("Please enter a valid cell phone number");
                    formObj.cphone1.focus();
                    return false;
                }
            }
        }
    }
    if (formObj.wphone1.value != "") {
        var wphone = formObj.wphone1.value + formObj.wphone2.value + formObj.wphone3.value;
        if (wphone.length < 10) {
            alert("Please enter a valid work phone number");
            formObj.wphone1.focus();
            return false;
        } else {
            for (var i = 0; i < wphone.length; i++) {
                var oneChar = wphone.substring(i, i + 1);
                if (oneChar < '0' || oneChar > '9') {
                    alert("Please enter a valid work phone number");
                    formObj.wphone1.focus();
                    return false;
                }
            }
        }
    }

    // check street
    if (formObj.addrStreet1.value.length < 5) {
        alert("please enter valid street name.");
        formObj.addrStreet1.focus();
        return false;
    }
    // check city
    if (formObj.addrCity.value == "") {
        alert(message + "Please enter the city.");
        formObj.addrCity.focus();
        return false;
    }
    // check state
    if (formObj.addrState.value == "") {
        alert(message + "Please select the state.");
        formObj.addrState.focus();
        return false;
    }
    // check zip code
    re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if (!re.test(formObj.addrZip.value)) {
        alert("Please enter a valid zip code. \nEx: 12345 or 12345-6789.");
        formObj.addrZip.focus();
        return false;
    }

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

    // check commute days
    if (formObj.commuteDays.value == "") {
        alert("Please select an option for the number of days you commute to work.");
        formObj.commuteDays.focus();
        return false;
    }

    // check commute mode
    if (formObj.commuteMode.value == "") {
        alert("Please select an option that describes your current commute mode.");
        formObj.commuteMode.focus();
        return false;
    }

    // check awareness mode
    if (formObj.hearAboutUs.value == "") {
        alert("Please select an option that descibes how you learned about us.");
        formObj.hearAboutUs.focus();
        return false;
    }

    // check disclaimer
    if (!formObj.disclaimer.checked) {
        alert("Please read 'How it works' \nand select the check box for disclaimer.");
        formObj.disclaimer.focus();
        return false;
    }

    if (document.getElementById("marketingEmails").checked == true) {
        document.getElementById("marketingemailsflag").value = "Y";
    } else if (document.getElementById("marketingEmails").checked == false) {
        document.getElementById("marketingemailsflag").value = "N";
    }

    // submit the form, if all entries are valid
    formObj.submit();
    return true;
}

/* CHECK RIDESHARE REGISTRATION */
function registerForRS(formObj) {
    formObj.action.value = "rideshare";
    formObj.submit();
    return true;
}

function checkRSRegistration(formObj) {
    // check employer name
    if (formObj.empName.value == "") {
        alert("Employer information is required. \nPlease update employer information.");
        formObj.empName.focus();
        return false;
    }

    // check phone numbers for format
    if (formObj.siteId.value == "10005") {

        if (document.getElementById("hphone1").value == "" && document.getElementById("cphone1").value == "" && document.getElementById("wphone1").value == "") {
            alert("Please enter at least one contact telephone number.");
            document.getElementById("hphone1").focus();
            return false;
        }
    }
    if (formObj.hphone1.value != "") {
        var phone = formObj.hphone1.value + formObj.hphone2.value + formObj.hphone3.value;
        if (phone.length < 10) {
            alert("Please enter a valid phone number");
            formObj.hphone1.focus();
            return false;
        } else {
            for (var i = 0; i < phone.length; i++) {
                var oneChar = phone.substring(i, i + 1);
                if (oneChar < '0' || oneChar > '9') {
                    alert("Please enter a valid home phone number");
                    formObj.hphone1.focus();
                    return false;
                }
            }
        }
    }
    if (formObj.cphone1.value != "") {
        var cphone = formObj.cphone1.value + formObj.cphone2.value + formObj.cphone3.value;
        if (cphone.length < 10) {
            alert("Please enter a valid cell phone number");
            formObj.cphone1.focus();
            return false;
        } else {
            for (var i = 0; i < cphone.length; i++) {
                var oneChar = cphone.substring(i, i + 1);
                if (oneChar < '0' || oneChar > '9') {
                    alert("Please enter a valid cell phone number");
                    formObj.cphone1.focus();
                    return false;
                }
            }
        }
    }
    if (formObj.wphone1.value != "") {
        var wphone = formObj.wphone1.value + formObj.wphone2.value + formObj.wphone3.value;
        if (wphone.length < 10) {
            alert("Please enter a valid work phone number");
            formObj.wphone1.focus();
            return false;
        } else {
            for (var i = 0; i < wphone.length; i++) {
                var oneChar = wphone.substring(i, i + 1);
                if (oneChar < '0' || oneChar > '9') {
                    alert("Please enter a valid work phone number");
                    formObj.wphone1.focus();
                    return false;
                }
            }
        }
    }

    var message = "Fields marked with * are required.\n";
    // check pool preference
    if (formObj.carpool.value == "N" && formObj.vanpool.value == "N") {
        alert("Your interest in either Carpooling and/or Vanpooling \n is required for this program.");
        formObj.carpool.focus();
        return false;
    }

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

    // submit the form, if it is valid
    document.getElementById("action").value = "register";
    formObj.submit();
    return true;
}

/* CHECK RIDEHOME REGISTRATION */
function registerForGRH(formObj) {
    formObj.action.value = "ridehome";
    formObj.submit();
    return true;
}

function checkGRHRegistration(formObj) {
    // check employer name
    if (formObj.empName.value == "") {
        alert("Employer information is required. \nPlease update employer information.");
        formObj.empName.focus();
        return false;
    }

    // check supervisor first name
    if (formObj.supFName.value == "") {
        alert("Supervisor first name is required for \nGuaranteed Ride Home Registration.");
        formObj.supFName.focus();
        return false;
    }
    // check supervisor last name
    if (formObj.supLName.value == "") {
        alert("Supervisor last name is required for \nGuaranteed Ride Home Registration.");
        formObj.supLName.focus();
        return false;
    }

    // check that supervisor phone format is valid
    var phone = formObj.sphone1.value + formObj.sphone2.value + formObj.sphone3.value;
    if (phone.length != 10) {
        alert("Supervisor phone number is required for \nGuaranteed Ride Home Registration.");
        formObj.sphone1.focus();
        return false;
    } else {
        for (var i = 0; i < phone.length; i++) {
            var oneChar = phone.substring(i, i + 1);
            if (oneChar < '0' || oneChar > '9') {
                alert("Enter a valid supervisor phone number");
                formObj.sphone1.focus();
                return false;
            }
        }
    }

    var message = "Fields marked with * are required.\n";
    // check address
    if (!formObj.addrStreet1.value == "") {
        // check street
        if (formObj.addrStreet1.value.length < 5) {
            alert("please enter valid street name.");
            formObj.addrStreet1.focus();
            return false;
        }
        // check city
        if (formObj.addrCity.value == "") {
            alert(message + "Please enter the city.");
            formObj.addrCity.focus();
            return false;
        }
        // check state
        if (formObj.addrState.value == "") {
            alert(message + "Please select the state.");
            formObj.addrState.focus();
            return false;
        }
        // check zip code
        re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        if (!re.test(formObj.addrZip.value)) {
            alert("Please enter a valid zip code. \nEx: 12345 or 12345-6789.");
            formObj.addrZip.focus();
            return false;
        }
    } else {
        alert("Home address is required for \nGuaranteed Ride Home Program.");
        formObj.addrStreet1.focus();
        return false;
    }

    // check that home phone format is valid
    var phone = formObj.hphone1.value + formObj.hphone2.value + formObj.hphone3.value;
    if (phone.length != 10) {
        alert("Home phone number is required for \nGuaranteed Ride Home Registration.");
        formObj.hphone1.focus();
        return false;
    } else {
        for (var i = 0; i < phone.length; i++) {
            var oneChar = phone.substring(i, i + 1);
            if (oneChar < '0' || oneChar > '9') {
                alert("Enter a valid home phone number");
                formObj.hphone1.focus();
                return false;
            }
        }
    }

    // check that work phone format is valid
    var phone = formObj.wphone1.value + formObj.wphone2.value + formObj.wphone3.value;
    if (phone.length != 10) {
        alert("Work phone number is required for \nGuaranteed Ride Home Registration.");
        formObj.wphone1.focus();
        return false;
    } else {
        for (var i = 0; i < phone.length; i++) {
            var oneChar = phone.substring(i, i + 1);
            if (oneChar < '0' || oneChar > '9') {
                alert("Enter a valid work phone number");
                formObj.wphone1.focus();
                return false;
            }
        }
    }

    // check that miles to work are entered
    if (formObj.milesToWork.value == "") {
        alert(message + "Please enter approximate distance in \n miles from home to work.");
        formObj.milesToWork.focus();
        return false;
    }

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

    // submit the form, if it is valid
    formObj.action.value = "register";
    formObj.submit();
    return true;
}

/* CHECK ADD MEMBER */
function checkMemberInfo(formObj) {
    var note = "Fields marked with * are required.\n";

    if (document.getElementById('appform'))
    {
        if (formObj.appform.value == "") {
            alert(note + "Please enter App Form.");
            formObj.appform.focus();
            return false;
        }
    }

    // check first name
    if (formObj.firstName.value == "") {
        alert(note + "Please enter commuter first name.");
        formObj.firstName.focus();
        return false;
    }
    // check last name
    if (formObj.lastName.value == "") {
        alert(note + "Please enter commuter last name.");
        formObj.lastName.focus();
        return false;
    }

    // check user name for size
    if (formObj.userName.value == "") {
        alert(note + "Please enter a user name for commuter.");
        formObj.userName.focus();
        return false;
    } else {
        if (formObj.userName.value.length < 8 || formObj.userName.value.length > 12) {
            alert("User Name must be 8 to 12 characters.");
            formObj.userName.focus();
            return false;
        } else {
            re = /^([a-zA-Z0-9_]+)$/;
            if (!re.test(formObj.userName.value)) {
                alert("User Name must be alphanumeric only.");
                formObj.userName.focus();
                return false;
            }
        }
    }

    // check password for validity and compare with confirmation password
    if (formObj.password1.value == formObj.userName.value) {
        alert("Password must be different from Username.");
        formObj.password1.focus();
        return false;
    }
    if (formObj.password1.value != "" && formObj.password1.value != null) {
        if (formObj.password1.value.length < 8) {
            alert("Password must contain at least eight alphanumeric characters!");
            formObj.password1.focus();
            return false;
        }
        re = /^([a-zA-Z0-9_]+)$/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must be alphanumeric only.");
            formObj.password1.focus();
            return false;
        }
        re = /[0-9]/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must contain at least one number (0-9).");
            formObj.password1.focus();
            return false;
        }
        re = /[a-zA-Z]/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must contain at least one letter (a-z).");
            formObj.password1.focus();
            return false;
        }
    } else {
        alert(note + "Please enter a password for commuter.");
        formObj.password1.focus();
        return false;
    }
    if (formObj.password2.value == "" || formObj.password2.value == null) {
        alert(note + "Please enter confirmation password.\n(Must be same as password)");
        formObj.password2.focus();
        return false;
    }
    if (formObj.password1.value != "" && formObj.password1.value != formObj.password2.value) {
        alert("Password and confirmation password must be same.");
        formObj.password2.focus();
        return false;
    }

    // check password recovery question
    if (formObj.pwdQuestion.value == "") {
        alert(note + "Please select a password recovery question for commuter.");
        formObj.pwdQuestion.focus();
        return false;
    }
    // check password recovery answer
    if (formObj.pwdAnswer.value == "") {
        alert(note + "Please enter password recovery answer for commuter.");
        formObj.pwdAnswer.focus();
        return false;
    }

    if (formObj.siteId.value == "10007") {
        // check name share flag
        if (document.getElementById("shareName").checked == true) {
            document.getElementById("nameshareflag").value = "Y";
        } else if (document.getElementById("shareName").checked == false) {
            document.getElementById("nameshareflag").value = "N";
        }

        // check address share flag
        if (document.getElementById("shareAddr").checked == true) {
            document.getElementById("addressshareflag").value = "Y";
        } else if (document.getElementById("shareAddr").checked == false) {
            document.getElementById("addressshareflag").value = "N";
        }

        // check email share flag
        if (document.getElementById("shareEmail").checked == true) {
            document.getElementById("emailidshareflag").value = "Y";
        } else if (document.getElementById("shareEmail").checked == false) {
            document.getElementById("emailidshareflag").value = "N";
        }

        // check phone share flag
        if (document.getElementById("sharePhone").checked == true) {
            document.getElementById("phoneshareflag").value = "Y";
        } else if (document.getElementById("sharePhone").checked == false) {
            document.getElementById("phoneshareflag").value = "N";
        }
    }

    // check email for format and validity
    var message = "";
    if (formObj.email1.value != "" || formObj.email2.value != "") {
        message = checkEmail(formObj.email1.value);
        if (message != "") {
            alert(message);
            formObj.email1.focus();
            return false;
        }
        message = checkEmail(formObj.email2.value);
        if (message != "") {
            alert("Please enter a valid confirmation email address.");
            formObj.email2.focus();
            return false;
        }
        if (formObj.email1.value !== formObj.email2.value) {
            alert("Email and confirmation email must be same.");
            formObj.email2.focus();
            return false;
        }
    }

    // check phone number for format
    if (formObj.phone1.value != "") {
        var phone = formObj.phone1.value + formObj.phone2.value + formObj.phone3.value;
        if (phone.length < 10) {
            alert("Please enter a valid phone number of commuter.");
            formObj.phone1.focus();
            return false;
        } else {
            for (var i = 0; i < phone.length; i++) {
                var oneChar = phone.substring(i, i + 1);
                if (oneChar < '0' || oneChar > '9') {
                    alert("Please enter a valid phone number of commuter.");
                    formObj.phone1.focus();
                    return false;
                }
            }
        }
    }

    // check address
    if (!formObj.addrStreet1.value == "") {
        // check street
        if (formObj.addrStreet1.value.length < 5) {
            alert("please enter valid street name.");
            formObj.addrStreet1.focus();
            return false;
        }
        // check city
        if (formObj.addrCity.value == "") {
            alert(message + "Please enter the city.");
            formObj.addrCity.focus();
            return false;
        }
        // check state
        if (formObj.addrState.value == "") {
            alert(message + "Please select the state.");
            formObj.addrState.focus();
            return false;
        }
        // check zip code
        re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        if (!re.test(formObj.addrZip.value)) {
            alert("Please enter a valid zip code. \nEx: 12345 or 12345-6789.");
            formObj.addrZip.focus();
            return false;
        }
    }

    // check commute mode
    if (formObj.commuteMode.value == "") {
        alert("Please select an option that describes commuter's current commute mode.");
        formObj.commuteMode.focus();
        return false;
    }

    // check awareness mode
    if (formObj.hearAboutUs.value == "") {
        alert("Please select an option that descibes how commuter has learned about us.");
        formObj.hearAboutUs.focus();
        return false;
    }

    if (document.getElementById("marketingEmails").checked == true) {
        document.getElementById("marketingemailsflag").value = "Y";
    } else if (document.getElementById("marketingEmails").checked == false) {
        document.getElementById("marketingemailsflag").value = "N";
    }

    formObj.submit();
    return true;
}

/* CHECK EDIT PROFILE */
function checkEditProfile(formObj) {
    var clientId = formObj.clientId.value;
    // check home address, home phone & work phone for GRH
    if (clientId == "10001" && formObj.ridehomestatus.value == "true") {
        if (formObj.addrStreet1.value == "") {
            alert("Home Address is required for Guaranteed Ride Home program. \nPlease enter the street address or click on 'Cancel Changes'.");
            formObj.addrStreet1.focus();
            return false;
        }
        if (formObj.addrCity.value == "") {
            alert("Home Address is required for Guaranteed Ride Home program. \nPlease enter the city or click on 'Cancel Changes'.");
            formObj.addrCity.focus();
            return false;
        }
        if (formObj.addrState.value == "") {
            alert("Home Address is required for Guaranteed Ride Home program. \nPlease select the state or click on 'Cancel Changes'.");
            formObj.addrState.focus();
            return false;
        }
        if (formObj.addrZip.value == "") {
            alert("Home Address is required for Guaranteed Ride Home program. \nPlease enter the zip code or click on 'Cancel Changes'.");
            formObj.addrZip.focus();
            return false;
        }
        if (formObj.hphone1.value == "" || formObj.hphone2.value == "" || formObj.hphone3.value == "") {
            alert("Home Phone is required for Guaranteed Ride Home program. \nPlease enter the phone number or click on 'Cancel Changes'.");
            formObj.hphone1.focus();
            return false;
        }
        if (formObj.wphone1.value == "" || formObj.wphone2.value == "" || formObj.wphone3.value == "") {
            alert("Work Phone is required for \nGuaranteed Ride Home program.\nPlease enter the phone number or click on 'Cancel Changes'.");
            formObj.wphone1.focus();
            return false;
        }
    }

    if (document.getElementById('appform'))
    {
        if (formObj.appform.value == "") {
            alert("Please enter App Form.");
            formObj.appform.focus();
            return false;
        }
    }

    // check first name
    if (formObj.firstName.value == "") {
        alert("Please enter your first name.");
        formObj.firstName.focus();
        return false;
    }
    // check last name
    if (formObj.lastName.value == "") {
        alert("Please enter your last name.");
        formObj.lastName.focus();
        return false;
    }

    // check address
    if (!formObj.addrStreet1.value == "") {
        // check street
        if (formObj.addrStreet1.value.length < 5) {
            alert("please enter valid street name.");
            formObj.addrStreet1.focus();
            return false;
        }
        // check city
        if (formObj.addrCity.value == "") {
            alert("Please enter the city.");
            formObj.addrCity.focus();
            return false;
        }
        // check state
        if (formObj.addrState.value == "") {
            alert("Please select the state.");
            formObj.addrState.focus();
            return false;
        }
        // check zip code
        re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        if (!re.test(formObj.addrZip.value)) {
            alert("Please enter a valid zip code. \nEx: 12345 or 12345-6789.");
            formObj.addrZip.focus();
            return false;
        }
    }

    // check email for format and validity
    var message = "";
    if (formObj.email.value != "") {
        message = checkEmail(formObj.email.value);
        if (message != "") {
            alert(message);
            formObj.email.focus();
            return false;
        }
    }

    // check home phone number for format
    if (formObj.hphone1.value != "") {
        var hphone = formObj.hphone1.value + formObj.hphone2.value + formObj.hphone3.value;
        if (hphone.length < 10) {
            alert("Please enter a valid home phone number");
            formObj.hphone1.focus();
            return false;
        } else {
            for (var i = 0; i < hphone.length; i++) {
                var oneChar = hphone.substring(i, i + 1);
                if (oneChar < '0' || oneChar > '9') {
                    alert("Please enter a valid home phone number");
                    formObj.hphone1.focus();
                    return false;
                }
            }
        }
    }

    // check work phone number for format
    if (formObj.wphone1.value != "") {
        var wphone = formObj.wphone1.value + formObj.wphone2.value + formObj.wphone3.value;
        if (wphone.length < 10) {
            alert("Please enter a valid work phone number");
            formObj.wphone1.focus();
            return false;
        } else {
            for (var i = 0; i < wphone.length; i++) {
                var oneChar = wphone.substring(i, i + 1);
                if (oneChar < '0' || oneChar > '9') {
                    alert("Please enter a valid work phone number");
                    formObj.wphone1.focus();
                    return false;
                }
            }
        }
    }

    // check cell phone number for format
    if (formObj.cphone1.value != "") {
        var cphone = formObj.cphone1.value + formObj.cphone2.value + formObj.cphone3.value;
        if (cphone.length < 10) {
            alert("Please enter a valid cell phone number");
            formObj.cphone1.focus();
            return false;
        } else {
            for (var i = 0; i < cphone.length; i++) {
                var oneChar = cphone.substring(i, i + 1);
                if (oneChar < '0' || oneChar > '9') {
                    alert("Please enter a valid cell phone number");
                    formObj.cphone1.focus();
                    return false;
                }
            }
        }
    }
    /*
     // check that at least one contact mode is entered
     if (formObj.email.value == "" && formObj.hphone1.value == "" && formObj.wphone1.value == "" &&
     formObj.cphone1.value == "" && formObj.addrStreet1.value == "") {
     alert("A contact information is required for registration. \nPlease enter your email and/or phone number and/or address");
     formObj.email.focus();
     return false;
     }
     */
    // submit the form, if it is valid
    formObj.submit();
    return true;
}

function checkEditCommute(formObj) {
    // check miles for GRH
    if (formObj.ridehomestatus.value == "true") {
        if (formObj.milesToWork.value == "") {
            alert("Approximate distance in miles from home to work is required for Guaranteed Ride Home program. \nPlease enter the miles or click on 'Cancel Changes'.");
            formObj.milesToWork.focus();
            return false;
        }
    }

    // check commute mode
    if (formObj.commuteMode.value == "") {
        alert("Please select an option that describes your current commute mode.");
        formObj.commuteMode.focus();
        return false;
    }

    // submit the form, if it is valid
    formObj.submit();
    return true;
}

function checkEditSupervisor(formObj) {
    // check supervisor info for GRH
    if (formObj.ridehomestatus.value == "true" && formObj.supReqrd.value != "no") {
        if (formObj.supFName.value == "") {
            alert("Supervisor Information is required for Guaranteed Ride Home program. \nPlease enter supervisor's first name or click on 'Cancel Changes'.");
            formObj.supFName.focus();
            return false;
        }
        if (formObj.supLName.value == "") {
            alert("Supervisor Information is required for Guaranteed Ride Home program. \nPlease enter supervisor's last name or click on 'Cancel Changes'.");
            formObj.supLName.focus();
            return false;
        }
        if (formObj.sphone1.value == "" || formObj.sphone2.value == "" || formObj.sphone3.value == "") {
            alert("Supervisor Information is required for Guaranteed Ride Home program. \nPlease enter supervisor's phone number or click on 'Cancel Changes'.");
            formObj.sphone1.focus();
            return false;
        }
    }

    if (formObj.sphone1.value != "") {
        var phone = formObj.sphone1.value + formObj.sphone2.value + formObj.sphone3.value;
        if (phone.length != 10) {
            alert("Please enter a valid supervisor phone number.");
            formObj.sphone1.focus();
            return false;
        } else {
            for (var i = 0; i < phone.length; i++) {
                var oneChar = phone.substring(i, i + 1);
                if (oneChar < '0' || oneChar > '9') {
                    alert("Please enter a valid supervisor phone number.");
                    formObj.sphone1.focus();
                    return false;
                }
            }
        }
    }

    // submit the form, if it is valid
    formObj.submit();
    return true;
}

function checkEditEmployer(formObj) {
    // check employer name
    if (formObj.empName.value == "") {
        alert("Please enter employer name.");
        formObj.empName.focus();
        return false;
    }

    // check employer address
    if (formObj.empStreet.value == "") {
        alert("Please enter employer address.");
        formObj.empStreet.focus();
        return false;
    }
    // submit the form, if it is valid
    formObj.submit();
    return true;
}

function checkSaveEmployerDuringReg(formObj) {
    // check employer name
    if (formObj.empName.value == "") {
        alert("Please enter employer name.");
        formObj.empName.focus();
        return false;
    }

    // check employer address
    if (formObj.empStreet.value == "") {
        alert("Please enter employer address.");
        formObj.empStreet.focus();
        return false;
    }
    if (formObj.empCity.value == "") {
        alert("Please enter employer city.");
        formObj.empCity.focus();
        return false;
    }
    if (formObj.empState.value == "") {
        alert("Please enter employer state.");
        formObj.empState.focus();
        return false;
    }
    if (formObj.empZip.value == "") {
        alert("Please enter employer ZIP code.");
        formObj.empZip.focus();
        return false;
    }
}

function checkSaveEmployer(formObj) {
    // check employer name
    if (formObj.empName.value == "") {
        alert("Please enter employer name.");
        formObj.empName.focus();
        return false;
    }

    // check employer address
    if (formObj.empStreet.value == "") {
        alert("Please enter employer address.");
        formObj.empStreet.focus();
        return false;
    }
    if (formObj.empCity.value == "") {
        alert("Please enter employer city.");
        formObj.empCity.focus();
        return false;
    }
    if (formObj.empState.value == "") {
        alert("Please enter employer state.");
        formObj.empState.focus();
        return false;
    }
    // submit the form, if it is valid
    formObj.submit();
    return true;
}

function checkUpdateEmployer(formObj) {
    var employerno = null;
    for (var i = 0; i < document.editprofile.empIndex.length; i++) {
        if (document.editprofile.empIndex[i].checked) {
            employerno = document.editprofile.empIndex[i].value;
        }
    }
    if (employerno == null && document.editprofile.empIndex.checked) {
        employerno = 0;
    }
    if (employerno == null) {
        alert("Please select an employer.");
        return false;
    }
    // submit the form, if it is valid
    formObj.submit();
    return true;
}

function checkEditWorkSchedule(formObj) {
    var message = "";

    // check work schedules for GRH
    if (formObj.ridehomestatus.value == "true") {
        if (formObj.fromHRS.value == "") {
            alert("Work Schedule is required for Guaranteed Ride Home program. \nPlease enter hours for work start time or click on 'Cancel Changes'.");
            formObj.fromHRS.focus();
            return false;
        }
        if (formObj.fromMNS.value == "") {
            alert("Work Schedule is required for Guaranteed Ride Home program. \nPlease enter minutes for work start time or click on 'Cancel Changes'.");
            formObj.fromMNS.focus();
            return false;
        }
        if (formObj.toHRS.value == "") {
            alert("Work Schedule is required for Guaranteed Ride Home program. \nPlease enter hours for work end time or click on 'Cancel Changes'.");
            formObj.toHRS.focus();
            return false;
        }
        if (formObj.toMNS.value == "") {
            alert("Work Schedule is required for Guaranteed Ride Home program. \nPlease enter minutes for work end time or click on 'Cancel Changes'.");
            formObj.toMNS.focus();
            return false;
        }
    }

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

    // submit the form, if it is valid
    formObj.submit();
    return true;
}

function checkEditUserName(formObj) {
    // check if user name is available
    alert(formObj.iduser.value);
    if (formObj.iduser.value == null || formObj.iduser.value == "null") {
        alert("User Name is not available for this commuter.");
        return false;
    }

    // check user name for size
    if (formObj.userName1.value == "") {
        alert("Please enter the new user name.");
        formObj.userName1.focus();
        return false;
    } else {
        if (formObj.userName1.value.length < 8 || formObj.userName1.value.length > 12) {
            alert("User Name must be 8 to 12 characters.");
            formObj.userName1.focus();
            return false;
        } else {
            re = /^([a-zA-Z0-9_]+)$/;
            if (!re.test(formObj.userName1.value)) {
                alert("User Name must be alphanumeric only.");
                formObj.userName1.focus();
                return false;
            }
        }
    }

    // compare user name with confirmation user name
    if (formObj.userName1.value != formObj.userName2.value) {
        alert("User name and confirmation user name must be same.");
        formObj.userName2.focus();
        return false;
    }
    formObj.submit();
    return true;
}

function checkEditPassword(formObj) {
    // check if user name is available
    if (formObj.iduser.value == null || formObj.iduser.value == "null") {
        alert("User Name is not available for this commuter. \nPassword cannot be changed without user name.");
        return false;
    }

    // check new password for validity and compare with confirmation password
    if (formObj.password1.value != "" && formObj.password1.value == formObj.password2.value) {
        if (formObj.password1.value.length < 8) {
            alert("Password must contain at least eight alphanumeric characters!");
            formObj.password1.focus();
            return false;
        }
        if (formObj.password1.value == formObj.iduser.value) {
            alert("Password must be different from Username.");
            formObj.password1.focus();
            return false;
        }
        re = /^([a-zA-Z0-9_]+)$/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must be alphanumeric only.");
            formObj.password1.focus();
            return false;
        }
        re = /[0-9]/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must contain at least one number (0-9).");
            formObj.password1.focus();
            return false;
        }
        re = /[a-zA-Z]/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must contain at least one letter (a-z).");
            formObj.password1.focus();
            return false;
        }
    } else if (formObj.password1.value == "") {
        alert("Password and confirmation password are required. \nPlease enter a password.");
        formObj.password1.focus();
        return false;
    } else {
        alert("Password and confirmation password must be same.");
        formObj.password2.focus();
        return false;
    }
    formObj.submit();
    return true;
}

/********** COMMON GENERIC FUNCTIONS **********/
// auto tab for phone number entries
var phone_field_length = 0;
function TabNext(obj, event, len, next_field) {
    if (event == "down") {
        phone_field_length = obj.value.length;
    }
    else if (event == "up") {
        if (obj.value.length != phone_field_length) {
            phone_field_length = obj.value.length;
            if (phone_field_length == len) {
                next_field.focus();
            }
        }
    }
}

// check email for valid format
function checkEmail(str) {
    var error = "";
    if ((str.indexOf('@', 0) == -1 || str.indexOf('.', 0) == -1) && str.value != "")
        error = "Please enter a valid email address.";
    return error;
}

// Dashboard submission for editprofile
function submitform() {
    document.EditProfile.submit();
}

function changeUserName(formObj) {

    // check new user name for validity and compare with confirmation user name
    if (formObj.userName1.value != "" && formObj.userName1.value == formObj.userName2.value) {
        if (formObj.userName1.value == "") {
            alert("Please enter a user name.");
            formObj.userName1.focus();
            return false;
        } else if (formObj.userName1.value.length < 8 || formObj.userName1.value.length > 12) {
            alert("User Name must be 8 to 12 characters.");
            formObj.userName1.focus();
            return false;
        }
    } else {
        alert("User name and confirmation user name must be same.");
        formObj.userName2.focus();
        return false;
    }
    formObj.submit();
    return true;
}

function chgPassword(formObj) {
    if (formObj.memberIndex.value == "" || formObj.memberIndex.value == null) {
        alert("Please select member from the list.");
        return false;
    }
    document.getElementById('action').value = "selectmember";
    formObj.change.value = "password";

    formObj.submit();
    return true;
}

function chgUsername(formObj) {
    if (formObj.memberIndex.value == "" || formObj.memberIndex.value == null) {
        alert("Please select member from the list.");
        return false;
    }
    formObj.action.value = "selectmember";
    formObj.change.value = "username";
    formObj.submit();
    return true;
}

function changePassword(formObj) {
    var note = "Fields marked with * are required.\n";

    // check current password
    //if (formObj.password.value == "") {
    //	alert("Please enter current password.");
    //	formObj.password.focus();
    //	return false;
    //}

    //if(formObj.password.value == formObj.password1.value) {
    //	alert("Current password and new password cannot be same.");
    //	formObj.password1.focus();
    //	return false;
    //}

    // check new password for validity and compare with confirmation password
    if (formObj.password1.value == "") {
        alert("Please enter a new password.");
        formObj.password1.focus();
        return false;
    }
    if (formObj.password1.value != "" && formObj.password1.value == formObj.password2.value) {
        if (formObj.password1.value.length < 8) {
            alert("Password must contain at least eight alphanumeric characters!");
            formObj.password1.focus();
            return false;
        }
        if (formObj.password1.value == formObj.userName.value) {
            alert("Password must be different from Username.");
            formObj.password1.focus();
            return false;
        }
        re = /^([a-zA-Z0-9_]+)$/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must be alphanumeric only.");
            formObj.password1.focus();
            return false;
        }
        re = /[0-9]/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must contain at least one number (0-9).");
            formObj.password1.focus();
            return false;
        }
        re = /[a-zA-Z]/;
        if (!re.test(formObj.password1.value)) {
            alert("Password must contain at least one letter (a-z).");
            formObj.password1.focus();
            return false;
        }
    } else if (formObj.password1.value == "") {
        alert(note + "Please enter a password.");
        formObj.password1.focus();
        return false;
    } else {
        alert("Password and confirmation password must be same.");
        formObj.password2.focus();
        return false;
    }

    formObj.submit();
    return true;
}

// fill start address
function setStartAddress(startAddr) {
    var formObj = startAddr.form;
    switch (startAddr.options[startAddr.selectedIndex].value) {
        case '100':
            formObj.saddrid.value = "";
            formObj.saddrtype.value = "";
            formObj.sstreet.value = "";
            formObj.scity.value = "";
            formObj.sstate.value = "";
            formObj.szip.value = "";
            formObj.sstreet.focus();
            break;
        case '0':
            formObj.saddrid.value = formObj.addrId0.value;
            formObj.saddrtype.value = formObj.addrType0.value;
            formObj.sstreet.value = formObj.addrStreet0.value;
            formObj.scity.value = formObj.addrCity0.value;
            formObj.sstate.value = formObj.addrState0.value;
            formObj.szip.value = formObj.addrZip0.value;
            break;
        case '1':
            formObj.saddrid.value = formObj.addrId1.value;
            formObj.saddrtype.value = formObj.addrType1.value;
            formObj.sstreet.value = formObj.addrStreet1.value;
            formObj.scity.value = formObj.addrCity1.value;
            formObj.sstate.value = formObj.addrState1.value;
            formObj.szip.value = formObj.addrZip1.value;
            break;
        case '2':
            formObj.saddrid.value = formObj.addrId2.value;
            formObj.saddrtype.value = formObj.addrType2.value;
            formObj.sstreet.value = formObj.addrStreet2.value;
            formObj.scity.value = formObj.addrCity2.value;
            formObj.sstate.value = formObj.addrState2.value;
            formObj.szip.value = formObj.addrZip2.value;
            break;
        case '3':
            formObj.saddrid.value = formObj.addrId3.value;
            formObj.saddrtype.value = formObj.addrType3.value;
            formObj.sstreet.value = formObj.addrStreet3.value;
            formObj.scity.value = formObj.addrCity3.value;
            formObj.sstate.value = formObj.addrState3.value;
            formObj.szip.value = formObj.addrZip3.value;
            break;
        case '4':
            formObj.saddrid.value = formObj.addrId4.value;
            formObj.saddrtype.value = formObj.addrType4.value;
            formObj.sstreet.value = formObj.addrStreet4.value;
            formObj.scity.value = formObj.addrCity4.value;
            formObj.sstate.value = formObj.addrState4.value;
            formObj.szip.value = formObj.addrZip4.value;
            break;
        case '5':
            formObj.saddrid.value = formObj.addrId5.value;
            formObj.saddrtype.value = formObj.addrType5.value;
            formObj.sstreet.value = formObj.addrStreet5.value;
            formObj.scity.value = formObj.addrCity5.value;
            formObj.sstate.value = formObj.addrState5.value;
            formObj.szip.value = formObj.addrZip5.value;
            break;
        case '6':
            formObj.saddrid.value = formObj.addrId6.value;
            formObj.saddrtype.value = formObj.addrType6.value;
            formObj.sstreet.value = formObj.addrStreet6.value;
            formObj.scity.value = formObj.addrCity6.value;
            formObj.sstate.value = formObj.addrState6.value;
            formObj.szip.value = formObj.addrZip6.value;
            break;
        case '7':
            formObj.saddrid.value = formObj.addrId7.value;
            formObj.saddrtype.value = formObj.addrType7.value;
            formObj.sstreet.value = formObj.addrStreet7.value;
            formObj.scity.value = formObj.addrCity7.value;
            formObj.sstate.value = formObj.addrState7.value;
            formObj.szip.value = formObj.addrZip7.value;
            break;
        case '8':
            formObj.saddrid.value = formObj.addrId8.value;
            formObj.saddrtype.value = formObj.addrType8.value;
            formObj.sstreet.value = formObj.addrStreet8.value;
            formObj.scity.value = formObj.addrCity8.value;
            formObj.sstate.value = formObj.addrState8.value;
            formObj.szip.value = formObj.addrZip8.value;
            break;
        case '9':
            formObj.saddrid.value = formObj.addrId9.value;
            formObj.saddrtype.value = formObj.addrType9.value;
            formObj.sstreet.value = formObj.addrStreet9.value;
            formObj.scity.value = formObj.addrCity9.value;
            formObj.sstate.value = formObj.addrState9.value;
            formObj.szip.value = formObj.addrZip9.value;
            break;
        case '10':
            formObj.saddrid.value = formObj.addrId10.value;
            formObj.saddrtype.value = formObj.addrType10.value;
            formObj.sstreet.value = formObj.addrStreet10.value;
            formObj.scity.value = formObj.addrCity10.value;
            formObj.sstate.value = formObj.addrState10.value;
            formObj.szip.value = formObj.addrZip10.value;
            break;
        case '11':
            formObj.saddrid.value = formObj.addrId11.value;
            formObj.saddrtype.value = formObj.addrType11.value;
            formObj.sstreet.value = formObj.addrStreet11.value;
            formObj.scity.value = formObj.addrCity11.value;
            formObj.sstate.value = formObj.addrState11.value;
            formObj.szip.value = formObj.addrZip11.value;
            break;
        case '12':
            formObj.saddrid.value = formObj.addrId12.value;
            formObj.saddrtype.value = formObj.addrType12.value;
            formObj.sstreet.value = formObj.addrStreet12.value;
            formObj.scity.value = formObj.addrCity12.value;
            formObj.sstate.value = formObj.addrState12.value;
            formObj.szip.value = formObj.addrZip12.value;
            break;
        case '13':
            formObj.saddrid.value = formObj.addrId13.value;
            formObj.saddrtype.value = formObj.addrType13.value;
            formObj.sstreet.value = formObj.addrStreet13.value;
            formObj.scity.value = formObj.addrCity13.value;
            formObj.sstate.value = formObj.addrState13.value;
            formObj.szip.value = formObj.addrZip13.value;
            break;
        case '14':
            formObj.saddrid.value = formObj.addrId14.value;
            formObj.saddrtype.value = formObj.addrType14.value;
            formObj.sstreet.value = formObj.addrStreet14.value;
            formObj.scity.value = formObj.addrCity14.value;
            formObj.sstate.value = formObj.addrState14.value;
            formObj.szip.value = formObj.addrZip14.value;
            break;
        case '15':
            formObj.saddrid.value = formObj.addrId15.value;
            formObj.saddrtype.value = formObj.addrType15.value;
            formObj.sstreet.value = formObj.addrStreet15.value;
            formObj.scity.value = formObj.addrCity15.value;
            formObj.sstate.value = formObj.addrState15.value;
            formObj.szip.value = formObj.addrZip15.value;
            break;
        case '16':
            formObj.saddrid.value = formObj.addrId16.value;
            formObj.saddrtype.value = formObj.addrType16.value;
            formObj.sstreet.value = formObj.addrStreet16.value;
            formObj.scity.value = formObj.addrCity16.value;
            formObj.sstate.value = formObj.addrState16.value;
            formObj.szip.value = formObj.addrZip16.value;
            break;
        case '17':
            formObj.saddrid.value = formObj.addrId17.value;
            formObj.saddrtype.value = formObj.addrType17.value;
            formObj.sstreet.value = formObj.addrStreet17.value;
            formObj.scity.value = formObj.addrCity17.value;
            formObj.sstate.value = formObj.addrState17.value;
            formObj.szip.value = formObj.addrZip17.value;
            break;
        case '18':
            formObj.saddrid.value = formObj.addrId18.value;
            formObj.saddrtype.value = formObj.addrType18.value;
            formObj.sstreet.value = formObj.addrStreet18.value;
            formObj.scity.value = formObj.addrCity18.value;
            formObj.sstate.value = formObj.addrState18.value;
            formObj.szip.value = formObj.addrZip18.value;
            break;
        case '19':
            formObj.saddrid.value = formObj.addrId19.value;
            formObj.saddrtype.value = formObj.addrType19.value;
            formObj.sstreet.value = formObj.addrStreet19.value;
            formObj.scity.value = formObj.addrCity19.value;
            formObj.sstate.value = formObj.addrState19.value;
            formObj.szip.value = formObj.addrZip19.value;
            break;
        default:
            formObj.saddrid.value = "";
            formObj.saddrtype.value = "";
            formObj.sstreet.value = "";
            formObj.scity.value = "";
            formObj.sstate.value = "";
            formObj.szip.value = "";
            formObj.sstreet.focus();
            break;
    }
}

// fill destination address
function setDestinationAddress(destnAddr) {
    var formObj = destnAddr.form;
    switch (destnAddr.options[destnAddr.selectedIndex].value) {
        case '100':
            formObj.daddrid.value = "";
            formObj.daddrtype.value = "";
            formObj.dstreet.value = "";
            formObj.dcity.value = "";
            formObj.dstate.value = "";
            formObj.dzip.value = "";
            formObj.dstreet.focus();
            break;
        case '0':
            formObj.daddrid.value = formObj.addrId0.value;
            formObj.daddrtype.value = formObj.addrType0.value;
            formObj.dstreet.value = formObj.addrStreet0.value;
            formObj.dcity.value = formObj.addrCity0.value;
            formObj.dstate.value = formObj.addrState0.value;
            formObj.dzip.value = formObj.addrZip0.value;
            break;
        case '1':
            formObj.daddrid.value = formObj.addrId1.value;
            formObj.daddrtype.value = formObj.addrType1.value;
            formObj.dstreet.value = formObj.addrStreet1.value;
            formObj.dcity.value = formObj.addrCity1.value;
            formObj.dstate.value = formObj.addrState1.value;
            formObj.dzip.value = formObj.addrZip1.value;
            break;
        case '2':
            formObj.daddrid.value = formObj.addrId2.value;
            formObj.daddrtype.value = formObj.addrType2.value;
            formObj.dstreet.value = formObj.addrStreet2.value;
            formObj.dcity.value = formObj.addrCity2.value;
            formObj.dstate.value = formObj.addrState2.value;
            formObj.dzip.value = formObj.addrZip2.value;
            break;
        case '3':
            formObj.daddrid.value = formObj.addrId3.value;
            formObj.daddrtype.value = formObj.addrType3.value;
            formObj.dstreet.value = formObj.addrStreet3.value;
            formObj.dcity.value = formObj.addrCity3.value;
            formObj.dstate.value = formObj.addrState3.value;
            formObj.dzip.value = formObj.addrZip3.value;
            break;
        case '4':
            formObj.daddrid.value = formObj.addrId4.value;
            formObj.daddrtype.value = formObj.addrType4.value;
            formObj.dstreet.value = formObj.addrStreet4.value;
            formObj.dcity.value = formObj.addrCity4.value;
            formObj.dstate.value = formObj.addrState4.value;
            formObj.dzip.value = formObj.addrZip4.value;
            break;
        case '5':
            formObj.daddrid.value = formObj.addrId5.value;
            formObj.daddrtype.value = formObj.addrType5.value;
            formObj.dstreet.value = formObj.addrStreet5.value;
            formObj.dcity.value = formObj.addrCity5.value;
            formObj.dstate.value = formObj.addrState5.value;
            formObj.dzip.value = formObj.addrZip5.value;
            break;
        case '6':
            formObj.daddrid.value = formObj.addrId6.value;
            formObj.daddrtype.value = formObj.addrType6.value;
            formObj.dstreet.value = formObj.addrStreet6.value;
            formObj.dcity.value = formObj.addrCity6.value;
            formObj.dstate.value = formObj.addrState6.value;
            formObj.dzip.value = formObj.addrZip6.value;
            break;
        case '7':
            formObj.daddrid.value = formObj.addrId7.value;
            formObj.daddrtype.value = formObj.addrType7.value;
            formObj.dstreet.value = formObj.addrStreet7.value;
            formObj.dcity.value = formObj.addrCity7.value;
            formObj.dstate.value = formObj.addrState7.value;
            formObj.dzip.value = formObj.addrZip7.value;
            break;
        case '8':
            formObj.daddrid.value = formObj.addrId8.value;
            formObj.daddrtype.value = formObj.addrType8.value;
            formObj.dstreet.value = formObj.addrStreet8.value;
            formObj.dcity.value = formObj.addrCity8.value;
            formObj.dstate.value = formObj.addrState8.value;
            formObj.dzip.value = formObj.addrZip8.value;
            break;
        case '9':
            formObj.daddrid.value = formObj.addrId9.value;
            formObj.daddrtype.value = formObj.addrType9.value;
            formObj.dstreet.value = formObj.addrStreet9.value;
            formObj.dcity.value = formObj.addrCity9.value;
            formObj.dstate.value = formObj.addrState9.value;
            formObj.dzip.value = formObj.addrZip9.value;
            break;
        case '10':
            formObj.daddrid.value = formObj.addrId10.value;
            formObj.daddrtype.value = formObj.addrType10.value;
            formObj.dstreet.value = formObj.addrStreet10.value;
            formObj.dcity.value = formObj.addrCity10.value;
            formObj.dstate.value = formObj.addrState10.value;
            formObj.dzip.value = formObj.addrZip10.value;
            break;
        case '11':
            formObj.daddrid.value = formObj.addrId11.value;
            formObj.dstreet.value = formObj.addrStreet11.value;
            formObj.dcity.value = formObj.addrCity11.value;
            formObj.dstate.value = formObj.addrState11.value;
            formObj.dzip.value = formObj.addrZip11.value;
            break;
        case '12':
            formObj.daddrid.value = formObj.addrId12.value;
            formObj.dstreet.value = formObj.addrStreet12.value;
            formObj.dcity.value = formObj.addrCity12.value;
            formObj.dstate.value = formObj.addrState12.value;
            formObj.dzip.value = formObj.addrZip12.value;
            break;
        case '13':
            formObj.daddrid.value = formObj.addrId13.value;
            formObj.dstreet.value = formObj.addrStreet13.value;
            formObj.dcity.value = formObj.addrCity13.value;
            formObj.dstate.value = formObj.addrState13.value;
            formObj.dzip.value = formObj.addrZip13.value;
            break;
        case '14':
            formObj.daddrid.value = formObj.addrId14.value;
            formObj.dstreet.value = formObj.addrStreet14.value;
            formObj.dcity.value = formObj.addrCity14.value;
            formObj.dstate.value = formObj.addrState14.value;
            formObj.dzip.value = formObj.addrZip14.value;
            break;
        case '15':
            formObj.daddrid.value = formObj.addrId15.value;
            formObj.dstreet.value = formObj.addrStreet15.value;
            formObj.dcity.value = formObj.addrCity15.value;
            formObj.dstate.value = formObj.addrState15.value;
            formObj.dzip.value = formObj.addrZip15.value;
            break;
        case '16':
            formObj.daddrid.value = formObj.addrId16.value;
            formObj.dstreet.value = formObj.addrStreet16.value;
            formObj.dcity.value = formObj.addrCity16.value;
            formObj.dstate.value = formObj.addrState16.value;
            formObj.dzip.value = formObj.addrZip16.value;
            break;
        case '17':
            formObj.daddrid.value = formObj.addrId17.value;
            formObj.dstreet.value = formObj.addrStreet17.value;
            formObj.dcity.value = formObj.addrCity17.value;
            formObj.dstate.value = formObj.addrState17.value;
            formObj.dzip.value = formObj.addrZip17.value;
            break;
        case '18':
            formObj.daddrid.value = formObj.addrId18.value;
            formObj.dstreet.value = formObj.addrStreet18.value;
            formObj.dcity.value = formObj.addrCity18.value;
            formObj.dstate.value = formObj.addrState18.value;
            formObj.dzip.value = formObj.addrZip18.value;
            break;
        case '19':
            formObj.daddrid.value = formObj.addrId19.value;
            formObj.dstreet.value = formObj.addrStreet19.value;
            formObj.dcity.value = formObj.addrCity19.value;
            formObj.dstate.value = formObj.addrState19.value;
            formObj.dzip.value = formObj.addrZip19.value;
            break;
        default:
            formObj.daddrid.value = "";
            formObj.dstreet.value = "";
            formObj.dcity.value = "";
            formObj.dstate.value = "";
            formObj.dzip.value = "";
            formObj.dstreet.focus();
            break;
    }
}

function saveChanges(formObj) {
    formObj.action.value = "savechanges";
    formObj.submit();
    return true;
}
