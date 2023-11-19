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