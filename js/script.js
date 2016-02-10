/* var parasites = {
	
	"parasites":[ 
	{
		id: "para1",
    	pos_x: 79,
    	pos_y: 69,
    	size_x: 46,
    	size_y: 46
	} 
	],
	 "image":"../images/image1.jpj"

	};

 
	
	 

*/

var BreakException= {};
var reussites = 0, erreurs = 0;
var paraValidees = [];
var cordonneesErreurs = [];
var cordonneesValides = [];

var butAC = "";
var togleAffichage = true;

//Choix et chargement de l'image 
// Le choix entre les trois images que nous possedons (0-2)
var choix = getRandomInt(0,2);

	//on recupere l'objet JSON du parasite choisi
var choixObjet = parasites[choix];    

var myTab   = choixObjet.parasites;  //tableau JSON des positions des parasites
var myImage = choixObjet.image;
var myWidth = choixObjet.width;
var myHeight= choixObjet.height;


//creation des references utiles
var box = $("#box");
    box.css({'position':'relative','width':myWidth,'height':myHeight});

var refImage = $('#img');
    refImage.attr('src', myImage+"" );

var textReussites = $("#valPara"), textErreurs = $("#valErreur");
var pX = $("#posX"), pY = $("#posY");



//On recupere le Margin du bloc "section" pour aligner les blocs "Section" et "Commandes"
var comMarginTop = $("#section").offset().top;

$(".topCom").css({"margin-top": (comMarginTop+10)+"px"});
$(".bottomCom").css({"margin-bottom": "10px",});


// Methodes 
function updateScore(){
	textReussites.text(reussites);
	textErreurs.text(erreurs);
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function renit(){
	reussites=0, erreurs=0;
	paraValidees = [];
	
	$('.erreurs').remove();
	$('.valides').remove();
	//$('erreurs')
	updateScore();
}

function showHide(){
		if(togleAffichage){
			//si c'est true alors on cache tous les //points d'erreurs et reussites
			$('.erreurs').css({'visibility':'hidden'});
			$('.valides').css({'visibility':'hidden'});
			togleAffichage = false;
			$("#afficher").text('Afficher');
		}
		else
		{
			$('.erreurs').css({'visibility':'visible'});
			$('.valides').css({'visibility':'visible'});
			togleAffichage = true;
			$("#afficher").text('Cacher');
		}
}

function affichePosition(x,y){
	pX.text(x);
	pY.text(y);
}

function validClick(indexPara){
	       //On incremente le nombre de reussites
			reussites++;
			
			//On ajoute l'index actuel dans la liste des parasites déjà trouvées
			paraValidees.push(indexPara);
			
			//on crée un contour
				  //C'est ici que l'on va creer le point d'Erreur à l'endroit du click
				  var newErrorJS = document.createElement('span');
				  var newError  = $(newErrorJS);

				  			//propriétés de positionnement
				  newError.attr( 'class','valides' );
				  newError.css({ 'top':(myTab[indexPara].pos_y-5)+'px', 'left':(myTab[indexPara].pos_x)+'px', 'width': myTab[indexPara].size_x, 'height':myTab[indexPara].size_y});
				  newError.appendTo(box);	

			//On actualise le Score
			updateScore();	
}


function verification(valX, valY)
{
	 
	 
	 
	 try
	 {
	 	myTab.forEach( function(parasite, index, tab)
	 	{		
		
			  //Si le click est valide (on a cliqué sur une parasite)
			if( (valX >= parasite.pos_x && (valX <= (parasite.pos_x + parasite.size_x))) && (valY >= parasite.pos_y && (valY <= (parasite.pos_y + parasite. size_y))))
			{
				//Si le tableau des parasites trouvés est vide
				if(paraValidees.length == 0)
				{
					validClick(index);
					
					//On arrete la boucle
					throw BreakException;
				}
				else
				{
					//Si le parasite trouvé est nouveau
					if(paraValidees.indexOf(index) == -1)
					{
					   validClick(index);
					   
					   //On arrete la boucle
					   throw BreakException;
					}
					else
					{
						// Parasite déja trouvé
					   alert("Parasite déja trouvé ! ");   //  +myTab[index].id);
					   
					   //On arrete la boucle
					   throw BreakException;   
					}
						
				}
			}
			else  //erreur *******************************************************************************************************
			{

				
			   // Lorsqu'on fini de parcourrir le tableau des parasites et que les
			  //  coordonnées ne correspondent à rien
			  if((index+1) == tab.length)
			  {
				  //alert("NO, Error !");
				  erreurs++;
				  
				  //C'est ici que l'on va creer le point d'Erreur à l'endroit du click
				  var newErrorJS = document.createElement('span');
				  var newError  = $(newErrorJS);

				  			  //propriétés de positionnement
				  			 // le -10 (valY -10) depends de la taille verticale du texte qui signale l'erreur
				  			//  le -5  (valX -5)  depends de la taille horizontale du texte qui signale l'erreur
				  newError.attr( 'class','erreurs' );
				  newError.css({ 'top':(valY-10)+'px', 'left':(valX-5)+'px' });
				  	
				  	//Ajout des coordonnées de l'erreur dans la liste d'érreurs
				  	var tmpTab = [];
				  	tmpTab.push(valY);  // TOP
				  	tmpTab.push(valX);  // LEFT
				  	cordonneesErreurs.push(tmpTab);
				  		//alert(cordonneesErreurs.length+" - "+cordonneesErreurs[0][1]);
				  			
				  			//
				  var myText = document.createTextNode("X"); 
				  var text = $(myText);
				       
				  			//On insère le texte X dans le "span" 
				  text.appendTo(newError);

				  			//on insère l'element "span" dans le BOX qui contient l'image
				  newError.appendTo(box);		   

				  
				  updateScore();
			  }
			   
			}
			 

		/* sleep(1);  ici je veux faire reposer le thread
		   (Permettre au jeu de ne point planter le navigateur quelque soit le nombre de parasites   valides à rechercher sur l'image.
		   Meme si l'on a autour d'une 1000 parasites.
		*/		
	 	});  
	 }
	 catch(e)
	 {
		if (e!==BreakException) throw e;
	 }
	 
}

$('.valides').click(function(e){
	alert('parasite déjà trouvée !');
});

/*recuperation du positionnement de la souri lors du survol*/
$("#img").mousemove(function(e){
	
	//on recupere l'offset : valeur d'ecartement de l'image
	var $os = $(this).offset();
	
	//on recupere la valeur du scroll de la page
	var scrollTop  = $(window).scrollTop();
	var scrollLeft = $(window).scrollLeft();
	
	//On recupère avec précision la valeur X et Y du surVole(hover)
	var valX = parseInt(e.clientX - $os.left + scrollLeft, 10);
	var valY = parseInt(e.clientY - $os.top  + scrollTop,  10);
	
	//On appelle la fonction d'affichage
	affichePosition(valX, valY);
});

  /* on renitialise les cordonnées à zéro, x=0, y=0  */
$("#img").mouseout(function(e){
	
	//On appelle la fonction d'affichage
	affichePosition(0, 0);
});

/* Reactions aux cliques */
 
	//clique sur l'image
$("#img").click(function(e){
	
	//on recupere l'offset : valeur d'ecartement de l'image
	var $os = $(this).offset();
	
	//on recupere la valeur du scroll de la page
	var scrollTop  = $(window).scrollTop();
	var scrollLeft = $(window).scrollLeft();
	
	//On recupère avec précision la valeur X et Y du cliqué
	var valX = parseInt(e.clientX - $os.left + scrollLeft, 10);
	var valY = parseInt(e.clientY - $os.top  + scrollTop,  10);
	
	 //var val = "X:"+parseInt(e.clientX - $os.left + scrollLeft, 10)+"\nY:"+ parseInt(e.clientY - $os.top + scrollTop, 10);
	//alert(val);
	
	//On appelle la fonction de verification
	verification(valX, valY);
});

	//Clique sur le button "recommencer"
$("#recommencer").click(function(e){
	renit();
});

	//Clique sur le button "afficher"
$("#afficher").click(function(e){
	//on va afficher quoi ?
	showHide();
});
	