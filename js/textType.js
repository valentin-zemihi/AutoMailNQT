/*Code pour les régions :
- ARA : Auvergne-Rhône-Alpes
- BFC : Bourgogne Franche-Comté
- BRE : Bretagne
- CVL : Centre-Val de Loire
- COR : Corse
- DROM : Départements et Régions d'Outre-Mer
- GE : Grand Est
- HDF : Hauts-de-France
- IDF : Ile-de-France
- NOR : Normandie
- NA : Nouvelle-Aquitaine
- OCC : Occitanie
- PDL : Pays de la Loire
- PACA : Provence Alpes Côtes d'Azur

All = ["ARA", "BFC", "BRE", "CVL", "COR", "DROM", "GE", "HDF", "IDF", "NOR", "NA", "OCC", "PDL", "PACA"]
*/

const SEPOBJ = "**" ;
const SEPVAR = "##" ;

class TextType {
	constructor(name, target, region, type, category, subCategory, label, obj, txt, versionUpdate) {
        this.name = name ;
		this.target = target ;
		this.region = region ;
        this.type = type ;
		this.category = category ;
		this.subCategory = subCategory ;
		this.label = label ;
		this.obj = obj ;
		if (versionUpdate >= 1.0) this.txt = txt ;
		else this.txt = convertNewTxt(txt) ;
		this.versionUpdate = versionUpdate ;
    }

	getClassBtn() {
		if (this.versionUpdate == "MAJ-Perso") return "majPerso" ;
        else if (this.versionUpdate == null) return "btn-inactive" ;
        else if (this.versionUpdate != activeVersion) return "WIP" ;
        else return "" ;
	}

	getFolder() {
		if (this.target!=null && this.target!="null") return this.type+"-"+this.target ;
		if (this.category == "Atelier") return "Événement" ;
		return this.category ;
	}
	getCategoryFolder() {return this.category.replace(/[\s']/g, "") ;}
	getSubCategoryFolder() {return this.subCategory.replace(/[\s']/g, "") ;}
	getKeyElemInTxt() {
		var listKeyElem = [] ;
		var elemToSave = "" ;
		var save ;
		for (let i = 0; i < this.txt.length; i++) {
			if (this.txt[i] == "<" && this.txt[i+1] != " ") {save = true ;}
			if (this.txt[i] == ">" && this.txt[i-1] != " ") {
				save = false ;
				if (elemToSave != "startBR") {
					elemToSave = getObjInTabByAttr(tabKeyElem, elemToSave, "name") ;
					if (!isInTabByAttr(listKeyElem, elemToSave.id, "id")) listKeyElem.push(elemToSave) ;
					elemToSave = "" ;	
				} else {
					elemToSave = "" ;
				}
			}
			if (this.txt[i] != "<" && this.txt[i] != ">" && save) {elemToSave += this.txt[i] ;}
		}
		return listKeyElem ;
	}

	getTxtTo(dest) {
		var isKeyElem ;
		var isKeyNext ;
		var saveKeyNext ;

		var tempKeyElemName = "" ;
		var tempKeyElem ;
		var tempTxt = "" ;
		var tempIfTxt = "" ;

		for (let i = 0; i < this.txt.length; i++) {
			if (this.txt[i] == "<" && this.txt[i+1] != " ") isKeyElem = true ;
			else if (this.txt[i] == ">" && this.txt[i-1] != " ") {
				switch (dest) {
					case "editor":
						tempTxt += getObjInTabByAttr(tabKeyElem, tempKeyElemName, "name").getToEditor() ;
						break;
					case "print" :
						tempTxt += getObjInTabByAttr(tabKeyElem, tempKeyElemName, "name").getToPrint() ;
						break ;
					case "html" :
						tempTxt += getObjInTabByAttr(tabKeyElem, tempKeyElemName, "name").getToHTML() ;
						break ;
					case "copy" :
						//---Récupére le KeyElem associé à la balise
						tempKeyElem = getObjInTabByAttr(tabKeyElem, tempKeyElemName, "name") ;
						//---Vérifie la catégorie de l'élément
						switch (tempKeyElem.category) {
							case "next":
								console.log("L'élément est de la catégorie next") ;
								isKeyNext = true ;
								saveKeyNext = tempKeyElem ;
								break;
							case "endNext" :
								isKeyNext = false ;
								if (saveKeyNext.getValue()) tempTxt += tempIfTxt ;
								break;
							default:
								if (isKeyNext) tempIfTxt += tempKeyElem.getToHTML() ;
								else tempTxt += tempKeyElem.getToHTML() ;
								break;
						}
						break ;
					default:
						console.log(`${dest} n'est pas paramètré dans getTxtTo() de la class TextType dans textType.js`)
						break;
				}
				tempKeyElemName = "" ;
				isKeyElem = false ;
			} else {
				if (isKeyElem) tempKeyElemName += this.txt[i] ;
				else if (isKeyNext) tempIfTxt += this.txt[i] ; 
				else tempTxt += this.txt[i] ;
			}	
		}

		return tempTxt ;
	}

	setName(newName) {this.name = newName ;}
	setType(newType) {this.type = newType ;}
	setCategory(newCategory) {this.category = newCategory ;}
	setSubCategory(newSubCategory) {this.subCategory = newSubCategory ;}
	setLabel(newLabel) {this.label = newLabel ;}

	save() {
		var tempSave  = this.name ;
		tempSave += SEPVAR+this.target ;
		tempSave += SEPVAR+this.region ;
		tempSave += SEPVAR+this.type ;
		tempSave += SEPVAR+this.category ;
		tempSave += SEPVAR+this.obj ;
		tempSave += SEPVAR+this.txt ;
		tempSave += SEPVAR+this.versionUpdate ;
		return tempSave ;
	}

	static upload(objText) {
		var tempObj = objText.split(SEPVAR);
		tempObj[2] = tempObj[2].split(",") ;
		return new TextType(tempObj[0], tempObj[1], tempObj[2], tempObj[3], tempObj[4], nullTxtToNull(tempObj[5]), tempObj[6], nullTxtToNull(tempObj[7])) ;
	}

	static compare(a, b) {
		//a est version précédente, version actuelle ou version perso
		//b est version précédente ou version acutelle
		if (a.versionUpdate == "MAJ-Perso") return a ;
		else if (a.versionUpdate <= b.versionUpdate) return b ;
		return a ;
	}
}

function convertNewTxt(oldTxt) {
	var newTxt = "" ;
	for (let i = 0; i < oldTxt.length; i++) {
		if (isInTabByAttr(tabKeyElem, oldTxt[i], "name")) {
			newTxt += "<"+oldTxt[i]+">"
		}
		else newTxt += oldTxt[i] ;
	}
	return newTxt ;
}

/*---------Fonction avec TextType---------*/

var tabTextType = [] ; //Tableau d'objet TextType
var activeText ;

const ALLREGION = ["ARA", "BFC", "BRE", "CVL", "COR", "DROM", "GE", "HDF", "IDF", "NOR", "NA", "OCC", "PDL", "PACA"] ;

/**
 * Initialise la liste des textes types utilisés dans les textes.
 * Pour la liste des textes types, voir le fichier textType.js	
 */
function setDefaultTextType() {
	tabTextType = [] ;
	/**SMS jeune**/
	tabTextType.push(new TextType("Préscription - Contact", "Jeune", ["BFC", "GE"], "SMS", "Préscription", "Préscription", "1er contact (1/2)", null, 
		"Bonjour <YGFirstName>, <startBR>Je vous contacte de la part de <EmploymentAdvisor> de <EmploymentAgency> pour vous présenter le mentorat NQT.<startBR>Un accompagnement gratuit destiné aux jeunes diplômés (-31 ans, BAC+3) visant à faciliter leur insertion professionnelle.<startBR>Plus d’infos sur nqt.fr, ou contactez-moi directement si vous êtes intéressé<YGGender>.<startBR>Au plaisir d'échanger avec vous et de vous accompagner !<startBR><PMSignSMS>"
	,1.0));
	tabTextType.push(new TextType("Préscription - Relance", "Jeune", ["BFC", "GE"], "SMS", "Préscription", "Préscription", "Ultimatum (2/2)", null,
		"Bonjour <YGFirstName>,<startBR>Je fais suite à mon précédent message au sujet du mentorat NQT.<startBR>Si notre accompagnement vous intéresse, rendez-vous sur nqt.fr pour plus d’infos ou pour vous inscrire.<startBR>Pour toute question, je reste disponible par SMS, appel ou mail à <PMMail>.<startBR>Au plaisir d’échanger avec vous !<startBR><PMSignSMS>"
	,1.0));
	tabTextType.push(new TextType("Relance - Doit s'inscrire", "Jeune", ["BFC", "GE"], "SMS", "Préscription", "Doit s'inscrire", "Relance", null, 
		"Bonjour <YGFirstName>,<startBR>Je me permets de vous relancer concernant l'accompagnement NQT. Si notre dispositif vous intéresse, vous pouvez découvrir plus d'informations, ou vous inscrire, sur nqt.fr.<startBR>Je reste à votre disposition pour toute question, dont par mail à <PMMail>.<startBR>Au plaisir de vous accompagner !<startBR><PMSignSMS>"
	,1.0));
	tabTextType.push(new TextType("Finalisation inscription - Post-événement", "Jeune", ["BFC", "GE"], "SMS", "Inscription", "Post-événement", "Post-événement", null, 
		"Bonjour <YGFirstName>,<startBR>Merci pour votre inscription à NQT suite au salon <EventName>.<startBR>Il vous reste une étape d'inscription pour profiter du mentorat par NQT, je vous invite à poursuivre en validant votre adresse mail ou en vous connectant sur nqt.fr ou l'application mobile.<startBR>Au plaisir de vous accompagner dans votre recherche !<startBR>Bien à vous,<startBR><PMSignSMS>"
	,1.0));
	tabTextType.push(new TextType("Finalisation inscription - Contact", "Jeune", ["BFC", "GE"], "SMS", "Inscription", "Inscription", "1er contact (1/3)", null,
		"Bonjour <YGFirstName>,<startBR>Je fais suite à votre inscription chez NQT !<startBR>A ce jour, votre dossier est toujours incomplet. Je vous invite à finaliser votre inscription en vous rendant sur votre espace personnel pour compléter vos informations : https://app.nqt.fr/signin.<startBR>N'hésitez pas à me contacter directement si besoin.<startBR>Bien à vous,<startBR><PMSignSMS>"
	,1.0));
	tabTextType.push(new TextType("Finalisation inscription - Relance", "Jeune", ["BFC", "GE"], "SMS", "Inscription", "Inscription", "Relance (2/3)", null,
		"Bonjour <YGFirstName>,<startBR>Je vous relance pour remplir la dernière étape d’inscription chez NQT sur https://app.nqt.fr/signin ou sur l’application NQT.<startBR>N’hésitez pas à me contacter si vous rencontrez le moindre problème. Je suis à votre entière disposition.<startBR>Cordialement,<startBR><PMSignSMS>"	
	,1.0));
	tabTextType.push(new TextType("Finalisation inscription - Ultimatum", "Jeune", ["BFC", "GE"], "SMS", "Inscription", "Inscription", "Ultimatum (3/3)", null,
		"Bonjour <YGFirstName>,<startBR>Je vous invite une dernière fois à compléter votre profil sur https://app.nqt.fr/signin. Il ne vous reste plus qu'une étape pour être complètement inscrit<YGGender> à notre dispositif et profiter du mentorat par NQT.<startBR>N'hésitez pas à me contacter directement si vous rencontrez la moindre difficulté. Je suis disponible à ce numéro par SMS ou par appel, ou par mail à <PMMail>.<startBR>Bien à vous,<startBR><PMSignSMS>"
	,1.0));
	tabTextType.push(new TextType("Non éligible - Contact", "Jeune", ["BFC", "GE"], "SMS", "Examen dossier", "Non éligible", "Contact (1/2)", null,
		"Bonjour <YGFirstName>,<startBR>Suite à votre inscription chez NQT, votre dossier serait non éligible selon notre application.<startBR>Peuton convenir d'un rendez-vous pour vérifier manuellement l’éligibilité de votre profil ?<startBR>N'hésitez pas à me contacter, dès que vous le pouvez. Je suis joignable du lundi au jeudi de 9h à 18h et le vendredi de 9h à 12h.<startBR>Bien à vous,<startBR><PMSignSMS>"	
	,1.0));
	tabTextType.push(new TextType("Non éligible - Relance", "Jeune", ["BFC", "GE"], "SMS", "Examen dossier", "Non éligible", "Ultimatum (2/2)", null,
		"Bonjour <YGFirstName>,<startBR>Je me permets de vous relancer concernant votre inscription à l’association NQT.<startBR> Votre dossier est actuellement non éligible/en attente de validation. Peut-on convenir d’une date pour échanger par téléphone afin de faire le point sur votre inscription ?<startBR>Bien à vous,<startBR><PMSignSMS>"	
	,0.13));
	tabTextType.push(new TextType("Bug", "Jeune", ["BFC", "GE"], "SMS", "Examen dossier", "Bug", "Contact (1/1)", null,
		"Bonjour <YGFirstName>,<startBR>Suite à votre inscription chez NQT, il semble que votre dossier a eu un bug de notre côté. Vous devez avoir accès normalement à l'application NQT mais cela est bloqué du côté de NQT. Je souhaite donc faire le point avec vous et activer correctement votre compte pour profiter du dispositif.<startBR>N'hésitez pas à me transmettre vos disponibilités.<startBR>Bien à vous,<startBR><PMSignSMS>"
	,0.13));
	tabTextType.push(new TextType("Point de situation - Contact", "Jeune", ["BFC", "GE"], "SMS", "Accueil", "Point de situation", "Contact (1/3)", null,
		"Bonjour <YGFirstName>,<startBR>Je fais suite à la validation de ton dossier chez NQT. Félicitation !<startBR>Avant l’étape de la mise en mentorat, je t'invite à m’appeler ou à m'indiquer tes disponibilités pour que nous puissions fixer un rendez-vous téléphonique. Le but est de faire le point sur ton projet professionnel.<startBR>Je suis joignable du lundi au jeudi de 9h à 18h et le vendredi de 9h à 12h<startBR>Au plaisir de t'accompagner 😉<startBR>Très belle journée et à bientôt,<startBR><PMSignSMS>"	
	,0.13));
	tabTextType.push(new TextType("Point de situation - Relance", "Jeune", ["BFC", "GE"], "SMS", "Accueil", "Point de situation", "Relance (2/3)", null, 
		"Bonjour <YGFirstName>,<startBR>Afin de faire le point sur ton projet professionnel, quand serais-tu disponible pour un échange téléphonique ? C'est une étape importante avant de te mettre en relation avec un mentor.<startBR>De mon côté, je suis joignable du lundi au jeudi de 9h à 18h et le vendredi de 9h à 12h.<startBR>N'hésite pas à m'appeler ou à m'indiquer tes disponibilités par SMS ou mail.<startBR>Bonne journée à toi et à bientôt.<startBR><PMSignSMS>"
	,0.13));
	tabTextType.push(new TextType("Point de situation - Ultimatum", "Jeune", ["BFC", "GE"], "SMS", "Accueil", "Point de situation", "Ultimatum (3/3)", null, 
		"Bonjour <YGFirstName>,<startBR>Suite à ton inscription chez NQT, tu as dû recevoir un mail de validation de dossier, et plusieurs appels pour faire le point sur ton projet professionnel. Cette étape est importante pour bien identifier ton profil et te mettre en relation avec un mentor<startBR>Es-tu toujours intéressé<YGGender> par notre dispositif d’accompagnement ?<startBR>Si c’est le cas, je t'invite à me rappeler dès que possible, ou à m'indiquer tes disponibilités pour que nous puissions fixer un rendez-vous téléphonique.<startBR>En l'absence de réponse, je serais contraint<PMGender> de clôturer ton dossier le <closingDate>.<startBR>Dans l'attente de ton retour,<startBR><PMSignSMS>"	
	,0.13));
	tabTextType.push(new TextType("Demande - CV", "Jeune", ["BFC", "GE"], "SMS", "Accueil", "Demande", "Demance - CV", null, [
		"Bonjour ","YGFirstName",",","startBR",
		"J'ai potentiellement un mentor NQT pour t'accompagner dans ta recherche, mais j’aurais besoin de ton CV pour te présenter. Pourrais-tu me l’envoyer à ","PMMail"," ?","startBR",
		"Bonne journée à toi,","startBR",
		"PMSignSMS"
	],0.13));
	tabTextType.push(new TextType("Suivi attente mentorat - Contact", "Jeune", ["BFC", "GE"], "SMS", "Suivi attente mentorat", "Suivi attente mentorat", "Contact (1/3)", null,
		"Bonjour <YGFirstName>,<startBR>Je reviens vers toi pour faire le point sur l'avancée de ton projet professionnel.<startBR>As-tu identifié des postes intéressants et passé quelques entretiens récemment ?<startBR><nextSoonM>J’ai d’ailleurs proposé à un mentor de t’accompagner dans ta recherche et j’espère pouvoir te donner une réponse positive très bientôt.<startBR><endNext>Dans l'attente de ton retour, bien à toi,<startBR><PMSignSMS>"
	,1.0));
	tabTextType.push(new TextType("Suivi attente mentorat - Relance", "Jeune", ["BFC", "GE"], "SMS", "Suivi attente mentorat", "Suivi attente mentorat", "Relance (2/3)", null, 
		"Bonjour <YGFirstName>,<startBR>Je te contacte à nouveau pour faire le point concernant ta recherche <YGSearchAP>.<startBR>Est-ce que tu as du temps disponible pour échanger ? Je suis disponible du lundi au jeudi entre 9h et 18h et le vendredi entre 9h et 12h.<startBR>Dans l'attente de ton retour, bien à toi,<startBR><PMSignSMS>"
	,1.0));
	tabTextType.push(new TextType("Suivi attente mentorat - Ultimatum", "Jeune", ["BFC", "GE"], "SMS", "Suivi attente mentorat", "Suivi attente mentorat", "Ultimatum (3/3)", null,
		"Bonjour <YGFirstName>,<startBR>Suite à mon message vocal, je te contacte pour prendre de tes nouvelles et savoir comment se passe ta recherche ?<startBR>En l’absence de réponse de ta part avant le <closingDate>, je suis contraint de clôturer ton compte NQT. Mais n’hésite pas à me faire signe en cas de besoin pour le réactiver.<startBR>Je reste à ta disposition.<startBR>Bien à toi,<startBR><PMSignSMS>"
	,1.0))
	tabTextType.push(new TextType("Confirmation mentorat", "Jeune", ["BFC", "GE"], "SMS", "Mise en mentorat", "Confirmation mentorat", "Confirmation mentorat", null, [
		"Bonjour ","YGFirstName",",","startBR",
		"Je viens de t'envoyer par mail les éléments de contact de ","MAD2"," mentor","MGender"," NQT. N'hésite pas à ","MPCOD"," contacter dès que possible et à me mettre en copie.","startBR",
		"Le but de ce premier contact est de te présenter et de solliciter un rendez-vous avec ","MPPT",".","startBR",
		"Bon accompagnement à toi,","startBR",
		"PMSignSMS"
	],0.13));
	tabTextType.push(new TextType("Vérification premier contact - Contact", "Jeune", ["BFC", "GE"], "SMS", "Mise en mentorat", "Vérficaition premier contact", "Contact (1/2)", null, [
		"Bonjour ","YGFirstName",",","startBR",
		"Suite à mon précédent message t’informant ta mise en relation avec un mentor, as-tu eu le temps de le contacter pour te présenter ?","startBR",
		"Bien à toi,","startBR",
		"PMSignSMS"
	],0.13));
	tabTextType.push(new TextType("Vérification premier contact - Ultimatum", "Jeune", ["BFC", "GE"], "SMS", "Mise en mentorat", "Vérficaition premier contact", "Ultimatum (2/2)", null, [
		"Bonjour ","YGFirstName",",","startBR",
		"Suite à mon précédent message, je te contacte pour savoir si tu as bien envoyé ton premier mail à ","MAD2"," mentor","MGender",". En l'absence de réponse positive avant le ","closingDate",", je serais contraint de rompre le mentorat et de clôturer ton compte.","startBR",
		"Pour le moindre souci, je suis à ton entière disposition.","startBR",
		"Bien à toi,","startBR",
		"PMSignSMS"
	],0.13));
	tabTextType.push(new TextType("Suivi mentorat - Contact", "Jeune", ["BFC", "GE"], "SMS", "Suivi mentorat", "Suivi mentorat", "Contact (1/3)", null, [
		"Bonjour ","YGFirstName",",","startBR",
		"Suite à mon message vocal, je te contacte aujourd’hui pour faire le point sur ton mentorat :","startBR",
		"Comment se passent les échanges avec ","MAD2"," mentor","MGender"," ? As-tu avancé dans ton projet professionnel ?","startBR",
		"N’hésite pas à m’indiquer tes disponibilités pour un appel.","startBR",
		"Bien à toi,","startBR",
		"PMSignSMS"
	],0.13));
	tabTextType.push(new TextType("Suivi mentorat - Relance", "Jeune", ["BFC", "GE"], "SMS", "Suivi mentorat", "Suivi mentorat", "Relance (2/3)", null, [
		"Bonjour ","YGFirstName",",","startBR",
		"Suite à mon message vocal, je te relance pour faire le point sur ton mentorat :","startBR",
		"Comment se passent les échanges avec ","MAD2"," mentor","MGender"," ? As-tu avancé dans ton projet professionnel ?","startBR",
		"Quand seras-tu disponible pour un appel de suivi ?","startBR",
		"Bien à toi,","startBR",
		"PMSignSMS"
	],0.13));
	tabTextType.push(new TextType("Suivi mentorat - Ultimatum", "Jeune", ["BFC", "GE"], "SMS", "Suivi mentorat", "Suivi mentorat", "Ultimatum (3/3)", null,[
		"Bonjour ","YGFirstName",",","startBR",
		"Suite à mon message vocal, je suis toujours dans l'attente de ton suivi mentorat NQT :","startBR",
		"Comment se passent les échanges avec ton mentor ? As-tu avancé dans ton projet professionnel ?","startBR",
		"Sans réponse de ta part d'ici le ","closingDate",", je serai contraint de clôturer ton dossier. Nous pourrons toujours le réactiver quand tu seras plus disponible.",
		"Merci de ta compréhension,","startBR",
		"Bien à toi.","startBR",
		"PMSignSMS"
	],0.13));
	/**Mail jeune**/
	tabTextType.push(new TextType("Dossier non éligible", "Jeune", ["BFC", "GE"], "Mail", "Non éligible", "Mail sortie", "Mail sortie", "NQT - Dossier non éligible", [
		"Bonjour ","YGTitle"," ","YGLastName",",","startBR",
		"startBR",
		"Je fais suite à votre inscription chez NQT.","startBR",
		"startBR",
		"Après analyse de votre dossier, il s'avère que vous ne remplissez pas les critères d'éligibilité pour intégrer notre dispositif d'accompagnement.","startBR",
		"startBR",
		"Néanmoins, vous trouverez ci-dessous le nom de deux autres associations vers lesquelles vous pouvez vous tourner : ","startBR",
		"startUL",
		"startLI","Solidarités Nouvelles face au Chômage (SNC) : qui propose un service mentorat ouvert à tous;","startBR","endLI",
		"startLI","Association Pour l'Emploi des Cadres (APEC) : qui accompagne les jeunes cadres | https://www.apec.fr/","startBR","endLI",
		"endUL","startBR",
		"Si vous souhaitez en savoir plus, n'hésitez pas à me contacter. Je reste à votre disposition pour vous répondre et si vous avez besoin de conseils dans votre projet professionnel.","startBR",
		"startBR",
		"Merci de votre compréhension.","startBR",
		"startBR",
		"Bien cordialement,"
	],null));
	tabTextType.push(new TextType("Finalisation inscription - Contact", "Jeune", ["BFC", "GE"], "Mail", "Inscription", "Inscription", "Contact (1/2)", "NQT - Finalisation procédure d'inscription", [
		"Bonjour ","YGTitle"," ","YGLastName",",","startBR",
		"startBR",
		"Nous avons bien reçu votre inscription chez NQT et nous vous remercions de l'intérêt porté par notre association.","startBR",
		"startBR",
		"A ce jour, votre dossier est incomplet. Il manque quelques informations avant de pouvoir passer à votre mise en mentorat. Vous avez dû recevoir un courriel de vérification de votre adresse mail, pour vous permettre de finaliser votre inscription. Pensez donc à vérifier vos spams.","startBR",
		"Je vous invite à vous rendre sur votre espace personnel NQT afin de compléter votre profil : https://app.nqt.fr/signin.","startBR",
		"startBR",
		"Une fois votre dossier validé, nous ferons un point téléphonique pour mieux comprendre votre projet professionnel afin de vous mettre en lien avec un mentor au plus proche de votre domaine.","startBR",
		"startBR",
		"N’hésitez pas à me contacter, s'il y a le moindre problème pour compléter votre inscription ou si vous avez des questions concernant NQT.","startBR",
		"startBR",
		"Au plaisir de vous accompagner,","startBR"
	],null));
	tabTextType.push(new TextType("Finalisation inscription - Ultimatum", "Jeune", ["BFC", "GE"], "Mail", "Inscription", "Inscription", "Ultimatum (2/2)", "NQT - Relance finalisation d'inscription", [
		"Bonjour ","YGTitle"," ","YGLastName",",","startBR",
		"startBR",
		"Vous vous êtes inscrit","YGGender"," le ","registrationDate"," sur notre plateforme, toutefois l'inscription n'est pas complète. Etes-vous toujours intéressé","YGGender"," par notre dispositif d'accompagnement ?","startBR",
		"startBR",
		"Si c'est le cas, je vous invite à terminer de remplir vos informations sur votre espace personnel. Une fois complété, votre dossier passera automatiquement en suivi, et nous pourrons passer à la mise en mentorat.","startBR",
		"startBR",
		"Sans nouvelle de votre part d'ici le ","closingDate",", votre dossier sera clôturé automatiquement.","startBR",
		"startBR",
		"N’hésitez pas à me contacter, s'il y a le moindre problème pour compléter votre inscription ou si vous avez des questions concernant NQT.","startBR",
		"startBR",
		"Bien cordialement,"
	],null));
	tabTextType.push(new TextType("Réactivation profil NQT", "Jeune", ["BFC", "GE"], "Mail", "Accueil", "Réactivation", "Dossier réactivé", "NQT - Réactivation du profil", [
		"Bonjour ","YGFirstName",",","startBR",
		"startBR",
		"Comme tu peux le constater, ton dossier NQT a bien été réactivé : bon retour dans l’aventure NQT !","startBR",
		"startBR",
		"Dans un premier temps, je t’invite à mettre à jour tes informations personnelles de ton compte sur nqt.fr ou l’application NQT (disponible dans l’App Store ou le Play Store). Il te sera demandé d’ajouter des documents (CV, diplôme, justificatif de domicile). N'hésite pas à me les envoyer par mail au format .pdf, si c’est compliqué de les ajouter.","startBR",
		"startBR",
		"Tu trouveras en pièce jointe deux guides pour te familiariser avec les nouveautés de NQT (cf Guide d'accueil des Jeunes diplômés) et nos partenaires (cf Les services partenaires de NQT 2023).","startBR",
		"startBR",
		"Pour rappel, et si ce n’est pas déjà le cas :","startBR",
		"Nous t’invitons à t’inscrire à l’APEC : https://www.apec.fr/. Le double accompagnement APEC/NQT est aujourd’hui un partenariat qui fonctionne particulièrement bien. N’hésite pas à les contacter, en me mettant en copie, à cette adresse mail : accueil.bfc@apec.fr ;","startBR",
		"Tu peux rejoindre le groupe LinkedIn NQT - EST : https://www.linkedin.com/groups/8481900/ . Tu y trouveras des offres d'emploi, d'alternance et de stage de nos partenaires, ainsi que tous nos événements !","startBR",
		"startBR",
		"N'hésite pas à revenir vers moi pour toutes autres questions.","startBR",
		"startBR",
		"Et je t’appellerai bientôt pour faire le point sur ta situation et passer à la prochaine étape chez NQT.","startBR",
		"startBR",
		"Bien Cordialement,","startBR"
	],null));
	tabTextType.push(new TextType("Dossier validé - BFC", "Jeune", ["BFC"], "Mail", "Accueil", "Dossier validé", "Version BFC", "NQT - Dossier validé", [
		"Bonjour ","YGFirstName",",","startBR",
		"startBR",
		"Comme tu as pu le constater, ton inscription à NQT a bien été validé. ","startStrong","Bienvenue","endStrong"," !","startBR",
		"startBR",
		"Si tu n'es actuellement pas suivi","YGGender"," par l’APEC, sache que le double accompagnement APEC/NQT est un partenariat qui fonctionne particulièrement bien pour te permettre de trouver un emploi le plus rapidement possible.","startBR",
		"Je te propose de contacter directement l’accueil de l’APEC BFC au 03 80 54 17 60 ou par mail à accueil.bfc@apec.fr afin d'en savoir plus et d'obtenir un rendez-vous.","startBR",
		"startBR",
		"Avec NQT, ","startStrong"," tu as accès à un large choix d'outils numériques","endStrong"," pour te perfectionner en langues, mieux connaître ta personnalité et ton orientation professionnelle.","startBR",
		"startStrong","Toutes les informations dans les deux guides ci-joint.","endStrong","startBR",
		"startBR",
		"startStrong","Profite également de notre groupe LinkedIn NQT - Est","endStrong"," : https://www.linkedin.com/groups/8481900/","startBR",
		"Tu y trouveras des offres d'emploi, d'alternance et de stage de nos partenaires, ainsi que tous nos événements !","startBR",
		"startBR",
		"N'hésite pas à revenir vers moi pour toutes autres questions.","startBR",
		"Et je t’appellerai bientôt pour faire le point sur ta situation et passer à la prochaine étape de ton aventure chez NQT.","startBR",
		"startBR",
		"Bien cordialement,"
	],null));
	tabTextType.push(new TextType("Dossier validé - GE", "Jeune", ["GE"], "Mail", "Accueil", "Dossier validé", "Version GE", "NQT - Dossier validé",[
		"Bonjour ","YGFirstName",",","startBR",
		"startBR",
		"Comme tu as pu le constater ton dossier a bien été validé, bienvenue chez NQT !","startBR",
		"startBR",
		"Voici quelques informations complémentaires 🔎","startBR",
		"Si tu n'es actuellement pas suivi","YGGender"," par l’APEC, sache que le double accompagnement APEC/NQT est aujourd’hui un partenariat qui fonctionne particulièrement bien pour te permettre de trouver un emploi le plus rapidement possible. N’hésite pas à t'inscrire sur leur site (https://www.apec.fr/) et à prendre contact avec eux en précisant que tu viens de notre part : ","startBR",
		"ApecGE","startBR",
		"startBR",
		"Par ailleurs, si tu souhaites te perfectionner en langues et/ou mieux connaître ta personnalité et ton orientation professionnelle, tu trouveras ci-joint les liens et explications sur ","startStrong","les outils numériques mis à ta disposition tout au long de l'accompagnement🎯","endTag","startBR",
		"startBR",
		"Rejoins notre groupe LinkedIn NQT - Est : https://www.linkedin.com/groups/8481900/ ! Tu y trouveras des ","startStrong","offres d'emploi, d'alternance et de stage de nos partenaires, ainsi que tous nos événements 💥","endTag","startBR",
		"startBR",
		"📞 Je vais t’appeler prochainement pour échanger sur ton projet professionnel avant de te confirmer toute mise en mentorat. N’hésite pas à m’indiquer si tu as des préférences dans le créneau horaire.","startBR",
		"startUL","startLI","Au préalable, si tu as rencontré des difficultés pour ajouter tes documents sur la plateforme, merci de m’envoyer par mail : ton ","startStrong","CV","endTag",", un ","startStrong","justificatif d’identité","endTag"," et ton ","startStrong","dernier diplôme","endTag"," 💼","endTag","endTag","startBR",
		"Bien cordialement,"
	],null));
	tabTextType.push(new TextType("Dossier validé - Après examen éligibilité", "Jeune", ["BFC", "GE"], "Mail", "Accueil", "Éligible", "Dossier éligible", "NQT - Dossier validé", [
		"Bonjour ","YGFirstName",",","startBR",
		"startBR",
		"Comme promis au téléphone, ton inscription à NQT a bien été validé. ","startStrong","Bienvenue","endTag"," !","startBR",
		"Je t'invite à te connecter à ton compte pour mettre ton profil à jour.","startBR",
		"startBR",
		"Si tu n'es actuellement pas suivi","YGGender"," par l’APEC, sache que le double accompagnement APEC/NQT est un partenariat qui fonctionne particulièrement bien pour te permettre de trouver un emploi le plus rapidement possible.","startBR",
		"Je te propose de contacter directement l’accueil de l’APEC BFC au 03 80 54 17 60 ou par mail à accueil.bfc@apec.fr afin d'en savoir plus et d'obtenir un rendez-vous.","startBR",
		"startBR",
		"Avec NQT, ","startStrong"," tu as accès à un large choix d'outils numériques","endTag"," pour te perfectionner en langues, mieux connaître ta personnalité et ton orientation professionnelle.","startBR",
		"startStrong","Toutes les informations dans les deux guides ci-joint.","endTag","startBR",
		"startBR",
		"startStrong","Profite également de notre groupe LinkedIn NQT - Est","endTag"," : https://www.linkedin.com/groups/8481900/","startBR",
		"Tu y trouveras des offres d'emploi, d'alternance et de stage de nos partenaires, ainsi que tous nos événements !","startBR",
		"startBR",
		"N'hésite pas à revenir vers moi pour toutes autres questions.","startBR",
		"startBR",
		"Bien cordialement,"
	],null));
	tabTextType.push(new TextType("Suivi attente mentorat", "Jeune", ["BFC", "GE"], "Mail", "Suivi attente mentorat", "Suivi attente mentorat", "Contact", "NQT - Suivi", 
		"Bonjour <YGFirstName>,<startBR><startBR>Suite à ton inscription chez NQT, je te contacte pour suivre l’avancée de ton projet professionnel.<startBR><startBR>J'ai donc quelques questions à te poser :<startBR><startUL><startLI>Comment se passe ta recherche <YGSearch> ?<endLI><startLI>As-tu trouvé des postes qui t'intéressent ?<endLI><startLI>As-tu passé des entretiens récemment ?<endLI><endUL><startBR>N'hésite pas me contacter pour me donner de tes nouvelles,<startBR>Bien à toi,"
	,null));
	tabTextType.push(new TextType("Confirmation mentorat", "Jeune", ["BFC", "GE"], "Mail", "Mise en relation", "Confirmation mentorat", "Confirmation mentorat", "NQT - Confirmation mentorat", [
		"Bonjour ","YGFirstName",",","startBR",
		"startBR",
		"J'ai le plaisir de te confirmer ton mentorat avec :","startBR",
		"startStrong","MTitle"," ","MFirstName"," ","MLastName"," - ","MMail","endTag","startBR",
		"startBR",
		"Je t'invite à prendre contact avec ","MPPT","startStrong"," dès que possible","endTag"," pour te présenter brièvement et solliciter une rencontre.","startBR",
		"startBR",
		"Pour rappel, l'objectif du mentorat est d'avoir un retour sur ton projet professionnel, de t’aider sur les basiques (CV, lettre de motivation et entretien) et de t'accompagner dans ta recherche.","startBR",
		"startBR",
		"startStrong","Merci de bien vouloir me mettre en copie du premier e-mail que tu enverras à ","MAD2"," mentor","MGender",".","endTag","startBR",
		"startBR",
		"N’hésite pas à revenir vers moi d’ici une quinzaine de jours si jamais tu n’as pas de retour de sa part.","startBR",
		"startBR",
		"Bonne accompagnement à toi, et je reste à ta disposition.","startBR",
		"startBR",
		"Cordialement,"
	],null));
	tabTextType.push(new TextType("Suivi mentorat de masse", "Jeune", ["BFC", "GE"], "Mail", "Suivi mentorat", "de masse", "Contact (1/3)", "NQT - Suivi mentorat de", [
		"Bonjour,","startBR",
		"startBR",
		"Comme tous les deux mois, je te propose de faire un point de suivi de ton accompagnement en répondant aux questions ci-dessous :","startBR",
		"startBR",
		"startUL",
		"startLI","Es-tu en lien régulièrement (au moins 1 fois par mois) avec ton mentor ?","endTag",
		"startLI","Quels sujets as-tu travaillés avec ton mentor ?","endTag",
		"startLI","Quelle est ta situation actuelle (CDI, CDD, alternance, stage, toujours en recherche…) ?","endTag",
		"startLI","As-tu d’autres commentaires que tu souhaites porter à ma connaissance ?","endTag",
		"endTag",
		"startBR",
		"startStrong","Merci d’y répondre rapidement en me faisant un retour par mail.","endTag","startBR",
		"Par la suite, je consignerai l’ensemble de tes réponses sur ton dossier afin d’assurer le suivi de ton accompagnement chez NQT.","startBR",
		"startBR",
		"Au plaisir de nos prochains échanges et restant à ta disposition.","startBR",
		"startBR", 
		"Cordialement,","startBR"
	],null));
	tabTextType.push(new TextType("Suivi mentorat individualisé", "Jeune", ["BFC", "GE"], "Mail", "Suivi mentorat", "Suivi mentorat", "Contact (1/3)", "NQT - Suivi mentorat de", [
		"Bonjour ","YGFirstName",",","startBR",
		"startBR",
		"Comme tous les mois, je te propose de faire un point sur ton mentorat :","startBR",
		"startBR",
		"startUL",
		"startLI","Es-tu régulièrement en lien avec ","MAD2"," mentor","MGender"," ?","endTag",
		"startLI","Quels sujets as-tu travaillés avec ","MAD2"," mentor","MGender"," ?","endTag",
		"startLI","Quelle est ta situation actuelle (CDI, CDD, alternance, stage, toujours en recherche…) ?","endTag",
		"startLI","As-tu d’autres commentaires que tu souhaites porter à ma connaissance ?","endTag",
		"endTag",
		"startBR",
		"startStrong","Merci d’y répondre rapidement en me faisant un retour par mail.","endTag","startBR",
		"Je consignerai l’ensemble de tes réponses sur ton dossier afin d’assurer le suivi de ton accompagnement chez NQT.","startBR",
		"startBR",
		"Au plaisir de nos prochains échanges et restant à ta disposition.","startBR",
		"startBR", 
		"Cordialement,","startBR"
	],null));
	tabTextType.push(new TextType ("Relance suivi mentorat", "Jeune", ["BFC", "GE"], "Mail", "Suivi mentorat", "Suivi mentorat", "Relance (2/3)", "NQT - Relance suivi mentorat de", [
		"Bonjour,","startBR",
		"startBR",
		"Je te relance concernant le suivi de mentorat chez NQT. Afin de savoir comment se passe ton accompagnement avec ton/ta mentor.e, je te propose de répondre aux questions ci-dessous :","startBR",
		"startBR",
		"startUL",
		"startLI","Es-tu en lien régulièrement (au moins 1 fois par mois) avec ton mentor ?","endTag",
		"startLI","Quels sujets as-tu travaillés avec ton mentor ?","endTag",
		"startLI","Quelle est ta situation actuelle (CDI, CDD, alternance, stage, toujours en recherche…) ?","endTag",
		"startLI","As-tu d’autres commentaires que tu souhaites porter à ma connaissance ?","endTag",
		"endTag",
		"startBR",
		"Merci d’y répondre rapidement en me faisant un retour par mail.","startBR",
		"Par la suite, je consignerai l’ensemble de tes réponses sur ton dossier afin d’assurer le suivi de ton accompagnement chez NQT.","startBR",
		"startBR",
		"Au plaisir de nos prochains échanges et restant à ta disposition.","startBR",
		"Cordialement,","startBR"
	],null));
	tabTextType.push(new TextType("Dernière relance suivi mentorat", "Jeune", ["BFC", "GE"], "Mail", "Suivi mentorat", "Suivi mentorat", "Ultimatum (3/3)", "NQT - Dernière relance suivi mentorat de", [
		"Bonjour,","startBR",
		"startBR",
		"Voici la dernière relance concernant le suivi de mentorat chez NQT. L’idée est de savoir comment se passe ton accompagnement avec ton/ta mentor.e à travers le petit questionnaire ci-dessous.","startBR",
		"startStrong","En l’absence de réponse avant le ","closingDate",", nous te considérerons comme inactif et clôturerons ton mentorat ainsi que ton compte chez NQT.","endTag","startBR",
		"Tu pourras toujours me recontacter plus tard, dès que tu auras plus de disponibilité, pour réactiver ton compte.","startBR",
		"startBR",
		"Voici le petit questionnaire :","startBR",
		"startUL",
		"startLI","Es-tu en lien régulièrement (au moins 1 fois par mois) avec ton mentor ?","endTag",
		"startLI","Quels sujets as-tu travaillés avec ton mentor ?","endTag",
		"startLI","Quelle est ta situation actuelle (CDI, CDD, alternance, stage, toujours en recherche…) ?","endTag",
		"startLI","As-tu d’autres commentaires que tu souhaites porter à ma connaissance ?","endTag",
		"endTag",
		"startBR",
		"startStrong","Merci d’y répondre rapidement en me faisant un retour par mail.","endTag","startBR",
		"Par la suite, je consignerai l’ensemble de tes réponses sur ton dossier afin d’assurer le suivi de ton accompagnement chez NQT.","startBR",
		"startBR",
		"Au plaisir de nos prochains échanges et restant à ta disposition.","startBR",
		"Cordialement,","startBR"
	],null));
	tabTextType.push(new TextType("Sortie - Félicitation", "Jeune", ["BFC", "GE"], "Mail", "Sortie", "Sortie positive", "Sortie positive", "NQT - Félicitation pour ton", [
		"Bonjour ","YGFirstName",",","startBR",
		"startBR",
		"Félicitations pour ton ","YGSearchLow"," !","startBR",
		"startBR",
		"nextCom","J’espère que le mentorat NQT t’a aidé","YGGender"," dans ta recherche. Les jeunes diplômés sont nos meilleurs ambassadeurs pour promouvoir notre association. Si tu le souhaites, tu trouveras en pièce jointe un visuel de notre action à partager à ton entourage ou plus largement sur les réseaux sociaux.","endSpan","startBR",
		"startBR",	
		'Je te propose de passer ton statut en "Sortie-',"YGSearch",'" ce qui aura pour effet de mettre fin à ton mentorat et de clôturer ton compte chez NQT.'," Toutefois, n'hésite pas à rester en contact avec ","MAD2"," mentor","MGender",", ","MPP"," fait dorénavant partie de ton réseau. Et nous restons à ta disposition en cas d’évolution professionnelle.","startBR",
		"startBR",
		"Pour terminer complètement ton aventure NQT, peux-tu nous apporter quelques éléments complémentaires concernant ton ","YGSearchLow",", en répondant aux questions ci-dessous :","startBR",
		"startBR",
		"startUL",
		"startLI", "Quel est le ","startStrong","nom de l’entreprise ou l’institution","endStrong"," et son ","startStrong"," adresse exacte","endStrong"," ?","endLI",
		"startBR",
		"startLI","Quel est l’","startStrong","intitulé du poste","endStrong"," que tu occupes ?","endLI",
		"startBR",
		"ifYGSearchJob","startLI","Quel est le ","startStrong","type de contrat","endStrong"," ?","endLI",
		"startUL",
		"startLI","CDD < 6 mois","endLI",
		"startLI","CDD >= 6 mois","endLI",
		"startLI","CDI","endLI",
		"startLI","Autre (à préciser)","endLI",
		"endUL","endSpan",
		"startBR","endUL",
		"startLI","Quel est la ","startStrong","date de début","endStrong"," et la ","startStrong","durée de ton contrat","endStrong"," ?","endLI",
		"startBR",
		"startLI","startStrong","Le poste occupé est-il à la hauteur de tes compétences et te satisfait professionnellement ?","endStrong"," (Supprimer les mentions inutiles)","endLI",
		"startUL",
		"startLI","OUI","endLI",
		"startLI","NON","endLI",
		"endUL",
		"startBR",
		"startLI","startStrong","Est-ce que le mentorat proposé par NQT t'a aidé à trouver ton ","YGSearchLow"," ?","endStrong"," (Supprimer les mentions inutiles)","endLI",
		"startUL",
		"startLI","OUI","endLI",
		"startLI","NON","endLI",
		"startLI","Je n'ai pas eu de mentor","endLI",
		"endUL",
		"startBR",
		"startLI","startStrong","Est-ce que les autres services proposés par NQT t'ont aidé à trouver ton ","YGSearchLow"," ?","endStrong"," (Supprimer les mentions inutiles)","endLI",
		"startUL",
		"startLI","OUI","endLI",
		"startLI","NON","endLI",
		"endUL",
		"startBR",
		"startLI","As-tu des remarques ou commentaires sur ton passage chez NQT à me partager ?","endLI",
		"endUL",
		"startBR",
		"Merci d’avance pour tes réponses à nos questions.","startBR",
		"startBR",
		"Encore félicitation,","startBR",
		"Et très belle journée,","startBR",
		"Cordialement,"
	],null));
	/**Mail mentor**/
	tabTextType.push(new TextType("Bienvenue dans l'aventure NQT", "Mentor", ["BFC", "GE"], "Mail", "Bienvenue", "Bienvenue", "Bienvenue", "NQT - Bienvenue dans l'aventure NQT",[
		"Bonjour ","MTitle"," ","MLastName",",","startBR",
		"startBR",
		"Je suis ","PMFirstName"," ","PMLastName",", ","PMWork"," dans la région ","PMRegion"," et également votre principal","PMGender"," interlocut","PMGeurice"," dans les actions de mentorat.","startBR",
		"startBR",
		"Suite à votre inscription, vous pouvez dès maintenant compléter votre profil de mentor sur la plateforme en ajoutant votre expérience et vos thèmes d'accompagnement.","startBR",
		"startBR",
		"nextForm",4,"Olivier PERRAUT, délégué régional de NQT Est, vous propose une formation de 1h30 pour vous familiariser avec les actions du mentorat et pour vous apporter les premiers conseils. Voici le lien doodle pour vous y inscrire : ","linkForm","startBR",
		"startBR",
		"Une fois votre profil complété, j'activerai votre compte pour accompagner un jeune diplômé. Pour information, voici la procédure de mise en mentorat :","startBR",
		"startUL",
		"startLI","Je vous propose le profil d’un jeune en vous présentant brièvement ses besoins et son CV ;","endLI",
		"startLI","Vous avez le choix d’accepter, ou non, d’accompagner le jeune qui vous a été présenté ; ","endLI",
		"startLI","Si confirmation, nous actons le mentorat dans notre logiciel et partageons votre adresse mail au jeune ;","endLI",
		"startLI","Le jeune fait toujours la première étape de contact. Si le jeune ne vous contacte pas dans des délais raisonnables, merci de me le notifier par email.","endLI",
		"endUL","startBR",
		"Vous trouverez sur notre plateforme, nqt.fr ou application NQT, divers fonctionnalités, dont des formations et un réseau social de mentor.","startBR",
		"startBR",
		"Sachez que vous n'êtes pas seul","MGender"," ! Je vous propose d’accéder à notre groupe LinkedIn NQT Est (https://www.linkedin.com/groups/8481900/) pour retrouver toutes les informations sur l'année.","startBR",
		"startBR", 
		"Enfin, vous trouverez en pièces-jointes à ce mail deux documents :","startBR",
		"startUL",
		"startLI","Le Guide du mentor : il vous donnera quelques clés pour appréhender sereinement votre premier mentorat, conseils pratiques… ;","endLI",
		"startLI","Le Guide – pas à pas – pour l’inscription : ici, vous retrouverez un guide complet, étape par étape, qui facilitera votre inscription.","endLI",
		"endUL","startBR",
		"N’hésitez pas à revenir vers moi si vous avez d’éventuelles questions.","startBR",
		"startBR",
		"Je vous souhaite une belle journée et bienvenue dans l’aventure NQT !","startBR",
		"startBR",
		"Bien cordialement,"
	],null));
	tabTextType.push(new TextType("Point d'engagement - En pause", "Mentor", ["BFC", "GE"], "Mail", "Point d'engagement", "Point d'engagement", "Contact (1/2)", "NQT - Point d'engagement", [
		"Bonjour ","MTitle"," ","MLastName",",","startBR",
		"startBR",
		"En faisant le point sur les mentors NQT, nous avons remarqué que cela faisait un moment que nous ne vous avions pas échangé. Je vous contacte donc aujourd'hui pour suivre votre engagement au sein de l'association et connaître votre actualité.","startBR",
		"startBR",
		"Ainsi, j’aimerais savoir si vous êtes toujours disponible pour accompagner des jeunes diplômés dans leur projet professionnel ?","startBR",
		"Dans le cas positif, je vous invite à mettre à jour les éléments concernant votre compte.","startBR",
		"Actuellement, votre profil est en pause, mais dès que vous êtes disponible, je peux le passer actif et chercher un jeune que vous pourrez accompagner.","startBR",
		"startBR",
		"Dans l’attente de votre retour, re reste à votre entière disposition pour toute sollicitation.","startBR",
		"startBR",
		"Bien à vous,","startBR"
	],null));
	tabTextType.push(new TextType("Affectation mentorat - Avec information", "Mentor", ["BFC"], "Mail", "Mise en mentorat", "Affectation mentorat", "Avec information", "NQT - Confirmation mentorat", 
		"Bonjour <MTitle> <MLastName>,<startBR><startBR>Dans le cadre de notre nouvelle organisation, nous simplifions le processus de mise en relation pour permettre des échanges plus fluides. Désormais, nous transmettons directement vos coordonnées aux jeunes dont votre accompagnement peut lui être bénéfique.<startBR><startBR>Je vous confirme l’accompagnement de <startStrong><YGTitle> <YGFirstName> <YGLastName><endStrong> dans le cadre du mentorat NQT.<startBR><startStrong>Vous trouverez son CV en pièce jointe.<endStrong><startBR><startBR><YGPP> a reçu votre mail et doit prendre contact avec vous pour se présenter et solliciter un premier rendez-vous pour poser le diagnostic de sa recherche <YGSearchAP>.<startBR><startBR>Je reste à votre entière disposition. N’hésitez pas à me contacter en cas de difficulté ou si vous ne vous sentez pas en capacité d'accompagner ce jeune, nous interviendrons rapidement pour vous apporter une solution.<startBR><startBR>Bien à vous"
	,null));
	tabTextType.push(new TextType("Première proposition mentorat", "Mentor", ["BFC"], "Mail", "Mise en mentorat", "Proposition mentorat", "Première (1/2)", "NQT - Propositon mentorat - ", [
		"Bonjour ","MTitle"," ","MLastName",",","startBR",
		"startBR",
		"Pour votre première proposition, j'ai le plaisir de vous proposer l'accompagnement de :","startBR",
		"YGTitle"," ","YGFirstName"," ","YGLastName"," : ","YGPres","startBR",
		"Vous pouvez découvrir son CV joint à cet e-mail.","startBR",
		"startBR",
		"nextIdea",3,"YGIdea","startBR","startBR",

		"Pour information, il vous est possible de refuser un mentorat, c'est vous qui avez le dernier mot.","startBR",
		"En cas d'accord, je transmettrai votre adresse mail à ","YGFirstName"," qui prendra contact avec vous pour se présenter et solliciter un premier entretien.","startBR",
		"startBR",
		"Vu qu'il s'agit d'une première proposition, j'aimerais échanger avec vous quelques minutes pour me présenter, vous connaître un peu plus et répondre à vos questions.","startBR",
		"Quelles seraient vos disponibilités dans les prochains jours ?","startBR",
		"startBR",
		"Dans l'attente de votre réponse, je reste bien-sûr à votre entière disposition.","startBR",
		"Bien cordialement,"
	],null));
	tabTextType.push(new TextType("Proposition mentorat", "Mentor", ["BFC", "GE"], "Mail", "Mise en mentorat", "Proposition mentorat", "Contact (1/2)", "NQT - Proposition mentorat - ",[
		"Bonjour ","MTitle"," ","MLastName",",","startBR",
		"startBR",
		"Je souhaite vous proposer l'accompagnement de :","startBR",
		"YGTitle"," ","YGFirstName"," ","YGLastName"," : ","YGPres","startBR",
		"nextCV","Vous pouvez découvrir son CV joint à cet e-mail.","startBR","endTag",
		"startBR",
		"nextIdea","YGIdea","startBR","startBR","endTag",
		"Si vous êtes d'accord pour accompagner ","YGFirstName",", je lui transfère votre adresse mail. Il prendra ensuite contact avec vous pour se présenter et planifier un premier entretien.","startBR",
		"startBR",
		"Je reste bien-sûr à votre entière disposition.","startBR",
		"Bien cordialement,"
	],null));
	tabTextType.push(new TextType("Relance proposition mentorat", "Mentor", ["BFC", "GE"], "Mail", "Mise en mentorat", "Proposition mentorat", "Relance (2/2)", "NQT - Relance proposition mentorat -",[
		"Bonjour ","MTitle"," ","MLastName",",","startBR",
		"startBR",
		"Je me permets de vous relancer concernant la proposition de mentorat avec ","YGFirstName"," ","YGLastName",".","startBR",
		"nextCV",2,"Vous pouvez découvrir à nouveau son CV joint à cet e-mail.","startBR",
		"startBR",
		"nextIdea",3,"YGIdea","startBR","startBR",
		
		"Si vous êtes d'accord pour accompagner ","YGFirstName",", je lui transfère votre adresse mail. Il prendra ensuite contact avec vous pour se présenter et planifier un premier entretien.","startBR",
		"startBR",
		"Dans l'attente de votre retour, je reste à votre entière disposition.","startBR",
		"Bien à vous,"
	],null));
	tabTextType.push(new TextType("Annulation proposition mentorat", "Mentor", ["BFC"], "Mail", "Mise en mentorat", "Proposition mentorat", "Annulation", "NQT - Annulation proposition mentorat + Passage en pause", [
		"Bonjour ","MTitle"," ","MLastName",",","startBR",
		"startBR",
		"En l'absence de réponse, je retire ma proposition d'accompagner ","YGFirstName"," ","YGLastName",".","startBR",
		"startBR",
		"Dans le cas où cette absence de réponse est due à une indisponibilité, je vous propose de passer votre compte en pause le temps d'un mois.","startBR",
		"N'hésitez pas à me contacter avant pour m'indiquer vos disponibilités, nous aurons sans doute un jeune diplômé pouvant profiter de votre accompagnement.","startBR",
		"startBR",
		"Toutes mes excuses pour le dérangement si ce fut le cas.","startBR",
		"Je reste à votre disposition pour toute sollicitation.","startBR",
		"startBR",
		"Bien à vous,"
	],null));
	tabTextType.push(new TextType("Vérification premier contact", "Mentor", ["BFC", "GE"], "Mail", "Mise en mentorat", "Vérification premier contact", "Contact (1/2)", "NQT - Vérification premier contact mentorat - YGLastName",[
		"Bonjour ","MTitle"," ","MLastName",",","startBR",
		"startBR",
		"Suite à mon message vocal, je me permets de vous contacter pour m’assurer que le premier contact avec ","YGFirstName"," a bien été établi. Il doit vous avoir contacté par mail le ","dateMailYG"," pour se présenter et solliciter un rendez-vous avec vous.","startBR",
		"startBR",
		"N’hésitez pas à m’indiquer si vous n’avez pas reçu ce mail. Et vous pouvez naturellement me mettre en copie de votre mail de réponse.","startBR",
		"startBR",
		"Je reste à votre disposition pour le moindre retour.","startBR",
		"startBR",
		"Bien à vous,"
	],null));
	tabTextType.push(new TextType("Vérification premier contact - Relance", "Mentor", ["BFC", "GE"], "Mail", "Mise en mentorat", "Vérification premier contact", "Ultimatum (2/2)", "NQT - Relance vérification premier contact mentorat - YGLastName",[
		"Bonjour ","MTitle"," ","MLastName",",","startBR",
		"startBR",
		"Je me permets de vous relancer concernant le premier contact avec ","YGFirstName"," pour le mentorat NQT.","startBR",
		"Avez-vous pu lire et répondre à son mail de présentation ?","startBR",
		"startBR",
		"En cas d’indisponibilité, je me tiens à votre disposition pour interrompre temporairement le mentorat.","startBR",
		"startBR",
		"Bien à vous,"
	],null));
	tabTextType.push(new TextType("Suivi mentorat de masse", "Mentor", ["BFC", "GE"], "Mail", "Suivi mentorat", "de masse", "Contact (1/3)", "NQT - Suivi mentorat de",[
		"Bonjour,","startBR",
		"startBR",
		"Comme tous les deux mois, je vous propose de faire un point de suivi de votre accompagnement :","startBR",
		"startUL",
		"startLI","Êtes-vous en lien régulièrement avec votre/vos filleul.e.s ?","endTag",
		"startLI","Quels sujets avez-vous travaillés avec votre/vos filleul.e.s ?","endTag",
		"startLI","Quelle est la situation actuelle de votre/vos filleul.e.s  (CDI, CDD, alternance, stage, toujours en recherche…) ?","endTag",
		"startLI","Avez-vous d’autres commentaires que vous souhaitez porter à ma connaissance ?","endTag",
		"endTag","startBR",
		"startStrong","Merci d’y répondre dès que possible en me faisant un retour par mail.","endTag","startBR",
		"startBR",
		"Par la suite, je consignerai l’ensemble de vos réponses sur votre dossier afin d’assurer le suivi de votre/vos accompagnements chez NQT.","startBR",
		"startBR",
		"Je reste à votre entière disposition,","startBR",
		"Bien à vous,"
	],null));
	tabTextType.push(new TextType("Suivi mentorat de masse - Relance", "Mentor", ["BFC", "GE"], "Mail", "Suivi mentorat", "de masse", "Relance (2/3)", "NQT - Suivi mentorat",[
		"Bonjour,","startBR",
		"startBR",
		"Je vous relance concernant le suivi de mentorat chez NQT. Afin de savoir comment se passe votre accompagnement avec votre/vos filleul.e.s, je vous propose de répondant aux questions ci-dessous :","startBR",
		"startUL",
		"startLI","Êtes-vous en lien régulièrement (au moins 1 fois par mois) avec votre/vos filleul.e.s ?","endTag",
		"startLI","Quels sujets avez-vous travaillés avec votre/vos filleul.e.s ?","endTag",
		"startLI","Quelle est la situation actuelle de votre/vos filleul.e.s  (CDI, CDD, alternance, stage, toujours en recherche…) ?","endTag",
		"startLI","Avez-vous d’autres commentaires que vous souhaitez porter à ma connaissance ?","endTag",
		"endTag",
		"startBR",
		"startStrong","Merci d’y répondre dès que possible en me faisant un retour par mail.","endTag","startBR",
		"startBR",
		"Par la suite, je consignerai l’ensemble de vos réponses sur votre dossier afin d’assurer le suivi de votre/vos accompagnements chez NQT.","startBR",
		"startBR",
		"Je reste à votre entière disposition,","startBR",
		"Bien à vous,"
	],null));
	tabTextType.push(new TextType("Suivi mentorat individualisé", "Mentor", ["BFC", "GE"], "Mail", "Suivi mentorat", "Individualisé", "Contact (1/3)", "NQT - Suivi mentorat de",[
		"Bonjour ","MTitle"," ","MLastName",",","startBR",
		"startBR",
		"Cuite à mon message vocal, je vous propose de faire le point sur ","MMultYG"," mentorat","MMultD"," :","startBR",
		"startUL",
		"startLI","Êtes-vous en lien régulièrement avec ","MMultYG"," filleul","YGGender","MMultD"," ?","endTag",
		"startLI","Quels sujets avez-vous travaillés avec ","MMultYG"," filleul","YGGender","MMultD"," ?","endTag",
		"startLI","Quel est votre ressenti sur ","MMultYG"," accompagnement","MMultD"," ?","endTag",
		"startLI","Avez-vous d’autres commentaires que vous souhaitez porter à ma connaissance ?","endTag",
		"endTag","startBR",
		"Vos réponses seront consignées dans votre dossier afin d’assurer le suivi de votre accompagnement.","startBR",
		"startBR",
		"nextMeteo","En plus de ce suivi, vous pouvez aussi répondre au mail ","startStrong","Météo des parrainages","endTag"," qui permet de donner votre avis sur le mentorat en autonomie.","startBR",
		"startBR",
		"Dans l'attente de votre retour, je reste à votre entière disposition.","startBR",
		"Bien à vous,"
	],null));
	tabTextType.push(new TextType("Relance suivi mentorat", "Mentor", ["BFC", "GE"], "Mail", "Suivi mentorat", "Individualisé", "Relance (2/3)", "NQT - Suivi mentorat de -",[
		"Bonjour,","startBR",
		"startBR",
		"Je vous relance concernant le suivi de mentorat chez NQT. Afin de savoir comment se passe votre accompagnement avec votre/vos filleul.e.s, je vous propose de répondant aux questions ci-dessous :",
		"startUL",
		"startLI","Êtes-vous en lien régulièrement (au moins 1 fois par mois) avec votre/vos filleul.e.s ?","endTag",
		"startLI","Quels sujets avez-vous travaillés avec votre/vos filleul.e.s ?","endTag",
		"startLI","Quelle est la situation actuelle de votre/vos filleul.e.s  (CDI, CDD, alternance, stage, toujours en recherche…) ?","endTag",
		"startLI","Avez-vous d’autres commentaires que vous souhaitez porter à ma connaissance ?","endTag",
		"endTag","startBR",
		"startStrong","Merci d’y répondre dès que possible en me faisant un retour par mail.","endTag","startBR",
		"startBR",
		"Par la suite, je consignerai l’ensemble de vos réponses sur votre dossier afin d’assurer le suivi de votre/vos accompagnements chez NQT.","startBR",
		"startBR",
		"Je reste à votre entière disposition,","startBR",
		"Bien à vous,"
	],null));
	tabTextType.push(new TextType("Fin de mentorat - Positif", "Mentor", ["BFC", "GE"], "Mail", "Fin de mentorat", "Positif", "Contact (1/1)", "NQT - Fin de mentorat -",[
		"Bonjour ","MTitle"," ","MLastName",",","startBR",
		"startBR",
		"Je vous envoie un email pour vous notifier de la fin du mentorat de ","YGFirstName"," ","YGLastName",". En effet, ","YGPP"," a décroché un ","YGSearchLow","nextJob",2," en tant que : ","YGWork",".","startBR",
		"startBR",
		"Bien entendu ","YGFirstName"," fait dorénavant partie de votre réseau, et nous vous invitons à garder contact.","startBR",
		"startBR",
		"Félicitations pour cette réussite ! Et merci pour votre accompagnement.","startBR",
		"Je suis à votre entière disposition si vous souhaitez me faire part du moindre retour.","startBR",
		"Et je vous transmettrai une nouvelle proposition dès qu’un jeune ayant besoin de votre accompagnement intègre notre dispositif.","startBR",
		"startBR",
		"Excellente journée à vous,"
	],null));
	tabTextType.push(new TextType("Fin de mentorat - Pas de retour", "Mentor", ["BFC", "GE"], "Mail", "Fin de mentorat", "Pas de retour", "Contact (1/1)", "NQT - Fin de mentorat -",[
		"Bonjour ","MTitle"," ","MLastName",",","startBR",
		"startBR",
		"Je vous envoie un email pour vous notifier de la fin du mentorat de ","YGFirstName"," ","YGLastName",".","startBR",
		"Malgré de multiples relances pour le suivi de mentorat, je n’ai pas eu de réponse de sa part. Nous le considérons donc comme inactif ce qui conduit à une clôture son compte NQT et à mettre fin au mentorat.","startBR",
		"Si vous avez des nouvelles du jeune, n’hésitez pas à me les transmettre. Aucune fermeture n’est définitive, nous pouvons réactiver son compte dès qu’il aura plus de disponibilité.","startBR",
		"startBR",
		"Sauf contre-indication de votre part, vous êtes donc de nouveau disponible pour un autre accompagnement. Je vous transmettrai une nouvelle proposition dès qu’un jeune ayant besoin de votre accompagnement intègre notre dispositif.","startBR",
		"startBR",
		"Excellente journée à vous,"
	],null));
	/**Mail événement**/
	tabTextType.push(new TextType("Invitation atelier", null,["BFC", "GE"],"Mail", "Atelier", "Invitation", "Invitation (1/1)", "NQT - Invitation atelier :",[
		"Chers NQTéens 📣","startBR",
		"startBR", 
		"Pour compléter votre mentorat, nous avons mis en place un atelier à distance organisé par l’équipe NQT Est qui saura, je l’espère, répondre à vos attentes et à vos questions !","startBR",
		"startBR",
		"📆 ","startStrong","EventDate"," à ","EventTime"," – ","EventName","endTag","startBR",
		"startUL",
		"startLI","Animé par ","MFirstName"," ","MLastName",", ","MWork",".","endTag",
		"endTag",
		"startBR",
		"🔎 ","startStrong","Au programme","endTag","startBR",
		"startUL",
		"startLI","EventProg1","endTag",
		"startLI","EventProg2","endTag",
		"startLI","EventProg3","endTag",
		"startLI","Question/Réponse","endTag",
		"endTag",
		"startBR",
		"startStrong","Vous pouvez d’ores et déjà vous inscrire via le lien suivant : ","endTag","EventLink","startBR",
		"startUL",
		"startLI","Attention, le nombre de places est limité !","endTag",
		"endTag",
		"startBR",
		"Pour toute demande spécifique, n’hésitez pas à me contacter directement.","startBR",
		"startBR",
		"Au plaisir de vous retrouver en live !"
	],null));
	tabTextType.push(new TextType("Modalité de connexion et programme", null, ["BFC", "GE"],"Mail", "Atelier", "Modalité de connexion", "Connexion (1/1)", "NQT - Modalité de connexion atelier :", [
		"Bonjour à toutes et tous,","startBR",
		"startBR",
		"Je suis ravi de vous accueillir ce ","EventDate"," à ","EventTime"," pour l’atelier : ","EventName","startBR",
		"startBR",
		"1 - Modalités de connexion","startBR",
		"startBR",
		"Pour rejoindre la conférence (gratuit) : ","EventLinkVisio","startBR",
		"Cliquez sur le lien, puis sur rejoindre la réunion.","startBR",
		"Renseignez Prénom NOM pour faciliter les échanges.","startBR",
		"startBR",
		"2 - Déroulement","startBR",
		"startUL",
		"startLI","EventProg1","endTag",
		"startLI","EventProg2","endTag",
		"startLI","EventProg3","endTag",
		"startLI","Question/Réponse","endTag",
		"endTag",
		"startBR",
		"Ne soyez pas timides, il s’agit d’un simple échange, informel, pour casser votre routine (et la nôtre 😉) et surtout, vous aider à maintenir une bonne dynamique !","startBR",
		"startBR",
		"Et très important : soyez à l’heure !","startBR",
		"(Je vous invite à vous connecter un peu en avance au cas où vous rencontreriez des difficultés pour rejoindre la réunion. Je serai joignable par sms (pensez à me dire qui vous êtes ^^), par téléphone et par mail.)","startBR",
		"startBR",
		"En cas de désistement, merci de m’en informer au plus vite !","startBR",
		"startBR",
		"Bien Cordialement,"
	],null));
	/**Mail sourcing**/
	tabTextType.push(new TextType("Premier contact France Travail", null, ["BFC", "GE"], "Mail", "Sourcing", "Premier contact", "France Travail", "NQT - Présentation l'association NQT, pour l'insertion professionnel des jeunes diplômés", [
		"Bonjour ","ADTitle"," ","ADLastName",",","startBR",
		"startBR",
		"Je suis ","PMFirstName"," ","PMLastName",","," ","PMWork"," pour l’association NQT. En quelques mots, j’accueille et accompagne les jeunes diplômés et les mentors dans notre association.","startBR",
		"startBR",
		"Je vous contacte dans le but de présenter l'association et nos services d’insertion à vous et vos collaborateurs. Ou, si vous nous connaissez déjà, faire un point sur notre relation avec votre agence.","startBR",
		"startBR",
		"La mission de NQT est d’accompagner les jeunes (moins de 31 ans) diplômés (au minimum bac+3 validé) dans leur projet professionnel : recherche de stage, d’alternance, d’emploi ou même création d’entreprise. Le cœur de notre accompagnement est le mentorat avec des professionnels en activité, collaborateurs des entreprises adhérentes à l’association.","startBR",
		"startBR",
		"Pour les actions, je peux vous proposer d’abord de rencontrer les collaborateurs de votre agence et présenter en détail nos services. Nous pourrions mettre en place un système de préscription et accompagner les jeunes que vos agents trouvent pertinent. Enfin, en fonction du nombre de jeunes concernés, nous pouvons mettre en place une information collective dans votre agence ou en visio.","startBR",
		"startBR",
		"Si notre association vous intéresse, ou pour tout complément d’information, je suis à votre entière disposition et à celle de vos équipes.","startBR",
		"startBR",
		"Bien à vous,"
	],null));
}

function initTabTextType() {
	var tempTab ;

	tempTab = JSON.parse(localStorage.getItem("tabTextType")) ;
	
	if (tempTab == null) {
        setDefaultTextType() ;
	    localStorage.setItem("tabTextType", JSON.stringify(tabTextType)) ;
    } else {
		setDefaultTextType() ;
		tempTab = convertArrayJSONToTextType(tempTab) ;
		for (let i = 0; i < tempTab.length; i++) {
			let idInTab = getIdInTabByObjAttr(tabTextType, tempTab[i].name+tempTab[i].target+tempTab[i].type, "name+target+type") ;
			if (idInTab==null) tabTextType.push(tempTab[i]) ;
			else tabTextType[idInTab] = TextType.compare(tabTextType[idInTab], tempTab[i]) ;
		}
	}
}

/**convertArrayJSONToTextType(tab)
 * Convertit un tableau de JSON en tableau de TextType
 * @param {Array of JSON TextType} tab : tableau de JSON TextType
 * @returns {Array of TextType} tableau de TextType
 */
function convertArrayJSONToTextType(tab) {
	var tempTab = [] ;
	for (let i = 0; i < tab.length; i++) tempTab.push(new TextType(tab[i].name, tab[i].target, tab[i].region, tab[i].type, tab[i].category, tab[i].subCategory, tab[i].label, tab[i].obj, tab[i].txt, tab[i].versionUpdate)) ;
	return tempTab ;
}

function saveTextType() {
	var texte = tabTextType[0].save()  ;
	for (let i = 1; i < tabTextType.length; i++) texte += SEPOBJ+tabTextType[i].save();
    var blob = new Blob([texte], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);

    var lien = document.createElement('a');
	lien.href = url;
	lien.download = 'textType-NQT.txt'; // Nom du fichier
	document.body.appendChild(lien);
	lien.click();
	document.body.removeChild(lien);
	URL.revokeObjectURL(url);
}

function updateTextTypeFromFile(txtFile) {
	var tempTabTextType = txtFile.split(SEPOBJ) ;
	tabTextType = [] ;
	for (let i = 0; i < tempTabTextType.length; i++) tabTextType.push(TextType.upload(tempTabTextType[i]));
	
	localStorage.setItem("tabTextType", JSON.stringify(tabTextType)) ;

	location.reload();
}