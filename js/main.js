/*Gender : true = femme, false = homme*/
var activeText = 0 ;

function writePMOption() {
	var ec ; //Element créé
	var ed ; //Element destination

	var bodyElem = document.getElementById("body") ;
	//Vide la page web
	bodyElem.innerHTML = "" ;

	ec = document.createElement("div") ;
	ec.id = "zoneConfUser" ;
	bodyElem.appendChild(ec) ;
	for (let i = 0; i < listUser.length; i++) {addButton("user"+i, [], listUser[i].lastName, "setPMOption("+i+")","zoneConfUser") ;}

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

	addButton("writeTxt", [], "Change les paramètres", "setPMOption("+null+")", "body") ;
	addBr("body") ;
	addButton("backButt", [], "Retour", "writeButtonList()", "body") ;
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
		tabKeyElem[0].content = listUser[activeUser].firstName ;
		tabKeyElem[1].content = listUser[activeUser].lastName ;
		tabKeyElem[2].content = listUser[activeUser].work ;
		tabKeyElem[3].content = listUser[activeUser].region ; 
		tabKeyElem[4].content = listUser[activeUser].gender ;
		tabKeyElem[5].content = listUser[activeUser].gender ;
		tabKeyElem[6].content = listUser[activeUser].sign ;
	}

	writeButtonList() ;
}

function cleanLocalStorage() {
	localStorage.clear() ;
}

/*-----Fonction de navigation-----*/
function goToEditor(idTTT) {
    window.location = "../editor/editor.html?idTTT="+encodeURIComponent(idTTT) ;
}

function goToWelcome() {window.location = "../../index.html" ;}
function goToPath(from) {window.location = from+"page/path/path.html";}

/*-----Fontion outil d'ajout d'élément HTML-----*/
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
	for (let i = 0; i < style.length; i++) {
		ec.classList.add(style[i]) ;	
	}
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

/**isInTab(e, t)
 * Fonction : cherche l'élément e dans le tableau t
 * @param {*} e : élément
 * @param {*} t : tableau
 * return : true/false selon la présence de l'élément
 */
function isInTab(e, t) {
	var isIn = false ;
	var ite = 0 ;
	while (!isIn && ite < t.length) {
		if (t[ite] == e) {
			isIn = true ;
		}
		ite++ ;
	}

	return isIn ;
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