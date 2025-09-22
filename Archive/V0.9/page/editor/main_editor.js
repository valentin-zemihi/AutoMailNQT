window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search) ;

	activeUser = JSON.parse(localStorage.getItem("activeUser")) ;
	//Ecris le nom et le prénom de l'utilisateur actif
	ed = document.getElementById("infoActiveUser") ;
	ed.appendChild(document.createTextNode(activeUser.firstName+" "+activeUser.lastName)) ;
	
    setKeyElemList() ;
    setTextType() ;
	activeText = tabTextType[urlParams.get("idTTT")] ;

	writeSide() ;
    writeForm() ;
	writeObj() ;
    writeTxt() ;
}

function writeSide() {
	//Déclaration des variables lié à la manipulation HTML
	var ec ; //Elément crée
    var ecs ; //Elément crée second
    var ed ; //Elément de destination
    var eds ; //Elément de destination second
    var ided ; //ID élément de destination
    var ideds ; //ID élément de destination second

    //Déclaration des variables structurelles
    var tabFolder = [];

    //Initialise les variables structurelles
    for (let i = 0; i < tabTextType.length; i++) {
		if (isInTab(activeUser.shortRegion, tabTextType[i].region)) {		
	       	if (!isInTab(tabTextType[i].getFolder(), tabFolder)) {
            	tabFolder.push(tabTextType[i].getFolder()) ;
        	}
		}
    }

    ed = document.getElementById("zoneSideMenu") ;

    //Ajoute les div et les titres pour des parties
    for (let i = 0; i < tabFolder.length; i++) {
		//Crée la div contenant le dossier
        ec = document.createElement("div") ;
        ec.id = "zone"+tabFolder[i] ;
		//Ajouter le dossier au sideMenu
		ed.appendChild(ec) ;
		
		//Ajoute les éléments du titre
		ed = document.getElementById("zone"+tabFolder[i]) ;
		//Crée la div contenant le tire
		ec = document.createElement("div") ;
		ec.id = "zoneTitle"+tabFolder[i] ;
		ec.className = "folderSideMenu" ;
		//Crée le bouton pour dévoiler les boutons
		ecs = document.createElement("button") ;
		ecs.id = "btnZone"+tabFolder[i] ;
		ecs.classList.add("btn-white", "btnSideMenu")
		ecs.setAttribute("onclick", "show('"+tabFolder[i]+"')");
		ecs.appendChild(document.createTextNode("+")) ;
		//Ajoute le bouton dans la zone titre
		ec.appendChild(ecs) ;
		//Crée le titre du dossier
        ecs = document.createElement("h1") ;
		ecs.className = "folderTitle" ;
        ecs.appendChild(document.createTextNode(tabFolder[i])) ;
		//Ajoute le titre au dossier dans la zone titre
        ec.appendChild(ecs) ;
		//Ajoute la zone titre à la zone dossier
		ed.appendChild(ec) ;

		//Ajoute la zone des boutons
		ec = document.createElement("div") ;
		ec.id = "zoneBtn"+tabFolder[i] ;
		ec.classList.add("hide") ;
        ed.appendChild(ec) ;
    }

	for (let i = 0; i < tabTextType.length; i++) {
		if (isInTab(activeUser.shortRegion, tabTextType[i].region)) {
       		ided = "zoneBtn"+tabTextType[i].getFolder() ;
       		ideds = ided+"-"+tabTextType[i].category ;
       		ed = document.getElementById(ided) ;
       		eds = document.getElementById(ideds) ;
       		if (eds==null) {
       		    ec = document.createElement("div") ;
       		    ec.id = ideds ;
       		    ec.className = "listBut" ;
       		    ecs = document.createElement("h2") ;
				ecs.className = "categoryTitle" ;
       		    ecs.appendChild(document.createTextNode(tabTextType[i].category)) ;
       		    ec.appendChild(ecs) ;
       		    ed.appendChild(ec) ;
       		}

				addButton(tabTextType[i].type+""+i, ["btn-white", "btnSideMenu"], tabTextType[i].name, "goToEditor('"+i+"')", ideds) ;
		}
	}
}

function writeForm() {
	var tabText = activeText.txt ;

	var ec ; //Element créé
	var mle = [] ; //Multiple Ligne Element
    var de = document.getElementById("zoneForm") ; //Destination Element

	//Stock chaque donnée nécessaire 1 fois :
	//Cette étape évite les répétitions dans les informations demandées.
	var tabElemAsk = [];
	//Parcour le tableau texte pour pour récupérer chaque KeyElem
	for (let i = 0; i < tabText.length; i++) {
		//Pour chaque cellule du tabText vérifie s'il s'agit d'un KeyElm en parcourant la liste des KeyElems
		for (let j = 0; j < tabKeyElem.length; j++) {
			//Vérifie si le nom du KeyElem est le même que celui dans la cellule texte et que le KeyElem n'est pas une constante ou un tag
			if(tabText[i] == tabKeyElem[j].name && tabKeyElem[j].type!="const" && tabKeyElem[j].type!="tag") {
				//Vérfie si l'id KeyElem est déjà dans le tableau
				if(!isInTabKeyElm(tabElemAsk, tabKeyElem[j])){tabElemAsk[tabElemAsk.length] = tabKeyElem[j] ;}
			}
		}
	}
	
	//Ajoute l'élément Form
	ec = document.createElement("form") ;
	ec.id = "formText" ;
	ec.method = "get" ;
	ec.action = "" ;
	de.appendChild(ec) ;

	for (let i = 0; i < tabElemAsk.length; i++) {
		mle = tabElemAsk[i].writeInputMode() ;
		addMultipleElement(mle, "formText") ;
		addBr("formText") ;
	}

	addButton("writeTxt", [], "Ecrire le texte", "writeTxt()", "zoneForm") ;
}

function writeObj() {
	if (activeText.obj == null) {
		etm = document.getElementById("zoneObj") ;
		etm.classList.add("hide") ;
		etm = document.getElementById("zoneBtnCopyObj") ;
		etm.classList.add("hide") ;
	} else {
		document.getElementById("zoneObj").appendChild(document.createTextNode(activeText.obj))
	}
}

function writeTxt() {
	var motherDE = document.getElementById("zoneTxt") ;
    var ec ; //Element créer
	var etm ; //Element to modify

	var de = [] ; //Tableau des éléments de destination : stock en cascade les élements parents et enfants. Le dernier élément est l'actif : Celui dans lesquels les cellules du tableau texte sont ajoutés.
	var deNB = 0 ; //Numéro de la cellule avec l'élément en cours dans le tableau des éléments destinations

	//Variable outil pour la boucle de vérification des KeyElem
	var isElemKey ; //Retient si la cellule du tableau texte est un KeyElem
	var idElmKey ;	//Retient le numéro de la cellule contenant le KeyElem
	var value ;

	var tabText = activeText.txt ;

	//Paramètre le premier élément accueillant le texte
	de[deNB] = document.createElement("div") ;
	de[deNB].id = "copyText" ;

	//Crée le texte, le style et les KeyElem
	for (let i = 0; i < tabText.length; i++) {
		value = false ;
		isElemKey = false ;
		for (let j = 0; j < tabKeyElem.length; j++) {
			if(tabText[i]==tabKeyElem[j].name) {isElemKey = true ; idElmKey = j ;}
		}

		if(isElemKey) {
			value = tabKeyElem[idElmKey].getValue() ;

			switch (value) {
				case false:
					//Ne fait rien
					break;
                case null :
                    ec = document.createElement("span") ;
                    ec.appendChild(document.createTextNode("["+tabKeyElem[idElmKey].name+"]")) ;
                    de[deNB].appendChild(ec) ;
                    break ;
				case "ul" :
				case "li" :
				case "strong" :
					deNB += 1 ;
					de[deNB] = document.createElement(value);
					break ;
				case "end" :
					de[deNB-1].appendChild(de[deNB]) ;
					deNB -= 1 ;
					break ;
				case "next" :
					if (!document.getElementById(tabKeyElem[idElmKey].id+"Y").checked) {i += tabText[i+1] ;}
					i++ ;
					break ;
				case "if" :
					if(tabText[i+1]!=document.getElementById(tabKeyElem[idElmKey].id).value) {
						i += tabText[i+2] ;
					}
					i+=2 ;
					break ;
				default:
					de[deNB].appendChild(document.createTextNode(value)) ;
					break;
			}
		}
		else if (tabText[i] == "br") {
			de[deNB].appendChild(document.createElement("br")) ;
		}
		else {de[deNB].appendChild(document.createTextNode(tabText[i])) ;}
	}

    //Vide la zone
    motherDE.innerHTML = "" ;
	//Ajoute le texte
	motherDE.appendChild(de[deNB]) ;
}

function show(id) {
	var etm ; //Element to modify
	etm = document.getElementById("zoneBtn"+id) ;
	etm.classList.remove("hide") ;

	etm = document.getElementById("btnZone"+id) ;
	etm.innerHTML = "-" ;
	etm.setAttribute("onclick", "hide('"+id+"')") ;
}

function hide(id) {
	var etm ; //Element to modify
	etm = document.getElementById("zoneBtn"+id) ;
	etm.classList.add("hide") ;

	etm = document.getElementById("btnZone"+id) ;
	etm.innerHTML = "+" ;
	etm.setAttribute("onclick", "show('"+id+"')") ;
}