/*Gender : true = femme, false = homme*/

var tabKeyElem = [] ; //Tableau d'objet KeyElem
var tabTextType = [] ; //Tableau d'objet TextType

var activeUser = 0 ;
var activeText = 0 ;
var tabPM = [] ;

var apecGE = [
	"08","Pour l’APEC Reims : Corinne CHARTIER corinne.chartier@apec.fr",
	"10","Pour l'APEC Aube : Laurence FUSTE laurence.fuste@apec.fr",
	"51","Pour l’APEC Reims : Corinne CHARTIER corinne.chartier@apec.fr",
	"52","Pour l'APEC Aube : Laurence FUSTE laurence.fuste@apec.fr",
	"54","Pour l’APEC Lorraine : Michèle BLASZCZAK michele.blaszczak@apec.fr",
	"55","Pour l’APEC Lorraine : Michèle BLASZCZAK michele.blaszczak@apec.fr",
	"57","Pour l’APEC Moselle : Véronique PETITJEAN veronique.petitjean@apec.fr",
	"67","Pour l’APEC Bas-Rhin : Grégory JOECKLE gregory.joeckle@apec.fr",
	"68","Pour l’APEC Haut-Rhin: Franck WOOG franck.woog@apec.fr",
	"88","Pour l’APEC Lorraine : Michèle BLASZCZAK michele.blaszczak@apec.fr",
] ;

var tabText ;

function setTabPM() {
	tabPM.push(new users("Valentin", "ZEMIHI", false, "Chargé de mission", "Bourgogne Franche-Comté", "BFC")) ;
	tabPM.push(new users("Kevin", "AUBIN", false, "Chargé de mission", "Grand-Est", "GE")) ;
	tabPM.push(new users("Cannelle", "LEONARD", true, "Chargée de mission", "Grand-Est", "GE")) ;
	tabPM.push(new users("Sophie", "CORROY", false, "Chargée de mission", "Grand-Est", "GE")) ;
}

/**Paramètre la liste des boutons SMS et Mail*/
function writeButtonList() {
	var ec ; //Elément crée
	var princDiv ; //Div Principal
	var ed ; //Elément de destination

	var textNode ;
	var bodyElem = document.getElementById("body") ; 

	//Vide la variable lié au texte
	tabText = null ;

	//Vide la page web
	bodyElem.innerHTML = "" ;

	/*Crée et ajoute la zone option*/
	ec = document.createElement("div") ;
	ec.id = "zoneOption" ;
	bodyElem.appendChild(ec) ;

	//Crée et ajoute le bouton pour voir tous les éléments clés
	addLinkButton("allKeyElem", "rowBut", "Tous les éléments clés", "page/allElemKey.html?user="+encodeURIComponent(activeUser), "zoneOption") ;
	//Crée et ajoute le bouton pour modifier les informations de l'utilisateur
	addButton("changePM", "rowBut", "Paramètre utilisateur", "writePMOption()", "zoneOption") ;

	/*Crée et ajoute la zone avec les informations sur l'utilisateur*/
	ec = document.createElement("div") ;
	ec.id = "zonePM" ;
	ec.appendChild(document.createTextNode("Utilisateur actif : "+tabKeyElem[0].content+" "+tabKeyElem[1].content.toUpperCase()+" "+tabKeyElem[2].content+" "+tabKeyElem[3].content)) ;
	bodyElem.appendChild(ec) ;

	/*Crée et ajoute la zone qui va contenir la liste des boutons*/
	ec = document.createElement("div") ;
	ec.id = "zoneListButt" ;
	bodyElem.appendChild(ec) ;
	princDiv = document.getElementById("zoneListButt") ;

	//Ajoute le titre de la catégorie SMS - Jeune
	ec = document.createElement("div") ;
	ec.id = "zoneButtSMSYG" ;
	ec.className = "listBut" ;
	princDiv.appendChild(ec) ;

	ec = document.createElement("h1") ;
	textNode = document.createTextNode("SMS type - Jeune") ;
	ec.appendChild(textNode) ;
	document.getElementById("zoneButtSMSYG").appendChild(ec) ;

	//Ajoute le titre de la catégorie Mail - Jeune
	ec = document.createElement("div") ;
	ec.id = "zoneButtMailYG" ;
	ec.className = "listBut" ;
	princDiv.appendChild(ec) ;

	ec = document.createElement("h1") ;
	textNode = document.createTextNode("Mail type - Jeune") ;
	ec.appendChild(textNode) ;
	document.getElementById("zoneButtMailYG").appendChild(ec) ;

	//Ajoute le titre de la catégorie Mail - Mentor
	ec = document.createElement("div") ;
	ec.id = "zoneButtMailM" ;
	ec.className = "listBut" ;
	princDiv.appendChild(ec) ;

	ec = document.createElement("h1") ;
	textNode = document.createTextNode("Mail type - Mentor") ;
	ec.appendChild(textNode) ;
	document.getElementById("zoneButtMailM").appendChild(ec) ;

	//Ajoute le titre de la catégorie Mail - Evénement
	ec = document.createElement("div") ;
	ec.id = "zoneButtEvent" ;
	ec.className = "listBut" ;
	princDiv.appendChild(ec) ;

	ec = document.createElement("h1") ;
	textNode = document.createTextNode("Evénement") ;
	ec.appendChild(textNode) ;
	document.getElementById("zoneButtEvent").appendChild(ec) ;

	for (let i = 0; i < tabTextType.length; i++) {
		switch (tabTextType[i].type) {
			case "SMS":
				ed = "zoneButtSMS" ;
				break;
			case "Mail":
				ed = "zoneButtMail" ;
				break;
			default:
				break;
		}
		switch (tabTextType[i].target) {
			case "Jeune" :
				ed += "YG" ;
				break;
			case "Mentor" :
				ed += "M" ;
				break ;
			case "Event" :
				ed = "zoneButtEvent" ;
				break;
			default :
				break;
		}

		addLinkButton(tabTextType[i].type+""+i, "butTexType", tabTextType[i].name, "page/textEditor.html?user="+encodeURIComponent(activeUser)+"&textID="+i, ed) ;
	}
}

function writePMOption() {
	var ec ; //Element créé
	var ed ; //Element destination

	var bodyElem = document.getElementById("body") ;
	//Vide la page web
	bodyElem.innerHTML = "" ;

	ec = document.createElement("div") ;
	ec.id = "zoneConfUser" ;
	bodyElem.appendChild(ec) ;
	for (let i = 0; i < tabPM.length; i++) {addButton("user"+i, "null", tabPM[i].lastName, "setPMOption("+i+")","zoneConfUser") ;}

	addBr("body") ;

	/*Crée et ajoute le formulaire*/
	ec = document.createElement("form") ;
	ec.id = "formPM" ;
	ec.method = "get" ;
	ec.action = "" ;
	bodyElem.appendChild(ec) ;
	ed = document.getElementById("formPM") ;

	/*Crée et ajoute l'input pour le prénom*/
		//Crée et ajoute le label
	ec = document.createElement("label") ;
	ec.setAttribute("for", "PMFirstName") ;
	ec.appendChild(document.createTextNode("Prénom de l'utilisateur : ")) ;
	ed.appendChild(ec) ;
		//Crée et ajoute l'input
	ec = document.createElement("input") ;
	ec.name = "PMFirstName" ;
    ec.id = "PMFirstName" ;
    ec.type = "text" ;
    ec.placeholder = "Ex. Valentin" ;
	ed.appendChild(ec) ;

	addBr(ed.id) ;

	/*Crée et ajoute l'input pour le nom*/
		//Crée et ajoute le label
	ec = document.createElement("label") ;
	ec.setAttribute("for", "PMLastName") ;
	ec.appendChild(document.createTextNode("Nom de l'utilisateur : ")) ;
	ed.appendChild(ec) ;
		//Crée et ajoute l'input
	ec = document.createElement("input") ;
	ec.name = "PMLastName" ;
    ec.id = "PMLastName" ;
    ec.type = "text" ;
    ec.placeholder = "Ex. ZEMIHI" ;
	ed.appendChild(ec) ;

	addBr(ed.id) ;

	/*Crée et ajoute l'input pour le genre*/
		//Crée et ajoute le label
	ec = document.createElement("label") ;
	ec.setAttribute("for", "PMGender") ;
	ec.appendChild(document.createTextNode("Genre de l'utilisateur : ")) ;
	ed.appendChild(ec) ;
		//Crée et ajoute l'input Féminin
	ec = document.createElement("input") ;
	ec.name = "PMGender" ;
	ec.id = "PMGender"+"F" ;
	ec.type = "radio" ;
	ed.appendChild(ec) ;
	ec = document.createElement("label") ;
	ec.setAttribute("for", "PMGender"+"F") ;
	ec.appendChild(document.createTextNode("F")) ;
	ed.appendChild(ec) ;
		//Crée et ajoute l'input Masculin
	ec = document.createElement("input") ;
	ec.name = "PMGender" ;
	ec.id = "PMGender"+"M" ;
	ec.type = "radio" ;
	ed.appendChild(ec) ;
	ec = document.createElement("label") ;
	ec.setAttribute("for", "PMGender"+"M") ;
	ec.appendChild(document.createTextNode("M")) ;
	ed.appendChild(ec) ;
	
	addBr(ed.id) ;

	/*Crée et ajoute l'input pour le poste*/
		//Crée et ajoute le label
	ec = document.createElement("label") ;
	ec.setAttribute("for", "PMWork") ;
	ec.appendChild(document.createTextNode("Poste de l'utilisateur : ")) ;
	ed.appendChild(ec) ;
		//Crée et ajoute l'input
	ec = document.createElement("input") ;
	ec.name = "PMWork" ;
    ec.id = "PMWork" ;
    ec.type = "text" ;
    ec.placeholder = "Ex. Chargé de mission" ;
	ed.appendChild(ec) ;

	addBr(ed.id) ;

	/*Crée et ajoute l'input pour la région*/
		//Crée et ajoute le label
	ec = document.createElement("label") ;
	ec.setAttribute("for", "PMRegion") ;
	ec.appendChild(document.createTextNode("Région de l'utilisateur : ")) ;
	ed.appendChild(ec) ;
		//Crée et ajoute l'input
	ec = document.createElement("input") ;
	ec.name = "PMRegion" ;
    ec.id = "PMRegion" ;
    ec.type = "text" ;
    ec.placeholder = "Ex. Bourgogne Franche-Comté" ;
	ed.appendChild(ec) ;

	addBr(ed.id) ;

	/*Crée et ajoute l'input pour la région*/
		//Crée et ajoute le label
	ec = document.createElement("label") ;
	ec.setAttribute("for", "PMRegionShort") ;
	ec.appendChild(document.createTextNode("Région de l'utilisateur (version courte) : ")) ;
	ed.appendChild(ec) ;
		//Crée et ajoute l'input
	ec = document.createElement("input") ;
	ec.name = "PMRegionShort" ;
	ec.id = "PMRegionShort" ;
	ec.type = "text" ;
	ec.placeholder = "Ex. BFC" ;
	ed.appendChild(ec) ;

	addButton("writeTxt", null, "Change les paramètres", "setPMOption("+null+")", "body") ;
	addBr("body") ;
	addButton("backButt", null, "Retour", "writeButtonList()", "body") ;
}

function setPMOption(userSelect) {
	if(userSelect==null) {
		tabKeyElem[0].content = document.getElementById("PMFirstName").value ;
		tabKeyElem[1].content = document.getElementById("PMLastName").value ;
		tabKeyElem[2].content = document.getElementById("PMWork").value ;
		tabKeyElem[3].content = document.getElementById("PMRegion").value ;
		if (document.getElementById("PMGenderF").checked) {
			tabKeyElem[4].content = true ;
			tabKeyElem[5].content = true ;
		}
		else {
			tabKeyElem[4].content = false ;
			tabKeyElem[5].content = false ;
		}
	
		tabKeyElem[6].content = document.getElementById("PMFirstName").value+" "+document.getElementById("PMLastName").value+", "+document.getElementById("PMWork").value+" NQT "+document.getElementById("PMRegionShort").value ;
	} else {
		activeUser = userSelect ;
		tabKeyElem[0].content = tabPM[activeUser].firstName ;
		tabKeyElem[1].content = tabPM[activeUser].lastName ;
		tabKeyElem[2].content = tabPM[activeUser].work ;
		tabKeyElem[3].content = tabPM[activeUser].region ; 
		tabKeyElem[4].content = tabPM[activeUser].gender ;
		tabKeyElem[5].content = tabPM[activeUser].gender ;
		tabKeyElem[6].content = tabPM[activeUser].sign ;
	}

	writeButtonList() ;
}

function apecContent(dept) {
	var temp = null ;
    for (let i = 0; i < apecGE.length; i+=2) {
        if(dept==apecGE[i]) {temp = apecGE[i+1] ;}
	}

	if(temp == null) {alert("Les éléments de l'APEC"+dept+" n'ont pas été trouvé.") ;}

    return temp ;
}

/*-----Outil d'ajout d'élément HTML-----*/

/**
 * Fonction pour ajouter de multiple élément HTML
 * @param {*} mle : tableau avec chacun des éléments à ajouter 
 * @param {*} idMother : id de l'élément parent
 */
function addMultipleElement(mle, idMother) {
	for (let j = 0; j < mle.length; j++) {
		document.getElementById(idMother).appendChild(mle[j]) ;
	}
}

/*---Pour ajouter et créer des éléments html rapidement---*/
/*Ajoute de balise br*/
function addBr(id) {document.getElementById(id).appendChild(document.createElement("br")) ;}

/**
 * Ajoute un bouton avec ces paramètres
 * @param {*} id : l'id du bouton
 * @param {*} txt : le texte dans le bouton
 * @param {*} onClickFunc : la fonction du bouton
 * @param {*} idMother : l'id de l'élément mère
 */
function addButton(id, style, txt, onClickFunc, idMother) {
	var ec ; //Element créé

	ec = document.createElement("button") ;
	ec.id = id ;
	ec.className = style ;
	ec.appendChild(document.createTextNode(txt)) ;
	ec.setAttribute("onclick", onClickFunc) ;

	if(idMother!=null)	{document.getElementById(idMother).appendChild(ec) ;}
	return ec ;
}

/**
 * Ajoute un lien bouton avec ces paramètres :
 * @param {*} id : l'id du bouton
 * @param {*} txt : le texte dans le bouton
 * @param {*} link : le lien de la balise
 * @param {*} idMother : l'id de l'élément mère
 */
function addLinkButton(id, style, txt, link, idMother) {
	var ec ; //Element créé

	ec = document.createElement("a") ;
	ec.appendChild(addButton(id, style, txt, null, null))
	ec.href = link ;

	document.getElementById(idMother).appendChild(ec) ;
	return ec ;
}


/*-----Fonction outil-----*/
/*Fonction qui copie un texte riche en paramètre
*/
function copyFromIdToClip(divId) {
	// Sélectionnez l'élément div par son ID
	const divToCopy = document.getElementById(divId);

	// Créez une plage de texte pour copier le contenu
	const range = document.createRange();
	range.selectNode(divToCopy);
  
	// Sélectionnez le contenu de la plage de texte
	window.getSelection().removeAllRanges(); // Désélectionnez tout d'abord
	window.getSelection().addRange(range);
  
	// Copiez le contenu sélectionné
	document.execCommand('copy');
  
	// Désélectionnez le texte après la copie
	window.getSelection().removeAllRanges();
}

/**
 * Vérifie si l'objet est le tableau t
 * @param {*} t = tableau
 * @param {*} o = objet
 */
function isInTabKeyElm(t, o) {
	var isIn = false ;
	for (let k = 0; k < t.length; k++) {
		if(t[k].id == o.id ) {isIn = true ;}
	}
	return isIn ;
}