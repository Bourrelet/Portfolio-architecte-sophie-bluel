// HOMEPAGE //
// Recuperation DATA
let getWorks = async function() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    return works
}
let works = await getWorks() 

let getFilters = async function() {
    const response = await fetch('http://localhost:5678/api/categories');
    const filters = await response.json();    
    return filters
}
let filters = await getFilters()
// Recuperation DATA\  

// Affichage des Filtres
// DOM Anchor and filter Box
let folioAnchor = document.querySelector("#portfolio");
let gallerieGrid = document.querySelector('.gallery')
let filterBox = document.createElement('div');
folioAnchor.insertBefore(filterBox, gallerieGrid); // Insertion des filtres juste avant la gallerie 

// Bouton Tous Filter Display
let tousButton = document.createElement('div'); 
filterBox.appendChild(tousButton);
tousButton.innerText = "Tous";
tousButton.id = 0; 
tousButton.classList.add("filterButton");

// Dynamic Filters Display
let displayFilters = function() {

   for(let i = 0; i < filters.length; i++) {
        let filterTag = document.createElement('div');
        filterBox.appendChild(filterTag); 
        filterTag.innerText= filters[i].name;
        filterTag.id = filters[i].id;   
        filterTag.classList.add("filterButton");         
    }
    filterBox.classList.add("filterBox");
}
displayFilters()
// Affichage des Filtres

// filtrage
let gallerie = document.querySelector(".gallery");

// Fonctions Filtrage
let initWork = function() { 
    console.log('Lancement initWork')
for(let work of works) { 
    gallerie.innerHTML += `<figure>
    <img src="${work.imageUrl}" alt="${work.title}">
    <figcaption>${work.title}</figcaption>
    </figure>`
}}
window.addEventListener("load",(initWork())); // Au chargement de la page

//Filtrage par click
let filtering = function(buttonArg){ // filtre les travaux en fonction du bouton clique
    console.log('filtrage en cours');
    gallerie.innerHTML = ""; // reset gallerie
    if(buttonArg.id == 0 ){ // tous
        initWork(); // Affiche toute la gallerie
        console.log('Lancement initWork');
    } else {         
        for(let work of works) {
            if(work.category.id == buttonArg.id){
                console.log(`Categorie ${work.category.id} -> ${work.category.name}  button id -> ${buttonArg.id}`)
                gallerie.innerHTML += `<figure>
                <img src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
                </figure>`
                    }
                }
    }
}
let buttonList = document.querySelectorAll(".filterButton"); // Identifie le bouton clique et le passe en argument de filtering
for (let button of buttonList){ // button prend les valeurs de la NodeList
    button.addEventListener("click", () => {
        console.log(`click sur bouton ${button.id}`)
        filtering(button)
    });
}


// HOMEPAGE //

// Changement de page au click de login //
const homePage = document.querySelector("#homePage");
const loginPage = document.querySelector("#loginPage");
const logButt = document.querySelector("#logButton");
logButt.addEventListener("click", event => {
    homePage.classList.toggle("invisible");
    loginPage.classList.toggle("invisible");    
})
// Changement de page au click de login //


let adminMod = function() { 
    // affiche le bandeau noir
    let headerAnchor = document.querySelector("header");
    let modHeaderBand = document.createElement('div');
    modHeaderBand.innerHTML= `<span>
    <i class="fa-regular fa-pen-to-square"></i>
    <p>Mode edition</p>
    </span>`;
    headerAnchor.prepend(modHeaderBand); // Definit comme premier-ne de header
    
    // Affiche le bouton modifier
    let folioAnchor = document.querySelector("#portfolio");
    let folioTextBox = document.createElement('div') // une boite pour rassembler le text sur une meme ligne
    let folioTitle = document.querySelector('#portfolio h2');
    let modifButton = document.createElement('div');
    folioAnchor.prepend(folioTextBox); // La boite en premier enfant de portfolio
    folioTextBox.appendChild(folioTitle);
    folioTextBox.appendChild(modifButton);
   
    modifButton.innerHTML += `<span>
    <i class="fa-regular fa-pen-to-square"></i>
    <p>modifier</p>
    </span>`

    // Fait disparaitre les filtres
    filterBox.classList.toggle("invisible");
}


let modale = function() { // affiche la fenetre modale au click de modifier

};


/// LOGINPAGE ///
/// LOGINPAGE ///
/// LOGINPAGE ///


const homePageURL = 'http://127.0.0.1:5500/index.html';
const loginURL = 'http://localhost:5678/api/users/login'; // L'URL de swagger
const loginButton = document.querySelector(".loginBox button"); // Mon bouton "se connecter"




let extractDataForm = function() { // Return les valeurs du formulaire directement dans le bon format.

    let passwordInput = document.querySelector('.loginBox input[name="password"]')
    let emailInput = document.querySelector('.loginBox input[name="email"]')
 
    return `{
     "email": "${emailInput.value}",
     "password": "${passwordInput.value}"
   }`
 }

 loginButton.addEventListener("click", event => {  // Connexion si click

    event.preventDefault();

    let postLogin = fetch(loginURL, { 
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: extractDataForm()
    });

    postLogin // Comment arrive-t-on a recuperer la reponse et le json juste avec des .then ?? Cmt ca marche??
    .then((pouniette) => { // La reponse 'serveur';
        console.log(pouniette.status) // 200 401

        if(!pouniette.ok) {

            throw new Error("Erreur dans l'identifiant ou le mot de passe");

        } else {
            
            // modale() & adminMod()
            adminMod()

            homePage.classList.toggle("invisible");
            loginPage.classList.toggle("invisible");
            return pouniette.json();  // On convertit la reponse en format JSON pour l'exploiter 

        }
    })
    .then((json) => { // Recuperation du token -> Objet userId ; token
        let userToken = json              
    })

});


// / LOGINPAGE ///
// / LOGINPAGE ///
// / LOGINPAGE ///
