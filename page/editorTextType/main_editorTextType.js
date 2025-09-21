var idTabActiveText = null ;

window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search) ;
    var sourcePage = urlParams.get("sourcePage") 
	var ed ; //Element de destination

    $("#spanActiveVersion").text(activeVersion) ;

    activeUser = userNull ;
	
    setKeyElemList() ;
    initTabTextType() ;
    
    $("#zoneButtBack").append(createHTMLElement("button", null, "btn-header btn-white", `leaveEditorTextType("${sourcePage}")`, "Retour")) ;

	ed = $("#keyElemSelector") ;
	for (let i = 0; i < tabKeyElem.length; i++) ed.append(createHTMLOption(tabKeyElem[i].getOptionTxt(), tabKeyElem[i].name)) ;

    writeSideMenu() ;
	if (sourcePage != "welcome" && sourcePage != "library") {writeTxt(sourcePage) ;}
}

function writeSideMenu() {
    //--Déclaration des variables lié à la manipulation HTML
	var ec ; //Elément crée
    var ecs ; //Elément crée second
    var ed ; //Elément de destination
    var eds ; //Elément de destination second
    var ided ; //ID élément de destination
    var ideds ; //ID élément de destination second

	for (let i = 0; i < tabTextType.length; i++) {
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
		eds.append(createHTMLElement("button", tabTextType[i].type+""+i, "btnSideMenu "+tempClass, "writeTxt('"+i+"')", tabTextType[i].name)) ;
	}
}

function writeTxt(idInTab) {
	var tempUpdate = "" ;
	if (tabTextType[idInTab].versionUpdate == "perso") tempUpdate = "Version personnalisée" ;
	else if (tabTextType[idInTab].versionUpdate != activeVersion) tempUpdate = "A jour de la Version "+tabTextType[idInTab].versionUpdate ;
	else tempUpdate = "A jour de la version actuelle" ;

	//---Renome le titre principale
	$("#zoneTitleEditor").text(tabTextType[idInTab].name) ;
	//---Remplis le formualire
	$("#titleTT").val(tabTextType[idInTab].name) ;
	$("#typeTT").val(tabTextType[idInTab].type) ;
	$("#categoryTT").val(tabTextType[idInTab].category) ;
	$("#subCategoryTT").val(tabTextType[idInTab].subCategory) ;
	$("#labelTT").val(tabTextType[idInTab].label) ;
	//---Ecris les différentes versions du texte
	$("#zoneVersion").text(tempUpdate) ;
	$("#zoneTextType").val(tabTextType[idInTab].getTxtTo("editor")) ;
	$("#zoneText").html(tabTextType[idInTab].getTxtTo("print")) ;
	$("#zoneTextForJS").text(tabTextType[idInTab].txt) ;

	idTabActiveText = idInTab ;
}

function addKeyElemInTxt() {
	var ed ; //Élément de destination
	var posStart ;
	var tempTxtBefore = "" ;
	var tempTxtAfter = "" ;
	var tempTxtAdd = "" ;
	var keyElemToAdd = $("#keyElemSelector").val() ;
	if (keyElemToAdd == "") showError("Vous n'avez pas sélectionné de KeyElem") ;
	else {
		ed = $("#zoneTextType")[0] ;
		posStart = ed.selectionStart ;
		tempTxtBefore = ed.value.substring(0, posStart) ;
		tempTxtAfter = ed.value.substring(ed.selectionEnd) ;
		tempTxtAdd = "<"+keyElemToAdd+">" ;
		ed.value = tempTxtBefore+tempTxtAdd+tempTxtAfter ;
		ed.selectionStart = posStart ;
		ed.selectionEnd = posStart + tempTxtAdd.length ;

		ed.focus() ;
	}
}

function modifyTextTypeInfo() {
	tabTextType[idTabActiveText].setName($("#titleTT").val()) ;
	tabTextType[idTabActiveText].setType($("#typeTT").val()) ;
	tabTextType[idTabActiveText].setCategory($("#categoryTT").val()) ;
	tabTextType[idTabActiveText].setSubCategory($("#subCategoryTT").val()) ;
	tabTextType[idTabActiveText].setLabel($("#labelTT").val()) ;
	localStorage.setItem("tabTextType", JSON.stringify(tabTextType)) ;
	console.log(localStorage.getItem("tabTextType")) ;
}

function saveNewText() {
	var tempTxt = $("#zoneTextType").val() ;
	tempTxt = tempTxt.replace(/(\r\n|\n|\r)/g, '');
	tabTextType[idTabActiveText].txt = tempTxt ;
	tabTextType[idTabActiveText].versionUpdate = "MAJ-Perso" ;

	$("#zoneTitleEditor").text(tabTextType[idTabActiveText].name+" - "+tabTextType[idTabActiveText].versionUpdate) ;
	$("#zoneText").html(tabTextType[idTabActiveText].getTxtTo("print")) ;
	$("#zoneTextForJS").text(tabTextType[idTabActiveText].txt) ;

	var idBtnTxtSideMenue = `${tabTextType[idTabActiveText].type}${idTabActiveText}`
	$(`#${idBtnTxtSideMenue}`).removeClass("WIP") ;
	$(`#${idBtnTxtSideMenue}`).addClass("majPerso") ;

	localStorage.setItem("tabTextType", JSON.stringify(tabTextType)) ;
	console.log(localStorage.getItem("tabTextType")) ;
}

function leaveEditorTextType(sourcePage) {
	localStorage.setItem("tabTextType", JSON.stringify(tabTextType)) ;
	switch (sourcePage) {
        case "welcome":
            goToWelcome()
            break;
        case "library" :
            goToLibrary('../../', null)
            break;
        default:
			goToEditor(sourcePage) ;
            console.log(`Erreur valeur switch : ${sourcePage} n'est pas définit dans le switch de la fonction onload dans main_editorTextType.js`)
            break;
    }
}

function showError(errorTxt) {console.log(errorTxt) ;}