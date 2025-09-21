/*---Fonction de gestion de texte---*/
	/**
	 * Capitalise la première lettre d'une chaîne de caractères.
	 * @param {string} text - La chaîne à transformer.
	 * @returns {string} La chaîne avec la première lettre en majuscule.
	 * @example
	 * capitalizeFirstLetter("bonjour"); // renvoie "Bonjour"
	 * capitalizeFirstLetter("");        // renvoie ""
	 */
	function capitalizeFirstLetter(text) {
	    if (!text) return ""; // gérer chaîne vide
	    return text.charAt(0).toUpperCase() + text.slice(1);
	}

/*---Fonction de gestion du temps---*/
	const SECONDINYEAR = 60*60*24*365 ;
	const SECONDINMONTH = 60*60*24*30 ;
	const SECONDINWEEK = 60*60*24*7 ;
	const SECONDINDAY = 60*60*24 ;
	const SECONDINHOUR = 60*60 ;
	const SECONDINMINUTE = 60 ;
	const MILLISECONDINSECOND = 1000 ;

	/**
	 * Convertit le format classique de date jj/mm/aaaa en objet date
	 * @param {String} val
	 * @return {Date} : retourne l'objet date
	 */
	function convertClassicToDate(val) {
		var [day, month, year] = val.split('/').map(Number) ;
		return new Date(year, month-1, day) ;
	}

	/**
	 * Convertit un objet Date en format classique jj/mm/aaaa
	 * @param {Date} date : date à converti 
	 * @returns {String} : date au format jj/mm/aaaa
	 */
	function convertDateToClassic(date) {return date.getDate()+"/"+((date.getMonth()+1 < 10) ? "0"+(date.getMonth()+1) : (date.getMonth()+1))+"/"+date.getFullYear() ;}

	/**
	 * Compare deux dates, renvoie true si elles sont identique
	 * @param {Date} d1 : Date à comparée 1 
	 * @param {Date} d2 : Date à comparée 2 
	 * @returns {Boolean} : true si le deux dates sont identique, false dans le cas contraire
	 */
	function isSameDate(d1, d2) {
	return d1.getFullYear() === d2.getFullYear() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getDate() === d2.getDate()  ;
	}

	/**secondToTxt(sec)
	* Retourne un texte heure h minute m seconde s depuis un texte
	* @param {Number} sec : valeur en seconde 
	* @returns le temps en XXhXXmXXs
	*/
	function secondToTxt(sec) {
	var tempTxt = "" ;

	var h = 0 ;
	var m = 0 ;	
	var s = sec ;

	if(s >= 60) {
		m = Math.floor(s/60) ;
		s = s%60 ;
	}
	if(m >= 60) {
		h = Math.floor(m/60) ;
		m = m%60 ;
	}

	if(h > 0) {tempTxt = tempTxt+h+" h " ;}
	if(m > 0) {tempTxt = tempTxt+m+" m " ;}
	if(s > 0) {tempTxt = tempTxt+s+" s " ;}

	return tempTxt ;
	}

	/**
	 * Converti le temps (time) donné en seconde en fonction de l'unité (unit)
	 * @param {Number} time :  valeur à convertir
	 * @param {String} unit :  unité de temps initiale
	 * @returns {Number} : temps converti en seconde
	 */
	function convertAnyTimeToSecond(time, unit) {
		switch (unit) {
			case "year" :
				return time*SECONDINYEAR ;
			case "month":
				return time*SECONDINMONTH ;
			case "week" :
				return time*SECONDINWEEK ;
			case "day" :
				return time*SECONDINDAY ;
			case "hour" :
				return time*SECONDINHOUR ;
			case "minute" :
				return time*SECONDINMINUTE ;
			case "second" :
				return time ;
			case "millisecond" :
				return time/MILLISECONDINSECOND ;
			default:
				errorSwitch(unit, "convertAnyTimeToSecond()", "tools.js")
				break;
		}
	}

	function convertTimeMilliToSecond(timeMilli) {return Math.round(timeMilli/1000) ;}

	function convertTimeMilliToHour(timeMilli) {return Math.round(timeMilli/(1000*60*60)*10)/10 ;}

	function convertTimeMilliToText(timeMilli) {
	var tempSec = Math.round(timeMilli/1000) ;
	var tempMin ;
	var tempHour ;
	
	tempMin = Math.round(tempSec/60) ;
	tempSec = tempSec%60 ;
	tempHour = Math.round(tempMin/60) ;
	tempMin = tempMin%60 ;

	return tempHour + "h " + tempMin + "m " + tempSec + "s" ;
	}


/*---Fonction d'animation de la page---*/
	/***setVisibility Function***/
	function setDivVisibility(idDiv) {$("#"+idDiv).toggleClass("hidden") ;}

	/**setDivVisibilityByButt(idButt, idDiv)
	 * Ajuste la visibilité d'une div avec les CSS hidden, visible
	 * Change aussi le bouton en fonction
	 * @param {*} idButt : ID du bouton ;
	 * @param {*} idDiv : ID de la div ;
	 */
	function setDivVisibilityByButt(idButt, idDiv, t) {
    	var eButt = $("#"+idButt) ; //Element Button
    	var eDiv = $("#"+idDiv) ; //Element Div

    	eDiv.toggleClass("hidden") ;
		if (eDiv.hasClass("hidden")) {
			if (t == "img") null ;
			else if (t != null) eButt.text(`Afficher "${t}"`) ;
			else eButt.text("+") ;
			eButt.removeClass("btn-orange") ;
		} else {
			if (t == "img") null ;
			else if (t != null) eButt.text(`Masquer "${t}"`) ;
			else eButt.text("-") ;
			eButt.addClass("btn-orange") ;
		}
	}

/*---Autres---*/
	/**copyFromIdToClip(divId)
	 * Copie le contenu d'un élément HTML ayant pour ID divId
	 * @param {string} divId : identifiant de la div à copier
	 */
	function copyFromIdToClip(divId) {
		// Sélectionnez l'élément div par son ID
		const divToCopy = document.getElementById(divId);

		// Créez une plage de texte pour copier le contenu
		const range = document.createRange();
		range.selectNode(divToCopy);
	
		// Sélectionnez le contenu de la plage de texte
		window.getSelection().removeAllRanges(); // Désélectionnez tout d'abord
		window.getSelection().addRange(range);
	
		// Copiez le contenu sélectionné
		document.execCommand('copy');
	
		// Désélectionnez le texte après la copie
		window.getSelection().removeAllRanges();
	}

	/**errorSwitch(val, fnc, file)
	 * Envoie dans la console l'erreur du switch ;
	 * @param {String} val : valeur ayant créer
	 * @param {String} fnc : fonction où se trouve le switch ;
	 * @param {String} file : fonction où se trouve la fonction ;
	 */
	function errorSwitch(val, fnc, file) {console.error(`Erreur valeur Switch : ${val} n'est pas définie dans la fonction ${fnc} du fichier ${file}.`) ;}

	/**getRandom(max, min)
	 * Retourne un nombre entier aléaroire entre min inclu et max inclu
	 * @param {Number} max : valeur maximale dans la plage aléatoire ;
	 * @param {Number} min : valeur minimale dans la plage aléatoire ;
	 * @returns {Number} retourne un nombre aléatoire dans la plage entre min et max
	 */
	function getRandom(max, min) {return Math.floor(Math.random() * ((max+1) - min)) + min; ;}