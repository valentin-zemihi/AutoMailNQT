/*Gender : true = femme, false = homme*/
class Users {
    constructor (firstName, lastName, gender, work, shortRegion, mail) {
        this.firstName = firstName ;
        this.lastName = lastName ;
        this.gender = gender ;
        this.work = work ;
        this.shortRegion = shortRegion ;
        this.mail = mail ;

        switch (shortRegion[0]) {
            case "ARA" :
                this.region = "Auvergne-Rhône-Alpes" ;
                break;
            case "BFC" :
                this.region = "Bourgogne Franche-Comté" ;
                break;
            case "GE" :
                this.region = "Grand-Est" ;
                break;
            case null :
                /*Do nothing*/
                break ;
            default:
                console.log("Error Switch class Users : "+shortRegion[0]+" n'a pas de nom de région associé.") ;
                break;
        }

        this.sign = this.firstName+" "+this.lastName+", "+this.work+" NQT "+this.shortRegion[0] ;
    }

    getCompleteName() {
        return this.firstName+" "+this.lastName ;
    }
}

/*---------Fonction avec TextType---------*/
var userNull = new Users(null, null, null, null, ALLREGION, null) ;

var activeUser ;
var listUser = [] ;

function setlistUser() {
	listUser.push(new Users("Kevin", "AUBIN", false, "Chargé de mission", ["GE"], "k.aubin@nqt.fr")) ;
	listUser.push(new Users("Lexane", "ASTY", false, "Chargée de mission", ["GE","BFC"], "l.asty@nqt.fr")) ;
	listUser.push(new Users("Sophie", "CORROY", true, "Chargée de mission", ["GE"], "s.corroy@nqt.fr")) ;
	listUser.push(new Users("Laure", "DESNOUVAUX", true, "Chargée de mission", ["GE"], "l.desnouvaux@nqt.fr")) ;
	listUser.push(new Users("Solène", "LIMET", true, "Chargée de mission", ["GE"], "s.limet@nqt.fr")) ;
    listUser.push(new Users("Aurélie", "MADELIN", true, "Chargée de mission", ["BFC"], "a.madelin@nqt.fr")) ;
	listUser.push(new Users("Hugo", "PAYRE", false, "Chargé de mission", ["GE"], "h.payre@nqt.fr")) ;
    listUser.push(new Users("Olivier", "PERREAUT", false, "Délégué régional", ["GE"], "o.perreaut@nqt.fr")) ;
    listUser.push(new Users("Wahiba", "RAMIREZ-VIDAL", true, "Chargée de développement", ["BFC"],"w.ramirez-vidal@nqt.fr")) ; 
	listUser.push(new Users("Xavier", "TRUTI", false, "Chargé de mission", ["GE"], "x.truti@nqt.fr")) ;
    listUser.push(new Users("Valentin", "ZEMIHI", false, "Chargé de mission", ["BFC", "ARA", "BRE", "CVL", "COR", "DROM", "GE", "HDF", "IDF", "NOR", "NA", "OCC", "PDL", "PACA"], "v.zemihi@nqt.fr")) ;
}

function createNewUser() {
	var tempFN = $("#firstNameUser").val();
	var tempLN = $("#lastNameUser").val();
	var tempWork = $("#workUser").val();
	var tempRegion = $("#regionUser").val();
    var tempMail = $("#mailUser").val() ;
	var tempGender ;
	if (document.getElementById("genderUser").value=="F") {tempGender = true ;}
	else {tempGender = false ;}

	return new Users(tempFN, tempLN, tempGender, tempWork, tempRegion, tempMail) ;
}