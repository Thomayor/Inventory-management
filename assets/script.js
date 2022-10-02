
//L'application doit proposer les fonctionnalité suivantes:
function Produit(nom, quantite, prixAchatHT, prixVenteHT, type) {
    this.nom = nom;
    this.quantite = Number(quantite);
    this.prixAchatHT = Number(prixAchatHT);
    this.prixVenteHT = Number(prixVenteHT);
    this.type= type;
}

Produit.prototype.calculerMargeHT = function() {
    return  this.prixVenteHT - this.prixAchatHT;
}

Produit.prototype.calculerPVTTC = function() {
    let TVA = 20
    return  this.prixVenteHT / 1+(TVA) ;
}

//! VARIABLES
let btnAdd = document.querySelector(".btnAdd");
let inputNom = document.querySelector(".nom");
let inputQt = document.querySelector(".quantite");
let inputPAHT = document.querySelector(".prixAchatHT");
let inputPVHT = document.querySelector(".prixVenteHT");
let inputType = document.querySelector(".selectType");
let ba = document.querySelector(".ba");
let bna = document.querySelector(".bna");
let affichage = document.querySelector(".affichage");
let degre = document.querySelector(".degre");
let label = document.querySelector(".label");
let recherche= document.querySelector(".stocklist");
let affichageFiltre = document.querySelector(".affichageFiltre")
let modal = document.querySelector(".modal");
let creationproduit= document.querySelector(".creation");
let btnClose = document.getElementsByClassName("close")[0];



// CREATION DU TABLEAU STOCK VIDE POUR LE MOMENT
let stock = [];
let filtre= [];

//partie page principale
modal.style.display = "none";

creationproduit.addEventListener("click", function(){

    modal.style.display ="block";

});

btnClose.addEventListener("click", function (){

    modal.style.display ="none";
});

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


// partie ajout
if(inputType.value =='choixb'){
    degre.style.display = 'none';
    label.style.display = 'none';   
};

// Création d'un Event pour pouvoir choisir et afficher ou non le degré d'alcool selon le type de produits
inputType.addEventListener ('input', function() {
    
    if(inputType.value == 'Sans Alcool' || inputType.value =='choixb'){
        degre.style.display = 'none';
        label.style.display = 'none';

    }else{
        degre.style.display = '';
        label.style.display = '';
    }
});

// CREATION EVENT BOUTON ADD
btnAdd.addEventListener("click", function (e) {
    // EMPÊCHE LA PAGE DE SE RECHARGER
    e.preventDefault ();
    // SI UN DE CES CHAMPS N'EST PAS REMPLI :
    if (!inputNom.value ||
        !inputQt.value ||
        !inputPAHT.value ||
        !inputPVHT.value ||
        !inputType.value
        ) {
        // ENVOYER MESSAGE D'ALERTE A L'UTILISATEUR
        alert("Veuillez remplir tous les champs!")
    } else {

        let newItem = new Produit (
            inputNom.value,
            inputQt.value,
            inputPAHT.value, 
            inputPVHT.value,
            inputType.value);

        // ON AJOUTE UN PRODUIT A NOTRE STOCK (TABLEAU)
        stock.push(newItem);
        console.log(newItem);

        // ON ENREGISTRE LE STOCK (TABLLEAU), DANS LE LOCAL STORAGE
        localStorage.setItem("Produit", JSON.stringify(stock));
    
        // AFFICHAGE DU STOCK (TABLEAU)
        affichageStock ();
    }
});


function affichageStock () {
    if (inputType.value == 'Alcoolisée'){

        Produit.prototype.degre = degre.value;
       

        let para = " ";
        stock.forEach (function (element, index) {
            para += `
            
            
            <p> Nom du Produit : ${element.nom} 
            <br/>
            Quantitées demandées : <input class='inputQT' type='number' min="0" value="${element.quantite}">
            <br/>
            Votre prix d'ACHAT HT :  ${element.prixAchatHT}
            <br/>
            Votre prix de Vente HT : ${element.prixVenteHT}
            <br/>
            Votre MARGE HT : ${element.calculerMargeHT()} 
            
            <br/>
            
            
            Votre Prix de vente TTC : ${element.calculerPVTTC()}
            
            <br/>
            
            Votre type : ${element.type}

            <br/>

            Degré d'alcool : ${element.degre} °


            <button class="btnModif">Modifier</button> 
            <button class="btnRemove">Supprimer</button> </p> <br/>`
        });

        affichage.innerHTML = para;
 
        let delButtons = document.querySelectorAll(".btnRemove");
        let modifButtons = document.querySelectorAll(".btnModif");
        modifier (modifButtons, para, affichage);
        supprimer (delButtons);
    }
    else{
        let para = " ";
        stock.forEach (function (element, index) {
            para += `
            
            
            <p> Nom du Produit : ${element.nom} 
            <br/>
            Quantitées demandées : <input class='inputQT' type='number' min="0" value="${element.quantite}">
            <br/>
            Votre prix d'ACHAT HT :  ${element.prixAchatHT}
            <br/>
            Votre prix de Vente HT : ${element.prixVenteHT}
            <br/>
            Votre MARGE HT : ${element.calculerMargeHT()} 
            
            <br/>
            
            
            Votre Prix de vente TTC : ${element.calculerPVTTC()}
            
            <br/>
            
            Votre type : ${element.type}

            <button class="btnModif">Modifier</button> 
            <button class="btnRemove">Supprimer</button> </p> <br/>`
        });
        
        affichage.innerHTML = para;
        
        let delButtons = document.querySelectorAll(".btnRemove");
        let modifButtons = document.querySelectorAll(".btnModif");
        modifier (modifButtons, para, affichage);
        supprimer (delButtons);
    }

    }


    
    
    function supprimer (delButtons) {
    delButtons.forEach(function(delButton, index) {
        delButton.addEventListener("click", function () {
            stock.splice(index, 1);
            delButton.parentElement.remove();
            localStorage.setItem("Produit", JSON.stringify(stock));
        });
    });
}

function modifier (modifButtons, para, affichage) {
    
    modifButtons.forEach((modifButton, index) => {
        modifButton.addEventListener("click", function () {
            para = `<p> Nom du Produit: <input class='modifNom' type='text' value="${stock[index].nom}">
            <br/>
            Combien en voulez-vous ? : <input class='modifQT' type='number' min="0" value="${stock[index].quantite}">
            <br/>
            Votre prix d'Achat HT: <input class='modifPAHT' type='number' value="${stock[index].prixAchatHT}">
            <br/>
            Votre prix de Vente HT: <input class='modifPVHT' type='number' value="${stock[index].prixVenteHT}">
            <br/>
            Choisir Type de produits: 
            <select name="modifType" class="modifType" value="${stock[index].type}">
                <option value="">-- Choisir boissons --</option>
                <option value="Sans Alcool" class="bna">Boissons non-alcoolisées</option>
                <option value="Alcoolisée" class="ba">Boissons alcoolisées</option>
            </select> <button class='confirm'>Confirmer</button>`

            affichage.innerHTML = para;

            let btnConfirm = document.querySelector(".confirm");
            let modifNom = document.querySelector(".modifNom");
            let modifQT = document.querySelector(".modifQT");
            let modifPAHT = document.querySelector(".modifPAHT");
            let modifPVHT = document.querySelector(".modifPVHT");
            let modifType = document.querySelector(".modifType");


            modifQT.addEventListener("input", function(e){
const modifQT =e.target.value;
        
if (modifQT < 2 ){

   e.target.classList.add("couleur");

}
else {

       e.target.classList.remove("couleur");
   }

            });

            btnConfirm.addEventListener("click", function () {
                    stock[index].nom = modifNom.value;
                    stock[index].quantite = modifQT.value;
                    stock[index].prixAchatHT = modifPAHT.value;
                    stock[index].prixVenteHT = modifPVHT.value;
                    stock[index].type = modifType.value;

                    // ON AJOUTE UN PRODUIT A NOTRE STOCK (TABLEAU)
                    localStorage.setItem("Produit", JSON.stringify(stock));
                    
                    affichageStock ();
            });
        }); 
    });


}

// Function affichage Filtre
function affichageFiltreFunction() {
    // On créer la variable paragraphe à vide
    let paragraphe;
    // On va créer la méthode forEach qui pour chaque element va :
    filtre.forEach(function (element, index) {
      // Créer un paragraphe
  
      // LUI ATTRIBUER UNE VALEUR
      affichageFiltre.innerHTML = `
            
            
      <p> Nom du Produit : ${element.nom} 
      <br/>
      Quantitées demandées : ${element.quantite}
      <br/>
      Votre prix d'ACHAT HT :  ${element.prixAchatHT}
      <br/>
      Votre prix de Vente HT : ${element.prixVenteHT}
      <br/>
      Votre MARGE HT : ${element.calculerMargeHT()} 
      
      <br/>
      
      
      Votre Prix de vente TTC : ${element.calculerPVTTC()}
      
      <br/>
      
      Votre type : ${element.type}`

    });
  }


// Filtrage du tableau
function stockFiltre() {
    // L'evenement keydown sur l'input avec la touche entrer
    recherche.addEventListener("keydown", function (e) {
      if (e.key == "Enter") {
        affichageFiltre.innerHTML = "";
  
        // Tableau-
        filtre = stock.filter(function (element) {
          return (
            // Est-ce que RO va être présent à l'interieur de mon element.nom
            element.nom.toLowerCase().indexOf(recherche.value.toLowerCase()) !=
            -1
          );
        });
  
        affichageFiltreFunction();
      }
    });
  }
  
stockFiltre ();
