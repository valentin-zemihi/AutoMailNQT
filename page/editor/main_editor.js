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

	writeSide() ;
    writeForm() ;
	writeObj() ;
    writeTxt() ;
}

function writeSide() {
	//--Déclaration des variables lié à la manipulation HTML
	var ec ; //Elément crée
    var ecs ; //Elément crée second
    var ed ; //Elément de destination
    var eds ; //Elément de destination second
    var ided ; //ID élément de destination
    var ideds ; //ID élément de destination second
	
	var tempClass ;

	for (let i = 0; i < tabTextType.length; i++) {
		if (isInTabByAttr(tabTextType[i].region, activeUser.shortRegion, null)) {
			ided = "zone"+tabTextType[i].getFolder() ;
			ed = $("#"+ided) ;
			if (ed.length==0) {
				let folderName = tabTextType[i].getFolder() ;
				ec = createHTMLElement("div", "zone"+folderName, null, null, null) ;
				ecs = createHTMLElement("div", "zoneTitle"+folderName, "folderSideMenu", null, null) ;
				ecs.append(createHTMLElement("button", "btnZone"+folderName, "btn-white btnSideMenu", "showHideSideBtn('"+folderName+"')", "+")) ;
				ecs.append(createHTMLElement("h1", null, "sideMenuTitle", null, folderName)) ;
				ec.append(ecs) ;
				ec.append(createHTMLElement("div", "zoneBtn"+folderName, "hide", null, null)) ;
				$("#zoneSideMenu").append(ec) ;
			}

			ided = "zoneBtn"+tabTextType[i].getFolder() ;
			ed = $("#"+ided) ;
			ideds = ided+"-"+tabTextType[i].getCategoryFolder() ;
			eds = $("#"+ideds) ;
			if (eds.length==0) {
				ec = createHTMLElement("div", ideds, "listBut sideMenuListBtn", null, null) ;
				ec.append(createHTMLElement("h2", null, "sideMenuTitle", null, tabTextType[i].category)) ;
				ed.append(ec) ;
				eds = $("#"+ideds) ;
			}

			tempClass = tabTextType[i].getClassBtn() ;
			if (tempClass == "") tempClass = "btn-white" ;
			eds.append(createHTMLElement("button", tabTextType[i].type+""+i, "btnSideMenu "+tempClass, "goToEditor('"+i+"')", tabTextType[i].name)) ;
		}
	}
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