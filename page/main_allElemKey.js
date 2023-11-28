window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search) ;
    activeUser = urlParams.get("user") ;

    setTabPM() ;
    setKeyElemList() ;

	writeAllKeyElem() ;
}

function writeAllKeyElem() {
	var ec ; //Element créé
	var mle = [] ; //Multiple Ligne Element

	var bodyElem = document.getElementById("body") ;

	//Ajoute l'élément Form
	ec = document.createElement("form") ;
	ec.id = "formText" ;
	ec.method = "get" ;
	ec.action = "" ;
	bodyElem.appendChild(ec) ;

	for (let i = 0; i < tabKeyElem.length; i++) {
		mle = tabKeyElem[i].writeInputMode() ;
		ec = document.createElement("label") ;
	    ec.setAttribute("for", tabKeyElem[i].id) ;
	    ec.appendChild(document.createTextNode(tabKeyElem[i].name+" - ")) ;
		mle.unshift(ec) ;
		addMultipleElement(mle, "formText") ;
		addBr("formText") ;
	}

	addLinkButton("backButt", null, "Retour", "../index.html", "body") ;
}