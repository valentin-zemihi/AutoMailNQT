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

class TextType {
    constructor(name, target, region, type, category, obj, txt) {
        this.name = name ;
		this.target = target ;
		this.region = region ;
        this.type = type ;
		this.category = category ;
		this.obj = obj ;
        this.txt = txt ;
    }

	getFolder() {
		if (this.target!=null) {
			return this.type+"-"+this.target ;
		}
		return this.type ;
	}
}

class EventTextType extends TextType {
	constructor(name, region, type, category, obj, txt) {
		super(name, null, region, type, category, obj, txt) ;
	}

	getFolder() {
		return "Événement" ;
	}
}

class SourcingTextType extends TextType {
	constructor(name, region, type, category, obj, txt) {
		super(name, null, region, type, category, obj, txt) ;
	}

	getFolder() {
		return "Sourcing" ;
	}
}

/*---------Fonction avec TextType---------*/

var tabTextType = [] ; //Tableau d'objet TextType
var activeText ;

var allRegion = ["ARA", "BFC", "BRE", "CVL", "COR", "DROM", "GE", "HDF", "IDF", "NOR", "NA", "OCC", "PDL", "PACA"] ;

/**
 * Initialise la liste des textes types utilisés dans les textes.
 * Pour la liste des textes types, voir le fichier textType.js	
 */
function setTextType() {
	/**SMS jeune**/
	tabTextType.push(new TextType("Préscription", "Jeune", ["BFC", "GE"], "SMS", "Prescription", null, [
		"Bonjour ","YGFirstName",",","br",
		"Suite à mon message vocal, je vous écris de la part de ","EmploymentAdvisor"," de ","EmploymentAgency"," qui m'a transmis vos coordonnées. Je souhaite vous présenter notre dispositif d'accompagnement à l'insertion professionnel par mentorat, entièrement gratuit et dédié aux jeunes (moins de 31 ans) diplômés (minimum BAC+3 validé). Si cela vous intéresse, n'hésitez pas à me contacter par appel ou SMS pour une présentation. Et pour plus d'informations, vous pouvez vous rendre sur notre site internet nqt.fr.","br",
		"Au plaisir d'échanger avec vous et de vous accompagner !","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Préscription - Relance", "Jeune", ["BFC", "GE"], "SMS", "Prescription", null, [
		"Bonjour ","YGFirstName",",","br",
		"Suite à mon message vocal, je vous relance concernant ma précédente proposition. Si vous avez besoin d'un accompagnement pour votre projet professionnel, NQT est une solution avec notre dispositif de mentorat par des professionnels en activité.","br",
		"Vous pouvez aussi vous inscrire quand vous le souhaitez via nqt.fr ou notre application mobile.","br",
		"Je suis à votre entière disposition, n'hésitez pas à me contacter.","br",
		"Bien à vous,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Relance - Doit s'inscrire", "Jeune", ["BFC", "GE"], "SMS", "Prescription", null, [
		"Bonjour ","YGFirstName",",","br",
		"Lors de notre précédent échange, vous avez été intéressé","YGGender"," par l’accompagnement de NQT, mais vous n’êtes pas inscrit","YGGender"," à notre dispositif. Rencontrez-vous des difficultés pour l’inscription à nqt.fr ?","br",
		"Pour rappel, nous proposons un service de mentorat par des professionnels en activité, afin d’accompagner les jeunes diplômés dans leur projet professionnel.","br",
		"Sachez que je suis à votre entière disposition pour répondre à vos questions.","br",
		"Cordialement,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Finalisation inscription - Post événement", "Jeune", ["BFC", "GE"], "SMS", "Inscription", null, [
		"Bonjour ","YGFirstName",",","br",
		"Merci pour votre inscription à NQT suite au salon ","EventName",".","br",
		"Il vous reste une étape d'inscription pour profiter du mentorat par NQT, je vous invite à poursuivre en validant votre adresse mail ou en vous connectant sur nqt.fr ou l'application mobile.","br",
		"Au plaisir de vous accompagner dans votre recherche !","br",
		"Bien à vous,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Finalisation inscription", "Jeune", ["BFC", "GE"], "SMS", "Inscription", null, [
		"Bonjour ","YGFirstName",",","br",
		"Je fais suite à votre inscription chez NQT !","br",
		"A ce jour, votre dossier est toujours incomplet. Je vous invite à finaliser votre inscription en vous rendant sur votre espace personnel pour compléter vos informations : https://app.nqt.fr/signin.","br", 
		"N'hésitez pas à me contacter directement si besoin.","br",
		"Bien à vous,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Relance finalisation inscription", "Jeune", ["BFC", "GE"], "SMS", "Inscription", null, [
		"Bonjour ","YGFirstName",",","br",
		"Je vous relance pour remplir la dernière étape d’inscription chez NQT sur https://app.nqt.fr/signin ou sur l’application NQT.","br",
		"N’hésitez pas à me contacter si vous rencontrez le moindre problème. Je suis à votre entière disposition.","br",
		"Cordialement,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Dernière relance finalisation inscription", "Jeune", ["BFC", "GE"], "SMS", "Inscription", null, [
		"Bonjour ","YGFirstName",",","br",
		"Je vous relance suite à mon message vocal. Il ne vous reste plus qu'une étape pour être complètement inscrit","YGGender"," à notre dispositif et profiter du mentorat par NQT.","br",
		"Je vous invite une dernière fois à compléter votre profil sur https://app.nqt.fr/signin.","br",
		"N'hésitez pas à me contacter directement si vous rencontrez la moindre difficulté. Je suis disponible à ce numéro par SMS ou par appel, ou par mail à ","PMMail",".","br",
		"Bien à vous,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Examen dossier - Non éligible", "Jeune", ["BFC", "GE"], "SMS", "Examen dossier", null, [
		"Bonjour ","YGFirstName",",","br",
		"Suite à votre inscription chez NQT, votre dossier serait non éligible selon notre application.","br",
		"Peuton convenir d'un rendez-vous pour vérifier manuellement l’éligibilité de votre profil ?","br",
		"N'hésitez pas à me contacter, dès que vous le pouvez. Je suis joignable du lundi au jeudi de 9h à 18h et le vendredi de 9h à 12h.","br",
		"Bien à vous,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Examen dossier - Bug", "Jeune", ["BFC", "GE"], "SMS", "Examen dossier", null, [
		"Bonjour ","YGFirstName",",","br",
		"Suite à votre inscription chez NQT, il semble que votre dossier a eu un bug de notre côté. Vous devez avoir accès normalement à l'application NQT mais cela est bloqué du côté de NQT. Je souhaite donc faire le point avec vous et activer correctement votre compte pour profiter du dispositif.","br",
		"N'hésitez pas à me transmettre vos disponibilités.","br",
		"Bien à vous,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Dossier validé", "Jeune", ["BFC", "GE"], "SMS", "Dossier validé", null, [
		"Bonjour ","YGFirstName",",","br",
		"Je fais suite à la validation de ton dossier chez NQT. Félicitation !","br",
		"Avant l’étape de la mise en mentorat, je t'invite à m’appeler ou à m'indiquer tes disponibilités pour que nous puissions fixer un rendez-vous téléphonique. Le but est de faire le point sur ton projet professionnel.","br",
		"Je suis joignable du lundi au jeudi de 9h à 18h et le vendredi de 9h à 12h","br",
		"Au plaisir de t'accompagner 😉","br",
		"Très belle journée et à bientôt,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Dossier validé - Relance", "Jeune", ["BFC", "GE"], "SMS", "Dossier validé", null, [
		"Bonjour ", "YGFirstName",",","br",
		"Afin de faire le point sur ton projet professionnel, quand serais-tu disponible pour un échange téléphonique ? C'est une étape importante avant de te mettre en relation avec un mentor.","br",
		"De mon côté, je suis joignable du lundi au jeudi de 9h à 18h et le vendredi de 9h à 12h.","br",
		"N'hésite pas à m'appeler ou à m'indiquer tes disponibilités par SMS ou mail.","br",
		"Bonne journée à toi et à bientôt.","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Dossier validé - Dernière relance", "Jeune", ["BFC", "GE"], "SMS", "Dossier validé", null, [
		"Bonjour ","YGFirstName",",","br",
		"Suite à ton inscription chez NQT, tu as dû recevoir un mail de validation de dossier, et plusieurs appels pour faire le point sur ton projet professionnel. Cette étape est importante pour bien identifier ton profil et te mettre en relation avec un mentor","br",
		"Es-tu toujours intéressé","YGGender"," par notre dispositif d’accompagnement ?","br",
		"Si c’est le cas, je t'invite à me rappeler dès que possible, ou à m'indiquer tes disponibilités pour que nous puissions fixer un rendez-vous téléphonique.","br",
		"En l'absence de réponse, je serais contraint","PMGender"," de clôturer ton dossier le ","closingDate",".","br",
		"Dans l'attente de ton retour,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Demande de CV pour proposition mentorat", "Jeune", ["BFC", "GE"], "SMS", "Demande", null, [
		"Bonjour ","YGFirstName",",","br",
		"J'ai potentiellement un mentor NQT pour t'accompagner dans ta recherche, mais j’aurais besoin de ton CV pour te présenter. Pourrais-tu me l’envoyer à ","PMMail"," ?","br",
		"Bonne journée à toi,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Reprise de contact", "Jeune", ["BFC", "GE"], "SMS", "Actualité", null, [
		"Bonjour ","YGFirstName",",","br",
		"Suite à mon message vocal, j'aimerais prendre contact avec toi afin de faire le point sur ton inscription à NQT. J'ai remarqué que tu n'avais pas été contacté par NQT depuis un moment. L'idée de ce point est de te poser plusieurs questions :  Est-ce que tu as  pu avancer ton projet professionnel ? Est-ce que tu as pu échanger avec ton mentor attribué automatiquement ? Est-ce que tu as toujours besoin de nous ?","br",
		"Je reste à ta disposition ici ou par mail à ","PMMail",".","br",
		"Bien à toi,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Suivi attente mentorat", "Jeune", ["BFC", "GE"], "SMS", "Suivi attente mentorat", null, [
		"Bonjour ","YGFirstName",",","br",
		"Suite à ton inscription à NQT, je te contacte pour prendre de tes nouvelles : comment se passe ta recherche ","YGSearchAP"," ? As-tu trouvé des postes qui t'intéressent ? As-tu pu passer des entretiens ?","br",
		"Bonne journée à toi,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Suivi attente mentorat - Mentor potentiel", "Jeune", ["BFC", "GE"], "SMS", "Suivi attente mentorat", null, [
		"Bonjour ","YGFirstName",",","br",
		"Suite à ton inscription à NQT, je te contacte pour prendre de tes nouvelles : comment se passe ta recherche ","YGSearchAP"," ? As-tu trouvé des postes qui t'intéressent ? As-tu pu passer des entretiens ?","br",
		"Actuellement, j'ai proposé à un mentor de t'accompagner dans ta recherche, j'espère pouvoir te transmettre une réponse positive rapidement.","br",
		"Bonne journée à toi,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Suivi attente mentorat - Mentor autonome", "Jeune", ["BFC", "GE"], "SMS", "Suivi attente mentorat", null, [
		"Bonjour ","YGFirstName",",","br",
		"Je fais le point concernant ton inscription à NQT. Comment se passe ta recherche ","YGSearchAP"," ?","br",
		"Je vois aussi que tu es en mentorat autonome avec un","MGender"," mentor","MGender",", est-ce que tu as pu entrer en contact avec ","MPPT"," ?","br",
		"Je t'invite à me répondre rapidement via SMS, ou à m'appeler si besoin.","br",
		"Bien à toi,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Relance - Suivi attente mentorat", "Jeune", ["BFC", "GE"], "SMS", "Suivi attente mentorat", null, [
		"Bonjour ","YGFirstName",",","br",
		"Suite à mon précédent message, je te contacte à nouveau pour faire le point concernant ta recherche ","YGSearchAP",".","br",
		"Aurais tu as du temps disponible pour échanger sur ta recherche ?","br",
		"De mon côté, je suis disponible du lundi au jeudi entre 9h et 18h et le vendredi entre 9h et 12h.","br",
		"Dans l'attente de ton retour, je suis à ta disposition.","br",
		"Bien à toi,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Confirmation mentorat", "Jeune", ["BFC", "GE"], "SMS", "Confirmation mentorat", null, [
		"Bonjour ","YGFirstName",",","br",
		"Je viens de t'envoyer par mail les éléments de contact de ","MAD2"," mentor","MGender"," NQT. N'hésite pas à ","MPCOD"," contacter dès que possible et à me mettre en copie.","br",
		"Le but de ce premier contact est de te présenter et de solliciter un rendez-vous avec ","MPPT",".","br",
		"Bon accompagnement à toi,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Vérification premier contact", "Jeune", ["BFC", "GE"], "SMS", "Confirmation mentorat", null, [
		"Bonjour ","YGFirstName",",","br",
		"Suite à mon précédent message t’informant ta mise en relation avec un mentor, as-tu eu le temps de le contacter pour te présenter ?","br",
		"Bien à toi,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Vérification premier contact - J+15", "Jeune", ["GE"], "SMS", "Confirmation mentorat", null, [
		"Bonjour ","YGFirstName",",","br",
		"J’espère que tu vas bien.","br",
		"Je reviens vers toi dans la continuité de ta mise en mentorat du ","startMentoringDate"," afin de m’assurer que tu as bien pris contact avec ","MAD2"," mentor","MGender"," pour te présenter et solliciter un premier échange.","br",
		"Merci de me mettre en copie (","PMMail",") de ton mail le plus rapidement possible.","br",
		"Dans l’attente de ton retour.","br",
		"Je te souhaite une bonne journée,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Vérification premier contact - Dernière relance", "Jeune", ["BFC", "GE"], "SMS", "Confirmation mentorat", null, [
		"Bonjour ","YGFirstName",",","br",
		"Suite à mon précédent message, je te contacte pour savoir si tu as bien envoyé ton premier mail à ","MAD2"," mentor","MGender",". En l'absence de réponse positive avant le ","closingDate",", je serais contraint de rompre le mentorat et de clôturer ton compte.","br",
		"Pour le moindre souci, je suis à ton entière disposition.","br",
		"Bien à toi,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Suivi mentorat - Après appel", "Jeune", ["BFC", "GE"], "SMS", "Suivi mentorat", null, [
		"Bonjour ","YGFirstName",",","br",
		"Suite à mon message vocal, je te contacte aujourd’hui pour faire le point sur ton mentorat :","br",
		"Comment se passent les échanges avec ","MAD2"," mentor","MGender"," ? As-tu avancé dans ton projet professionnel ?","br",
		"N’hésite pas à m’indiquer tes disponibilités, pour un appel.","br",
		"Bien à toi,","br",
		"PMSignSMS"
	]));
	tabTextType.push(new TextType("Suivi mentorat - Dernière relance", "Jeune", ["BFC", "GE"], "SMS", "Suivi mentorat", null,[
		"Bonjour ","YGFirstName",",","br",
		"Sauf erreur de ma part, je suis toujours dans l'attente de ton bilan de mentorat. Merci d'y répondre via le mail ayant pour objet “NQT - Dernière relance suivi mentorat”.","br",
		"Ce bilan est obligatoire pour maintenir ton mentorat et le compte NQT actif.","br",
		"Sans réponse de ta part d'ici le ","closingDate"," je serai contraint de clôturer ton dossier.","br",
		"Merci de ta compréhension,","br",
		"Très belle journée à toi.","br",
		"PMSignSMS"
	]));
	/**Mail jeune**/
	tabTextType.push(new TextType("Dossier non éligible", "Jeune", ["BFC", "GE"], "Mail", "Non éligible", "NQT - Dossier non éligible", [
		"Bonjour ","YGTitle"," ","YGLastName",",","br",
		"br",
		"Je fais suite à votre inscription chez NQT.","br",
		"br",
		"Après analyse de votre dossier, il s'avère que vous ne remplissez pas les critères d'éligibilité pour intégrer notre dispositif d'accompagnement.","br",
		"br",
		"Néanmoins, vous trouverez ci-dessous le nom de deux autres associations vers lesquelles vous pouvez vous tourner : ","br",
		"startUL",
		"startLI","Solidarités Nouvelles face au Chômage (SNC) : qui propose un service mentorat ouvert à tous;","br","endTag",
		"startLI","Association Pour l'Emploi des Cadres (APEC) : qui accompagne les jeunes cadres | https://www.apec.fr/","br","endTag",
		"endTag","br",
		"Si vous souhaitez en savoir plus, n'hésitez pas à me contacter. Je reste à votre disposition pour vous répondre et si vous avez besoin de conseils dans votre projet professionnel.","br",
		"br",
		"Merci de votre compréhension.","br",
		"br",
		"Bien cordialement,"
	]));
	tabTextType.push(new TextType("Finalisation inscription", "Jeune", ["BFC", "GE"], "Mail", "Inscrit", "NQT - Finalisation procédure d'inscription", [
		"Bonjour ","YGTitle"," ","YGLastName",",","br",
		"br",
		"Nous avons bien reçu votre inscription chez NQT et nous vous remercions de l'intérêt porté par notre association.","br",
		"br",
		"A ce jour, votre dossier est incomplet. Il manque quelques informations avant de pouvoir passer à votre mise en mentorat. Vous avez dû recevoir un courriel de vérification de votre adresse mail, pour vous permettre de finaliser votre inscription. Pensez donc à vérifier vos spams.","br",
		"Je vous invite à vous rendre sur votre espace personnel NQT afin de compléter votre profil : https://app.nqt.fr/signin.","br",
		"br",
		"Une fois votre dossier validé, nous ferons un point téléphonique pour mieux comprendre votre projet professionnel afin de vous mettre en lien avec un mentor au plus proche de votre domaine.","br",
		"br",
		"N’hésitez pas à me contacter, s'il y a le moindre problème pour compléter votre inscription ou si vous avez des questions concernant NQT.","br",
		"br",
		"Au plaisir de vous accompagner,","br"
	]));
	tabTextType.push(new TextType("Finalisation inscription - Dernière relance", "Jeune", ["BFC", "GE"], "Mail", "Inscrit", "NQT - Relance finalisation d'inscription", [
		"Bonjour ","YGTitle"," ","YGLastName",",","br",
		"br",
		"Vous vous êtes inscrit","YGGender"," le ","registrationDate"," sur notre plateforme, toutefois l'inscription n'est pas complète. Etes-vous toujours intéressé","YGGender"," par notre dispositif d'accompagnement ?","br",
		"br",
		"Si c'est le cas, je vous invite à terminer de remplir vos informations sur votre espace personnel. Une fois complété, votre dossier passera automatiquement en suivi, et nous pourrons passer à la mise en mentorat.","br",
		"br",
		"Sans nouvelle de votre part d'ici le ","closingDate",", votre dossier sera clôturé automatiquement.","br",
		"br",
		"N’hésitez pas à me contacter, s'il y a le moindre problème pour compléter votre inscription ou si vous avez des questions concernant NQT.","br",
		"br",
		"Bien cordialement,"
	]));
	tabTextType.push(new TextType("Réactivation profil NQT", "Jeune", ["BFC", "GE"], "Mail", "Réactivation", "NQT - Réactivation du profil", [
		"Bonjour ","YGFirstName",",","br",
		"br",
		"Comme tu peux le constater, ton dossier NQT a bien été réactivé : bon retour dans l’aventure NQT !","br",
		"br",
		"Dans un premier temps, je t’invite à mettre à jour tes informations personnelles de ton compte sur nqt.fr ou l’application NQT (disponible dans l’App Store ou le Play Store). Il te sera demandé d’ajouter des documents (CV, diplôme, justificatif de domicile). N'hésite pas à me les envoyer par mail au format .pdf, si c’est compliqué de les ajouter.","br",
		"br",
		"Tu trouveras en pièce jointe deux guides pour te familiariser avec les nouveautés de NQT (cf Guide d'accueil des Jeunes diplômés) et nos partenaires (cf Les services partenaires de NQT 2023).","br",
		"br",
		"Pour rappel, et si ce n’est pas déjà le cas :","br",
		"Nous t’invitons à t’inscrire à l’APEC : https://www.apec.fr/. Le double accompagnement APEC/NQT est aujourd’hui un partenariat qui fonctionne particulièrement bien. N’hésite pas à les contacter, en me mettant en copie, à cette adresse mail : accueil.bfc@apec.fr ;","br",
		"Tu peux rejoindre le groupe LinkedIn NQT - EST : https://www.linkedin.com/groups/8481900/ . Tu y trouveras des offres d'emploi, d'alternance et de stage de nos partenaires, ainsi que tous nos événements !","br",
		"br",
		"N'hésite pas à revenir vers moi pour toutes autres questions.","br",
		"br",
		"Et je t’appellerai bientôt pour faire le point sur ta situation et passer à la prochaine étape chez NQT.","br",
		"br",
		"Bien Cordialement,","br"
	]));
	tabTextType.push(new TextType("Dossier validé - BFC", "Jeune", ["BFC"], "Mail", "Dossier validé", "NQT - Dossier validé", [
		"Bonjour ","YGFirstName",",","br",
		"br",
		"Comme tu as pu le constater, ton inscription à NQT a bien été validé. ","startStrong","Bienvenue","endTag"," !","br",
		"br",
		"Si tu n'es actuellement pas suivi","YGGender"," par l’APEC, sache que le double accompagnement APEC/NQT est un partenariat qui fonctionne particulièrement bien pour te permettre de trouver un emploi le plus rapidement possible.","br",
		"Je te propose de contacter directement l’accueil de l’APEC BFC au 03 80 54 17 60 ou par mail à accueil.bfc@apec.fr afin d'en savoir plus et d'obtenir un rendez-vous.","br",
		"br",
		"Avec NQT, ","startStrong"," tu as accès à un large choix d'outils numériques","endTag"," pour te perfectionner en langues, mieux connaître ta personnalité et ton orientation professionnelle.","br",
		"startStrong","Toutes les informations dans les deux guides ci-joint.","endTag","br",
		"br",
		"startStrong","Profite également de notre groupe LinkedIn NQT - Est","endTag"," : https://www.linkedin.com/groups/8481900/","br",
		"Tu y trouveras des offres d'emploi, d'alternance et de stage de nos partenaires, ainsi que tous nos événements !","br",
		"br",
		"N'hésite pas à revenir vers moi pour toutes autres questions.","br",
		"Et je t’appellerai bientôt pour faire le point sur ta situation et passer à la prochaine étape de ton aventure chez NQT.","br",
		"br",
		"Bien cordialement,"
	]));
	tabTextType.push(new TextType("Dossier validé - GE", "Jeune", ["GE"], "Mail", "Dossier validé", "NQT - Dossier validé",[
		"Bonjour ","YGFirstName",",","br",
		"br",
		"Comme tu as pu le constater ton dossier a bien été validé, bienvenue chez NQT !","br",
		"br",
		"Voici quelques informations complémentaires 🔎","br",
		"Si tu n'es actuellement pas suivi","YGGender"," par l’APEC, sache que le double accompagnement APEC/NQT est aujourd’hui un partenariat qui fonctionne particulièrement bien pour te permettre de trouver un emploi le plus rapidement possible. N’hésite pas à t'inscrire sur leur site (https://www.apec.fr/) et à prendre contact avec eux en précisant que tu viens de notre part : ","br",
		"ApecGE","br",
		"br",
		"Par ailleurs, si tu souhaites te perfectionner en langues et/ou mieux connaître ta personnalité et ton orientation professionnelle, tu trouveras ci-joint les liens et explications sur ","startStrong","les outils numériques mis à ta disposition tout au long de l'accompagnement🎯","endTag","br",
		"br",
		"Rejoins notre groupe LinkedIn NQT - Est : https://www.linkedin.com/groups/8481900/ ! Tu y trouveras des ","startStrong","offres d'emploi, d'alternance et de stage de nos partenaires, ainsi que tous nos événements 💥","endTag","br",
		"br",
		"📞 Je vais t’appeler prochainement pour échanger sur ton projet professionnel avant de te confirmer toute mise en mentorat. N’hésite pas à m’indiquer si tu as des préférences dans le créneau horaire.","br",
		"startUL","startLI","Au préalable, si tu as rencontré des difficultés pour ajouter tes documents sur la plateforme, merci de m’envoyer par mail : ton ","startStrong","CV","endTag",", un ","startStrong","justificatif d’identité","endTag"," et ton ","startStrong","dernier diplôme","endTag"," 💼","endTag","endTag","br",
		"Bien cordialement,"
	]));
	tabTextType.push(new TextType("Dossier validé - Après examen éligibilité", "Jeune", ["BFC", "GE"], "Mail", "Dossier validé", "NQT - Dossier validé", [
		"Bonjour ","YGFirstName",",","br",
		"br",
		"Comme promis au téléphone, ton inscription à NQT a bien été validé. ","startStrong","Bienvenue","endTag"," !","br",
		"Je t'invite à te connecter à ton compte pour mettre ton profil à jour.","br",
		"br",
		"Si tu n'es actuellement pas suivi","YGGender"," par l’APEC, sache que le double accompagnement APEC/NQT est un partenariat qui fonctionne particulièrement bien pour te permettre de trouver un emploi le plus rapidement possible.","br",
		"Je te propose de contacter directement l’accueil de l’APEC BFC au 03 80 54 17 60 ou par mail à accueil.bfc@apec.fr afin d'en savoir plus et d'obtenir un rendez-vous.","br",
		"br",
		"Avec NQT, ","startStrong"," tu as accès à un large choix d'outils numériques","endTag"," pour te perfectionner en langues, mieux connaître ta personnalité et ton orientation professionnelle.","br",
		"startStrong","Toutes les informations dans les deux guides ci-joint.","endTag","br",
		"br",
		"startStrong","Profite également de notre groupe LinkedIn NQT - Est","endTag"," : https://www.linkedin.com/groups/8481900/","br",
		"Tu y trouveras des offres d'emploi, d'alternance et de stage de nos partenaires, ainsi que tous nos événements !","br",
		"br",
		"N'hésite pas à revenir vers moi pour toutes autres questions.","br",
		"br",
		"Bien cordialement,"
	]));
	tabTextType.push(new TextType("Suivi attente mentorat", "Jeune", ["BFC", "GE"], "Mail", "Suivi attente mentorat", "NQT - Suivi", [
		"Bonjour ","YGFirstName",",","br",
		"br",
		"Suite à ton inscription chez NQT, je te contacte pour suivre l’avancée de ton projet professionnel.","br",
		"br",
		"J'ai donc quelques questions à te poser :","br",
		"startUL",
		"startLI","Comment se passe ta recherche ","YGSearch"," ?","endTag",
		"startLI","As-tu trouvé des postes qui t'intéressent ?","endTag",
		"startLI","As-tu passé des entretiens récemment ?","endTag",
		"endTag",
		"br",
		"N'hésite pas me contacter pour me donner de tes nouvelles,","br",
		"Bien à toi,","br",
		"PMSign"
	]));
	tabTextType.push(new TextType("Confirmation mentorat", "Jeune", ["BFC", "GE"], "Mail", "Confirmation mentorat", "NQT - Confirmation mentorat", [
		"Bonjour ","YGFirstName",",","br",
		"br",
		"J'ai le plaisir de te confirmer ton mentorat avec :","br",
		"startStrong","MTitle"," ","MFirstName"," ","MLastName"," - ","MMail","endTag","br",
		"br",
		"Je t'invite à prendre contact avec ","MPPT","startStrong"," dès que possible","endTag"," pour te présenter brièvement et solliciter une rencontre.","br",
		"br",
		"Pour rappel, l'objectif du mentorat est d'avoir un retour sur ton projet professionnel, de t’aider sur les basiques (CV, lettre de motivation et entretien) et de t'accompagner dans ta recherche.","br",
		"br",
		"startStrong","Merci de bien vouloir me mettre en copie du premier e-mail que tu enverras à ","MAD2"," mentor","MGender",".","endTag","br",
		"br",
		"N’hésite pas à revenir vers moi d’ici une quinzaine de jours si jamais tu n’as pas de retour de sa part.","br",
		"br",
		"Bonne accompagnement à toi, et je reste à ta disposition.","br",
		"br",
		"Cordialement,"
	]));
	tabTextType.push(new TextType("Suivi mentorat de masse", "Jeune", ["BFC", "GE"], "Mail", "Suivi mentorat", "NQT - Suivi mentorat de", [
		"Bonjour,","br",
		"br",
		"Comme tous les deux mois, je te propose de faire un point de suivi de ton accompagnement en répondant aux questions ci-dessous :","br",
		"br",
		"startUL",
		"startLI","Es-tu en lien régulièrement (au moins 1 fois par mois) avec ton mentor ?","endTag",
		"startLI","Quels sujets as-tu travaillés avec ton mentor ?","endTag",
		"startLI","Quelle est ta situation actuelle (CDI, CDD, alternance, stage, toujours en recherche…) ?","endTag",
		"startLI","As-tu d’autres commentaires que tu souhaites porter à ma connaissance ?","endTag",
		"endTag",
		"br",
		"startStrong","Merci d’y répondre rapidement en me faisant un retour par mail.","endTag","br",
		"Par la suite, je consignerai l’ensemble de tes réponses sur ton dossier afin d’assurer le suivi de ton accompagnement chez NQT.","br",
		"br",
		"Au plaisir de nos prochains échanges et restant à ta disposition.","br",
		"br", 
		"Cordialement,","br"
	]));
	tabTextType.push(new TextType("Suivi mentorat individualisé", "Jeune", ["BFC", "GE"], "Mail", "Suivi mentorat", "NQT - Suivi mentorat de", [
		"Bonjour ","YGFirstName",",","br",
		"br",
		"Comme tous les mois, je te propose de faire un point sur ton mentorat :","br",
		"br",
		"startUL",
		"startLI","Es-tu régulièrement en lien avec ","MAD2"," mentor","MGender"," ?","endTag",
		"startLI","Quels sujets as-tu travaillés avec ","MAD2"," mentor","MGender"," ?","endTag",
		"startLI","Quelle est ta situation actuelle (CDI, CDD, alternance, stage, toujours en recherche…) ?","endTag",
		"startLI","As-tu d’autres commentaires que tu souhaites porter à ma connaissance ?","endTag",
		"endTag",
		"br",
		"startStrong","Merci d’y répondre rapidement en me faisant un retour par mail.","endTag","br",
		"Je consignerai l’ensemble de tes réponses sur ton dossier afin d’assurer le suivi de ton accompagnement chez NQT.","br",
		"br",
		"Au plaisir de nos prochains échanges et restant à ta disposition.","br",
		"br", 
		"Cordialement,","br"
	]));
	tabTextType.push(new TextType ("Relance suivi mentorat", "Jeune", ["BFC", "GE"], "Mail", "Suivi mentorat", "NQT - Relance suivi mentorat de", [
		"Bonjour,","br",
		"br",
		"Je te relance concernant le suivi de mentorat chez NQT. Afin de savoir comment se passe ton accompagnement avec ton/ta mentor.e, je te propose de répondre aux questions ci-dessous :","br",
		"br",
		"startUL",
		"startLI","Es-tu en lien régulièrement (au moins 1 fois par mois) avec ton mentor ?","endTag",
		"startLI","Quels sujets as-tu travaillés avec ton mentor ?","endTag",
		"startLI","Quelle est ta situation actuelle (CDI, CDD, alternance, stage, toujours en recherche…) ?","endTag",
		"startLI","As-tu d’autres commentaires que tu souhaites porter à ma connaissance ?","endTag",
		"endTag",
		"br",
		"Merci d’y répondre rapidement en me faisant un retour par mail.","br",
		"Par la suite, je consignerai l’ensemble de tes réponses sur ton dossier afin d’assurer le suivi de ton accompagnement chez NQT.","br",
		"br",
		"Au plaisir de nos prochains échanges et restant à ta disposition.","br",
		"Cordialement,","br"
	]));
	tabTextType.push(new TextType("Dernière relance suivi mentorat", "Jeune", ["BFC", "GE"], "Mail", "Suivi mentorat", "NQT - Dernière relance suivi mentorat de", [
		"Bonjour,","br",
		"br",
		"Voici la dernière relance concernant le suivi de mentorat chez NQT. L’idée est de savoir comment se passe ton accompagnement avec ton/ta mentor.e à travers le petit questionnaire ci-dessous.","br",
		"startStrong","En l’absence de réponse avant le ","closingDate",", nous te considérerons comme inactif et clôturerons ton mentorat ainsi que ton compte chez NQT.","endTag","br",
		"Tu pourras toujours me recontacter plus tard, dès que tu auras plus de disponibilité, pour réactiver ton compte.","br",
		"br",
		"Voici le petit questionnaire :","br",
		"startUL",
		"startLI","Es-tu en lien régulièrement (au moins 1 fois par mois) avec ton mentor ?","endTag",
		"startLI","Quels sujets as-tu travaillés avec ton mentor ?","endTag",
		"startLI","Quelle est ta situation actuelle (CDI, CDD, alternance, stage, toujours en recherche…) ?","endTag",
		"startLI","As-tu d’autres commentaires que tu souhaites porter à ma connaissance ?","endTag",
		"endTag",
		"br",
		"startStrong","Merci d’y répondre rapidement en me faisant un retour par mail.","endTag","br",
		"Par la suite, je consignerai l’ensemble de tes réponses sur ton dossier afin d’assurer le suivi de ton accompagnement chez NQT.","br",
		"br",
		"Au plaisir de nos prochains échanges et restant à ta disposition.","br",
		"Cordialement,","br"
	]));
	tabTextType.push(new TextType("Sortie - Félicitation", "Jeune", ["BFC", "GE"], "Mail", "Sortie", "NQT - Félicitation pour ton", [
		"Bonjour ","YGFirstName",",","br",
		"br",
		"Félicitations pour ton ","YGSearchLow"," !","br",
		"br",
		"nextCom",5,"J’espère que le mentorat NQT t’a aidé","YGGender"," dans ta recherche. Les jeunes diplômés sont nos meilleurs ambassadeurs pour promouvoir notre association. Si tu le souhaites, tu trouveras en pièce jointe un visuel de notre action à partager à ton entourage ou plus largement sur les réseaux sociaux.","br",
		"br",	
		'Je te propose de passer ton statut en "Sortie-',"YGSearch",'" ce qui aura pour effet de mettre fin à ton mentorat et de clôturer ton compte chez NQT.'," Toutefois, n'hésite pas à rester en contact avec ","MAD2"," mentor","MGender",", ","MPP"," fait dorénavant partie de ton réseau. Et nous restons à ta disposition en cas d’évolution professionnelle.","br",
		"br",
		"Pour terminer complètement ton aventure NQT, peux-tu nous apporter quelques éléments complémentaires concernant ton ","YGSearchLow",", en répondant aux questions ci-dessous :","br",
		"br",
		"startUL",
		"startLI", "Quel est le ","startStrong","nom de l’entreprise ou l’institution","endTag"," et son ","startStrong"," adresse exacte","endTag"," ?","endTag",
		"br",
		"startLI","Quel est l’","startStrong","intitulé du poste","endTag"," que tu occupes ?","endTag",
		"br",
		"ifYGSearch","Emploi",22,"startLI","Quel est le ","startStrong","type de contrat","endTag"," ?","endTag",
		"startUL",
		"startLI","CDD < 6 mois","endTag",
		"startLI","CDD >= 6 mois","endTag",
		"startLI","CDI","endTag",
		"startLI","Autre (à préciser)","endTag",
		"endTag",
		"br",
		"startLI","Quel est la ","startStrong","date de début","endTag"," et la ","startStrong","durée de ton contrat","endTag"," ?","endTag",
		"br",
		"startLI","startStrong","Le poste occupé est-il à la hauteur de tes compétences et te satisfait professionnellement ?","endTag"," (Supprimer les mentions inutiles)","endTag",
		"startUL",
		"startLI","OUI","endTag",
		"startLI","NON","endTag",
		"endTag",
		"br",
		"startLI","startStrong","Est-ce que le mentorat proposé par NQT t'a aidé à trouver ton ","YGSearchLow"," ?","endTag"," (Supprimer les mentions inutiles)","endTag",
		"startUL",
		"startLI","OUI","endTag",
		"startLI","NON","endTag",
		"startLI","Je n'ai pas eu de mentor","endTag",
		"endTag",
		"br",
		"startLI","startStrong","Est-ce que les autres services proposés par NQT t'ont aidé à trouver ton ","YGSearchLow"," ?","endTag"," (Supprimer les mentions inutiles)","endTag",
		"startUL",
		"startLI","OUI","endTag",
		"startLI","NON","endTag",
		"endTag",
		"br",
		"startLI","As-tu des remarques ou commentaires sur ton passage chez NQT à me partager ?","endTag",
		"endTag",
		"br",
		"Merci d’avance pour tes réponses à nos questions.","br",
		"br",
		"Encore félicitation,","br",
		"Et très belle journée,","br",
		"Cordialement,"
	]));
	/**Mail mentor**/
	tabTextType.push(new TextType("Bienvenue dans l'aventure NQT", "Mentor", ["BFC", "GE"], "Mail", "Bienvenue", "NQT - Bienvenue dans l'aventure NQT",[
		"Bonjour ","MTitle"," ","MLastName",",","br",
		"br",
		"Je suis ","PMFirstName"," ","PMLastName",", ","PMWork"," dans la région ","PMRegion"," et également votre principal","PMGender"," interlocut","PMGeurice"," dans les actions de mentorat.","br",
		"br",
		"Suite à votre inscription, vous pouvez dès maintenant compléter votre profil de mentor sur la plateforme en ajoutant votre expérience et vos thèmes d'accompagnement.","br",
		"br",
		"nextForm",4,"Olivier PERRAUT, délégué régional de NQT Est, vous propose une formation de 1h30 pour vous familiariser avec les actions du mentorat et pour vous apporter les premiers conseils. Voici le lien doodle pour vous y inscrire : ","linkForm","br",
		"br",
		"Une fois votre profil complété, j'activerai votre compte pour accompagner un jeune diplômé. Pour information, voici la procédure de mise en mentorat :","br",
		"startUL",
		"startLI","Je vous propose le profil d’un jeune en vous présentant brièvement ses besoins et son CV ;","endTag",
		"startLI","Vous avez le choix d’accepter, ou non, d’accompagner le jeune qui vous a été présenté ; ","endTag",
		"startLI","Si confirmation, nous actons le mentorat dans notre logiciel et partageons votre adresse mail au jeune ;","endTag",
		"startLI","Le jeune fait toujours la première étape de contact. Si le jeune ne vous contacte pas dans des délais raisonnables, merci de me le notifier par email.","endTag",
		"endTag","br",
		"Vous trouverez sur notre plateforme, nqt.fr ou application NQT, divers fonctionnalités, dont des formations et un réseau social de mentor.","br",
		"br",
		"Sachez que vous n'êtes pas seul","MGender"," ! Je vous propose d’accéder à notre groupe LinkedIn NQT Est (https://www.linkedin.com/groups/8481900/) pour retrouver toutes les informations sur l'année.","br",
		"br", 
		"Enfin, vous trouverez en pièces-jointes à ce mail deux documents :","br",
		"startUL",
		"startLI","Le Guide du mentor : il vous donnera quelques clés pour appréhender sereinement votre premier mentorat, conseils pratiques… ;","endTag",
		"startLI","Le Guide – pas à pas – pour l’inscription : ici, vous retrouverez un guide complet, étape par étape, qui facilitera votre inscription.","endTag",
		"endTag","br",
		"N’hésitez pas à revenir vers moi si vous avez d’éventuelles questions.","br",
		"br",
		"Je vous souhaite une belle journée et bienvenue dans l’aventure NQT !","br",
		"br",
		"Bien cordialement,"
	]));
	tabTextType.push(new TextType("Point d'engagement - En pause", "Mentor", ["BFC", "GE"], "Mail", "Point d'engagement", "NQT - Point d'engagement", [
		"Bonjour ","MTitle"," ","MLastName",",","br",
		"br",
		"En faisant le point sur les mentors NQT, nous avons remarqué que cela faisait un moment que nous ne vous avions pas échangé. Je vous contacte donc aujourd'hui pour suivre votre engagement au sein de l'association et connaître votre actualité.","br",
		"br",
		"Ainsi, j’aimerais savoir si vous êtes toujours disponible pour accompagner des jeunes diplômés dans leur projet professionnel ?","br",
		"Dans le cas positif, je vous invite à mettre à jour les éléments concernant votre compte.","br",
		"Actuellement, votre profil est en pause, mais dès que vous êtes disponible, je peux le passer actif et chercher un jeune que vous pourrez accompagner.","br",
		"br",
		"Dans l’attente de votre retour, re reste à votre entière disposition pour toute sollicitation.","br",
		"br",
		"Bien à vous,","br"
	]));
	tabTextType.push(new TextType("Première proposition mentorat", "Mentor", ["BFC"], "Mail","Proposition mentorat", "NQT - Propositon mentorat - ", [
		"Bonjour ","MTitle"," ","MLastName",",","br",
		"br",
		"Pour votre première proposition, j'ai le plaisir de vous proposer l'accompagnement de :",
		"YGTitle"," ","YGFirstName"," ","YGLastName"," : ","YGPres","br",
		"Vous pouvez découvrir son CV joint à cet e-mail.","br",
		"br",
		"br",
		"nextIdea",2,"YGIdea","br",
		"br",
		"Pour information, il vous est possible de refuser un mentorat, c'est vous qui avez le dernier mot.","br",
		"En cas d'accord, je transmettrai votre adresse mail à ","YGFirstName"," qui prendra contact avec vous pour se présenter et solliciter un premier entretien.","br",
		"br",
		"Vu qu'il s'agit d'une première proposition, j'aimerais échanger avec vous quelques minutes pour me présenter, vous connaître un peu plus et répondre à vos questions.","br",
		"Quelles seraient vos disponibilités dans les prochains jours ?","br",
		"br",
		"Dans l'attente de votre réponse, je reste bien-sûr à votre entière disposition.","br",
		"Bien cordialement,"
	]));
	tabTextType.push(new TextType("Proposition mentorat", "Mentor", ["BFC", "GE"], "Mail", "Proposition mentorat", "NQT - Proposition mentorat - ",[
		"Bonjour ","MTitle"," ","MLastName",",","br",
		"br",
		"Pour votre mentorat NQT, je souhaite vous proposer l'accompagnement de :","br",
		"YGTitle"," ","YGFirstName"," ","YGLastName"," : ","YGPres","br",
		"nextCV",2,"Vous pouvez découvrir son CV joint à cet e-mail.","br",
		"br",
		"nextIdea",2,"YGIdea","br",
		"br",
		"Si vous êtes d'accord pour accompagner ","YGFirstName",", je lui transfère votre adresse mail. Il prendra ensuite contact avec vous pour se présenter et planifier un premier entretien.","br",
		"br",
		"Je reste bien-sûr à votre entière disposition.","br",
		"Bien cordialement,"
	]));
	tabTextType.push(new TextType("Relance proposition mentorat", "Mentor", ["BFC", "GE"], "Mail", "Proposition mentorat", "NQT - Relance proposition mentorat -",[
		"Bonjour ","MTitle"," ","MLastName",",","br",
		"br",
		"Je me permets de vous relancer concernant la proposition de mentorat avec ","YGFirstName"," ","YGLastName",".","br",
		"nextCV",2,"Vous pouvez découvrir à nouveau son CV joint à cet e-mail.","br",
		"br",
		"nextIdea",2,"YGIdea","br",
		"br",
		"Si vous êtes d'accord pour accompagner ","YGFirstName",", je lui transfère votre adresse mail. Il prendra ensuite contact avec vous pour se présenter et planifier un premier entretien.","br",
		"br",
		"Dans l'attente de votre retour, je reste à votre entière disposition.","br",
		"Bien à vous,"
	]));
	tabTextType.push(new TextType("Annulation proposition mentorat", "Mentor", ["BFC"], "Mail", "Proposition mentorat", "NQT - Annulation proposition mentorat + Passage en pause", [
		"Bonjour ","MTitle"," ","MLastName",",","br",
		"br",
		"En l'absence de réponse, je retire ma proposition d'accompagner ","YGFirstName"," ","YGLastName",".","br",
		"br",
		"Dans le cas où cette absence de réponse est due à une indisponibilité, je vous propose de passer votre compte en pause le temps d'un mois.","br",
		"N'hésitez pas à me contacter avant pour m'indiquer vos disponibilités, nous aurons sans doute un jeune diplômé pouvant profiter de votre accompagnement.","br",
		"br",
		"Toutes mes excuses pour le dérangement si ce fut le cas.","br",
		"Je reste à votre disposition pour toute sollicitation.","br",
		"br",
		"Bien à vous,"
	]));
	tabTextType.push(new TextType("Suivi mentorat de masse", "Mentor", ["BFC", "GE"], "Mail", "Suivi mentorat", "NQT - Suivi mentorat de",[
		"Bonjour,","br",
		"br",
		"Comme tous les deux mois, je vous propose de faire un point de suivi de votre accompagnement :","br",
		"startUL",
		"startLI","Êtes-vous en lien régulièrement avec votre/vos filleul.e.s ?","endTag",
		"startLI","Quels sujets avez-vous travaillés avec votre/vos filleul.e.s ?","endTag",
		"startLI","Quelle est la situation actuelle de votre/vos filleul.e.s  (CDI, CDD, alternance, stage, toujours en recherche…) ?","endTag",
		"startLI","Avez-vous d’autres commentaires que vous souhaitez porter à ma connaissance ?","endTag",
		"endTag","br",
		"startStrong","Merci d’y répondre dès que possible en me faisant un retour par mail.","endTag","br",
		"br",
		"Par la suite, je consignerai l’ensemble de vos réponses sur votre dossier afin d’assurer le suivi de votre/vos accompagnements chez NQT.","br",
		"br",
		"Je reste à votre entière disposition,","br",
		"Bien à vous,"
	]));
	tabTextType.push(new TextType("Suivi mentorat individualisé", "Mentor", ["BFC", "GE"], "Mail", "Suivi mentorat", "NQT - Suivi mentorat de",[
		"Bonjour ","MTitle"," ","MLastName",",","br",
		"br",
		"Comme tous les deux mois, je vous propose de faire un point de suivi de votre accompagnement :","br",
		"startUL",
		"startLI","Êtes-vous en lien régulièrement avec ","MMultYG"," filleul","YGGender","MMultD"," ?","endTag",
		"startLI","Quels sujets avez-vous travaillés avec ","MMultYG"," filleul","YGGender","MMultD"," ?","endTag",
		"startLI","Quelle est la situation actuelle de ","MMultYG"," filleul","YGGender","MMultD","  (CDI, CDD, alternance, stage, toujours en recherche…) ?","endTag",
		"startLI","Avez-vous d’autres commentaires que vous souhaitez porter à ma connaissance ?","endTag",
		"endTag","br",
		"startStrong","Merci d’y répondre dès que possible en me faisant un retour par mail.","endTag","br",
		"br",
		"Je consignerai l’ensemble de vos réponses sur votre dossier afin d’assurer le suivi de ","MMultYG"," accompagnement","MMultD"," chez NQT.","br",
		"br",
		"Je reste à votre entière disposition,","br",
		"Bien à vous,"
	]));
	tabTextType.push(new TextType("Relance suivi mentorat", "Mentor", ["BFC", "GE"], "Mail", "Suivi mentorat", "NQT - Suivi mentorat de -",[
		"Bonjour,","br",
		"br",
		"Je vous relance concernant le suivi de mentorat chez NQT. Afin de savoir comment se passe votre accompagnement avec votre/vos filleul.e.s, je vous propose de répondant aux questions ci-dessous :",
		"startUL",
		"startLI","Êtes-vous en lien régulièrement (au moins 1 fois par mois) avec votre/vos filleul.e.s ?","endTag",
		"startLI","Quels sujets avez-vous travaillés avec votre/vos filleul.e.s ?","endTag",
		"startLI","Quelle est la situation actuelle de votre/vos filleul.e.s  (CDI, CDD, alternance, stage, toujours en recherche…) ?","endTag",
		"startLI","Avez-vous d’autres commentaires que vous souhaitez porter à ma connaissance ?","endTag",
		"endTag","br",
		"startStrong","Merci d’y répondre dès que possible en me faisant un retour par mail.","endTag","br",
		"br",
		"Par la suite, je consignerai l’ensemble de vos réponses sur votre dossier afin d’assurer le suivi de votre/vos accompagnements chez NQT.","br",
		"br",
		"Je reste à votre entière disposition,","br",
		"Bien à vous,"
	]));
	tabTextType.push(new TextType("Fin de mentorat - Positif", "Mentor", ["BFC", "GE"], "Mail", "Fin de mentorat", "NQT - Fin de mentorat -",[
		"Bonjour ","MTitle"," ","MLastName",",","br",
		"br",
		"Je vous envoie un email pour vous notifier de la fin du mentorat de ","YGFirstName"," ","YGLastName",". En effet, ","YGPP"," a décroché un ","YGSearchLow","nextJob",2," en tant que : ","YGWork",".","br",
		"br",
		"Bien entendu ","YGFirstName"," fait dorénavant partie de votre réseau, et nous vous invitons à garder contact.","br",
		"br",
		"Félicitations pour cette réussite ! Et merci pour votre accompagnement.","br",
		"Je suis à votre entière disposition si vous souhaitez me faire part du moindre retour.","br",
		"Et je vous transmettrai une nouvelle proposition dès qu’un jeune ayant besoin de votre accompagnement intègre notre dispositif.","br",
		"br",
		"Excellente journée à vous,"
	]));
	tabTextType.push(new TextType("Fin de mentorat - Pas de retour", "Mentor", ["BFC", "GE"], "Mail", "Fin de mentorat", "NQT - Fin de mentorat -",[
		"Bonjour ","MTitle"," ","MLastName",",","br",
		"br",
		"Je vous envoie un email pour vous notifier de la fin du mentorat de ","YGFirstName"," ","YGLastName",".","br",
		"Malgré de multiples relances pour le suivi de mentorat, je n’ai pas eu de réponse de sa part. Nous le considérons donc comme inactif ce qui conduit à une clôture son compte NQT et à mettre fin au mentorat.","br",
		"Si vous avez des nouvelles du jeune, n’hésitez pas à me les transmettre. Aucune fermeture n’est définitive, nous pouvons réactiver son compte dès qu’il aura plus de disponibilité.","br",
		"br",
		"Sauf contre-indication de votre part, vous êtes donc de nouveau disponible pour un autre accompagnement. Je vous transmettrai une nouvelle proposition dès qu’un jeune ayant besoin de votre accompagnement intègre notre dispositif.","br",
		"br",
		"Excellente journée à vous,"
	]));
	/**Mail événement**/
	tabTextType.push(new EventTextType("Invitation atelier", ["BFC", "GE"],"Mail", "Atelier", "NQT - Invitation atelier :",[
		"Chers NQTéens 📣","br",
		"br", 
		"Pour compléter votre mentorat, nous avons mis en place un atelier à distance organisé par l’équipe NQT Est qui saura, je l’espère, répondre à vos attentes et à vos questions !","br",
		"br",
		"📆 ","startStrong","EventDate"," à ","EventTime"," – ","EventName","endTag","br",
		"startUL",
		"startLI","Animé par ","MFirstName"," ","MLastName",", ","MWork",".","endTag",
		"endTag",
		"br",
		"🔎 ","startStrong","Au programme","endTag","br",
		"startUL",
		"startLI","EventProg1","endTag",
		"startLI","EventProg2","endTag",
		"startLI","EventProg3","endTag",
		"startLI","Question/Réponse","endTag",
		"endTag",
		"br",
		"startStrong","Vous pouvez d’ores et déjà vous inscrire via le lien suivant : ","endTag","EventLink",
		"startUL",
		"startLI","Attention, le nombre de places est limité !","endTag",
		"endTag",
		"br",
		"Pour toute demande spécifique, n’hésitez pas à me contacter directement.","br",
		"br",
		"Au plaisir de vous retrouver en live !"
	]));
	tabTextType.push(new EventTextType("Modalité de connexion et programme", ["BFC", "GE"],"Mail", "Atelier", "NQT - Modalité de connexion atelier :", [
		"Bonjour à toutes et tous,","br",
		"br",
		"Je suis ravi de vous accueillir ce ","EventDate"," à ","EventTime"," pour l’atelier : ","EventName","br",
		"br",
		"1 - Modalités de connexion","br",
		"br",
		"Pour rejoindre la conférence (gratuit) : ","EventLinkVisio","br",
		"Cliquez sur le lien, puis sur rejoindre la réunion.","br",
		"Renseignez Prénom NOM pour faciliter les échanges.","br",
		"br",
		"2 - Déroulement","br",
		"startUL",
		"startLI","EventProg1","endTag",
		"startLI","EventProg2","endTag",
		"startLI","EventProg3","endTag",
		"startLI","Question/Réponse","endTag",
		"endTag",
		"br",
		"Ne soyez pas timides, il s’agit d’un simple échange, informel, pour casser votre routine (et la nôtre 😉) et surtout, vous aider à maintenir une bonne dynamique !","br",
		"br",
		"Et très important : soyez à l’heure !","br",
		"(Je vous invite à vous connecter un peu en avance au cas où vous rencontreriez des difficultés pour rejoindre la réunion. Je serai joignable par sms (pensez à me dire qui vous êtes ^^), par téléphone et par mail.)","br",
		"br",
		"En cas de désistement, merci de m’en informer au plus vite !","br",
		"br",
		"Bien Cordialement,"
	]));
	/**Mail sourcing**/
	tabTextType.push(new SourcingTextType("Premier contact France Travail", ["BFC", "GE"], "Mail", "Sourcing", "NQT - Présentation l'association NQT, pour l'insertion professionnel des jeunes diplômés", [
		"Bonjour ","ADTitle"," ","ADLastName",",","br",
		"br",
		"Je suis ","PMFirstName"," ","PMLastName",","," ","PMWork"," pour l’association NQT. En quelques mots, j’accueille et accompagne les jeunes diplômés et les mentors dans notre association.","br",
		"br",
		"Je vous contacte dans le but de présenter l'association et nos services d’insertion à vous et vos collaborateurs. Ou, si vous nous connaissez déjà, faire un point sur notre relation avec votre agence.","br",
		"br",
		"La mission de NQT est d’accompagner les jeunes (moins de 31 ans) diplômés (au minimum bac+3 validé) dans leur projet professionnel : recherche de stage, d’alternance, d’emploi ou même création d’entreprise. Le cœur de notre accompagnement est le mentorat avec des professionnels en activité, collaborateurs des entreprises adhérentes à l’association.","br",
		"br",
		"Pour les actions, je peux vous proposer d’abord de rencontrer les collaborateurs de votre agence et présenter en détail nos services. Nous pourrions mettre en place un système de prescription et accompagner les jeunes que vos agents trouvent pertinent. Enfin, en fonction du nombre de jeunes concernés, nous pouvons mettre en place une information collective dans votre agence ou en visio.","br",
		"br",
		"Si notre association vous intéresse, ou pour tout complément d’information, je suis à votre entière disposition et à celle de vos équipes.","br",
		"br",
		"Bien à vous,"
	]));
}