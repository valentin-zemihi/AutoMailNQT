/*---Constante de couleur---*/
const FONTCOLOR = "black" ;
const PRIMARYCOLOR = "white" ;
const LINE = 30 ;
const FAILLINE = 5 ;
const NOLINEWIDTH = 20 ;
const FONTSIZE = 14 ;
const MARGETEXT = 5 ;
const MARGEBLOCK = 10 ;
const MARGESECT = 20 ;
const RWAITINGARC = 10 ;

//Détail des sections
const SECTColor = ["40, 50, 118", "16, 144, 48"] ;
const SECTHeight = [MARGESECT*2+239, 150] ;

/*---Variable de canvas---*/
var canvas ;
var ctxt ;

/*---Variable global de dessin---*/
var yMax ;

/**/
class Size {
    constructor(width, height) {
        this.width = width ;
        this.height = height ;
    }
}

window.onload = function () {
    activeUser = JSON.parse(localStorage.getItem("activeUser")) ;
	//Ecris le nom et le prénom de l'utilisateur actif
	ed = document.getElementById("infoActiveUser") ;
	ed.appendChild(document.createTextNode(activeUser.firstName+" "+activeUser.lastName)) ;

    setKeyElemList() ;
    setTextType() ;

    canvas = document.getElementById("canPath") ;
    if (canvas) {
        sizeOnScreen() ;
        ctxt = canvas.getContext("2d") ;
        if (ctxt) {
            drawYGPath() ;
        }
    }
}

function drawYGPath() {
    var tempX ; var tempY ;
    var tempX2 ; var tempY2 ;
    var tempH ; var tempW ;
    var tempSize ;
    var x = canvas.width/3 ;
    yMax = 0 ;
    isFail = false ;

    /***Dessine la section : Prescription***/
    drawSection("Prescription", SECTHeight[0], SECTColor[0]) ; //Dessine le titre de la section et le fond
    yMax += MARGESECT ;
    yMax += drawTxt("Réception des contacts d'un jeune", x, yMax, "center","top", "italic ").height ; //Dessine l'action extérieur : Transfert de dossier
    yMax += drawLine(x, yMax, 1, LINE).height ;
        /*Boucle d'action A : Présentation du mentorat NQT*/
    tempSize = drawBlock(["Présentation du mentorat NQT", "Appel du jeune"], x, yMax, "center", "top") ; //Dessine l'action du CM : Appel du jeune pour prescription
    yMax += tempSize.height ;
            /*Résulat A1 : N'est pas intéressé.e*/
    tempX = x-tempSize.width/2 ;
    tempY = yMax-tempSize.height/2 ;
    tempX -= drawLine(tempX, tempY, -LINE, 1).width ;
    drawTxt("Réponse : N'est pas intéressé", tempX, tempY, "right", "middle","bold ") ; //Dessine le 1er résultat de l'action : "N'est pas intéressé"
            /*Résultat A2 : Pas de réponse*/
    tempX = x+tempSize.width/2 ;
    tempX += drawLine(tempX, tempY, LINE, 1).width ;
    tempX += drawTxt("Pas de réponse", tempX, tempY, "left", "middle", null).width ; //Dessine le 2ème résultat de l'action : "Pas de réponse"
    tempX += drawLine(tempX, tempY, LINE, 1).width ;
                /*Boucle d'action A2A : Envoyer un SMS pour l'action A*/
    tempX += drawBlock(["Envoyer un SMS", "1 relance"], tempX, tempY, "left", "middle").width ; //Dessine l'action du CM : Envoyer un SMS
                        /*Premier texte type et sa boucle*/
    tempSize = drawTextTypeBlock(0, tempX, tempY, "left", "bottom") ; //Dessine le texte type 0 ;
    tempX2 = tempX + tempSize.width/2 ;
    tempY2 = tempY - tempSize.height ;
    drawWaitingLine("Attendre 1 semaine", tempX2, tempY2, x, -1) ;
                        /*Second texte type et sa boucle*/
    tempSize = drawTextTypeBlock(1, tempX, tempY, "left", "top") ;
    tempX2 = tempX + tempSize.width ;
    tempY2 = tempY + tempSize.height/2 ;
    drawEndLine("Attendre 1 semaine", tempX2, tempY2) ;

    tempX += MARGEBLOCK+ctxt.measureText(tabTextType[0].type+" "+tabTextType[0].name).width/2 ;
    tempY -= 2*MARGEBLOCK+FONTSIZE ;
    
    //Dessine le 2ème résultat de l'action : "Doit s'inscrire"
    yMax += drawLine(x, yMax, 1, LINE) ;
    yMax += drawTxt("Réponse : Souhaite s'inscrire", x, yMax, "center", "top", null) ;
    //Dessine l'action du CM : Vérification inscription
    yMax += drawLine(x, yMax, 1, LINE) ;
    yMax += drawBlock(["Vérification inscription"], x, yMax, "center", "top") ;
    //Dessine le résultat de l'action : Non inscrit
    tempX = x+(ctxt.measureText("Vérification inscription").width+MARGEBLOCK*2)/2+MARGETEXT ;
    tempY = yMax-MARGEBLOCK-FONTSIZE/2 ;
    drawTxt("Non",tempX, tempY, "left", "middle", null) ;
    tempX += ctxt.measureText("Non").width+MARGETEXT ;
    drawLine(tempX, tempY, LINE, 1) ;
    tempX += LINE ;
    drawBlock(["Envoyer un SMS"], tempX, tempY, "left", "middle") ;
    tempX += ctxt.measureText("Envoyer un SMS").width+MARGEBLOCK*2 ;
    drawTextTypeBlock(2, tempX, tempY, "left", "middle") ;
    tempX += MARGEBLOCK*2+ctxt.measureText(tabTextType[2].type+" "+tabTextType[2].name).width ;
    drawEndLine("Attendre 1 semaine", tempX, tempY) ;
    tempX += ctxt.measureText("Attendre 1 semaine").width+MARGETEXT*3+LINE/2  ;
    tempY -= FONTSIZE/2;
    drawDotLineTo(tempX, tempY, tempX, tempY-15)
    drawDotLineTo(tempX, tempY-15, x, yMax-MARGEBLOCK*2-FONTSIZE-5) ;
    //Dessine le résultat de l'action : inscrit
    yMax += drawLine(x, yMax, 1, LINE) ;
    yMax += drawTxt("Oui", x, yMax, "center", "top", null) ;
    yMax += drawLine(x, yMax, 1, LINE/2) ;

    /*Dessine la section : Inscription*/
    drawSection("Inscription", SECTHeight[1], SECTColor[1]) ;
    yMax += drawLine(x, yMax, 1, LINE*2.5) ;
    //Dessine l'action : Vérification passage en suivi
    yMax += drawBlock(["Vérification passage en suivi"], x, yMax, "center", "top") ;
    //Dessine le résultat de l'action : Non
    tempX = x+(MARGEBLOCK*2+ctxt.measureText("Vérification passage en suivi").width)/2+MARGETEXT ;
    tempY = yMax-MARGEBLOCK-FONTSIZE/2 ;
    drawTxt("Non",tempX, tempY, "left", "middle", null) ;
    tempX += ctxt.measureText("Non").width+MARGETEXT ;
    drawLine(tempX, tempY, LINE, 1) ;
    tempX += LINE ;
    //Dessine l'action : Appel du jeune pour inscription
    drawBlock(["Appel du jeune pour inscription"], tempX, tempY, "left", "middle") ;
    tempX += MARGEBLOCK*2+ctxt.measureText("Appel du jeune pour inscription").width ;
    drawLine(tempX, tempY, LINE, 1) ;
    tempX += LINE+MARGETEXT ;
    drawTxt("Pas de réponse", tempX, tempY, "left", "middle") ;
    tempX += ctxt.measureText("Pas de réponse").width+MARGETEXT ;
    drawLine(tempX, tempY, LINE, 1) ;
    tempX += LINE ;
    drawBlock(["Envoyer un SMS", "2 relances"], tempX, tempY, "left", "middle") ;
    tempX += ctxt.measureText("Envoyer un SMS").width+MARGEBLOCK*2 ;
    tempY -= (MARGEBLOCK*2+FONTSIZE)*1.5 ;
    tempX2 = tempX+MARGEBLOCK+ctxt.measureText(tabTextType[3].type+" "+tabTextType[3].name).width/2 ;
    drawWaitingLine("Attendre 1 semaine", tempX2, tempY, x, 1) ;
    tempY += drawTextTypeBlock(3, tempX, tempY, "left", "top") ;
    tempX2 = tempX+MARGEBLOCK+ctxt.measureText(tabTextType[4].type+" "+tabTextType[4].name).width*0.90 ;
    tempH = MARGEBLOCK*2+FONTSIZE+LINE/4 ;
    tempY2 = tempY-tempH ;
    drawLine(tempX2, tempY2, 1, tempH) ;
    tempW = 200 ;
    tempX2 -= tempW ;
    drawLine(tempX2, tempY2, tempW, 1) ;
    tempY += drawTextTypeBlock(4, tempX, tempY, "left", "top") ; 
    drawTextTypeBlock(5, tempX, tempY, "left", "top") ;
    

    console.log(yMax-MARGESECT*2-239) ;
}

function drawLine(x, y, w, h) {
    ctxt.fillStyle = "black" ;
    ctxt.fillRect(x, y, w, h) ;

    return new Size(Math.abs(w), h) ;
}

function drawWaitingLine(txt, x1, y1, x2, dir) {
    /*dir = -1 pour gauche et 1 pour droite*/
    var txtWidth = ctxt.measureText(txt).width+MARGETEXT*2 ;
    var tempWidth = x1-x2+1-txtWidth ;
    var tempY = y1-LINE/4 ;

    ctxt.fillStyle = "black" ;
    if (dir < 0) {ctxt.textAlign = "right" ;}
    else {ctxt.textAlign = "left" ;}
    ctxt.textBaseline = "middle" ;
    ctxt.font = FONTSIZE+"px sans-serif" ;

    ctxt.fillRect(x1, y1, 1, -LINE/4) ; //Dessine la petite ligne verticale
    ctxt.fillRect(x1, tempY, dir*(tempWidth/2), 1) ; //Dessine la première partie de la ligne horizontale
    ctxt.fillText(txt, x1+dir*(tempWidth/2+MARGETEXT), tempY) ; //Dessine le texte ;
    ctxt.fillRect(x2, tempY, -dir*tempWidth/2, 1) ; //Dessine la seconde partie de la ligne horizontale

    /*Dessine la flèche au bout de la ligne*/
    ctxt.beginPath() ;
    ctxt.moveTo(x2-dir*1, tempY) ;
    ctxt.lineTo(x2-dir*(1+5), tempY-5) ;
    ctxt.lineTo(x2-dir*(1+5), tempY+5) ;
    ctxt.closePath() ;
    ctxt.fill() ;
}

function drawSection(txt, sectHeight, color) {
    ctxt.fillStyle = "rgba("+color+", 0.25)"
    ctxt.fillRect(0, yMax, canvas.width, sectHeight) ;

    ctxt.fillStyle = FONTCOLOR ;
    ctxt.textAlign = "left" ;
    ctxt.textBaseline = "middle" ;
    ctxt.font = "bold "+FONTSIZE+"px sans-serif" ;
    ctxt.fillText(txt, MARGESECT, yMax+sectHeight/2) ;  
}

function drawBlock(txt, x, y, align, baseline) {
    var blockHeight = MARGEBLOCK*2+FONTSIZE*txt.length ;
    var tempX ;
    var tempY ;
    var tempW ;
    var temp ;

    ctxt.font = FONTSIZE+"px sans-serif" ;
    tempW = ctxt.measureText(txt[0]).width
    for (let i = 1; i < txt.length; i++) {
        temp = ctxt.measureText(txt[i]).width ;
        if (tempW < temp) {tempW = temp;}
    }
    tempW += MARGEBLOCK*2 ;

    switch (align) {
        case "center" : tempX = x-tempW/2 ; break;
        case "left" : tempX = x ; break ;
        default : console.log(align+" n'est pas défini") ; break;
    }

    switch (baseline) {
        case "top" : tempY = y ; break;
        case "middle" : tempY = y - blockHeight/2 ; break ;
        default : console.log(baseline+" n'est pas défini") ; break;
    }

    ctxt.fillStyle = PRIMARYCOLOR ;
    ctxt.strokeStyle = "black" ;
    ctxt.fillRect(tempX, tempY, tempW, blockHeight) ;
    ctxt.strokeRect(tempX, tempY, tempW, blockHeight) ;

    switch (align) {
        case "center" : tempX = x ; break;
        case "left" : tempX = x+tempW/2 ; break ;
        default : console.log(align+" n'est pas défini") ; break;
    }

    ctxt.textAlign = "center" ;
    ctxt.textBaseline = "top" ;
    ctxt.font = FONTSIZE+"px sans-serif" ;
    ctxt.fillStyle = FONTCOLOR ;
    for (let i = 0; i < txt.length; i++) {
        if (i >=1) {ctxt.font = "italic "+FONTSIZE+"px sans-serif" ;}
        ctxt.fillText(txt[i], tempX, tempY+MARGEBLOCK+i*FONTSIZE) ;   
    }

    return new Size(tempW, blockHeight) ;
}

function drawTxt(txt, x, y, align, baseline, deco) {
    var tempX = x ;
    switch (align) {
        case "left" : tempX = x+MARGETEXT ; break ;
        case "right" : tempX = x-MARGETEXT ; break ;
        default : console.log(align+" n'est pas paramètré pour drawTxt()") ; break ;
    }

    ctxt.fillStyle = FONTCOLOR ;
    ctxt.textAlign = align ;
    ctxt.textBaseline = baseline ;
    ctxt.font = deco+FONTSIZE+"px sans-serif" ;
    ctxt.fillText(txt, tempX, y) ;

    return new Size(ctxt.measureText(txt).width+MARGETEXT*2, FONTSIZE+2*MARGETEXT) ;
}

function drawTextTypeBlock(idTextType, x, y, align, baseline) {
    var blockHeight = MARGEBLOCK*2+FONTSIZE;
    var tempTxt = tabTextType[idTextType].type+" "+tabTextType[idTextType].name ;
    var tempX ;
    var tempY ;
    var tempW = ctxt.measureText(tempTxt).width+MARGEBLOCK*2 ;

    switch (align) {
        case "center" : tempX = x-tempW/2 ; break;
        case "left" : tempX = x ; break ;
        default : console.log(align+" n'est pas défini") ; break;
    }

    switch (baseline) {
        case "top" : tempY = y ; break;
        case "bottom" : tempY = y - blockHeight ; break ;
        case "middle" : tempY = y - blockHeight/2 ; break ;
        default : console.log(baseline+" n'est pas défini") ; break;
    }

    ctxt.fillStyle = PRIMARYCOLOR ;
    ctxt.strokeStyle = "black" ;
    ctxt.fillRect(tempX, tempY, tempW, blockHeight) ;
    ctxt.strokeRect(tempX, tempY, tempW, blockHeight) ;

    switch (align) {
        case "center" : tempX = x ; break;
        case "left" : tempX = x+tempW/2 ; break ;
        default : console.log(align+" n'est pas défini") ; break;
    }

    ctxt.textAlign = "center" ;
    ctxt.textBaseline = "top" ;
    ctxt.font = FONTSIZE+"px sans-serif" ;
    ctxt.fillStyle = FONTCOLOR ;
    ctxt.fillText(tempTxt, tempX, tempY+MARGEBLOCK) ;   

    return new Size(tempW, blockHeight) ;
}

function drawEndLine(waitingTime, x, y) {
    var tempX = x ;
    tempX += drawLine(tempX, y, LINE/4, 1).width ;
    tempX += drawTxt(waitingTime, tempX, y, "left", "middle", null).width ;
    tempX += drawLine(tempX, y, LINE/4, 1).width ;
    drawTxt("Fin", tempX, y, "left", "middle", "bold ") ;
}

function drawDotLineTo(x1, y1, x2, y2) {
    ctxt.beginPath() ;
    ctxt.setLineDash([10, 10]) ;
    ctxt.moveTo(x1, y1) ;
    ctxt.lineTo(x2, y2) ;
    ctxt.stroke() ;
    ctxt.setLineDash([]) ;

}

/*---Outils---*/
//Redimensionne le canvas à la taille de la fenêtre
function sizeOnScreen() {
	canvas.width = window.innerWidth-17 ;  
	canvas.height = window.innerHeight ;
}

//Recadre automatiquement le canvas en fonction de la fenêtre
window.onresize = function () {
    sizeOnScreen() ;
    drawYGPath() ;
}

