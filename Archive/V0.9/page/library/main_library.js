window.onload = function () {
    activeUser = JSON.parse(localStorage.getItem("activeUser")) ;

	setKeyElemList() ;
	setTextType() ;

	writeLibrary() ;
}

/**Paramètre la liste des boutons SMS et Mail*/
function writeLibrary() {
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

    //Ecris le nom et le prénom de l'utilisateur actif
    ed = document.getElementById("infoActiveUser") ;
    ed.appendChild(document.createTextNode(activeUser.firstName+" "+activeUser.lastName)) ;

    ed = document.getElementById("zoneLibrary") ;

    //Ajoute les div et les titres pour des parties
    for (let i = 0; i < tabFolder.length; i++) {
        ec = document.createElement("div") ;
        ec.id = "zone"+tabFolder[i] ;
        ec.className = "listBut" ;
        ecs = document.createElement("h1") ;
        ecs.appendChild(document.createTextNode(tabFolder[i])) ;
        ec.appendChild(ecs) ;
        ed.appendChild(ec) ;
    }

	for (let i = 0; i < tabTextType.length; i++) {
        if (isInTab(activeUser.shortRegion, tabTextType[i].region)) {	
            ided = "zone"+tabTextType[i].getFolder() ;
            ideds = ided+"-"+tabTextType[i].category ;
            ed = document.getElementById(ided) ;
            eds = document.getElementById(ideds) ;
            if (eds==null) {
                ec = document.createElement("div") ;
                ec.id = ideds ;
                ec.className = "listBut" ;
                ecs = document.createElement("h2") ;
                ecs.appendChild(document.createTextNode(tabTextType[i].category)) ;
                ec.appendChild(ecs) ;
                ed.appendChild(ec) ;
            }

		    addButton(tabTextType[i].type+""+i, [], tabTextType[i].name, "goToEditor('"+i+"')", ideds) ;
        }
	}
}