function clickHandler(e) {
	if(!imageSysAdmin) return true;
	var elem, evt = e ? e : event;

	if (evt.srcElement)
		elem = evt.srcElement;
	else if (evt.target)
		elem = evt.target;

	if (elem.tagName.toUpperCase() == "A") {
		if (elem.parentNode != null) {
			if (elem.parentNode.tagName.toUpperCase() == "DIV") {
//				alert('' + 'You clicked the following HTML element: \n <'
//						+ elem.parentNode.style['backgroundImage'] + '>');
			}

		}
		
	}
	else if (elem.tagName.toUpperCase() == "IMG") {
		if(elem.parentNode.tagName.toUpperCase() == "BUTTON" || elem.parentNode.tagName.toUpperCase() == "A"){
//			alert("skip");
		}else{// && imgSrc.lastIndexOf("EditLogs.png") ==-1 && imgSrc.lastIndexOf("EnterLogs.png") ==-1
			if(elem.src.indexOf("gstatic.com") <1 && elem.src.indexOf("google") <1 && elem.src.indexOf("Delete.jpg") <1   && elem.src.indexOf("EditLogs") <1  && elem.src.indexOf("EnterLogs") <1)
			{
				changeImage('header', imageSite_Id,elem.src);
			}
		}
	}

	else if (elem.tagName.toUpperCase() == "INPUT") {
		
		if(elem.type.toUpperCase()=="IMAGE"){
			changeImage('header', imageSite_Id,elem.src);
		}
		
	}
	return true;
}

//registerEventHandler(document, "click", clickHandler);

document.addEventListener("click",clickHandler);
function imageChanges() {
	
	var images = document.getElementsByTagName('img');

	for ( var image in images) {
		if(image!="length" && image!="item"){
		var imgSrc=images[image].src;
		if (typeof imgSrc != "undefined"){
		var siteId = imageSite_Id;
		if(imgSrc.lastIndexOf("includes/images")!=-1 && imgSrc.lastIndexOf("MapLocation.png")==-1&& imgSrc.lastIndexOf("MapRelocation.png")==-1 && imgSrc.lastIndexOf("gstatic")==-1 
				&& imgSrc.lastIndexOf("google")==-1 && imgSrc.lastIndexOf("Delete.jpg")==-1&& imgSrc.lastIndexOf("/cms-skip/")==-1 && imgSrc.lastIndexOf("EditLogs.png") == -1 && imgSrc.lastIndexOf("EnterLogs.png") == -1){

		imgSrc=imgSrc.replace("includes/images","includes/images/"+siteId);
		images[image].src=imgSrc;}}
		}
		//.getAttribute("src")
	}
	
	inputImageChanges();
}

function inputImageChanges(){
	var images = document.getElementsByTagName('input');
	for ( var image in images) {
		if(image!="length" && image!="item" && (typeof images[image].type != "undefined")){
			if(images[image].type.toUpperCase()=="IMAGE"){
				var imgSrc=images[image].src;
				
				var siteId = imageLoginStatus;
				if(imgSrc.lastIndexOf("includes/images")!=-1){
				imgSrc=imgSrc.replace("includes/images","includes/images/"+siteId);
				images[image].src=imgSrc;}
				}
				//.getAttribute("src")
				
			}
	}
	
}
