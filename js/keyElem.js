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
 * endTag : Clos la balise précédente
 * 
 * nextCom : Permet de passer la section "Communication"
 * nextForm : Permet de passer la section "Formation"
 * nextCV : Permet de passer la section "CV"
 * nextIdea : Permet de passer la section "Motivation de la mise en mentorat"
 * nextJob : Permet de passer une section "Job".
 * 
 * ifYGSearch : Permet de passer une section en fonction de la recherche du jeune
 */

class KeyElem {
    //Name category et content sont lié au KeyElem
    //id, type, label et exemple sont les informations utiles pour la partie formulaire
    constructor (name, category, id, type, label, exemple) {
        this.name = name ;
        this.category = category ;

        //Information pour la création d'un inputs
        this.id = id ;
        this.type = type ;
        this.label = label ;
        this.exemple = exemple ;
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
                mec[mec.length] = ec ;
                break;
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
                ec.id = this.id+"Y" ;
                ec.type = "radio" ;
                mec[mec.length] = ec ;

                ec = document.createElement("label") ;
                ec.setAttribute("for", this.id+"Y") ;
                ec.appendChild(document.createTextNode("Oui")) ;
                mec[mec.length] = ec ;
                break ;
            default:
                break;
        }

        return mec ;
    }

    getValue() {
        var value = "";

        switch (this.category) {
            case "text" :
                value = document.getElementById(this.id).value ;
                if(value == "") {value=null} ;
                break;
            case "low.text" :
                value = document.getElementById(this.id).value ;
                value = value.toLowerCase() ;
                break ;
            case "detail" :
                if(document.getElementById(this.id+"F").checked) {value = "e" ;}
                else {value = "" ;}
                break ;
            case "title" :
                if(document.getElementById(this.id+"F").checked) {value = "Mme" ;}
                else {value = "M"}
                break ;
            case "il.elle" :
                if(document.getElementById(this.id+"F").checked) {value = "elle" ;}
                else {value = "il"}
                break ;
            case "lui.elle" :
                if(document.getElementById(this.id+"F").checked) {value = "elle" ;}
                else {value = "lui"}
                break ;
            case "ton.ta" :
                if(document.getElementById(this.id+"F").checked) {value = "ta" ;}
                else {value = "ton"}
                break ;
            case "apec" :
                value = apecContent(document.getElementById(this.id).value) ; //Récupère un nombre et le compare au tableau apecGe pour trouver le texte
                break ;
            case "next" :
                value = "next" ;
                break ;
            case "if" :
                value = "if" ;
                break ;
            default:
                console.log("getContent() n'a pas été paramètre pour les ConstElem du type : "+this.type) ;
                break;
        }

        return value ;
    }
}

class ConstElem extends KeyElem {
    constructor (name, category, content) {
        super(name, category, null,"const", null, null) ;
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
}

class TagElem extends KeyElem {
    constructor (name, category, tag) {
        super(name, category, null, "tag", null, null) ;
        this.tag = tag ;
    }
    
    getValue() {return this.tag ;}
}

/**
 * Initialise la liste des éléments clés utilisés dans les textes.
 * Pour la liste des éléments clés, voir le fichier keyElem.js
 */
function setKeyElemList() {
	//new KeyElem(name, category, content, id, type, label, exemple)
	tabKeyElem[tabKeyElem.length] = new ConstElem("PMFirstName", "text", tabPM[activeUser].firstName);
	tabKeyElem[tabKeyElem.length] = new ConstElem("PMLastName", "text", tabPM[activeUser].lastName);
	tabKeyElem[tabKeyElem.length] = new ConstElem("PMWork", "text", tabPM[activeUser].work);
	tabKeyElem[tabKeyElem.length] = new ConstElem("PMRegion", "text", tabPM[activeUser].region);
	tabKeyElem[tabKeyElem.length] = new ConstElem("PMGender", "detail", tabPM[activeUser].gender);
	tabKeyElem[tabKeyElem.length] = new ConstElem("PMGeurice", "eurice", tabPM[activeUser].gender);
	tabKeyElem[tabKeyElem.length] = new ConstElem("PMSignSMS", "text", tabPM[activeUser].sign);

	tabKeyElem[tabKeyElem.length] = new KeyElem("YGFirstName", "text","YGFirstName", "text", "Prénom du jeune", "Tom");
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGLastName","text", "YGLastName", "text", "Non du jeune", "Sawyer");
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGGender", "detail", "YGGender", "gender", "Genre du jeune", null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGPP", "il.elle", "YGGender", "gender", "Genre du mentor", null); //PP pour Pronom Personnel
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGTitle", "title", "YGGender", "gender", "Genre du jeune", null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGDept", "dept", "YGDept", "text", "Département du jeune", "50");
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGSearch", "text", "YGSearch","list", "Recherche du jeune", ["Stage", "Alternance", "Emploi"]);
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGSearchLow", "low.text", "YGSearch","list", "Recherche du jeune", ["Stage", "Alternance", "Emploi"]); //P pour Possessif "ton stage"
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGWork","text", "YGWork", "text", "Poste occupé par le jeune", "Vendeur de journaux");
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGPres", "text", "YGPres", "text", "Présentation du jeune", "jeune orphelin préférant l'école buissonière. (Pensez au point final)");
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGIdea", "text", "YGIdea", "text", "Motivation de cette mise en relation", "Votre accompagnement lui permettrait de définir un projet professionnel où son envie d'aventure pourra librement s'exprimer. (Pensez au point final)");

	tabKeyElem[tabKeyElem.length] = new KeyElem("MFirstName","text", "MFirstName", "text", "Prénom du mentor", "Thomas");
	tabKeyElem[tabKeyElem.length] = new KeyElem("MLastName","text", "MLastName", "text", "Nom du mentor", "Pesquet");
	tabKeyElem[tabKeyElem.length] = new KeyElem("MGender", "detail", "MGender", "gender", "Genre du mentor", null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("MTitle", "title", "MGender", "gender", "Genre du mentor", null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("MMail", "text", "MMail", "text", "Mail du mentor", "thomas.pesquet@space.com");
	tabKeyElem[tabKeyElem.length] = new KeyElem("MPP", "il.elle", "MGender", "gender", "Genre du mentor", null); //PP pour Pronom Personnel
	tabKeyElem[tabKeyElem.length] = new KeyElem("MPPT", "lui.elle", "MGender", "gender", "Genre du mentor", null); //PPT pour Pronom Personnel Tonique
	tabKeyElem[tabKeyElem.length] = new KeyElem("MAD2", "ton.ta", "MGender", "gender", "Genre de mentor", null); //AD2 pour Adjectif Possesif de la deuxième personne
	tabKeyElem[tabKeyElem.length] = new KeyElem("MWork", "text", "MWork", "text", "Travail du mentor", "Spationaute");

	tabKeyElem[tabKeyElem.length] = new KeyElem("EventName", "text", "EventName", "text", "Nom de l'événement","Séance de Prana-bindu");
	tabKeyElem[tabKeyElem.length] = new KeyElem("EventDate", "text", "EventDate", "text", "Date de l'événement", "13/03/2024");
	tabKeyElem[tabKeyElem.length] = new KeyElem("EventTime","text","EventTime", "text", "Horaire de l'événement", "19h10");
	tabKeyElem[tabKeyElem.length] = new KeyElem("EventProg1", "text", "EventProg1", "text", "Acte 1 de l'événement", "Présentation");
	tabKeyElem[tabKeyElem.length] = new KeyElem("EventProg2", "text", "EventProg2", "text", "Acte 2 de l'événement", "Entrainement physique");
	tabKeyElem[tabKeyElem.length] = new KeyElem("EventProg3", "text", "EventProg3", "text", "Acte 3 de l'événement", "Entrainement mental");
	tabKeyElem[tabKeyElem.length] = new KeyElem("EventLink", "text", "EventLink", "text", "Lien de l'événement", "www.prana-bindu.dune");
	tabKeyElem[tabKeyElem.length] = new KeyElem("EventLinkVisio", "text", "EventLinkVisio", "text", "Lien de la visio de l'événement", "teams.prana-bindu.dune");


	tabKeyElem[tabKeyElem.length] = new KeyElem("linkForm", "text", "linkForm", "text", "Lien de la formation", "www.salledutemps.com");

	tabKeyElem[tabKeyElem.length] = new KeyElem("closingDate", "text", "closingDate","text","Date de clôture du dossier", "17 novembre");
	tabKeyElem[tabKeyElem.length] = new KeyElem("registrationDate", "text", "registrationDate","text","Date d'inscription du dossier", "17 novembdre");

    //A modifier
	tabKeyElem[tabKeyElem.length] = new KeyElem("ApecGE", "apec", "YGDept", "text", "Département du jeune", "50");

	tabKeyElem[tabKeyElem.length] = new KeyElem("EmploymentAdvisor", "text", "employmentAdvisor", "text", "Prénom et nom du conseiller pôle emploi", "Gandalf LEGRIS");

	tabKeyElem[tabKeyElem.length] = new TagElem("startUL", "startTag", "ul") ;
	tabKeyElem[tabKeyElem.length] = new TagElem("startLI", "startTag", "li") ;
	tabKeyElem[tabKeyElem.length] = new TagElem("startStrong", "startTag", "strong") ;
	tabKeyElem[tabKeyElem.length] = new TagElem("endTag", "endTag", "end") ;

	tabKeyElem[tabKeyElem.length] = new KeyElem("nextCom", "next", "nextCom", "next", "Message communication ?", null) ;
	tabKeyElem[tabKeyElem.length] = new KeyElem("nextForm", "next", "nextFrom", "next", "Lien vers la formation ?", null) ;
	tabKeyElem[tabKeyElem.length] = new KeyElem("nextCV", "next", "nextCV", "next", "CV disponnible ?", null) ;
	tabKeyElem[tabKeyElem.length] = new KeyElem("nextIdea", "next", "nextIdea", "next", "Idée derrière cette proposition ?", null) ;
	tabKeyElem[tabKeyElem.length] = new KeyElem("nextJob", "next", "nextJob", "next", "Travail du jeune ?", null) ;

	tabKeyElem[tabKeyElem.length] = new KeyElem("ifYGSearch","if", "YGSearch", "list", "Recherche du jeune", ["Stage", "Alternance", "Emploi"]);
}