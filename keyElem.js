/**Liste des éléments clés pour mail auto
 * YDFirstName : Prénom du jeune ;
 * YDLastName : Nom de famille du jeune ;
 * YDGender : Genre du jeune ;
 * YDGenderTitle : Titre genré du jeune ;
 * YDDept : Département du jeune ;
 * YDSearch : Recherche du jeune ;
 * 
 * MName : Nom complet du mentor ;
 * MGender : Genre du mentor ;
 * MMail : Mail du mentor ;
 * MPronPersTon : avec MGender "lui/elle" ;
 * MAdjPoss : avec MGender "ton/ta" ;
 * 
 * PMGender : Genre du Chargé de mission ;
 * PMSign : Signature du Chargé de mission ;
 * 
 * closingDate : Date de clôture du dossier pour dernière relance ;
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

        //Crée le label de l'input
        ec = document.createElement("label") ;
	    ec.setAttribute("for", this.id) ;
	    ec.appendChild(document.createTextNode(this.label+" : ")) ;
	    mle[mle.length] = ec ;
	
	    ec = document.createElement("input") ;
	    ec.name = this.id ;
        switch (this.type) {
            case "text":
            case "email":
                ec.id = this.id ;
                ec.type = this.type ;
                ec.placeholder = "Ex."+this.exemple ;
                break;
            case "gender":
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