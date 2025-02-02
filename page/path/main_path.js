/*---Constante de couleur---*/
const FONTCOLOR = "black" ;
const FONTSIZE = 14 ;
const PRIMARYCOLOR = "white" ;
const LINE = 30 ;
const FAILLINE = 5 ;
const NOLINEWIDTH = 20 ;
const MARGETEXT = 5 ;
const MARGEBLOCK = 10 ;
const MARGESECT = 20 ;
const RWAITINGARC = 10 ;

//Détail des sections
const SECTColor = ["40, 50, 118", "16, 144, 48", "0, 176, 219"] ;
const SECTHeight = [309, 230, 150] ;

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
    var temp ;
    var tempX ; var tempY ;
    var tempX2 ; var tempY2 ;
    var tempH ; var tempW ;
    var tempSize ; var tempSize2 ;
    var x = canvas.width/2 ;
    yMax = 0 ;
    isFail = false ;

    ctxt.fillStyle = "white" ;
    ctxt.fillRect(0, 0, canvas.width, canvas.height) ;

    /***Dessine la section : Prescription***/
    drawSection("Prescription", SECTHeight[0], SECTColor[0]) ; //Dessine le titre de la section et le fond
    yMax += MARGESECT ;
    yMax += drawTxt("Réception des contacts d'un jeune", x, yMax, "center","top", "italic ").height ; //Dessine l'action extérieur : Transfert de dossier
    yMax += drawLine(x, yMax, 1, LINE).height ;
        /*Boucle d'action A : Présentation du mentorat NQT*/
    drawActionBlock("A", "Présentation du mentorat NQT", ["Appel - Script", "Message vocal - Script"], ["Réponse : N'est pas intéressé", "Réponse : Souhaite s'inscrire"], [0, 1], "1 semaine", x, yMax, "center", "top") ;

    yMax += 500 ;
    tempSize = drawBlock(["Présentation du mentorat NQT", "Appel du jeune"], x, yMax, "center", "top") ; //Dessine l'action du CM : Appel du jeune pour prescription
    yMax += tempSize.height ;
            /*Résulat A1 : N'est pas intéressé.e*/
    tempX = x-tempSize.width/2 ;
    tempY = yMax-tempSize.height/2 ;
    tempX -= drawLine(tempX, tempY, -LINE/2, 1).width ;
    drawTxt("Réponse : N'est pas intéressé", tempX, tempY, "right", "middle","bold ") ; //Dessine le 1er résultat de l'action : "N'est pas intéressé"
            /*Résultat A2 : Pas de réponse*/
    tempX = x+tempSize.width/2 ;
    tempX += drawLine(tempX, tempY, LINE/2, 1).width ;
    tempX += drawTxt("Pas de réponse", tempX, tempY, "left", "middle", "italic ").width ; //Dessine le 2ème résultat de l'action : "Pas de réponse"
    tempX += drawLine(tempX, tempY, LINE/2, 1).width ;
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
            /*Résultat A3 : Doit s'inscrire*/
    yMax += drawLine(x, yMax, 1, LINE).height ;
    yMax += drawTxt("Réponse : Souhaite s'inscrire", x, yMax, "center", "top", null).height ;
        /*Boucle d'action B : Vérification de l'inscription*/
    yMax += drawLine(x, yMax, 1, LINE).height ;
    tempSize = drawBlock(["Vérification inscription"], x, yMax, "center", "top") ;
    yMax += tempSize.height ;
            /*Résultat B1 : Non inscrit*/
    tempX = x+tempSize.width/2 ;
    tempY = yMax-tempSize.height/2 ;
    tempX += drawTxt("Non",tempX, tempY, "left", "middle", null).width ;
    tempX += drawLine(tempX, tempY, LINE/2, 1).width ;
    tempX += drawBlock(["Envoyer un SMS"], tempX, tempY, "left", "middle").width ;
    tempX += drawTextTypeBlock(2, tempX, tempY, "left", "middle").width ;
    drawEndLine("Attendre 1 semaine", tempX, tempY) ;
            /*Résultat B2 : Inscrit*/
    yMax += drawLine(x, yMax, 1, LINE).height ;
    yMax += drawTxt("Est inscrit", x, yMax, "center", "top", null).height ;
    yMax += drawLine(x, yMax, 1, LINE/2).height ;

    /***Dessine la section : Inscription***/
    drawSection("Inscription", SECTHeight[1], SECTColor[1]) ;
        /*Boucle d'acion C : Vérification de passage en suivi*/
    yMax += drawLine(x, yMax, 1, LINE*2).height ;
    tempSize = drawBlock(["Vérification passage en suivi"], x, yMax, "center", "top") ;
    yMax += tempSize.height ;
            /*Résultat C1 : Non*/
    tempX = x+tempSize.width/2 ;
    tempY = yMax-tempSize.height/2 ;
    tempX += drawTxt("Non",tempX, tempY, "left", "middle", null).width ;
                /*Boucle d'action C1A : Appel du jeune pour poursuivre son inscription*/
    tempX += drawLine(tempX, tempY, LINE/2, 1).width ;
    tempSize = drawBlock(["Appel du jeune pour poursuivre son inscription"], tempX, tempY, "left", "middle") ;
    tempH = tempSize.height ;
                    /*Résultat C1A1 : Doit reprendre l'inscription*/
    tempX2 = tempX+tempSize.width/2 ;
    tempY2 = tempY-tempSize.height/2 ;
    temp = drawLine(tempX2, tempY2, 1, -LINE/2).height ;
    tempH += temp ;
    tempY2 -= temp ;
    temp = drawTxt("Réponse : Doit reprendre l'inscription", tempX2, tempY2, "center", "bottom", null).height ;
    tempH += temp ;
    tempY2 -= temp ;
    tempH += drawWaitingLine("Attendre 1 semaine", tempX2, tempY2, x, -1).height ;
                    /*Résultat C1A2 : Pas de réponse*/
    tempY += tempSize.height/2 ;
    tempX += tempSize.width/2 ;
    temp = drawLine(tempX, tempY, 1, LINE).height ;
    tempH += temp ;
    tempY += temp ;
    tempSize = drawTxt("Pas de réponse", tempX, tempY, "center", "top", "italic ") ;
    tempW = tempSize.width/2 ;
    tempH += tempSize.height/2 ;
    tempX += tempSize.width/2 ;
    tempY += tempSize.height/2 ;
    temp = drawLine(tempX, tempY, LINE/2, 1).width ;
    tempW += temp ;
    tempX += temp ;
    tempSize = drawBlock(["Envoyer un SMS", "2 relances"], tempX, tempY, "left", "middle") ;
    tempW += tempSize.width ;
    tempH -= tempSize.height/2 ;
    tempX += tempSize.width ;
    tempY -= tempSize.height/2 ;
    tempSize = drawTextTypeBlock(3, tempX, tempY, "left", "top") ;
    tempW += tempSize.width/2 ;
    tempX2 = tempX+tempSize.width/2 ;
    tempY2 = tempY ;
    tempY2 -= drawLine(tempX2, tempY2, 1, -tempH).height ;
    drawLine(tempX2, tempY2, -tempW, 1) ;
    tempW = tempSize.width*0.5 ;
    tempH += tempSize.height ;
    tempY += tempSize.height ;
    tempSize = drawTextTypeBlock(4, tempX, tempY, "left", "top") ;
    tempW = (tempX+tempSize.width*0.9)-tempX2 ;
    tempX2 = tempX+tempSize.width*0.9 ;
    tempY2 = tempY ;
    tempY2 -= drawLine(tempX2, tempY2, 1, -tempH).height ;
    drawLine(tempX2, tempY2, -tempW, 1) ;
    tempY += tempSize.height ;
    tempSize = drawTextTypeBlock(5, tempX, tempY, "left", "top") ;
    tempX += tempSize.width ;
    tempY += tempSize.height/2 ;
    drawEndLine("Attendre 1 semaine", tempX, tempY) ;
            /*Résultat C2 : Oui*/
    yMax += drawLine(x, yMax, 1, LINE).height ;
    yMax += drawTxt("Oui", x, yMax, "center", "top", null).height ;
    yMax += drawLine(x, yMax, 1, LINE+37+LINE/2).height ;
    
    /***Dessine la section suivi***/
    drawSection("Suivi sans mentorat", SECTHeight[2], SECTColor[2]) ;
    yMax += drawLine(x, yMax, 1, LINE).height ;


    console.log(yMax) ;
    console.log(yMax-SECTHeight[0]-SECTHeight[1]) ;
}

function drawLine(x, y, w, h) {
    ctxt.fillStyle = "black" ;
    ctxt.fillRect(x, y, w, h) ;

    return new Size(Math.abs(w), Math.abs(h)) ;
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

    return new Size(tempWidth+txtWidth, LINE/4) ;
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
    var tempX ;
    var tempY ;
    switch (align) {
        case "left" : tempX = x+MARGETEXT ; break ;
        case "right" : tempX = x-MARGETEXT ; break ;
        case "center" : tempX = x ; break ;
        default : console.log(align+" n'est pas paramètré pour drawTxt()") ; break ;
    }

    switch (baseline) {
        case "top" : tempY = y+MARGETEXT ; break ;
        case "middle" : tempY = y ; break ;
        case "bottom" : tempY = y-MARGETEXT ; break ;
        default: console.log(baseline+" n'est pas paramètré pour drawTxt()") ; break;
    }

    ctxt.fillStyle = FONTCOLOR ;
    ctxt.textAlign = align ;
    ctxt.textBaseline = baseline ;
    ctxt.font = deco+FONTSIZE+"px sans-serif" ;
    ctxt.fillText(txt, tempX, tempY) ;

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

function drawActionBlock(id, name, tabAction, tabAnswer, tabNoAnswerTextType, waitingTime, x, y, align, baseline) {
    var tempX ; var tempY ;
    var tempW ; var tempH ;
    var tempW2 ;
    var temp ;

    /*Initialise les dimensions du rectangle de fond*/
        /*Initialise le largeur en fonction du texte le plus grand puis y ajoute les marges*/
    tempW = ctxt.measureText(name).width ;  
    for (let i = 0; i < tabAction.length; i++) {
        temp = ctxt.measureText(tabAction[i]).width ;
        if (tempW < temp) {tempW = temp ;}
    }
    tempW += MARGEBLOCK*2 ;
        /*Initialise la hauteur en calculant le nombre de texte (taille du tableau + 1 pour le nom) et les marges*/
    tempH = MARGEBLOCK*2+(FONTSIZE+MARGETEXT)*(tabAction.length+1) ;

    /*Positionne le rectangle de fond en fonction de l'align et du baseline*/
    switch (align) {
        case "center" : tempX = x-tempW/2 ; break;
        case "left" : tempX = x ; break ;
        default : console.log(align+" n'est pas défini") ; break;
    }
    switch (baseline) {
        case "top" : tempY = y ; break;
        case "middle" : tempY = y - tempH/2 ; break ;
        default : console.log(baseline+" n'est pas défini") ; break;
    }

    /*Initialise les paramètre du rectangle*/
    ctxt.fillStyle = PRIMARYCOLOR ;
    /*Dessine le rectangle*/
    ctxt.fillRect(tempX, tempY, tempW, tempH) ;
    /*Initialise l'id de l'action*/
    ctxt.fillStyle = FONTCOLOR ;
    ctxt.font = (FONTSIZE*0.75)+"px sans-serif" ;
    ctxt.textAlign = "left" ;
    ctxt.textBaseline = "top" ;
    /*Dessine l'id de l'action dans le coin supérieur gauche*/
    ctxt.fillText(id, tempX+1, tempY+1) ;
    /*Initialise le texte de l'action*/
    ctxt.font = FONTSIZE+"px sans-serif" ;
    ctxt.textAlign = align ;
    /*Positionne le texte de l'action*/
    tempY += MARGEBLOCK ;
    /*Dessine le nom de l'action*/
    ctxt.fillText(name, x, tempY) ;
    /*Initilise les scripts de l'action*/
    ctxt.font = "italic "+FONTSIZE+"px sans-serif" ;
    /*Positionne les scripts de l'action*/
    /*Pour chaque texte dans l'action : positione et écrit le texte */
    for (let i = 0; i < tabAction.length; i++) {
        tempY += FONTSIZE+MARGETEXT ;
        ctxt.fillText(tabAction[i], x, tempY) ;
    }
    
    /*Initialise la police du texte des résultats*/
    ctxt.font = FONTSIZE+"px sans-serif" ;

    /*Premier résultat*/
        /*Positione le cadre*/
    tempW2 = MARGEBLOCK*2+ctxt.measureText(tabAnswer[0]).width ;
    tempX = x-tempW/2-tempW2 ; tempY = y+tempH ;
    tempH = MARGEBLOCK*2+FONTSIZE ;
        /*Dessine les lignes vers la box*/
    drawLine(tempX+tempW2-LINE/2, tempY-LINE/2, LINE/2, 1) ;
    drawLine(tempX+tempW2-LINE/2, tempY-LINE/2, 1, LINE/2) ;
        /*Initialise la couleur de fond du cadre*/
    ctxt.fillStyle = PRIMARYCOLOR ;
        /*Dessine le cadre*/
    ctxt.fillRect(tempX, tempY, tempW2, tempH) ;
        /*Positione le texte*/
    tempX += tempW/2 ;
    tempY += MARGEBLOCK ;
        /*Initialise la couleur du texte*/
    ctxt.fillStyle = FONTCOLOR ;
        /*Dessine le texte*/
    ctxt.fillText(tabAnswer[0], tempX, tempY) ;

    /*Deuxième résultat*/
        /*Positione le cadre*/
    tempW2 = MARGEBLOCK*2+ctxt.measureText(tabAnswer[1]).width ;
    tempX = x-tempW2/2 ;
        /*Dessine les lignes vers la box*/
    drawLine(x, tempY, 1, -MARGEBLOCK) ;
        /*Initialise la couleur de fond du cadre*/
    ctxt.fillStyle = PRIMARYCOLOR ;
        /*Dessine le cadre*/
    ctxt.fillRect(tempX, tempY, tempW2, tempH) ;
        /*Positione le texte*/
    tempX += tempW/2 ;
    tempY += MARGEBLOCK ;
        /*Initialise la couleur du texte*/
    ctxt.fillStyle = FONTCOLOR ;
        /*Dessine le texte*/
    ctxt.fillText(tabAnswer[1], tempX, tempY) ;

    /*Résultat Pas de réponse*/
        /*Initialise la position du fond*/
    tempX = x+tempW/2 ;
    tempY -= MARGEBLOCK*2
        /*Dessine les lignes vers la box*/
    drawLine(tempX, tempY-LINE/2, LINE/2, 1) ;
    drawLine(tempX+LINE/2, tempY-LINE/2, 1, LINE/2) ;
        /*Initialise la taille du fond*/
    tempW = MARGEBLOCK*2+ctxt.measureText("Pas de réponse").width ;
    tempH = MARGEBLOCK*2+FONTSIZE ;
    /*Initialise le fond de la couleur*/
    ctxt.fillStyle = PRIMARYCOLOR ;
        /*Dessine le fond*/
    ctxt.fillRect(tempX, tempY, tempW, tempH) ;
        /*Positione le texte*/
    tempX += tempW/2 ;
    tempY += MARGEBLOCK ;
        /*Initialise la couleur du texte*/
    ctxt.fillStyle = FONTCOLOR ;
        /*Dessine le texte*/
    ctxt.fillText("Pas de réponse", tempX, tempY) ;
    /*Dessine les SMS types lié aux résultats précédents*/
    ctxt.textAlign = "left" ;

    tempX -= tempW/4 ;
    tempY += FONTSIZE+MARGETEXT ;
    ctxt.font = "italic "+FONTSIZE+"px sans-serif" ;
    ctxt.fillText("Envoie de SMS", tempX, tempY) ;
    ctxt.font = FONTSIZE+"px sans-serif" ;
    for (let i = 0; i < tabNoAnswerTextType.length; i++) {
        tempY += FONTSIZE+MARGETEXT ;
        ctxt.fillText("Tentative "+(i+1)+" : "+tabTextType[tabNoAnswerTextType[i]].type+" "+tabTextType[tabNoAnswerTextType[i]].name, tempX, tempY) ;
    }

    return new Size(0, 0) ;
}

/*---Outils---*/
//Redimensionne le canvas à la taille de la fenêtre
function sizeOnScreen() {
	canvas.width = window.innerWidth-17 ;  
	canvas.height = 1569 ;
}

//Recadre automatiquement le canvas en fonction de la fenêtre
window.onresize = function () {
    sizeOnScreen() ;
    drawYGPath() ;
}

