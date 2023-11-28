/**Liste des éléments clés pour mail auto
 * YGFirstName : Prénom du jeune ;
 * YGLastName : Nom de famille du jeune ;
 * YGGender : Genre du jeune pour detail "e" ;
 * YGGPP : avec YGGender "Il/Elle" ;
 * YGTitle : Titre genré du jeune "Monsieur/Madame" ;
 * YGDept : Département du jeune ;
 * YGSearch : Recherche du jeune sous forme de liste : Stage, Alternance, Emploi;
 * YGSearchP : Avce YGSearch "ton" + une action de Lower Case : "ton stage" ;
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
    constructor (name, category, contenu, id, type, label, exemple) {
        this.name = name ;
        this.category = category ;
        this.contenu = contenu ;

        //Information pour la création d'un inputs
        this.id = id ;
        this.type = type ;
        this.label = label ;
        this.exemple = exemple ;
    }

    writeInputMode () {
        var mle = [] ; //Multiple Ligne Element
        var ec ; //Element create
        var ecg ; //Element create girl

        //Crée le label ou le texte en fonction du type
        switch (this.type) {
            case "const" :
                ec = document.createElement("strong") ;
                ec.appendChild(document.createTextNode(this.contenu)) ;
                mle[mle.length] = ec ;
                break ;
            default :
                //Crée le label de l'input
                ec = document.createElement("label") ;
	            ec.setAttribute("for", this.id) ;
	            ec.appendChild(document.createTextNode(this.label+" : ")) ;
	            mle[mle.length] = ec ;
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
                break;
            case "gender":
                ec = document.createElement("input") ;
	            ec.name = this.id ;
                ec.id = this.id+"F" ;
                ec.type = "radio" ;
                mle[mle.length] = ec ;

                ec = document.createElement("label") ;
                ec.setAttribute("for", this.id+"F") ;
                ec.appendChild(document.createTextNode("F")) ;
                mle[mle.length] = ec ;

                ec = document.createElement("input") ;
	            ec.name = this.id ;
                ec.id = this.id+"M" ;
                ec.type = "radio" ;
                mle[mle.length] = ec ;

                ec = document.createElement("label") ;
                ec.setAttribute("for", this.id+"M") ;
                ec.appendChild(document.createTextNode("M")) ;
                break;
            case "list" :
                ec = document.createElement("select") ;
                ec.id = this.id ;
                ec.name = this.id ;
                
                for (let i = 0; i < this.contenu.length; i++) {
                    ecg = document.createElement("option") ;
                    ecg.value = this.contenu[i] ;
                    ecg.appendChild(document.createTextNode(this.contenu[i])) ;

                    ec.appendChild(ecg) ;
                }
                break ;
            case "next" :
                ec = document.createElement("input") ;
	            ec.name = this.id ;
                ec.id = this.id+"Y" ;
                ec.type = "radio" ;
                mle[mle.length] = ec ;

                ec = document.createElement("label") ;
                ec.setAttribute("for", this.id+"Y") ;
                ec.appendChild(document.createTextNode("Oui")) ;
                mle[mle.length] = ec ;
                break ;
            default:
                break;
        }

        mle[mle.length] = ec ;
        return mle ;
    }

    apecContenu(dept) {
        var dept = dept ;
        var text = "" ;

        if(this.category == "apec") {
            for (let i = 0; i < this.contenu.length; i+=2) {
                if(dept==this.contenu[i]) {
                    text = this.contenu[i+1] ;
                }
            }
        } else {
            alert ("fonction apecContenu exécutée pour un KeyElm de catégorie "+this.category)
        }

        return text ;
    }
}

/**
 * Initialise la liste des éléments clés utilisés dans les textes.
 * Pour la liste des éléments clés, voir le fichier keyElem.js
 */
function setKeyElemList() {
	//new KeyElem(name, category, contenu, id, type, label, exemple)
	tabKeyElem[tabKeyElem.length] = new KeyElem("PMFirstName", "text", tabPM[activeUser].firstName, null, "const", null, null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("PMLastName", "text", tabPM[activeUser].lastName, null, "const", null, null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("PMWork", "text", tabPM[activeUser].work, null, "const", null, null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("PMRegion", "text", tabPM[activeUser].region, null, "const", null, null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("PMGender", "detail", tabPM[activeUser].gender, null, "const", null, null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("PMGeurice", "eurice", tabPM[activeUser].gender, null, "const", null, null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("PMSignSMS", "text", tabPM[activeUser].sign, null, "const", null, null);

	tabKeyElem[tabKeyElem.length] = new KeyElem("YGFirstName", "text", null, "YGFirstName", "text", "Prénom du jeune", "Tom");
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGLastName","text",null, "YGLastName", "text", "Non du jeune", "Sawyer");
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGGender", "detail", null, "YGGender", "gender", "Genre du jeune", null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGTitle", "title", null, "YGGender", "gender", "Genre du jeune", null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGDept", "dept", null, "YGDept", "text", "Département du jeune", "50");
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGSearch", "text", ["Stage", "Alternance", "Emploi"], "YGSearch","list", "Recherche du jeune", null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGSearchP", "ton.text", ["Stage", "Alternance", "Emploi"], "YGSearch","list", "Recherche du jeune", null); //P pour posseif "ton stage"
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGWork","text", null, "YGWork", "text", "Poste occupé par le jeune", "Vendeur de journaux")
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGPres", "text", null, "YGPres", "text", "Présentation du jeune", "jeune orphelin préférant l'école buissonière. (Pensez au point final)") ;
	tabKeyElem[tabKeyElem.length] = new KeyElem("YGIdea", "text", null, "YGIdea", "text", "Motivation de cette mise en relation", "Votre accompagnement lui permettrait de définir un projet professionnel où son envie d'aventure pourra librement s'exprimer. (Pensez au point final)") ;

	tabKeyElem[tabKeyElem.length] = new KeyElem("MFirstName","text", null, "MFirstName", "text", "Prénom du mentor", "Thomas");
	tabKeyElem[tabKeyElem.length] = new KeyElem("MLastName","text",null,"MLastName", "text", "Nom du mentor", "Pesquet");
	tabKeyElem[tabKeyElem.length] = new KeyElem("MGender", "detail", null, "MGender", "gender", "Genre du mentor", null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("MTitle", "title", null, "MGender", "gender", "Genre du mentor", null);
	tabKeyElem[tabKeyElem.length] = new KeyElem("MMail", "text", null, "MMail", "text", "Mail du mentor", "thomas.pesquet@space.com");
	tabKeyElem[tabKeyElem.length] = new KeyElem("MPP", "il.elle", null, "MGender", "gender", "Genre du mentor", null); //PP pour Pronom Personnel
	tabKeyElem[tabKeyElem.length] = new KeyElem("MPPT", "lui.elle", null, "MGender", "gender", "Genre du mentor", null); //PPT pour Pronom Personnel Tonique
	tabKeyElem[tabKeyElem.length] = new KeyElem("MAD2", "ton.ta", null, "MGender", "gender", "Genre de mentor", null); //AD2 pour Adjectif Possesif de la deuxième personne
	tabKeyElem[tabKeyElem.length] = new KeyElem("MWork", "text", null, "MWork", "text", "Travail du mentor", "Spationaute");

	tabKeyElem[tabKeyElem.length] = new KeyElem("EventName", "text", null, "EventName", "text", "Nom de l'événement","Séance de Prana-bindu");
	tabKeyElem[tabKeyElem.length] = new KeyElem("EventDate", "text", null, "EventDate", "text", "Date de l'événement", "13/03/2024");
	tabKeyElem[tabKeyElem.length] = new KeyElem("EventTime","text",null, "EventTime", "text", "Horaire de l'événement", "19h10");
	tabKeyElem[tabKeyElem.length] = new KeyElem("EventProg1", "text", null, "EventProg1", "text", "Acte 1 de l'événement", "Présentation");
	tabKeyElem[tabKeyElem.length] = new KeyElem("EventProg2", "text", null, "EventProg2", "text", "Acte 2 de l'événement", "Entrainement physique");
	tabKeyElem[tabKeyElem.length] = new KeyElem("EventProg3", "text", null, "EventProg3", "text", "Acte 3 de l'événement", "Entrainement mental");
	tabKeyElem[tabKeyElem.length] = new KeyElem("EventLink", "text", null, "EventLink", "text", "Lien de l'événement", "www.prana-bindu.dune");
	tabKeyElem[tabKeyElem.length] = new KeyElem("EventLinkVisio", "text", null, "EventLinkVisio", "text", "Lien de la visio de l'événement", "teams.prana-bindu.dune");


	tabKeyElem[tabKeyElem.length] = new KeyElem("linkForm", "text", null, "linkForm", "text", "Lien de la formation", "www.salledutemps.com");

	tabKeyElem[tabKeyElem.length] = new KeyElem("closingDate", "text", null, "closingDate","text","Date de clôture du dossier", "17 novembre");

	tabKeyElem[tabKeyElem.length] = new KeyElem("registrationDate", "text", null, "registrationDate","text","Date d'inscription du dossier", "17 novembdre");

	tabKeyElem[tabKeyElem.length] = new KeyElem("ApecGE", "apec", apecGE, "YGDept", "text", "Département du jeune", "50");

	tabKeyElem[tabKeyElem.length] = new KeyElem("EmploymentAdvisor", "text", null, "employmentAdvisor", "text", "Prénom et nom du conseiller pôle emploi", "Gandalf LEGRIS");

	tabKeyElem[tabKeyElem.length] = new KeyElem("startUL", "startTag", "ul",null,"const",null,null) ;
	tabKeyElem[tabKeyElem.length] = new KeyElem("startLI", "startTag", "li",null,"const",null,null) ;
	tabKeyElem[tabKeyElem.length] = new KeyElem("startStrong", "startTag", "strong",null,"const",null,null) ;
	tabKeyElem[tabKeyElem.length] = new KeyElem("endTag", "endTag",null,null,"const",null,null) ;

	tabKeyElem[tabKeyElem.length] = new KeyElem("nextCom", "next", null, "nextCom", "next", "Message communication ?", null) ;
	tabKeyElem[tabKeyElem.length] = new KeyElem("nextForm", "next", null, "nextFrom", "next", "Lien vers la formation ?", null) ;
	tabKeyElem[tabKeyElem.length] = new KeyElem("nextCV", "next", null, "nextCV", "next", "CV disponnible ?", null) ;
	tabKeyElem[tabKeyElem.length] = new KeyElem("nextIdea", "next", null, "nextIdea", "next", "Idée derrière cette proposition ?", null) ;
	tabKeyElem[tabKeyElem.length] = new KeyElem("nextJob","next",null,"nextJob","next","Travail du jeune ?",null) ;

	tabKeyElem[tabKeyElem.length] = new KeyElem("ifYGSearch","if",["Stage", "Alternance", "Emploi"], "YGSearch", "list", "Recherche du jeune", null);
}