/***Fonction de recherche dans un tableau***/

/**getIdInTabByObjAttr(tab, elem, attr) :
 * Retourne la position dans le tableau tab de l'objet ayant pour attribut attr l'élément elem
 * @param {Array} tab : tableau contenant l'objet à trouver ;
 * @param {*} elem : carctéristique de l'objet à trouver ;
 * @param {String} attr : attribut à comparer pour le test :
 * @returns retourne l'objet trouver ou null ;
 */
function getIdInTabByObjAttr(tab, elem, attr) {
	var isFound = false ;
	var iteLoop = 0 ;
	var pos = null ;
	while (!isFound && iteLoop < tab.length) {
		switch (attr) {
			case "name" :
				if(tab[iteLoop].name == elem) {
					isFound = true ;
					pos = iteLoop ;
				}
				break;
			case "id" :
				if(tab[iteLoop].id == elem) {
					isFound = true ;
					pos = iteLoop ;
				}
				break ;
			case "name+target+type" :
				if (tab[iteLoop].name+tab[iteLoop].target+tab[iteLoop].type == elem) {
					isFound = true ;
					pos = iteLoop ;
				}
				break ;
			default:
				console.log(attr+" n'est pas paramètré dans le switch de getIdInTabByObjAttr() dans toolsArray.js")
				break;
		}
		iteLoop++ ;
	}
	return pos ;
}

/**getObjInTabByAttr(tab, elem, attr) :
 * Cherche dans le tableau tab l'objet qui a pour attribut attr l'élément elem
 * @param {Array} tab : tableau contenant l'objet à trouver ; 
 * @param {*} elem : carctéristique de l'objet à trouver ;
 * @param {String} attr : attribut à comparer pour le test :
 * @returns retourne l'objet trouver ou null ;
 */
function getObjInTabByAttr(tab, elem, attr) {
	var isFound = false ;
	var iteLoop = 0 ;
	var obj = null ;
	while (!isFound && iteLoop < tab.length) {
		switch (attr) {
			case "name" :
				if(tab[iteLoop].name == elem) {
					isFound = true ;
					obj = tab[iteLoop] ;
				}
				break;
			case "id" :
				if(tab[iteLoop].id == id) {
					isFound = true ;
					obj = tab[iteLoop] ;
				}
				break ;
			default:
				console.log(attr+" n'est pas paramètré dans le switch de getObjInTabByAttr() dans toolsArray.js")
				break;
		}
		iteLoop++ ;
	}
	return obj ;
}

/** countAttrTab(attr, tab)
 * Desc : Compte le nombre d'occurrence d'un résultat de l'attribut attr des objets dans le tableau tab.
 * @param {string} attr : nom de l'attribut testter dans l'objet.
 * @returns retourne le tableau avec en 0 le résultat et en 1 le nombre d'occurrence. 
 */
function countAttrTab(attr, tab) {
	var temp = [[]] ;
	var temp2 ;

	var test ; //Variable recevant l'attribut à compter.
	var tabTest = tab ; //tableau à examiner.

	var iteLoop ;
	var isIn ;

	for (let i = 0; i < tab.length; i++) {
		iteLoop = 0 ;
		isIn = false ;
		switch (attr) {
			case "name" : test = tab[i].name ; break;
			case "type" : test = tab[i].type ; break;
			case "statut" : test = tab[i].statut ; break;
			default:
				alert("L'attribut "+attr+" n'est pas définit dans la fonction countAttrTab.")
				break;
		}
		while (iteLoop < temp.length && !isIn) {
			if (test == temp[iteLoop][0]) {isIn = true ; iteLoop--}
			iteLoop++
		}
		if (isIn) {temp[iteLoop][1]++ ;}
		else {
			temp2 = [test, 1] ;
			temp.push(temp2) ;
		}
	}

	return temp ;
}

/**isInTabByAttr() :
 * Vérifie si l'objet ayant l'élément elem pour attribut est dans le tableau tab ;
 * @param {Array} tab : tableau à tester ;
 * @param {*} elem : élément de l'objet à tester ;
 * @param {string} attr : attribut de l'objet à tester ;
 * @returns {boolean} true, si l'objet avec l'élément est dans le tableau, false dans le cas contraire
 */
function isInTabByAttr(tab, elem, attr) {
	var isIn = false ;
	var iteLoop = 0 ;
	while (!isIn && iteLoop < tab.length) {
		switch (attr) {
			case "id":
				if (tab[iteLoop].id == elem) isIn = true ;
				break;
			case "name":
				if (tab[iteLoop].name == elem) isIn = true ;
				break ;
			case null :
				if (tab[iteLoop] == elem) isIn = true ;
				break ;
			default:
				console.log(attr+" n'est pas paramètré dans le switch de isInTabByAttr() dans toolsArray.js")
				break;
		}
		iteLoop++ ;
	}

	return isIn ;
}

function saveStringOrNull(value) {
	var temp = "" ;
	if (value == null) {temp = null ;}
	else {temp = '"'+value+'"' ;}
	return temp ;
}

function emptyToNullOrString(value) {
	var temp = null ;
	if (value != "") {temp = value ;}
	return temp ;
}