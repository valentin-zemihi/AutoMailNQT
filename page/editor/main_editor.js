//https://www.movix.site/movie/20662

window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search) ;

    $("#spanActiveVersion").text(activeVersion) ;

	activeUser = JSON.parse(localStorage.getItem("activeUser")) ;
	//---Ecris le nom et le prénom de l'utilisateur actif
	ed = document.getElementById("infoActiveUser") ;
	ed.appendChild(document.createTextNode(activeUser.firstName+" "+activeUser.lastName)) ;
	
	setKeyElemList() ;
	initTabTextType() ;

	var idTxtInTab = urlParams.get("idTTT") ;
	activeText = tabTextType[idTxtInTab] ;
	$("#btnChangeUser").after(createHTMLElement("button", null, "btn-header btn-white", `goToEditorTextType('../../', ${idTxtInTab})`, "Éditer le texte"))

	$("#zoneTitleEditor").text(activeText.name) ;

	if (activeText.versionUpdate != null) $("#zoneUpdate").text(`Texte Type à jour de la version : ${activeText.versionUpdate}`) ;

	writeSideMenu("editor") ;
    writeForm() ;
	writeObj() ;
    writeTxt() ;
}

function writeForm() {
	var mle = [] ; //Multiple Ligne Element
    var de = $("#zoneForm") ;

	//--Initialise le tableau avec les KeyElem du texte
	var tabElemAsk = activeText.getKeyElemInTxt() ;
	
	//--Crée ajoute l'élément Form
	de.append(createHTMLForm("formText", null, "get", "")) ;
	
	for (let i = 0; i < tabElemAsk.length; i++) {
		if (tabElemAsk[i].type != "const" && tabElemAsk[i].type != "tag") {
			mle = tabElemAsk[i].writeInputMode() ;
			addMultipleElement(mle, "formText") ;
			addBr("formText") ;	
		}
	}

	de.append(createHTMLElement("button", "writeTxt", null, "writeTxt()", "Ecrire le texte")) ;
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
	var ed = createHTMLElement("div", "copyText", null, null, null)
	var motherDE = $("#zoneTxt") ;

	ed.html(activeText.getTxtTo("copy")) ;

	motherDE.empty() ;
	motherDE.append(ed) ;
}