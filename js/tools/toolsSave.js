/**nullTxtToNull(txt)
 * Teste la valeur du texte et le retourne ou null si le texte est "null"
 * @param {String} txt : variable à tester
 * @returns {Null || String} null ou String
 */
function nullTxtToNull(txt) {
    if (txt == "null") return null ;
    return txt ;
}

async function readFile() {
	var uploadTxt = "Lecture du fichier ratée" ;
    const input = document.getElementById('fichier');
	const fichier = input.files[0];

	if (!fichier) {
		alert("Veuillez sélectionner un fichier d'abord.");
		return;
	}

	uploadTxt = await getTextInFile(fichier) ;

    actionTxtFile(uploadTxt) ;
}

function getTextInFile(file) {
	return new Promise((resolve, reject) => {
    	const lecteur = new FileReader();
		lecteur.onload = e => resolve(e.target.result);
		lecteur.onerror = e => reject(e);
		lecteur.readAsText(file);
    });
}


/*----------------------------------------------*/
async function chargerDepuisURL() {
    const url = "js/mon-fichier.txt" ;

	try {
		const reponse = await fetch(url);
		if (!reponse.ok) throw new Error("Fichier introuvable ou inaccessible");
		
		const texte = await reponse.text();
		console.log("Contenu :", texte);
		
		} catch (erreur) {
		alert("Erreur : " + erreur.message);
	}
}