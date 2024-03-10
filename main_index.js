var activeVersion = "majBetaV0.6.1" ;

window.onload = function () {
	var updateRead = localStorage.getItem("updateRead") ;

	if (updateRead == activeVersion) {
		hideUpdateInfo() ;
	}

    setlistUser() ;
	setButtonWelcome() ;
}

function setButtonWelcome() {
	for (let i = 0; i < listUser.length; i++) {
		addButton("user"+i, ["btn-white"], listUser[i].getCompleteName(), "goToLibrary("+i+")", "zonePreSetUser") ;
		if((i+1)%4==0) {addBr("zonePreSetUser") ;}
	}
}

function goToLibrary(user) {
	if (user == "newUser") {activeUser = createNewUser() ;}
	else {activeUser = listUser[user] ;}
	localStorage.setItem("activeUser", JSON.stringify(activeUser)) ;
	window.location = "page/library/library.html" ;
}

function showUpdateInfo() {
	var etm ; //Element to modify
	etm = document.getElementById("zoneUpdateInfo") ;
	etm.classList.remove("hide") ;
}

function hideUpdateInfo() {
	var etm ; //Element to modify
	etm = document.getElementById("zoneUpdateInfo") ;
	etm.classList.add("hide") ;
	localStorage.setItem("updateRead", activeVersion) ;
}