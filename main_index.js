window.onload = function () {
	//---Cherche la version active de l'utilisateur
	var userVersion = localStorage.getItem("userVersion") ;
	//---Vérifie si la version de l'utilisateur est celle du programme
		//---Si oui, cache les informations sur les mises à jour
	if (userVersion == activeVersion) showHide("zoneUpdateInfo") ;

	//---Affiche la liste des utilisateurs pré-paramètré
    setlistUser() ; //Dans users.js
	setBtnListUser() ;
}

/**setBtnListUser()
 * Affiche les boutons avec les utilisateurs pré-paramètré
 */
function setBtnListUser() {
	for (let i = 0; i < listUser.length; i++) {
		$("#zonePreSetUser").append(createHTMLElement("button", "user"+i, "btn-white", "goToLibrary('',"+i+")", listUser[i].getCompleteName())) ;
		if((i+1)%4==0) $("#zonePreSetUser").append(createHTMLBR) ;
	}
}

/**setToDefault()
 * Si la version de l'utilisateur est différente de la version du programme, change les paramètres dans le localStorage
 */
function setToDefault() {
	//---Cherche la version active de l'utilisateur
	var userVersion = localStorage.getItem("userVersion") ;

	//---Vérifie si la version de l'utilisateur est celle du programme
	if (userVersion != activeVersion) {
		//---Si oui, réinitialise les variables dans le localStorage
		//---Change la version dans le localStorage
		localStorage.setItem("userVersion", activeVersion) ;
		//---Charge le tableau de Texte Type
		setDefaultTextType() ;
		//---Change le tableau de Texte Type dans le localStorage
		localStorage.setItem("tabTextType", JSON.stringify(tabTextType)) ;	
	}

	//---Cache les informations avec l'update
	showHide("zoneUpdateInfo") ;
}