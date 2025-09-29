var idTabActiveText = null ;

window.onload = function () {
	var urlParams = new URLSearchParams(window.location.search) ;
    var sourcePage = urlParams.get("sourcePage") ;

    $("#spanActiveVersion").text(activeVersion) ;

    activeUser = userNull ;
	
    setKeyElemList() ;
    initTabTextType() ;
    
    $("#zoneButtBack").append(createHTMLElement("button", null, "btn-header btn-white", `leaveEditorTextType("${sourcePage}")`, "Retour")) ;

	for (let i = 0; i < tabKeyElem.length; i++) {
		$("#keyElemSelector").append(createHTMLOption(tabKeyElem[i].getOptionTxt(), tabKeyElem[i].name)) ;

		//---Vérifie s'il n'existe pas de zone pour l'usage du KeyElem
		if ($(`#zone${tabKeyElem[i].use}`).length <= 0) {
			//---Si vrai, ajoute une div pour l'usage du KeyElem
			$("#zoneListKeyElem").append(createHTMLElement("p", `useTitle${tabKeyElem[i].use}`, null, null, tabKeyElem[i].useTitle)) ;
			$("#zoneListKeyElem").append(createHTMLElement("div", `zone${tabKeyElem[i].use}`, "hidden", null, null)) ;
			$(`#useTitle${tabKeyElem[i].use}`).prepend(createHTMLButton(`btnShowHide${tabKeyElem[i].use}`, "btn-Ltl", `setDivVisibilityByButt("btnShowHide${tabKeyElem[i].use}", "zone${tabKeyElem[i].use}", ${null})`, null, "+")) ;
		}

		$(`#zone${tabKeyElem[i].use}`).append(createHTMLButton("btn"+tabKeyElem[i].name, "btnForm", `addKeyElemInTxt("${tabKeyElem[i].name}")`, null, tabKeyElem[i].getOptionTxt())) ;
	}

    writeSideMenu("editorTextType") ;
	if (sourcePage != "welcome" && sourcePage != "library") {writeTxt(sourcePage) ;}
}

function writeTxt(idInTab) {
	var tempUpdate = "" ;
	if (tabTextType[idInTab].versionUpdate == "perso") tempUpdate = "Version personnalisée" ;
	else if (tabTextType[idInTab].versionUpdate != activeVersion) tempUpdate = "A jour de la Version "+tabTextType[idInTab].versionUpdate ;
	else tempUpdate = "A jour de la version actuelle" ;

	//---Renome le titre principale
	$("#zoneTitleEditor").text(tabTextType[idInTab].name) ;
	//---Remplis le formualire
	$("#nameTT").val(tabTextType[idInTab].name) ;
	$("#targetTT").val(tabTextType[idInTab].target) ;
	$("#regionTT").val(tabTextType[idInTab].region	) ;
	$("#typeTT").val(tabTextType[idInTab].type) ;
	$("#categoryTT").val(tabTextType[idInTab].category) ;
	$("#subCategoryTT").val(tabTextType[idInTab].subCategory) ;
	$("#labelTT").val(tabTextType[idInTab].label) ;
	$("#objectTT").val(tabTextType[idInTab].obj) ;

	//---Ecris les différentes versions du texte
	$("#zoneVersion").text(tempUpdate) ;
	$("#zoneTextType").val(tabTextType[idInTab].getTxtTo("editor")) ;
	$("#zoneText").html(tabTextType[idInTab].getTxtTo("print")) ;
	$("#zoneTextForJS").text(tabTextType[idInTab].txt) ;
	$("#zoneObjectJs").text(tabTextType[idInTab].saveJs()) ;

	idTabActiveText = idInTab ;
}

function addKeyElemInTxt(val) {
	var ed ; //Élément de destination
	var posStart ;
	var tempTxtBefore = "" ;
	var tempTxtAfter = "" ;
	var tempTxtAdd = "" ;
	ed = $("#zoneTextType")[0] ;
	posStart = ed.selectionStart ;
	tempTxtBefore = ed.value.substring(0, posStart) ;
	tempTxtAfter = ed.value.substring(ed.selectionEnd) ;
	tempTxtAdd = "<"+val+">" ;
	ed.value = tempTxtBefore+tempTxtAdd+tempTxtAfter ;
	ed.selectionStart = posStart ;
	ed.selectionEnd = posStart + tempTxtAdd.length ;
	ed.focus() ;
}

function modifyTextTypeInfo() {
	tabTextType[idTabActiveText].setName($("#nameTT").val()) ;
	tabTextType[idTabActiveText].setType($("#typeTT").val()) ;
	tabTextType[idTabActiveText].setCategory($("#categoryTT").val()) ;
	tabTextType[idTabActiveText].setSubCategory($("#subCategoryTT").val()) ;
	tabTextType[idTabActiveText].setLabel($("#labelTT").val()) ;
	localStorage.setItem("tabTextType", JSON.stringify(tabTextType)) ;
	console.log(localStorage.getItem("tabTextType")) ;
}

function saveNewText() {
	var newTextType = [] ;

	var tempTxt = $("#zoneTextType").val() ;
	if (idTabActiveText != null) {
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
	} else {
		//new TextType(name, target, region, type, category, subCategory, label, obj, txt, versionUpdate)
		newTextType[0] = $("#nameTT").val() ;
		newTextType[1] = $("#targetTT").val() ;
		newTextType[2] = [$("#regionTT").val()] ;
		newTextType[3] = $("#typeTT").val() ;
		newTextType[4] = $("#categoryTT").val() ;
		newTextType[5] = $("#subCategoryTT").val() ;
		newTextType[6] = $("#labelTT").val() ;
		newTextType[7] = $("#objectTT").val() ;
		newTextType[8] = tempTxt.replace(/(\r\n|\n|\r)/g, '') ;
		newTextType[9] = "MAJ-Perso" ;
		tabTextType.push(new TextType(...newTextType)) ;
	}

	//---Mets à jours les éléments de la page
	localStorage.setItem("tabTextType", JSON.stringify(tabTextType)) ;	
	writeSideMenu("editorTextType") ;
	idTabActiveText = tabTextType.length - 1 ;
	writeTxt(idTabActiveText) ;
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