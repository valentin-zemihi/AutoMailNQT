/*Gender : true = femme, false = homme*/
class Users {
    constructor (firstName, lastName, gender, work, shortRegion) {
        this.firstName = firstName ;
        this.lastName = lastName.toUpperCase() ;
        this.gender = gender ;
        this.work = work ;
        this.shortRegion = shortRegion ;

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
	listUser.push(new Users("Kevin", "AUBIN", false, "Chargé de mission", "GE")) ;
	listUser.push(new Users("Bilhal", "BENAÏANG", false, "Chargé de mission", "BFC")) ;
	listUser.push(new Users("Sophie", "CORROY", true, "Chargée de mission", "GE")) ;
	listUser.push(new Users("Laure", "DESNOUVAUX", true, "Chargée de mission", "GE")) ;
    listUser.push(new Users("Cannelle", "LEONARD", true, "Chargée de mission", "GE")) ;
    listUser.push(new Users("Olivier", "PERREAUT", false, "Délégué régional", "GE")) ;
    listUser.push(new Users("Wahiba", "RAMIREZ-VIDAL", true, "Chargée de développement", "BFC")) ; 
	listUser.push(new Users("Xavier", "TRUTI", false, "Chargé de mission", "GE")) ;
    listUser.push(new Users("Valentin", "ZEMIHI", false, "Chargé de mission", "BFC")) ;
}

function createNewUser() {
	var tempFN = document.getElementById("firstNameUser").value;
	var tempLN = document.getElementById("lastNameUser").value;
	var tempWork = document.getElementById("workUser").value;
	var tempRegion = document.getElementById("regionUser").value;
	var tempGender ;
	if (document.getElementById("genderUser").value=="F") {tempGender = true ;}
	else {tempGender = false ;}

	return new Users(tempFN, tempLN, tempGender, tempWork, tempRegion) ;
}