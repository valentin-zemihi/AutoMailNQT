/*Gender : true = femme, false = homme*/
class Users {
    constructor (firstName, lastName, gender, work, shortRegion, mail) {
        this.firstName = firstName ;
        this.lastName = lastName.toUpperCase() ;
        this.gender = gender ;
        this.work = work ;
        this.shortRegion = shortRegion ;
        this.mail = mail ;

        switch (shortRegion) {
            case "BFC" :
                this.region = "Bourgogne Franche-Comté" ;
                break;
            case "GE" :
                this.region = "Grand-Est" ;
                break;
            default:
                console.log("Error Switch class Users : "+shortRegion+" n'a pas de nom de région associé.") ;
                break;
        }

        this.sign = this.firstName+" "+this.lastName+", "+this.work+" NQT "+this.shortRegion ;
    }

    getCompleteName() {
        return this.firstName+" "+this.lastName ;
    }
}

/*---------Fonction avec TextType---------*/
var activeUser ;
var listUser = [] ;

function setlistUser() {
	listUser.push(new Users("Kevin", "AUBIN", false, "Chargé de mission", "GE", "k.aubin@nqt.fr")) ;
	listUser.push(new Users("Sophie", "CORROY", true, "Chargée de mission", "GE", "s.corroy@nqt.fr")) ;
	listUser.push(new Users("Laure", "DESNOUVAUX", true, "Chargée de mission", "GE", "l.desnouvaux@nqt.fr")) ;
	listUser.push(new Users("Solène", "LIMET", true, "Chargée de mission", "GE", "s.limet@nqt.fr")) ;
    listUser.push(new Users("Danielle-Ange", "LUETETA", true, "Chargée de mission", "BFC", "d.lueteta@nqt.fr")) ;
	listUser.push(new Users("Hugo", "PAYRE", false, "Chargé de mission", "GE", "h.payre@nqt.fr")) ;
    listUser.push(new Users("Olivier", "PERREAUT", false, "Délégué régional", "GE", "o.perreaut@nqt.fr")) ;
    listUser.push(new Users("Wahiba", "RAMIREZ-VIDAL", true, "Chargée de développement", "BFC","w.ramirez-vidal@nqt.fr")) ; 
	listUser.push(new Users("Xavier", "TRUTI", false, "Chargé de mission", "GE", "x.truti@nqt.fr")) ;
    listUser.push(new Users("Valentin", "ZEMIHI", false, "Chargé de mission", "BFC", "v.zemihi@nqt.fr")) ;
}

function createNewUser() {
	var tempFN = document.getElementById("firstNameUser").value;
	var tempLN = document.getElementById("lastNameUser").value;
	var tempWork = document.getElementById("workUser").value;
	var tempRegion = document.getElementById("regionUser").value;
    var tempMail = document.getElementById("mailUser").value ;
	var tempGender ;
	if (document.getElementById("genderUser").value=="F") {tempGender = true ;}
	else {tempGender = false ;}

	return new Users(tempFN, tempLN, tempGender, tempWork, tempRegion, tempMail) ;
}