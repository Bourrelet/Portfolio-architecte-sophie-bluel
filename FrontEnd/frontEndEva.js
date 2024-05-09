// HOMEPAGE //

// Integration de l'image choisie par User dans le formulaire
// Integration de l'image choisie par User dans le formulaire

let inputFile = document.querySelector("#inputFile");
let userPicBox = document.querySelector('label[for="inputFile"] div');  // Bizarrement le navigateur ne reconnait pas le style "inputFileBox" de la balise div.

inputFile.addEventListener("change", () => { 
    console.log(`inputFile : ${inputFile}`);
    let userPic = inputFile.files[0]; 
    let userPicURL = URL.createObjectURL(userPic); // Merci ChatGPT -> Approfondir le sujet avec MDN.
    console.log(`userPicURL : ${userPicURL}`);
    userPicBox.innerHTML = ""
    userPicBox.innerHTML = `<img src="${userPicURL}" alt="photo about to be sent">`;
})

const emptyUserPicBox = function(){
    userPicBox.innerHTML = `							
    <i class="fa-regular fa-image"></i>
    <span><p>+ Ajouter photo</p></span>				
    <p>jpeg, png : 4mo max</p>
    `
};
// Integration de l'image choisie par User dans le formulaire
// Integration de l'image choisie par User dans le formulaire



// Recuperation DATA
// Recuperation DATA
let getWorks = async function() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    console.log("getting works");
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
// Recuperation DATA

// Display gallerie
// Display gallerie
let gallerie = document.querySelector(".gallery");
let displayGallerie = async function() {
    gallerie.innerHTML = "";
    let works = await getWorks();
    console.log('Lancement displayGallerie')
    for(let work of works) { 
        gallerie.innerHTML += `<figure>
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
        </figure>`
    }
};
window.addEventListener("load",(displayGallerie())); // Au chargement de la page
// Display gallerie
// Display gallerie


// Integration dynamique des filtres
// Integration dynamique des filtres
let folioAnchor = document.querySelector("#portfolio");
let gallerieGrid = document.querySelector('.gallery')
let filterBox = document.createElement('div');
folioAnchor.insertBefore(filterBox, gallerieGrid); // Insertion des filtres juste avant la gallerie 

let tousButton = document.createElement('div'); // Bouton Tous Filter Display
filterBox.appendChild(tousButton);
tousButton.innerText = "Tous";
tousButton.id = 0; 
tousButton.classList.add("filterButton");

let displayFilters = function() { // Dynamic Filters Display
   for(let i = 0; i < filters.length; i++) {
        let filterTag = document.createElement('div'); // cree un bouton pour chaque filtre
        filterBox.appendChild(filterTag); 
        filterTag.innerText= filters[i].name;
        filterTag.id = filters[i].id;   // attribue au bouton le meme id que son filtre
        filterTag.classList.add("filterButton");         
    }
    filterBox.classList.add("filterBox");
}
displayFilters()
// Integration dynamique des filtres
// Integration dynamique des filtres

//Boutons filtres
//Boutons filtres
let filtering = function(buttonArg){ // filtre les travaux en fonction du bouton clique
    console.log('filtrage en cours');
    gallerie.innerHTML = ""; // reset gallerie
    if(buttonArg.id == 0 ){ // si "tous" est le bouton argument
        displayGallerie(); // Affiche toute la gallerie
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
};
let buttonList = document.querySelectorAll(".filterButton"); // Identifie le bouton clique et le passe en argument de filtering
for (let button of buttonList){ // button prend les valeurs de la NodeList
    button.addEventListener("click", () => {
        console.log(`click sur bouton ${button.id}`)
        filtering(button)
    });
}
//Boutons filtres
//Boutons filtres


// HOMEPAGE //

// Affichage de la page login //
// Affichage de la page login //
const homePage = document.querySelector("#homePage");
const loginPage = document.querySelector("#loginPage");
const logButt = document.querySelector("#logButton");

logButt.addEventListener("click", () => {
    homePage.classList.toggle("invisible");
    loginPage.classList.toggle("invisible");    
})
// Affichage de la page login //
// Affichage de la page login //

// Integration Dynamique admin Mod
// Integration Dynamique admin Mod
let bodyAnchor = document.querySelector("body");
let modHeaderBand = document.createElement('header');
let folioTextBox = document.createElement('div')
let folioTitle = document.querySelector('#portfolio h2');
let modifButton = document.createElement('div');

let adminMod = function() {  // Je dois encore changer login en logout
    modHeaderBand.innerHTML= `<i class="fa-regular fa-pen-to-square"></i> <p>Mode edition</p>`;
    bodyAnchor.prepend(modHeaderBand); // Definit comme premier-ne de header

    modHeaderBand.classList.add("rowBox");
    modHeaderBand.classList.add("modHeaderBand");
    
    folioAnchor.prepend(folioTextBox); // La boite txt en premier enfant de portfolio
    folioTextBox.appendChild(folioTitle);
    folioTextBox.appendChild(modifButton); // Affiche le bouton modifier

    folioTextBox.classList.add("rowBox");
    modifButton.classList.add("rowBox");
    modifButton.classList.add("modifButton");
    modifButton.classList.add("anyButton");

    modifButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> <p>modifier</p>`
    filterBox.classList.toggle("invisible");     // Fait disparaitre les filtres
    homePage.classList.toggle("invisible"); // disparition homepage
    loginPage.classList.toggle("invisible"); // apparition loginpage

    logButt.innerHTML = "logout"
    logButt.addEventListener("click", () => { // bouton logout ->
        localStorage.clear(); // vide localstorage
        window.location.reload(true); // rechargement page sans le cache
    });    
}
// Integration Dynamique admin Mod
// Integration Dynamique admin Mod

let modalePage = document.querySelector("#modalePage");
let modaleBox = document.querySelector(".modaleBox")
let originalHeader = document.querySelector('header:not([class])');
let modGallery = document.querySelector(".modGallery")

// Affiche la galerie fonctionnelle de modale1 (images et corbeilles)
// Affiche la galerie fonctionnelle de modale1 (images et corbeilles)
let displayModGallery = async function() {

    modGallery.innerHTML = "";
    let works = await getWorks();
    console.log('Lancement displayModGallery')

    for(let work of works) { // remplit la gallerie de modale1 avec images et corbeilles
        modGallery.innerHTML += `<figure>
        <img src="${work.imageUrl}" alt="${work.title}">
        <div>
        <i class="fa-solid fa-trash-can"></i>
        </div>
        </figure>`

        // Ci-dessous, le selecteur permet de target la corbeille (localBin) actuelle dans la boucle.
        let localBin = document.querySelector(".modGallery figure:last-of-type div"); 
        localBin.setAttribute("id", `${work.id}`); // On lui donne un id identique a celui du work actuel de la boucle. 
    }

    let corbeilles = document.querySelectorAll(".modGallery figure div"); // On def le comportement des corbeilles.
    for (let corbeille of corbeilles) {
        corbeille.addEventListener("click", () => { 
            delWork(corbeille.id); // la corbeille lance delWork() avec son id comme argument.
        });
}
};
// Affiche la galerie fonctionnelle de modale1 (images et corbeilles)
// Affiche la galerie fonctionnelle de modale1 (images et corbeilles)

// Requete DELETE
// Requete DELETE
let delWork = async function(id) { // Delete selon l'id (de la corbeille)renseigne en argument.
    let userToken = localStorage.getItem('userToken');
    console.log(`usertoken -> ${userToken}`);
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + userToken,
            'Accept': '*/*'
        }
    }) 
    .then(response => {
        if(!response.ok){
            throw new Error("Probleme suppression");
                
            } else {
                console.log("Suppression reussie" + response.status);
                displayModGallery();
            }
    })
};
// Requete DELETE
// Requete DELETE

// ouverture et fermeture de la modale
// ouverture et fermeture de la modale
modaleBox.addEventListener("click", (event) => { // Pour la boite soit click-proof.
    event.stopPropagation(); // sinon quand je clique sur la boite ca ferme modalePage.
    // Il faut definir ce comportement pq modaleBox est l'enfant de modalePage
});

let openModale = function() {  
    bodyAnchor.insertBefore(modalePage,modHeaderBand); // pour position absolute -> literalement "over the top"
    modalePage.appendChild(modaleBox);
    modalePage.classList.toggle("invisible");
    displayModGallery();
};

modifButton.addEventListener("click", ()=> {
    openModale();
});

let closeModale = function(){
    emptyUserPicBox(); 
    console.log("closing modale")
    modale1.classList.remove("invisible");
    modale2.classList.add("invisible");
    modalePage.classList.toggle("invisible");
    displayGallerie();   
};

let leftArrowButton = document.querySelector(".modale2 .fa-arrow-left"); // bouton retour
leftArrowButton.addEventListener("click",() => {
    emptyUserPicBox();
    modale2.classList.toggle("invisible");
    modale1.classList.toggle("invisible");
});

let crossButton = document.querySelectorAll(".modaleBox .fa-xmark"); // boutons croix ; Ferme la modale 
for(let cross of crossButton) {
    cross.addEventListener("click", (event) => {
        console.log("crossButton clicked");
        closeModale();
           
    });
}
modalePage.addEventListener("click", (event) => {
    console.log("modalePage clicked");
    closeModale();     
});
// ouverture et fermeture de la modale
// ouverture et fermeture de la modale



// Passage d'une modale a l'autre au clique "ajouter photo"
// Passage d'une modale a l'autre au clique "ajouter photo"
let modale1 = document.querySelector(".modale1")
let modale2 = document.querySelector(".modale2")
let modale1Button = document.querySelector(".modale1 button");

modale1Button.addEventListener("click", (event) => {
    modale1.classList.toggle("invisible");
    modale2.classList.toggle("invisible"); 
});
// Passage d'une modale a l'autre au clique "ajouter photo"
// Passage d'une modale a l'autre au clique "ajouter photo"


//Contenu dynamique de la balise select
//Contenu dynamique de la balise select
// je pourrais mettre tout ca dans une fonction,et l'appeler directement apres la creation de la balise select mais bon ...
let select = document.querySelector("#inputCategory"); 
for(let i = 0; i < filters.length; i++) {
    let option = document.createElement('option');
    select.appendChild(option); 
    option.setAttribute('value', filters[i].id); // La valeur enregistree est l'id de la categorie
    option.innerText = filters[i].name; // l'option affichee est le nom de la categorie     
}
select.selectedIndex = -1;
// je pourrais mettre tout ca dans une fonction,et l'appeler directement apres la creation de la balise select mais bon ...
//Contenu dynamique de la balise select
//Contenu dynamique de la balise select

//Modale2 -> fetch new image)
//Modale2 -> fetch new image)
let modale2Button = document.querySelector(".modale2 button");
modale2Button.addEventListener("click", (event) => {

    let userToken = localStorage.getItem('userToken');
    let modale2Form = document.querySelector(".modale2 form");
    let formData2 = new FormData(modale2Form);
    console.log(formData2);
    const response = fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + userToken
        },
        body: formData2
    })
    .then(response => {
        emptyUserPicBox();
        modale2Form.reset();
        select.selectedIndex = -1;
        if (!response.ok) {
            throw new Error("Echec de la requete HTTP");
        } else { // module l'affichage et refresh les galleries.
            console.log("POST Request fulfilled");
            modale1.classList.remove("invisible");
            modale2.classList.add("invisible");
            modalePage.classList.toggle("invisible");
            displayModGallery();
            displayGallerie();
        }
        // return response.json(); // Pas forcement besoin du return; On le laisse la en attendant.
    })

});
//Modale2 -> fetch new image)
//Modale2 -> fetch new image)


// Gestion du login //
// Gestion du login //
const loginURL = 'http://localhost:5678/api/users/login'; // L'URL de swagger pour login
const loginButton = document.querySelector(".loginBox button"); // Mon bouton "se connecter"

let extractDataForm = function() { // Return les valeurs du formulaire directement dans le bon format.

    let passwordInput = document.querySelector('.loginBox input[name="password"]')
    let emailInput = document.querySelector('.loginBox input[name="email"]')
 
    return `{
     "email": "${emailInput.value}",
     "password": "${passwordInput.value}"
   }`
// C'est un peu hardcodey mais bon ... c'est plus simple comme ca.
// J'avais pas envie de convertir un objet FormData en JSON ... 
 }

 loginButton.addEventListener("click", event => {  // Connexion si click

    event.preventDefault(); // pas de rechargement

    let postLogin = fetch(loginURL, { 
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: extractDataForm()
    });

    postLogin // chaque .then reprend le return de la promesse precedente
    .then((pouniette) => { // Le parametre definit ici contient la reponse'serveur'-> un Objet de type response
        if(!pouniette.ok) { // .ok est un attribut d'objet de type response ("pouniette")
            document.getElementById("errorMessage").style.display = "block";
            throw new Error("Erreur dans l'identifiant ou le mot de passe");
        } else {
            adminMod()            
            return pouniette.json();  // On convertit la reponse en format JSON pour l'exploiter 
        }
    })
    .then((json) => { // json provient du return precedent ; -> Objet userId ; token
        let userToken = json
        localStorage.setItem('userToken', userToken.token); 
    })
});
// Gestion du login //
// Gestion du login // 


// le bouton valider de modale2 ne doit apparaitre que si les champs du formulaire sont completes  
