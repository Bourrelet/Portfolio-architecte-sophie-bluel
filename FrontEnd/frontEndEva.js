// HOMEPAGE //
// HOMEPAGE //
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
// Recuperation DATA


// Affichage des Filtres
let displayFilters = function() {

    // DOM Anchor and filter Box
    let filterParent = document.getElementById('filter-daddy');
    let filterBox = document.createElement('div');
    filterBox.classList.add("filterBox"); // Le style css ne s'applique pas a la classe -_-
    filterParent.appendChild(filterBox);

    // Bouton Tous Filter Display
    let tousButton = document.createElement('div'); 
    filterBox.appendChild(tousButton);
    tousButton.innerText = "Tous";
    tousButton.id = 0; 
    tousButton.classList.add("filterButton");
    // Dynamic Filters Dipslay
   for(let i = 0; i < filters.length; i++) {
        let filterTag = document.createElement('div');
        filterBox.appendChild(filterTag); 
        filterTag.innerText= filters[i].name;
        filterTag.id = filters[i].id;   
        filterTag.classList.add("filterButton");         
    }
}
displayFilters()
// Affichage des Filtres


// Affichage des travaux
let gallerie = document.querySelector(".gallery");

// Affichage au chargement
let initWork = function() {
    console.log('Lancement initWork')
for(let work of works) { 
    gallerie.innerHTML += `<figure>
    <img src="${work.imageUrl}" alt="${work.title}">
    <figcaption>${work.title}</figcaption>
    </figure>`
}}
window.addEventListener("load",(initWork()));

// Affichage par filtre

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
// Affichage des travaux

// HOMEPAGE //
// HOMEPAGE //
// HOMEPAGE //


// Twist (and shout) //
const homePage = document.querySelector("#homePage");
const loginPage = document.querySelector("#loginPage");
const logButt = document.querySelector("#logButton");
logButt.addEventListener("click", event => {
    homePage.classList.toggle("invisible");
    loginPage.classList.toggle("invisible");    
})
// (Shaking it beybey) //


/// LOGINPAGE ///
/// LOGINPAGE ///
/// LOGINPAGE ///


const homePageURL = 'http://127.0.0.1:5500/index.html';
const loginURL = 'http://localhost:5678/api/users/login'; // L'URL de swagger
const loginButton = document.querySelector(".loginBox button"); // Mon bouton "se connecter"


let adminMod = function() {
    let modifButton = document.querySelector("#portfolio");
    modifButton.innerHTML += `<span>
    <i class="fa-regular fa-pen-to-square"></i>
    <p>modifier</p>
    </span>`
};

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
            
            // adminMod() // -> Pas glop -> rend inactif les boutons filtres. 
            // Je peux essayer d'utiliser appendchild et createHtmlElement plutot que innerHTML.
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