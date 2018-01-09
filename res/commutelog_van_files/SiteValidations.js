/* global WYSIWYG */

function changeImage(imageId, siteId, imgSrc) {
    var w = 800;
    var h = 500;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    return window.open("ADMImageChanger.jsp?imageId=" + imageId + "&siteId=" + siteId + "&imgSrc=" + imgSrc, "Window1", 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
//    return window.open("DownloadImages.jsp", "Window1", 'scrollbars=yes, width='+w+', height='+h+', top='+top+', left='+left);
}

function updateNewImage(orgImgName, form, siteId, imagePlace, imageName) {
    form.siteId.value = siteId;
    form.imagePlace.value = imagePlace;
    form.imageName.value = imageName;
    form.orgImgName.value = orgImgName;
    form.encoding = "application/x-www-form-urlencoded";
    form.submit();
    window.alert("Updating Image ");
//    window.close();
    return true;
}

function updateUploadedImage(orgImgName, form, siteId, imagePlace) {
    form.siteId.value = siteId;
    form.imagePlace.value = imagePlace;
    form.imageName.value = orgImgName;
    form.orgImgName.value = orgImgName;
    form.action.value = "";
    var i = 0;

    //form.action.value="updatImage";
    document.getElementById("action").value = "updatImage";

//    window.alert(siteId+imagePlace+orgImgName+orgImgName+form.action.value);
    form.submit();
//    while(i<10000){
//      i++;
//    }
    window.alert("Uploading Image....");

//    window.close();
    return true;
}

function saveCMSMessage(formObj) {
    WYSIWYG.updateTextArea("textarea2");
    if (formObj.idscreen.value == "") {
        alert("Please select the id screen");
        formObj.idscreen.focus();
        return false;
    } else {
        formObj.action.value = "updateCMSMessage";
        formObj.submit();
        return true;
    }
}

function searchMiniSites(formObj) {
    if ((formObj.empId.value == "") || (formObj.empId.value == null)) {
        if ((formObj.empName.value == "") || (formObj.empName.value == null)) {
            alert("You must enter either Employer ID or Name to continue.");
            formObj.empId.focus();
            return false;
        }
    } else {
        if (isNaN(formObj.empId.value)) {
            alert("Please enter a valid Employer ID (numerics only).");
            formObj.empId.focus();
            return false;
        }
    }
    document.getElementById("action").value="searchminisites";
    formObj.submit();
    return true;
}
