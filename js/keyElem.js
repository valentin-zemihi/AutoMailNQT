/*Gender : true = femme, false = homme*/

/**Liste des éléments clés pour mail auto
 * Pour les Genders : true = femme et false = homme
 * 
 * YGFirstName : Prénom du jeune ;
 * YGLastName : Nom de famille du jeune ;
 * YGGender : Genre du jeune pour detail "e" ;
 * YGPP : avec YGGender "Il/Elle" ; //PP pour Pronom Personnel
 * YGTitle : Titre genré du jeune "Monsieur/Madame" ;
 * YGDept : Département du jeune ;
 * YGSearch : Recherche du jeune sous forme de liste : Stage, Alternance, Emploi;
 * YGSearchLow : Avec YGSearch + une action de Lower Case : "Satge" -> "stage" ;
 * YGWork : Travaill du jeune ;
 * YGPres : Texte de présentation du jeune ;
 * YGIdea : Texte de motivation de cette mise en mentorat ;
 * 
 * MFirstName : Prénom du mentor ;
 * MLastName : Nom du mentor ;
 * MGender : Genre du mentor pour detail "e";
 * MTitle : avec MGender titre genré du mentor "Monsieur/Madame" ;
 * MPPT : avec MGender "lui/elle" ; //PPT pour Pronom Personnel Tonique
 * MAD2 : avec MGender "ton/ta" ; //AD2 pour Adjectif Possesif de la deuxième personne
 * MPP : avec MGender "il/elle" ; //PP pour Pronom Personnel
 * MMail : Mail du mentor ;
 * MWork : Travail du mentor ;
 * 
 * PMFirstName : Prénom de l'employé NQT ;
 * PMLastName : Prénom de l'employé NQT ;
 * PMWork : Poste de l'employé NQT ;
 * PMRegion : Région de l'employé NQT ;
 * PMGender : Genre de l'employé NQT ;
 * PMGeurice : avec PMGenre, accord eur.rice de l'employé NQT ;
 * PMSignSMS : Signature SMS de l'employé NQT ;
 * 
 * EventName : Nom de l'événement ;
 * EventDate : Date de l'événement ;
 * EventTime : Horaire de l'événement ;
 * EventProgX : Programme de l'événement x ;
 * EventLink : Lien de l'événement ;
 * EventLinkVisio : Lien visio de l'événement ;
 *  
 * ApecGE : Cas particulieur au Grand-Est, proposition APEC en fonction du département
 * 
 * EmploymentAdvisor : Nom du conseiller pôle emploi
 * 
 * registrationDate : Date d'inscription ;
 * 
 * closingDate : Date de clôture du dossier pour dernière relance ;
 * 
 * startUL : Initie la balise HTML <ul></ul>
 * startLI : Initie la balise HTML <li></li>
 * startStrong : Initie la balise HTML <strong></strong>
 * endUL : clôt la balise HTML <ul></ul>
 * endLI : clôt la balise HTML <li></li>
 * endStrong : clôt la balise HTML <strong></strong>
 * endSpan : clôt la balise HTML <span></span>
 * 
 * nextCom : Permet de passer la section "Communication"
 * nextForm : Permet de passer la section "Formation"
 * nextCV : Permet de passer la section "CV"
 * nextIdea : Permet de passer la section "Motivation de la mise en mentorat"
 * nextJob : Permet de passer une section "Job".
 * 
 * ifYGSearchJob : Permet de passer une section en fonction de la recherche du jeune
 */

class KeyElem {
    //Name category sont lié au KeyElem
    //id, type, label et exemple sont les informations utiles pour la partie formulaire
    constructor (name, category, id, type, label, exemple, use) {
        this.name = name ;
        this.category = category ;

        //Information pour la création d'un inputs
        this.id = id ;
        this.type = type ;
        this.label = label ;
        this.exemple = exemple ;

        //---Information de classement
        this.use = use ;
    }

    writeInputMode () {
        var mec = [] ; //Multiple Element create : quand l'input à ajouter en composer de plusieurs éléments cf radio = gender
        var ec ; //Element create
        var ecg ; //Element create girl

        //Crée le label ou le texte en fonction du type
        switch (this.type) {
            case "const" :
                ec = document.createElement("strong") ;
                ec.appendChild(document.createTextNode(this.content)) ;
                mec[mec.length] = ec ;
                break ;
            default :
                //Crée le label de l'input
                ec = document.createElement("label") ;
	            ec.setAttribute("for", this.id) ;
	            ec.appendChild(document.createTextNode(this.label+" : ")) ;
	            mec[mec.length] = ec ;
                break ;
        }
	
        //Crée l'input en fonction du type
        switch (this.type) {
            case "text":
            case "email":
                ec = document.createElement("input") ;
	            ec.name = this.id ;
                ec.id = this.id ;
                ec.type = this.type ;
                ec.placeholder = "Ex. "+this.exemple ;
                mec.push(ec) ;
                break;
            case "longText" :
                ec = document.createElement("br") ;
                mec.push(ec) ;
                ec = document.createElement("textarea") ;
                ec.name = this.id ;
                ec.id = this.id ;
                ec.placeholder = "Ex. "+this.exemple ;
                mec.push(ec) ;
                break ;
            case "gender":
                ec = document.createElement("input") ;
	            ec.name = this.id ;
                ec.id = this.id+"F" ;
                ec.type = "radio" ;
                mec[mec.length] = ec ;

                ec = document.createElement("label") ;
                ec.setAttribute("for", this.id+"F") ;
                ec.appendChild(document.createTextNode("F")) ;
                mec[mec.length] = ec ;

                ec = document.createElement("input") ;
	            ec.name = this.id ;
                ec.id = this.id+"M" ;
                ec.type = "radio" ;
                mec[mec.length] = ec ;

                ec = document.createElement("label") ;
                ec.setAttribute("for", this.id+"M") ;
                ec.appendChild(document.createTextNode("M")) ;
                mec[mec.length] = ec ;
                break;
            case "list" :
                ec = document.createElement("select") ;
                ec.id = this.id ;
                ec.name = this.id ;
                
                for (let i = 0; i < this.exemple.length; i++) {
                    ecg = document.createElement("option") ;
                    ecg.value = this.exemple[i] ;
                    ecg.appendChild(document.createTextNode(this.exemple[i])) ;

                    ec.appendChild(ecg) ;
                }
                mec[mec.length] = ec ;
                break ;
            case "next" :
                ec = document.createElement("input") ;
	            ec.name = this.id ;
                ec.id = this.id ;
                ec.type = "checkbox" ;
                mec[mec.length] = ec ;

                ec = document.createElement("label") ;
                ec.setAttribute("for", this.id) ;
                ec.appendChild(document.createTextNode("Oui")) ;
                mec[mec.length] = ec ;
                break ;
            default:
                break;
        }

        return mec ;
    }

    getValue() {
        var val = "" ;

        var temp ;

        switch (this.category) {
            case "text":
                val = $("#"+this.id).val() ;
                break;
            case "detail":
                if($("#"+this.id+"F").is(':checked')) val = "e" ;
                else val = "" ;
                break ;
            case "title":
                if($("#"+this.id+"F").is(':checked')) val = "Mme" ;
                else val = "M" ;
                break ;
            case "ton.ta":
            case "le.la":
            case "lui.elle":
            case "il.elle":
                temp = this.category.split(".") ;
                if($("#"+this.id+"F").is(':checked')) val = temp[1] ;
                else val = temp[0] ;
                break ;
            case "low.text" :
                temp = $("#"+this.id).val() ;
                val = temp.charAt(0).toLowerCase() + temp.slice(1) ;
                break ;
            case "de.des":
                temp = $("#"+this.id).val() ;
                temp = temp.charAt(0).toLowerCase() + temp.slice(1) ;
                if (/^[aeiouyàâäéèêëîïôöùûüÿ]/i.test(temp)) val = "d'"+temp ;
                else val = "de "+temp ;
                break ;
            case "next":
                if($("#"+this.id).is(':checked')) val = true ;
                else val = false ;
                break ;
            case "apec":
                temp = $(`#${this.id}`).val() ;
                temp = getIdTabInTabByAttr(apecGE, temp, null) ;
                if (temp != null) val = apecGE[temp+1] ;
                else val = null ;
                break ;
            default:
                console.log(`Erreur valeur switch : ${this.category} n'est pas paramètré par dans getValue() de la class KeyElem dans keyElem.js`)
                break;
        }
        return val ;
    }

    getToEditor() {
        var txtToEditor = "" ;
        switch (this.category) {
			case "startTag" :
                if (this.name == "startBR") {txtToEditor += `<startBR>\n` ;}
				else if (this.name == "startLI") {txtToEditor += `\n<${this.name}>` ;}
				else {txtToEditor += `<${this.name}>` ;}
				break ;
			case "endTag" :
				if (this.name == "endStrong" || this.name == "endLI" || this.name == "endSpan") {txtToEditor += `<${this.name}>` ;}
				else {txtToEditor += `\n<${this.name}>\n` ;}
				break ;
            case "endNext" :
				txtToEditor += `<${this.name}>\n` ;
                break;
			default:
				txtToEditor += `<${this.name}>` ;
				break;
		}
        return txtToEditor ;
    }

    getToPrint() {
        var txtToPrint = "" ;

        var temp ;

        switch (this.type) {
            case "text":
            case "gender" :
            case "longText" :
            case "tag" :
            case "const" :
                switch (this.category) {
                    case "low.text" :
                    case "text":
                        txtToPrint = `<span class="highlight">[${this.label}]</span>` ;
                        break;
                    case "title":
                        txtToPrint = `<span class="highlight">[M./Mme]</span>` ;
                        break ;
                    case "detail":
                        txtToPrint = `<span class="highlight">[e]</span>` ;
                        break ;
                    case "lui.elle":
                    case "ton.ta":
                    case "il.elle":
                        temp = this.category.split(".") ;
                        txtToPrint = `<span class="highlight">[${temp[0]}/${temp[1]}]</span>` ;
                        break ;
                    case "eurice":
                        txtToPrint = `<span class="highlight">[eur.rice]</span>` ;
                        break ;
                    case "if" :
                    case "next":
                        txtToPrint = `<span class="highlightNext"><em>[${this.label} Si oui :]</em>` ;
                        break ;
                    case "startTag":
                        txtToPrint = "<"+this.tag+">" ;
                        break;
                    case "endTag" :
                        txtToPrint = "</"+this.tag+">" ;
                        break ;
                    default:
                        txtToPrint = `<span class="highlightError">[${this.name}]</span>` ;
                        console.log(`${this.category} n'est pas défini dans le swiych de goToPrint() dans la class KeyElem dans keyElem.js`)
                        break;
                }        
                break;
            case "list" :
                txtToPrint = `<span class="highlight">[` ;
                for (let i = 0; i < this.exemple.length-1; i++) txtToPrint += this.exemple[i]+"/" ;
                txtToPrint += `${this.exemple[this.exemple.length-1]}]</span>` ;
                break ;
            default:
                txtToPrint = `<span class="highlightError">[${this.name}]</span>` ;
                console.log(`${this.type} n'est pas défini dans le swiych de goToPrint() dans la class KeyElem dans keyElem.js`)
                break;
        }

        return txtToPrint ;
    }

    getToHTML() {
        var txtToHtml = "" ;
        switch (this.type) {
            case "text":
                txtToHtml = this.getValue() ;
                if (txtToHtml == "") {txtToHtml = `<span class="highlight">[${this.label}]</span>`}
                break;
            case "list":
            case "gender":
                txtToHtml = this.getValue() ;
                break;
            default:
                console.log(`Erreur valeur switch : ${this.type} n'est pas paramètré par dans getToHTML() de la class KeyElem dans keyElem.js`)
                break;
        }
        return txtToHtml ;
    }

    getOptionTxt() {
        var txtToOption = "" ;
        switch (this.category) {
            case "text":
            case "dept":
                txtToOption = `<${this.name}> : `+this.label ;
                break;
            case "detail":
                txtToOption = `<${this.name}> : `+this.label+"-[e]" ;
                break ;
            case "details":
                txtToOption = `<${this.name}> : `+this.label+"-[s]" ;
                break ;
            case "eurice":
                txtToOption = `<${this.name}> : `+this.label+"-[eur.rice]" ;
                break ;
            case "il.elle":
            case "lui.elle":
            case "ton.ta":
            case "le.la":
            case "votre.vos":
                txtToOption = `<${this.name}> : `+`${this.label}-[${this.category}]`
                break ;
            case "title":
                txtToOption = `<${this.name}> : `+this.label+"-[M./Mme]" ;
                break ;
            case "low.text":
                txtToOption = `<${this.name}> : `+this.label+"-[texte en minuscule]" ;
                break ;
            case "de.des":
                txtToOption = `<${this.name}> : `+this.label+"-[Précédé de de/d'/des]" ;
                break ;
            case "apec":
                txtToOption = `<${this.name}> : `+"Conseiller APEC en fonction du département du jeune" ;
                break;
            case "startTag":
                txtToOption = `<${this.tag}> : `+ "Début de la balise HTML "+this.tag ;
                break ;
            case "endTag":
                txtToOption = `</${this.tag}> : `+"Fin de la balise HTML "+this.tag ;
                break ;
            case "next":
                txtToOption = `<${this.name}> : Début de balise next si : ${this.label} (fonctionne avec endNext)"` ;
                break ;
            case "endNext":
                txtToOption = `<endNext> : Fin de la balise HTML ${this.tag}` ;
                break ;
            case "if":
                if (this.name == "ifYGSearchJob") txtToOption = `<span> : `+"Début de balise span si le travail du jeune est Emploi (fonctionne avec endSpan)" ;
                break;
            default:
                txtToOption = `<${this.name}> : `+"Erreur : "+this.category ;
                console.log(`Erreur valeur switch : ${this.category} n'est pas paramètré dans getOption() de la class KeyElem dans keyElem.js`)
                break;
        }
        return txtToOption ;
    }

    get useTitle() {
        switch (this.use) {
            case "pmInfo" :
                return "Information CM" ;
            case "ygInfo" :
                return "Information JD" ;
            case "mInfo" :
                return "Information Mentor" ;
            case "eventInfo" :
                return "Information événement" ;
            case "shareInfo" :
                return "Information à partager" ;
            case "dateInfo" :
                return "Information de date" ;
            case "adInfo" :
                return "Information Sourcing" ;
            case "nextTag" :
                return "Balise Next" ;
            case "ifTag" :
                return "Balise Si" ;
            case "layoutTag" :
                return "Balise Mise en page" ;
            default:
                errorSwitch(this.use, "get useTitle()", "keyElem.js") ;
                return this.use ;
        }
    }
}

class ConstElem extends KeyElem {
    constructor (name, category, content, label, use) {
        super(name, category, null,"const", label, null, use) ;
        this.content = content ;
    }

    getValue() {
        var value = false ;

        switch (this.category) {
            case "text":
                value = this.content ;
                break;
            case "detail" :
                if(this.content) {value = "e" ;}
                break ;
            case "eurice" :
                if(this.content) {value = "rice" ;}
                else {value = "eur";}
                break ;
            default:
                alert(this.category+" : cette category n'a pas été paramètrée pour getValue() de ConstElem.")
                break;
        }

        return value ;
    }

    getToHTML() {return this.getValue() ;}
}

class TagElem extends KeyElem {
    constructor (name, category, tag, use) {
        super(name, category, null, "tag", null, null, use) ;
        this.tag = tag ;
    }
    
    getValue() {return this.tag ;}

    getToHTML() {
        var txtToHtml = "" ;
        if (this.category == "startTag") txtToHtml = `<${this.tag}>` ;
        else txtToHtml = `</${this.tag}>` ;
        return txtToHtml ;
    }
}

var tabKeyElem = [] ; //Tableau d'objet KeyElem

/**
 * Initialise la liste des éléments clés utilisés dans les textes.
 * Pour la liste des éléments clés, voir le fichier keyElem.js
 */
function setKeyElemList() {
    //new ConstElem(name, category, content, label)
	tabKeyElem.push(new ConstElem("PMFirstName", "text", activeUser.firstName, "Prénom de l'utilisateur", "pmInfo"));
	tabKeyElem.push(new ConstElem("PMLastName", "text", activeUser.lastName, "Nom de l'utilisateur", "pmInfo"));
	tabKeyElem.push(new ConstElem("PMWork", "text", activeUser.work, "Travail de l'utilisateur", "pmInfo"));
	tabKeyElem.push(new ConstElem("PMRegion", "text", activeUser.region, "Région de l'utilisateur", "pmInfo"));
	tabKeyElem.push(new ConstElem("PMGender", "detail", activeUser.gender, "Genre de l'utilisateur", "pmInfo"));
	tabKeyElem.push(new ConstElem("PMGeurice", "eurice", activeUser.gender, "Genre de l'utilisateur", "pmInfo"));
	tabKeyElem.push(new ConstElem("PMSignSMS", "text", activeUser.sign, "Signature SMS de l'utilisateur", "pmInfo"));
    tabKeyElem.push(new ConstElem("PMMail", "text", activeUser.mail, "Mail de l'utilisateur", "pmInfo"));

	//new KeyElem(name, category, id, type, label, exemple)
	tabKeyElem.push(new KeyElem("YGFirstName", "text","YGFirstName", "text", "Prénom du jeune", "Tom", "ygInfo"));
	tabKeyElem.push(new KeyElem("YGLastName","text", "YGLastName", "text", "Nom du jeune", "Sawyer", "ygInfo"));
	tabKeyElem.push(new KeyElem("YGGender", "detail", "YGGender", "gender", "Genre du jeune", null, "ygInfo"));
	tabKeyElem.push(new KeyElem("YGPP", "il.elle", "YGGender", "gender", "Genre du jeune", null, "ygInfo")); //PP pour Pronom Personnel
	tabKeyElem.push(new KeyElem("YGTitle", "title", "YGGender", "gender", "Genre du jeune", null, "ygInfo"));
	tabKeyElem.push(new KeyElem("YGDept", "dept", "YGDept", "text", "Département du jeune", "50", "ygInfo"));
	tabKeyElem.push(new KeyElem("YGSearch", "text", "YGSearch","list", "Recherche du jeune", ["Stage", "Alternance", "Emploi"], "ygInfo"));
	tabKeyElem.push(new KeyElem("YGSearchLow", "low.text", "YGSearch","list", "Recherche du jeune", ["Stage", "Alternance", "Emploi"], "ygInfo")); //Low pour en minuscule
	tabKeyElem.push(new KeyElem("YGSearchAP", "de.des", "YGSearch","list", "Recherche du jeune", ["Stage", "Alternance", "Emploi"], "ygInfo")); //AP pour Article Partitif
	tabKeyElem.push(new KeyElem("YGWork","text", "YGWork", "text", "Poste occupé par le jeune", "Vendeur de journaux", "ygInfo"));
	tabKeyElem.push(new KeyElem("YGPres", "text", "YGPres", "longText", "Présentation du jeune", "jeune orphelin préférant l'école buissonière. (Pensez au point final)", "ygInfo"));
	tabKeyElem.push(new KeyElem("YGIdea", "text", "YGIdea", "longText", "Motivation de cette mise en relation", "Votre accompagnement lui permettrait de définir un projet professionnel où son envie d'aventure pourra librement s'exprimer. (Pensez au point final)", "ygInfo"));

	tabKeyElem.push(new KeyElem("MFirstName","text", "MFirstName", "text", "Prénom du mentor", "Thomas", "mInfo"));
	tabKeyElem.push(new KeyElem("MLastName","text", "MLastName", "text", "Nom du mentor", "Pesquet", "mInfo"));
	tabKeyElem.push(new KeyElem("MGender", "detail", "MGender", "gender", "Genre du mentor", null, "mInfo"));
	tabKeyElem.push(new KeyElem("MTitle", "title", "MGender", "gender", "Genre du mentor", null, "mInfo"));
	tabKeyElem.push(new KeyElem("MMail", "text", "MMail", "text", "Mail du mentor", "thomas.pesquet@space.com", "mInfo"));
	tabKeyElem.push(new KeyElem("MPP", "il.elle", "MGender", "gender", "Genre du mentor", null, "mInfo")); //PP pour Pronom Personnel
	tabKeyElem.push(new KeyElem("MPPT", "lui.elle", "MGender", "gender", "Genre du mentor", null, "mInfo")); //PPT pour Pronom Personnel Tonique
	tabKeyElem.push(new KeyElem("MAD2", "ton.ta", "MGender", "gender", "Genre du mentor", null, "mInfo")); //AD2 pour Adjectif Possesif de la deuxième personne
    tabKeyElem.push(new KeyElem("MPCOD", "le.la", "MGender", "gender", "Genre du mentor", null, "mInfo")); //PCOD pour Pronom Compléments d'objet direct
	tabKeyElem.push(new KeyElem("MWork", "text", "MWork", "text", "Travail du mentor", "Spationaute", "mInfo"));
    tabKeyElem.push(new KeyElem("MMultYG", "votre.vos", "MMultYG", "next", "Accompagne plusieurs jeunes", null, "mInfo"));
    tabKeyElem.push(new KeyElem("MMultD", "details", "MMultYG", "next", "Accompagne plusieurs jeunes", null, "mInfo"));

	tabKeyElem.push(new KeyElem("EventName", "text", "EventName", "text", "Nom de l'événement","Séance de Prana-bindu", "eventInfo"));
	tabKeyElem.push(new KeyElem("EventDate", "text", "EventDate", "text", "Date de l'événement", "13/03/2024", "eventInfo"));
	tabKeyElem.push(new KeyElem("EventTime","text","EventTime", "text", "Horaire de l'événement", "19h10", "eventInfo"));
	tabKeyElem.push(new KeyElem("EventProg1", "text", "EventProg1", "text", "Acte 1 de l'événement", "Présentation", "eventInfo"));
	tabKeyElem.push(new KeyElem("EventProg2", "text", "EventProg2", "text", "Acte 2 de l'événement", "Entrainement physique", "eventInfo"));
	tabKeyElem.push(new KeyElem("EventProg3", "text", "EventProg3", "text", "Acte 3 de l'événement", "Entrainement mental", "eventInfo"));
	tabKeyElem.push(new KeyElem("EventLink", "text", "EventLink", "text", "Lien de l'événement", "www.prana-bindu.dune", "eventInfo"));
	tabKeyElem.push(new KeyElem("EventLinkVisio", "text", "EventLinkVisio", "text", "Lien de la visio de l'événement", "teams.prana-bindu.dune", "eventInfo"));

	tabKeyElem.push(new KeyElem("linkForm", "text", "linkForm", "text", "Lien de la formation", "www.salledutemps.com", "shareInfo"));
    tabKeyElem.push(new KeyElem("linkInteMeet", "text", "linkInteMeet", "text", "Lien de la réunion d'intégration", "www.poudlard.com", "shareInfo"));

	tabKeyElem.push(new KeyElem("closingDate", "text", "closingDate","text","Date de clôture du dossier", "21 juillet", "dateInfo"));
	tabKeyElem.push(new KeyElem("registrationDate", "text", "registrationDate","text","Date d'inscription du dossier", "21 juillet", "dateInfo"));
    tabKeyElem.push(new KeyElem("startMentoringDate", "text", "startMentoringDate", "text", "Date de début du mentorat", "21 juillet", "dateInfo"));
    tabKeyElem.push(new KeyElem("dateMailYG", "text", "dateMailYG", "text", "Date du mail de premier contac du jeune", "21 juillet", "dateInfo"));
    tabKeyElem.push(new KeyElem("dateInteMeet", "text", "dateInteMeet", "text", "Date et horaire de la réunion d'intégration", "Lundi 21 juillet de 2h56 à 5h11", "dateInfo"));

	tabKeyElem.push(new KeyElem("APECGE", "apec", "YGDept", "list", "Département ou QPV du jeune", ["QPV","08","10","51","52","54","55","57","67","68","88"], "ygInfo")); //A modifier

	tabKeyElem.push(new KeyElem("EmploymentAdvisor", "text", "EmploymentAdvisor", "text", "Prénom et nom du prescripteur", "Gandalf LEGRIS", "adInfo"));
    tabKeyElem.push(new KeyElem("ADFirstName","text", "ADFirstName", "text", "Prénom du directeur d'agence", "Albus", "adInfo"));
	tabKeyElem.push(new KeyElem("ADLastName","text", "ADLastName", "text", "Nom du directeur d'agence", "Dumbledore", "adInfo"));
	tabKeyElem.push(new KeyElem("ADTitle", "title", "ADGender", "gender", "Genre du directeur d'agence", null, "adInfo"));
    tabKeyElem.push(new KeyElem("EmploymentAgency", "text", "EmploymentAgency", "text", "Agence du prescripteur", "Communauté de l'Anneau", "adInfo"));

    tabKeyElem.push(new KeyElem("nextCom", "next", "nextCom", "next", "Message communication ?", null, "nextTag"));
	tabKeyElem.push(new KeyElem("nextForm", "next", "nextFrom", "next", "Lien vers la formation ?", null, "nextTag"));
	tabKeyElem.push(new KeyElem("nextCV", "next", "nextCV", "next", "CV disponnible ?", null, "nextTag"));
	tabKeyElem.push(new KeyElem("nextIdea", "next", "nextIdea", "next", "Idée derrière cette proposition ?", null, "nextTag"));
	tabKeyElem.push(new KeyElem("nextJob", "next", "nextJob", "next", "Travail du jeune ?", null, "nextTag"));
    tabKeyElem.push(new KeyElem("nextSoonM", "next", "nextSoonM", "next", "Un mentor est bientôt disponible ?", null, "nextTag")) ;
    tabKeyElem.push(new KeyElem("nextMeteo", "next", "nextMeteo", "next", "Promotion météo des parrainages ?", null, "nextTag")) ;

	tabKeyElem.push(new KeyElem("ifYGSearchJob","if", "YGSearch", "list", "Recherche du jeune", ["Stage", "Alternance", "Emploi"], "ifTag"));

    //new TagElem(name, category, tag)
    tabKeyElem.push(new TagElem("startBR", "startTag", "br", "layoutTag"));
	tabKeyElem.push(new TagElem("startUL", "startTag", "ul", "layoutTag"));
	tabKeyElem.push(new TagElem("startLI", "startTag", "li", "layoutTag"));
	tabKeyElem.push(new TagElem("startStrong", "startTag", "strong", "layoutTag"));
    tabKeyElem.push(new TagElem("endUL", "endTag", "ul", "layoutTag"));
	tabKeyElem.push(new TagElem("endLI", "endTag", "li", "layoutTag"));
	tabKeyElem.push(new TagElem("endStrong", "endTag", "strong", "layoutTag"));
	tabKeyElem.push(new TagElem("endSpan", "endTag", "span", "layoutTag"));
    tabKeyElem.push(new TagElem("endTag", "endTag", null, "layoutTag"));
    tabKeyElem.push(new TagElem("endNext", "endNext", null, "nextTag"));

    //---Fonctionalité "or" en cours de programmation
    //tabKeyElem.push(new KeyElem("orYGReview", "or", "YGReview", "next", "Dossier du jeune examiné", null, "orTag"))
}

/*---Fonction particulière pour l'APEC Grand-Est---*/

var apecGE = [
    "QPV","Contact APEC Grand-Est : Nicolas MARQUES-MIRANDA nicolas.marques-miranda@apec.fr",
	"08","Pour l’APEC Reims : Sandrine GOUPIL sandrine.goupil@apec.fr",
	"10","Pour l'APEC Aube : Laurence FUSTE laurence.fuste@apec.fr",
	"51","Pour l’APEC Reims : Sandrine GOUPIL sandrine.goupil@apec.fr",
	"52","Pour l'APEC Aube : Laurence FUSTE laurence.fuste@apec.fr",
	"54","Pour l’APEC Lorraine : Angéline BASTID angeline.bastid@apec.fr",
	"55","Pour l’APEC Lorraine : Angéline BASTID angeline.bastid@apec.fr",
	"57","Pour l’APEC Moselle : Aicha WYSEUR aicha.wyseur@apec.fr",
	"67","Pour l’APEC Bas-Rhin : Sylvie KONING sylvie.koning@apec.fr",
	"68","Pour l’APEC Haut-Rhin: Franck WOOG franck.woog@apec.fr",
	"88","Pour l’APEC Lorraine : Angéline BASTID angeline.bastid@apec.fr",
] ;

function apecContent(dept) {
	var temp = null ;
    for (let i = 0; i < apecGE.length; i+=2) {
        if(dept==apecGE[i]) {temp = apecGE[i+1] ;}
	}

	if(temp == null) {alert("Les éléments de l'APEC"+dept+" n'ont pas été trouvé.") ;}

    return temp ;
}