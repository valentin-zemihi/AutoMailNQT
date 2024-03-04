window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search) ;
    activeUser = urlParams.get("user") ;
    activeText = urlParams.get("textID") ;

    setTabPM() ;
    setKeyElemList() ;
    setTextType() ;

    setForm() ;
    writeTxt() ;

    addButton("copyTxt", null, "Copier le texte", "copyFromIdToClip('copyText')", "zoneButtCopy") ;

    addLinkButton("backButt", null, "Retour", "../index.html", "body") ;
}

function setForm() {
	tabText = tabTextType[activeText].txt ;

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
				if(!isInTabKeyElm(tabElemAsk, tabKeyElem[j])){tabElemAsk[tabElemAsk.length] = tabKeyElem[j];}
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

	addButton("writeTxt", null, "Ecris le texte", "writeTxt()", "zoneForm") ;
}

function writeTxt() {
	//Variable outil pour la boucle de vérification des KeyElem
	var isElemKey ; //Retient si la cellule du tableau texte est un KeyElem
	var idElmKey ;	//Retient le numéro de la cellule contenant le KeyElem
	var value ;

    var motherDE = document.getElementById("zoneTxt") ;
    var ec ; //Element create

	var de = [] ; //Tableau des éléments de destination : stock en cascade les élements parents et enfants. Le dernier élément est l'actif : Celui dans lesquels les cellules du tableau texte sont ajoutés.
	var deNB = 0 ; //Numéro de la cellule avec l'élément en cours dans le tableau des éléments destinations

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
					if (!document.getElementById(tabKeyElem[idElmKey].id+"Y").checked) {
						i += tabText[i+1] ;
					}
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