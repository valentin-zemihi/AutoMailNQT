window.onload = function () {
    //---Initialise les variables
    activeUser = JSON.parse(localStorage.getItem("activeUser")) ; //Utiliser dans setKeyElemList() ;

    setKeyElemList() ;
    initTabTextType() ;

    //---Ecris les information de la page
        //---Ecris le nom et le prénom de l'utilisateur actif
    $("#infoActiveUser").text(activeUser.firstName+" "+activeUser.lastName) ;
        //---Ecris la vestion active sur le site internet
    $("#spanActiveVersion").text(activeVersion) ;

	writeLibrary() ;  
}

/**Paramètre la liste des boutons SMS et Mail*/
function writeLibrary() {
    //---Déclaration des variables lié à la manipulation HTML
	var ec ; //Elément crée
    var ecd ; //Elément crée fille
    var ided ; //ID élément de destination
    var idedC ; //ID élément de destination Category
    var idedSC ; //ID élément de destination Sous-Category
    var tempClass ;
    var tempText ;

    var useBackB = false ; //Alterne entre true et false à chaque dossier pour changer la couleur du fond

    //---Parcours la liste des TextType pour ajouter un bouton correspondant :
	for (let i = 0; i < tabTextType.length; i++) {
        let isIn = activeUser.shortRegion.some( region =>tabTextType[i].region.includes(region) );

        //---Test si la région de l'utilisateur est dans la liste des régions du texte ;
        if (isIn) {
            //---Si oui :
            //---Initialise les identifiants des éléments de destiation
                //---Initialise l'identifiant avec la zone liée au dossier correspondant
            ided = "zone"+tabTextType[i].getFolder() ;
                //---Initialise l'identifiant avec la zone liée à la catégorie dans le dossier correspondant ;
            idedC = ided+"-"+tabTextType[i].getCategoryFolder() ;
                //---Initialise l'identifiant avec la zone liée à la sous-catégorie dans la catégorie du dossier corrsepondant ;
            idedSC = idedC+"-"+tabTextType[i].getSubCategoryFolder() ;

            //---Test si la zone pour le dossier de ce TextType n'existe pas
            if ($("#"+ided).length == 0) {
                //---Si oui :
                //---Crée et ajoute la la zone de ce dossier
                tempClass = "" ;
                if (useBackB) {
                    tempClass = " backB" ;
                    useBackB = false    
                } else {useBackB = true ;}
                ec = createHTMLElement("h1", null, "titleFolder"+tempClass, null, tabTextType[i].getFolder()) ;
                ec.prepend(createHTMLButton(`btnVisibilty${tabTextType[i].getFolder()}`, "btn-Ltl btnBlue btn-orange", `setDivVisibilityByButt("btnVisibilty${tabTextType[i].getFolder()}", "zone${tabTextType[i].getFolder()}", null)`, null, "-")) ;
                $("#zoneLibrary").append(ec) ;
                $("#zoneLibrary").append(createHTMLElement("div", `zone${tabTextType[i].getFolder()}`, "folder"+tempClass, null, null)) ;
            }

            //---Test si la zone pour cette catégorie de TextType n'existe pas
            if ($("#"+idedC).length==0) {
                //---Si oui :
                //---Crée et ajoute la la zone de cette catégorie
                tempClass = "" ;
                if (idedC == "zoneMail-Mentor-Miseenmentorat" || idedC == "zoneMail-Jeune-Accueil") {tempClass = " large" ;}
                ec = createHTMLElement("div", idedC, "categoryFolder"+tempClass, null, null) ;
                ecd = createHTMLElement("div", null, null, null, null) ;
                ecd.append(createHTMLElement("h2", null, "titleCategoryFolder", null, tabTextType[i].category)) ;
                ec.append(ecd) ;
                ec.append(createHTMLElement("div", idedC+"ZoneCard", "zoneCard", null, null)) ;
                $("#"+ided).append(ec) ;
            }

            //---Test si la zone pour cette sous-catégorie de TextType n'existe pas
            if ($("#"+idedSC).length==0) {
                //---Si oui :
                //---Crée et ajoute la la zone de cette catégorie
                ec = createHTMLElement("div", idedSC, "cardTextType", null, null) ;
                ec.append(createHTMLElement("h3", null, "titleCard", null, tabTextType[i].subCategory)) ;
                $(`#${idedC}ZoneCard`).append(ec) ;
            }

            //---Crée et ajoute le bouton dans la zone de la catégorie
            tempClass = tabTextType[i].getClassBtn() ;
            if (activeUser.shortRegion.length > 1 && tabTextType[i].region.length <= 1) tempText = `${tabTextType[i].region[0]} - ${tabTextType[i].label}` ;
            else tempText = tabTextType[i].label ;
            $("#"+idedSC).append(createHTMLElement("button", tabTextType[i].type+""+i, "btnTextType "+tempClass, "goToEditor('"+i+"')", tempText)) ;
        }
	}
}