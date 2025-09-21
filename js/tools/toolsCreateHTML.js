//!\Requiert Jquery pour fonctionner
/*Liste des fonctions :
    - createHTMLElement(elem, id, c, oc, t)
    - createHTMLBR()
    - createHTMLA(id, c, t, target, href)
    - createHTMLImg (id, c, oc, src, alt, title)
    - createHTMLLabel(id, c, t, f)
    - createHTMLSelect(id, c, n)
    - createHTMLOption(t, v)
    - createHTMLForm(id, c, m, a)
    - createHTMLInput(id, c, n, ty, v, p)
    - addCreateHTMLLabelInput(de, idLabel, idInput, cLabel, cInput, n, ty, v, t, p)
*/

/**createHTMLElement(elem, id, c, oc, t)
 * Crée et initialise un élément HTML avec les paramètres donnés
 * @param {string} elem : Type d'élément à créer
 * @param {string} id : Identifiant de l'élément
 * @param {string} c : Classe de l'élément
 * @param {string} oc : Fonction onclick de l'élément
 * @param {string} t : Texte de l'élément
 * @returns retourne l'élément créé
 */
function createHTMLElement(elem, id, c, oc, t) {
    var ec = $(document.createElement(elem)) ; //Element create
    if (id != null) {ec.attr("id", id) ;}
    if (c != null) {ec.addClass(c) ;}
    if (oc != null) {ec.attr("onclick", oc) ;}
    if (t != null) {ec.text(t) ;}
    return ec ;
}

function createHTMLBR() {return $(document.createElement("br")) ;}

function createHTMLBRWithId(id) {
    var ec = createHTMLBR() ;
    ec.attr("id", id) ;
    return ec ;
}

/**createHTMLA(id, c, t, target, href)
 * Crée et initialise un élément a avec les paramètres donnés
 * @param {*} id : Identifiant de l'élément
 * @param {*} c : classe de l'élément
 * @param {*} t : Texte de l'élément
 * @param {*} target : Target de l'élément
 * @param {*} href : lien de l'élément
 * @returns l'élément a
 */
function createHTMLA(id, c, t, target, href) {
    var ec = createHTMLElement("a", id, c, null, t) ;
    if (target != null) {ec.attr("target", target) ;}
    if (href != null) {ec.attr("href", href) ;}
    return ec ;
}

/**createHTMLImg(id, c, oc, src, alt, title)
 * Crée et initialise l'élément img
 * @param {*} id : Identifiant de l'élément
 * @param {*} c : Classe de l'élément
 * @param {*} oc : Fonction onclick de l'élément
 * @param {*} src : Source de l'élément
 * @param {*} alt : Texte alternatif de l'élément
 * @param {*} title : Titre de l'élément
 * @returns : l'élément img
 */
function createHTMLImg (id, c, oc, src, alt, title) {
    var ec = createHTMLElement("img", id, c, oc) ; //Element create
    if (src != null) {ec.attr("src", src) ;}
    if (alt != null) {ec.attr("alt", alt) ;}
    if (title != null) {ec.attr("title", title) ;}
    return ec ;
}

/**
 * Crée et initialise l'élément button
 * @param {String} id : Identifiant de l'élément ;
 * @param {String} c : Classe de l'élément ;
 * @param {String} oc : Fonction onclick de l'élément ;
 * @param {String} ty : Type de l'élément ;
 * @param {String} t : Texte de l'élément :
 * @returns {JQuery HTML Element} : élément button paramètré.
 */
function createHTMLButton(id, c, oc, ty, t) {
    var ec = createHTMLElement("button", id, c, oc, t) ;
    if(ty != null) ec.attr("type", ty) ;
    return ec ;
}

/**createHTMLLabel(id, c, t, f)
 * Crée et initialise l'élément label
 * @param {*} id : Identifiant de l'élément
 * @param {*} c : Classe de l'élément
 * @param {*} t : Texte de l'élément
 * @param {*} f : For de l'élément
 * @returns : l'élément label
 */
function createHTMLLabel(id, c, t, f) {
    var ec = createHTMLElement("label", id, c, null, t) ; //Element create
    if (f != null) {ec.attr("for", f) ;}
    return ec ;
}

/**createHTMLSelect(id, c, n)
 * Crée et initialise l'élément select
 * @param {*} id : Identifiant de l'élément
 * @param {*} c : Classe de l'élément
 * @param {*} n : Nom de l'élément
 * @returns l'élément select
 */
function createHTMLSelect(id, c, n) {
    var ec = createHTMLElement("select", id, c) ; //Element create
    if (n != null) {ec.attr("name", n) ;}
    return ec ;
}

/**createHTMLOption(t, v)
 * Crée et initialise l'élément option
 * @param {*} t : Texte de l'élément
 * @param {*} v : Valeur de l'élément
 * @returns l'élément option
 */
function createHTMLOption(t, v) {
    var ec = createHTMLElement("option", null, null, null, t) ; //Element create
    if (v != null) {ec.attr("value", v) ;}
    return ec ;
}

/**createHTMLForm(id, c, m, a)
 * Crée et initialise l'élément form
 * @param {String} id : ID de l'élément
 * @param {String} c : Class de l'élément
 * @param {String} m : Method de l'élément
 * @param {String} a : Action de l'élément
 * @returns {HTMLElement} élément form
 */
function createHTMLForm(id, c, m, a) {
    var ec = createHTMLElement("form", id, c, null, null, null) ;
    if (m != null) ec.attr("method", m) ;
    if (a != null) ec.attr("action", a) ;
    return ec ;
}

/**createHTMLInput(id, c, n, ty, v, p)
 * Crée et initialise l'élément input
 * @param {*} id : Identifiant de l'élément
 * @param {*} c : Classe de l'élément
 * @param {*} n : Nom de l'élément
 * @param {*} ty : Type de l'élément
 * @param {*} v : Valeur de l'élément
 * @param {*} p : Placeholder de l'élément
 * @returns : l'élément input
 */
function createHTMLInput(id, c, n, ty, v, p) {
    var ec = createHTMLElement("input", id, c, null, null, null) ; //Element create
    if (n != null) {ec.attr("name", n) ;}
    if (ty != null) {ec.attr("type", ty) ;}
    if (v != null) {ec.attr("value", v) ;}
    if (p != null) {ec.attr("placeholder", p) ;}
    return ec ;
}

function addCreateHTMLLabelInput(de, idLabel, idInput, cLabel, cInput, n, ty, v, t, p) {
    de.append(createHTMLLabel(idLabel, cLabel, t, idInput)) ;
    de.append(createHTMLInput(idInput, cInput, n, ty, v, p)) ;
}