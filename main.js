/*Gender : true = femme, false = homme*/

var PMSign = "Valentin ZEMIHI, Chargé de mission NQT BFC" ;
var PMGender = false ;

var tabKeyElem = [] ; //Tableau d'objet KeyElem
var tabTextType = [] ; //Tableau d'objet TextType

var apecGE = [
	"08","Pour l’APEC Reims : Corinne CHARTIER corinne.chartier@apec.fr",
	"10","Pour l'APEC Aube : Laurence FUSTE laurence.fuste@apec.fr",
	"51","Pour l’APEC Reims : Corinne CHARTIER corinne.chartier@apec.fr",
	"52","Pour l'APEC Aube : Laurence FUSTE laurence.fuste@apec.fr",
	"54","Pour l’APEC Lorraine : Michèle BLASZCZAK michele.blaszczak@apec.fr",
	"55","Pour l’APEC Lorraine : Michèle BLASZCZAK michele.blaszczak@apec.fr",
	"57","Pour l’APEC Moselle : Véronique PETITJEAN veronique.petitjean@apec.fr",
	"67","Pour l’APEC Bas-Rhin : Grégory JOECKLE gregory.joeckle@apec.fr",
	"68","Pour l’APEC Haut-Rhin: Franck WOOG franck.woog@apec.fr",
	"88","Pour l’APEC Lorraine : Michèle BLASZCZAK michele.blaszczak@apec.fr",
] ;

var tabText ;

window.onload = function () {
	setKeyElemList() ;
	setTextType() ;

	setButtonList() ;
}

/**
 * Initialise la liste des éléments clés utilisés dans les textes.
 * Pour la liste des éléments clés, voir le fichier keyElem.js
 */
function setKeyElemList() {
	//new KeyElem(name, category, contenu, id, type, label, exemple)
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGFirstName", "text", null, "YGFirstName", "text", "Prénom du jeune", "Tom");
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGLastName","text",null, "YGLastName", "text", "Non du jeune", "Sawyer");
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGGender", "detail", null, "YGGender", "gender", "Genre du jeune", null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGTitle", "title", null, "YGGender", "gender", "Genre du jeune", null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGDept", "dept", null, "YGDept", "text", "Département du jeune", "50");
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGSearch", "text", null, "YGSearch","text", "Recherche du jeune", "d'emploi (l'artcile est important)");
	tabKeyElem[tabKeyElem.length] = new KeyElem("MFirstName","text", null, "MFirstName", "text", "Prénom du mentor", "Thomas");
	tabKeyElem[tabKeyElem.length] = new KeyElem("MLastName","text",null,"MLastName", "text", "Nom du mentor", "Pesquet");
	tabKeyElem[tabKeyElem.length] = new KeyElem("MGender", "detail", null, "MGender", "gender", "Genre du mentor", null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("MTitle", "title", null, "MGender", "gender", "Genre du mentor", null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("MMail", "text", null, "MMail", "text", "Mail du mentor", "thomas.pesquet@space.com");
	tabKeyElem[tabKeyElem.length] = new KeyElem("MPPT", "lui.elle", null, "MGender", "gender", "Genre du mentor", null); //PPT pour Pronom Personnel Tonique
	tabKeyElem[tabKeyElem.length] = new KeyElem("MAD2", "ton.ta", null, "MGender", "gender", "Genre de mentor", null); //AD2 pour Adjectif Possesif de la deuxième personne
	tabKeyElem[tabKeyElem.length] = new KeyElem("PMGender", "detail", PMGender, null, "const", null, null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("PMSign", "text", PMSign, null, "const", null, null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("closingDate", "text", null, "closingDate","text","Date de clôture du dossier", "17 novembre");
	tabKeyElem[tabKeyElem.length] = new KeyElem("registrationDate", "text", null, "registrationDate","text","Date d'inscription du dossier", "17 novembdre");
	tabKeyElem[tabKeyElem.length] = new KeyElem("ApecGE", "apec", apecGE, "YGDept", "text", "Département du jeune", "50");
	tabKeyElem[tabKeyElem.length] = new KeyElem("EmploymentAdvisor", "text", null, "employmentAdvisor", "text", "Prénom et nom du conseiller pôle emploi", "Gandalf LEGRIS");
	tabKeyElem[tabKeyElem.length] = new KeyElem("startUL", "startTag", "ul",null,"const",null,null) ;
	tabKeyElem[tabKeyElem.length] = new KeyElem("startLI", "startTag", "li",null,"const",null,null) ;
	tabKeyElem[tabKeyElem.length] = new KeyElem("startStrong", "startTag", "strong",null,"const",null,null) ;
	tabKeyElem[tabKeyElem.length] = new KeyElem("endTag", "endTag",null,null,"const",null,null) ;
}

/**
 * Initialise la liste des textes types utilisés dans les textes.
 * Pour la liste des textes types, voir le fichier textType.js
 */
function setTextType() {
	//new TextType(name, type, text)
	tabTextType[tabTextType.length] = new TextType("Dossier non éligible", "Mail", "Jeune", [
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
	]);
	tabTextType[tabTextType.length] = new TextType("Finalisation inscription", "Mail", "Jeune", [
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
	]);
	tabTextType[tabTextType.length] = new TextType("Finalisation inscription - Dernière relance", "Mail", "Jeune", [
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
	]);
	tabTextType[tabTextType.length] = new TextType("Réactivation profil NQT", "Mail", "Jeune", [
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
	]);
	tabTextType[tabTextType.length] = new TextType("Dossier validé - BFC", "Mail", "Jeune", [
		"Bonjour ","YGFirstName",",","br",
		"br",
		"Comme tu as pu le constater, ton dossier a bien été validé, félicitations !","br",
		"br",
		"Si tu n'es actuellement pas suivi","YGGender"," par l’APEC, sache que le double accompagnement APEC/NQT est aujourd’hui un partenariat qui fonctionne particulièrement bien pour te permettre de trouver un emploi le plus rapidement possible.","br",
		"N’hésite pas à t'inscrire sur leur site (https://www.apec.fr/) et à prendre contact avec eux en précisant que tu viens de notre part, et à m'ajouter en copie de ton email : accueil.bfc@apec.fr.","br",
		"Tu peux aussi prendre rendez-vous directement avec eux grâce à ce lien https://www.apec.fr/mon-centre.html#/detail/102015","br",
		"br",
		"Avec NQT, tu as accès à un large choix d'outils numériques pour te perfectionner en langues, mieux connaître ta personnalité et ton orientation professionnelle.","br",
		"Toutes les informations dans les deux guides ci-joint.","br",
		"br",
		"Profite également de notre groupe LinkedIn NQT - Est : https://www.linkedin.com/groups/8481900/","br",
		"Tu y trouveras des offres d'emploi, d'alternance et de stage de nos partenaires, ainsi que tous nos événements !","br",
		"br",
		"N'hésite pas à revenir vers moi pour toutes autres questions.","br",
		"Et je t’appellerai bientôt pour faire le point sur ta situation et passer à la prochaine étape de ton aventure chez NQT.","br",
		"br",
		"Bien cordialement,"
	]);
	tabTextType[tabTextType.length] = new TextType("Dossier validé - GE", "Mail", "Jeune", [
		"Bonjour ","YGFirstName",",","br",
		"br",
		"Comme tu as pu le constater, ton dossier a bien été validé, félicitations !","br",
		"br",
		"Si tu n'es actuellement pas suivi","YGGender"," par l’APEC, sache que le double accompagnement APEC/NQT est aujourd’hui un partenariat qui fonctionne particulièrement bien pour te permettre de trouver un emploi le plus rapidement possible.","br",
		"N’hésite pas à t'inscrire sur leur site (https://www.apec.fr/) et à prendre contact avec eux en précisant que tu viens de notre part, et à m'ajouter en copie de ton email : ","br",
		"ApecGE","br",
		"br",
		"Par ailleurs, si tu souhaites te perfectionner en langues et/ou mieux connaître ta personnalité et ton orientation professionnelle, tu trouveras ci-joint les liens et explications sur les outils numériques mis à ta disposition tout au long de l'accompagnement.","br",
		"br",
		"Profite également de notre groupe LinkedIn NQT - Est : https://www.linkedin.com/groups/8481900/","br",
		"Tu y trouveras des offres d'emploi, d'alternance et de stage de nos partenaires, ainsi que tous nos événements !","br",
		"br",
		"N'hésite pas à revenir vers moi pour toutes autres questions.","br",
		"br",
		"Bien cordialement,"
	]);
	tabTextType[tabTextType.length] = new TextType("Confirmation mentorat", "Mail", "Jeune", [
		"Bonjour ","YGFirstName",",","br",
		"br",
		"J'ai le plaisir de te confirmer ton mentorat avec :","br",
		"MTitle"," ","MFirstName"," ","MLastName"," - ","MMail","br",
		"br",
		"Je t'invite à prendre contact avec ","MPPT"," dès que possible pour te présenter brièvement et solliciter une rencontre.","br",
		"br",
		"Pour rappel, l'objectif du mentorat est d'avoir un retour sur ton projet professionnel, de t’aider sur les basiques (CV, lettre de motivation et entretien) et de t'accompagner dans ta recherche ","YGSearch",".","br",
		"br",
		"Merci de bien vouloir me mettre en copie du premier e-mail que tu enverras à ","MAD2"," mentor","MGender",".","br",
		"br",
		"N’hésite pas à revenir vers moi d’ici une quinzaine de jours si jamais tu n’as pas de retour de sa part.","br",
		"br",
		"Je reste à ton écoute et te souhaite une très bonne fin de journée.","br",
		"br",
		"Cordialement,"
	]);
	tabTextType[tabTextType.length] = new TextType("Suivi mentorat", "Mail","Jeune", [
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
		"Merci d’y répondre rapidement en me faisant un retour par mail.","br",
		"Par la suite, je consignerai l’ensemble de tes réponses sur ton dossier afin d’assurer le suivi de ton accompagnement chez NQT.","br",
		"br",
		"Au plaisir de nos prochains échanges et restant à ta disposition.","br",
		"br", 
		"Cordialement,","br"
	]);
	tabTextType[tabTextType.length] = new TextType ("Relance suivi mentorat", "Mail", "Jeune", [
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
	]);
	tabTextType[tabTextType.length] = new TextType("Dernière relance suivi mentorat", "Mail", "Jeune", [
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
	]);
	tabTextType[tabTextType.length] = new TextType("SMS préscription", "SMS", "Jeune", [
		"Bonjour ","YGFirstName",",","br",
		"Je vous écris dans la continuité de mon message vocal, de la part de ","EmploymentAdvisor", " de Pôle Emploi qui m'a transmis vos coordonnées. L'idée de cet appel est de vous présenter notre dispositif de mentorat professionnel, entièrement gratuit et dédié aux jeunes diplômés d'un Bac+3 minimum et âgés de moins de 31 ans. Pour vous inscrire, il vous suffit de créer un compte sur le site internet NQT.fr ou en téléchargeant notre application disponible sur smartphone.","br",
		"N'hésitez pas à me rappeler si vous souhaitez échanger sur votre projet et notre action.","br",
		"Au plaisir d'échanger avec vous et de vous accompagner !","br",
		"PMSign"
	]);
	tabTextType[tabTextType.length] = new TextType("Relance SMS préscription", "SMS", "Jeune", [
		"Bonjour ","YGFirstName",",","br",
		"Suite à mon message vocal, je vous relance à propos de ma précédente proposition. Si vous avez besoin d'un accompagnement pour votre projet professionnel, NQT propose un service de mentorat par des professionnels en activité.","br",
		"Vous pouvez vous y inscrire quand vous le souhaitez via nqt.fr ou notre application mobile. Je suis à votre entière disposition pour répondre à vos questions.","br",
		"N'hésitez pas à me contacter,","br",
		"Bien à vous,","br",
		"PMSign"
	]);
	tabTextType[tabTextType.length] = new TextType("Finalisation inscription", "SMS", "Jeune", [
		"Bonjour ","YGFirstName",",","br",
		"Je fais suite à votre inscription chez NQT !","br",
		"A ce jour, votre dossier est toujours incomplet. Je vous invite à finaliser votre inscription en vous rendant sur votre espace personnel pour compléter vos informations : https://app.nqt.fr/signin.","br", 
		"N'hésitez pas à me contacter directement si besoin.","br",
		"Bien à vous,","br",
		"PMSign"
	]);
	tabTextType[tabTextType.length] = new TextType("Relance finalisation inscription", "SMS", "Jeune", [
		"Bonjour ","YGFirstName",",","br",
		"Je vous relance pour remplir la dernière étape d’inscription chez NQT sur https://app.nqt.fr/signin ou sur l’application NQT.","br",
		"N’hésitez pas à me contacter si vous rencontrez le moindre problème. Je suis à votre entière disposition.","br",
		"Cordialement,","br",
		"PMSign"
	]);
	tabTextType[tabTextType.length] = new TextType("Dernière relance finalisation inscription", "SMS", "Jeune", [
		"Bonjour ","YGFirstName",",","br",
		"Je vous relance suite à mon message vocal. Il ne vous reste plus qu'une étape pour être complètement inscrit","YGGender"," à notre dispositif et profiter du mentorat par NQT.","br",
		"Je vous invite une dernière fois à compléter votre profil sur https://app.nqt.fr/signin.","br",
		"N'hésitez pas à me contacter directement si vous rencontrez la moindre difficulté. Je suis disponible à ce numéro par SMS ou par appel, ou par mail à v.zemihi@nqt.fr.","br",
		"Bien à vous,","br",
		"PMSign"
	]);
	tabTextType[tabTextType.length] = new TextType("Examen non éligible", "SMS", "Jeune", [
		"Bonjour ","YGFirstName",",","br",
		"Je fais suite à votre inscription chez NQT ! Votre dossier serait non éligible selon notre logiciel.","br",
		"J’aimerais voir avec vous les informations de votre dossier, pour vérifier manuellement l’éligibilité de votre profil.","br",
		"N'hésitez pas à me contacter, dès que vous le pouvez. Je suis joignable du lundi au jeudi de 9h à 18h et le vendredi de 9h à 12h.","br",
		"Bien à vous,","br",
		"PMSign"
	]);
	tabTextType[tabTextType.length] = new TextType("Dossier validé", "SMS", "Jeune", [
		"Bonjour ","YGFirstName","br",
		"Je fais suite à la validation de ton dossier chez NQT. Félicitation !","br",
		"Avant l’étape de la mise en mentorat, je t'invite à m’appeler ou à m'indiquer tes disponibilités pour que nous puissions fixer un rendez-vous téléphonique. Le but est de faire le point sur ton projet professionnel.","br",
		"Je suis joignable du lundi au jeudi de 9h à 18h et le vendredi de 9h à 12h","br",
		"Au plaisir de t'accompagner 😉","br",
		"Très belle journée et à bientôt,","br",
		"PMSign"
	]);
	tabTextType[tabTextType.length] = new TextType("Dossier validé - Relance", "SMS", "Jeune", [
		"Bonjour ", "YGFirstName",",","br",
		"Afin de faire le point sur ton projet professionnel, quand serais-tu disponible pour un échange téléphonique ? C'est une étape importante avant de te mettre en relation avec un mentor.","br",
		"De mon côté, je suis joignable du lundi au jeudi de 9h à 18h et le vendredi de 9h à 12h.","br",
		"N'hésite pas à m'appeler ou à m'indiquer tes disponibilités par SMS ou mail.","br",
		"Bonne journée à toi et à bientôt.","br",
		"PMSign"
	]);
	tabTextType[tabTextType.length] = new TextType("Dossier validé - Dernière relance", "SMS", "Jeune", [
		"Bonjour ","YGFirstName",",","br",
		"Suite à ton inscription chez NQT, tu as dû recevoir un mail de validation de dossier, et plusieurs appels pour faire le point sur ton projet professionel. Cette étape est importante pour bien identifier ton profil et te mettre en relation avec un mentor","br",
		"Es-tu toujours intéressé","YGGender"," par notre dispositif d’accompagnement ?","br",
		"Si c’est le cas, je t'invite à me rappeler dès que possible, ou à m'indiquer tes disponibilités pour que nous puissions fixer un rendez-vous téléphonique.","br",
		"En l'absence de réponse, je serais contraint","PMGender"," de clôturer ton dossier le ","closingDate",".","br",
		"Dans l'attente de ton retour,","br",
		"PMSign"
	]);
	tabTextType[tabTextType.length] = new TextType("Dernière relance suivi mentorat", "SMS", "Jeune", [
		"Bonjour ","YGFirstName",",","br",
		"Sauf erreur de ma part, je suis toujours dans l'attente de ton bilan de mentorat. Merci d'y répondre via le mail ayant pour objet “NQT - Dernière relance suivi mentorat”.","br",
		"Ce bilan est obligatoire pour maintenir ton mentorat et le compte NQT actif.","br",
		"Sans réponse de ta part d'ici le ","closingDate"," je serai contraint de clôturer ton dossier.","br",
		"Merci de ta compréhension,","br",
		"Très belle journée à toi.","br",
		"PMSign"
	]);
}

/**Paramètre la liste des boutons SMS et Mail*/
function setButtonList() {
	var ec ; //Elément crée
	var ed ; //Elément de destination

	var textNode ;
	var bodyElem = document.getElementById("body") ; 

	//Vide la page web
	bodyElem.innerHTML = "" ;
	tabText = null ;

	//Ajoute le titre de la catégorie SMS - Jeune
	ec = document.createElement("div") ;
	ec.id = "zoneButtSMSYG" ;
	bodyElem.appendChild(ec) ;

	ec = document.createElement("h1") ;
	textNode = document.createTextNode("SMS type - Jeune") ;
	ec.appendChild(textNode) ;
	document.getElementById("zoneButtSMSYG").appendChild(ec) ;

	//Ajoute le titre de la catégorie Mail - Jeune
	ec = document.createElement("div") ;
	ec.id = "zoneButtMailYG" ;
	bodyElem.appendChild(ec) ;

	ec = document.createElement("h1") ;
	textNode = document.createTextNode("Mail type - Jeune") ;
	ec.appendChild(textNode) ;
	document.getElementById("zoneButtMailYG").appendChild(ec) ;

	//Ajoute le titre de la catégorie SMS - Mentor
	ec = document.createElement("div") ;
	ec.id = "zoneButtSMSM" ;
	bodyElem.appendChild(ec) ;

	ec = document.createElement("h1") ;
	textNode = document.createTextNode("SMS type - Mentor") ;
	ec.appendChild(textNode) ;
	document.getElementById("zoneButtSMSM").appendChild(ec) ;

	//Ajoute le titre de la catégorie Mail - Mentor
	ec = document.createElement("div") ;
	ec.id = "zoneButtMailM" ;
	bodyElem.appendChild(ec) ;

	ec = document.createElement("h1") ;
	textNode = document.createTextNode("Mail type - Mentor") ;
	ec.appendChild(textNode) ;
	document.getElementById("zoneButtMailM").appendChild(ec) ;

	for (let i = 0; i < tabTextType.length; i++) {
		switch (tabTextType[i].type) {
			case "SMS":
				ed = "zoneButtSMS" ;
				break;
			case "Mail":
				ed = "zoneButtMail" ;
				break;
			default:
				break;
		}
		switch (tabTextType[i].target) {
			case "Jeune" :
				ed += "YG" ;
				break;
			case "Mentor" :
				ed += "M" ;
			default :
				break;
		}

		addButton(tabTextType[i].type+""+i,tabTextType[i].name,"setForm("+i+")",ed) ;
		addBr(ed) ;
	}
}

function setForm(tabId) {
	tabText = tabTextType[tabId].txt ;

	var ec ; //Element créé
	var mle = [] ; //Multiple Ligne Element
	var bodyElem = document.getElementById("body") ;

	//Stock chaque donnée nécessaire 1 fois :
	//Cette étape évite les répétitions dans les informations demandées.
	var tabElemAsk = [];
	//Parcour le tableau texte pour pour récupérer chaque KeyElem
	for (let i = 0; i < tabText.length; i++) {
		//Pour chaque cellule du tabText vérifie s'il s'agit d'un KeyElm en parcourant la liste des KeyElems
		for (let j = 0; j < tabKeyElem.length; j++) {
			//Vérifie si le nom du KeyElem est le même que celui dans la cellule texte et que le KeyElem n'est pas une constante
			if(tabText[i] == tabKeyElem[j].name && tabKeyElem[j].type!="const") {
				//Vérfie si l'id KeyElem est déjà dans le tableau
				if(!isInTabKeyElm(tabElemAsk, tabKeyElem[j])){tabElemAsk[tabElemAsk.length] = tabKeyElem[j];}
			}
		}
	}

	//Vide la page web
	bodyElem.innerHTML = "" ;
	
	//Ajoute l'élément Form
	ec = document.createElement("form") ;
	ec.id = "formText" ;
	ec.method = "get" ;
	ec.action = "" ;
	bodyElem.appendChild(ec) ;

	for (let i = 0; i < tabElemAsk.length; i++) {
		mle = tabElemAsk[i].writeInputMode() ;
		addMultipleElement(mle, "formText") ;
		addBr("formText") ;
	}

	addButton("writeTxt","Ecris le texte","writeTxt()","body") ;

	addBr("body") ;

	addButton("backButt","Retour","setButtonList()","body") ;

	if(tabElemAsk.length==0) {
		writeTxt() ;
	}
}

function writeTxt() {
	var divToCopy = document.createElement("div") ;
	var deIP = 0 ; //Numéro destination en cours dans le tableau
	var tabde = [divToCopy] ; //Tableau des éléments de destination
	tabde[deIP].id = "copyText" ;



	var isElemKey ;
	var idElmKey ;
	for (let i = 0; i < tabText.length; i++) {
		isElemKey = false ;
		for (let j = 0; j < tabKeyElem.length; j++) {
			if(tabText[i]==tabKeyElem[j].name) {isElemKey = true ; idElmKey = j ;}
		}

		if(isElemKey) { 
			switch (tabKeyElem[idElmKey].type) {
				case "const" :
					switch (tabKeyElem[idElmKey].category) {
						case "text":
							tabde[deIP].appendChild(document.createTextNode(tabKeyElem[idElmKey].contenu)) ;
							break;
						case "detail":
							if (tabKeyElem[idElmKey].contenu) {tabde[deIP].appendChild(document.createTextNode("e"));}
							break;
						case "startTag":
							deIP += 1 ;
							tabde[deIP] = document.createElement(tabKeyElem[idElmKey].contenu);
							break ;
						case "endTag":
							tabde[deIP-1].appendChild(tabde[deIP]) ;
							deIP -= 1 ;
							break;
						default:
							alert(tabKeyElem[idElmKey].category+" n'est pas paramètré.") ;
							break;
					}
					break;
				case "gender" :
					switch (tabKeyElem[idElmKey].category) {
						case "detail":
							if (document.getElementById(tabKeyElem[idElmKey].id+"F").checked) {tabde[deIP].appendChild(document.createTextNode("e"));}
							break;
						case "title":
							if (document.getElementById(tabKeyElem[idElmKey].id+"F").checked) {tabde[deIP].appendChild(document.createTextNode("Mme"));}
							else {tabde[deIP].appendChild(document.createTextNode("M"));}
							break;
						case "lui.elle":
							if (document.getElementById(tabKeyElem[idElmKey].id+"F").checked) {tabde[deIP].appendChild(document.createTextNode("elle"));}
							else {tabde[deIP].appendChild(document.createTextNode("lui"));}
							break;
						case "ton.ta":
							if (document.getElementById(tabKeyElem[idElmKey].id+"F").checked) {tabde[deIP].appendChild(document.createTextNode("ta"));}
							else {tabde[deIP].appendChild(document.createTextNode("ton"));}
							break ;
						default:
							alert(tabKeyElem[idElmKey].category+" n'est pas paramètré.") ;
							break;
					}
					break;
				case "text":
					switch (tabKeyElem[idElmKey].category) {
						case "text":
							tabde[deIP].appendChild(document.createTextNode(document.getElementById(tabKeyElem[idElmKey].id).value)) ;
							break;
						case "dept":
							console.log("A paramètré") ;
							break;
						case "apec":
							let deptNumber = document.getElementById(tabKeyElem[idElmKey].id).value ;
							tabde[deIP].appendChild(document.createTextNode(tabKeyElem[idElmKey].apecContenu(deptNumber))) ;
							break;
						default:
							alert(tabKeyElem[idElmKey].category+" n'est pas paramètré dans le type text.") ;
							break;
					}
					break;
				default:
					alert(tabKeyElem[idElmKey].type+" n'est pas paramètré.") ;
					break;
			}
		}
		else if (tabText[i] == "br") {
			tabde[deIP].appendChild(document.createElement("br")) ;
		}
		else {tabde[deIP].appendChild(document.createTextNode(tabText[i])) ;}
	}

	var bodyElem = document.getElementById("body") ;
	bodyElem.innerHTML = "" ;
	bodyElem.appendChild(tabde[deIP]) ;

	addButton("copyTxt","Copier le texte","copyFromIdToClip('copyText')","body") ;

	addBr("body") ;

	addButton("backButt","Retour","setButtonList()","body") ;
}

/*-----Outil d'ajout d'élément HTML-----*/
function addMultipleElement(mle, idMother) {
	for (let j = 0; j < mle.length; j++) {
		document.getElementById(idMother).appendChild(mle[j]) ;
	}
}

/*---Pour ajouter et créer des éléments html rapidement---*/
/*Ajoute de balise br*/
function addBr(id) {document.getElementById(id).appendChild(document.createElement("br")) ;}

/**
 * Ajoute un bouton avec ces paramètres
 * @param {*} id : l'id du bouton
 * @param {*} txt : le texte dans le bouton
 * @param {*} onClickFunc : la fonction du bouton
 * @param {*} idMother : l'id de l'élément mère
 */
function addButton(id, txt, onClickFunc, idMother) {
	var ec ; //Element créé

	ec = document.createElement("button") ;
	ec.id = id ;
	ec.appendChild(document.createTextNode(txt)) ;
	ec.setAttribute("onclick", onClickFunc) ;

	document.getElementById(idMother).appendChild(ec) ;
	return ec ;
}


/*-----Fonction outil générique-----*/
/*Fonction qui copie un texte riche en paramètre
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

/**
 * Vérifie si l'objet est le tableau t
 * @param {*} t = tableau
 * @param {*} o = objet
 */
function isInTabKeyElm(t, o) {
	var isIn = false ;
	for (let k = 0; k < t.length; k++) {
		if(t[k].id == o.id ) {isIn = true ;}
	}
	return isIn ;
}