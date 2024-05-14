// Integration de l'image choisie par User dans le formulaire + bouton valider
// Integration de l'image choisie par User dans le formulaire + bouton valider
let inputFile = document.querySelector("#inputFile");
let userPicBox = document.querySelector('label[for="inputFile"] div');

inputFile.addEventListener("change", () => { 

    if (document.getElementById('inputFile').value !== '' &&  
    document.getElementById('inputCategory').value !== '' && 
    document.getElementById('inputTitle').value !== '') { 
        modale2Button.classList.remove("invisible");  // affiche modale2Button si tous les champs du formulaire ont une valeur.
    } 

    console.log(`inputFile : ${inputFile}`);
    let userPic = inputFile.files[0]; 
    let userPicURL = URL.createObjectURL(userPic); // Genere une URL exploitable.
    console.log(`userPicURL : ${userPicURL}`);
    userPicBox.innerHTML = ""
    userPicBox.innerHTML = `<img src="${userPicURL}" alt="photo about to be sent">`; // Affiche l'image choisie par l'utilisateur a l'interieur de l'encart.
})

const emptyUserPicBox = function(){ // Reinitialise l'ensemble du formulaire de modale2.
    let modale2Form = document.querySelector(".modale2 form");
    let select = document.querySelector("#inputCategory"); 

    modale2Button.classList.add("invisible"); 
    modale2Form.reset(); 
    select.selectedIndex = -1; 
    userPicBox.innerHTML = `							
    <i class="fa-regular fa-image"></i>
    <span><p>+ Ajouter photo</p></span>				
    <p>jpeg, png : 4mo max</p>
    ` 
};

let inputCategory = document.querySelector("#inputCategory"); // affiche modale2Button si tous les champs du formulaire ont une valeur.
inputCategory.addEventListener("change", () => { 
    
    if (document.getElementById('inputFile').value !== '' && 
    document.getElementById('inputCategory').value !== '' && 
    document.getElementById('inputTitle').value !== '') { 
        modale2Button.classList.remove("invisible");
    } else { 
        modale2Button.classList.add("invisible");
    }
});


let inputTitle = document.querySelector("#inputTitle"); // affiche modale2Button si tous les champs du formulaire ont une valeur.
inputTitle.addEventListener("change", () => { 
    
    if (document.getElementById('inputFile').value !== '' && 
    document.getElementById('inputCategory').value !== '' && 
    document.getElementById('inputTitle').value !== '') { 
        modale2Button.classList.remove("invisible");
    } else {
        modale2Button.classList.add("invisible");
    }
});
// Integration de l'image choisie par User dans le formulaire + bouton valider
// Integration de l'image choisie par User dans le formulaire + bouton valider



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
window.addEventListener("load",(displayGallerie())); // Affichage au chargement de la page.
// Display gallerie
// Display gallerie


// Integration dynamique des filtres
// Integration dynamique des filtres
let folioAnchor = document.querySelector("#portfolio");
let gallerieGrid = document.querySelector('.gallery')
let filterBox = document.createElement('div');
folioAnchor.insertBefore(filterBox, gallerieGrid); // Insertion de filterBox juste avant la gallerie.

let tousButton = document.createElement('div'); // Creation du bouton-filtre "Tous".
filterBox.appendChild(tousButton);
tousButton.innerText = "Tous";
tousButton.id = 0; 
tousButton.classList.add("filterButton");

let displayFilters = function() { // creation des bouton-filtre pour chaque categorie.
   for(let i = 0; i < filters.length; i++) {
        let filterTag = document.createElement('div'); 
        filterBox.appendChild(filterTag); 
        filterTag.innerText= filters[i].name;
        filterTag.id = filters[i].id; // Associe aux boutons le meme "id" que leur categorie correspondante.
        filterTag.classList.add("filterButton");         
    }
    filterBox.classList.add("filterBox");
}
displayFilters()
// Integration dynamique des filtres
// Integration dynamique des filtres


// Fonctionnement des boutons-filtres
// Fonctionnement des boutons-filtres
let filtering = function(buttonArg){ // filtre les travaux en fonction du bouton clique
    console.log('filtrage en cours');
    gallerie.innerHTML = "";
    if(buttonArg.id == 0 ){ // si "tous" est le bouton argument
        displayGallerie();
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

let buttonList = document.querySelectorAll(".filterButton"); 
for (let button of buttonList){ 
    button.addEventListener("click", () => {
        console.log(`click sur bouton ${button.id}`)
        filtering(button)
    });
}
// Fonctionnement des boutons-filtres
// Fonctionnement des boutons-filtres


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
let introduction =document.querySelector("#introduction")

let adminMod = function() {  
    modHeaderBand.innerHTML= `<i class="fa-regular fa-pen-to-square"></i> <p>Mode edition</p>`;
    bodyAnchor.prepend(modHeaderBand);

    originalHeader.setAttribute("style", "margin-top: 38px;"); // Ajustement dynamique de 50 a 38px;
    introduction.setAttribute("style", "margin-top: 92px;") // Ajustement dynamique de 139 a 92px;

    modHeaderBand.classList.add("rowBox");
    modHeaderBand.classList.add("modHeaderBand");
    
    folioAnchor.prepend(folioTextBox); 
    folioTextBox.appendChild(folioTitle);
    folioTextBox.appendChild(modifButton); 

    folioTextBox.classList.add("rowBox");
    modifButton.classList.add("rowBox");
    modifButton.classList.add("modifButton");
    modifButton.classList.add("anyButton");

    modifButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> <p>modifier</p>` 
    filterBox.innerHTML= " ";    // Disparition des filtres, sans alteration des marges.

    homePage.classList.toggle("invisible"); 
    loginPage.classList.toggle("invisible"); 

    // login devient logout ->
    logButt.innerHTML = "logout" 
    logButt.addEventListener("click", () => { 
        localStorage.clear(); // vide le localstorage.
        window.location.reload(true); // recharge la page sans le cache.
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

        // Selection de la corbeille "localBin" actuelle a l'interieur de la boucle.
        let localBin = document.querySelector(".modGallery figure:last-of-type div"); 
        localBin.setAttribute("id", `${work.id}`); // Partage du meme "id" entre localBin et "work". 
    }

    let corbeilles = document.querySelectorAll(".modGallery figure div"); // Definition du comportement des corbeilles.
    for (let corbeille of corbeilles) {
        corbeille.addEventListener("click", () => { 
            delWork(corbeille.id); // La corbeille lance delWork() avec son "id comme" argument.
        });
}
};


let delWork = async function(id) { // Delete selon l'id (de la corbeille) renseigne en argument.
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
// Affiche la galerie fonctionnelle de modale1 (images et corbeilles)
// Affiche la galerie fonctionnelle de modale1 (images et corbeilles)


// ouverture et fermeture de la modale
// ouverture et fermeture de la modale
modaleBox.addEventListener("click", (event) => { // Necessaire pour eviter le click de "modalePage" a travers son enfant "modaleBox".
    event.stopPropagation();
});

let openModale = function() {  
    bodyAnchor.insertBefore(modalePage,modHeaderBand);
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

let leftArrowButton = document.querySelector(".modale2 .leftArrowButton"); // bouton-retour ; Depuis modale2 vers modale1.
leftArrowButton.addEventListener("click",() => {
    emptyUserPicBox();
    modale2.classList.toggle("invisible");
    modale1.classList.toggle("invisible");
});

let crossButton = document.querySelectorAll(".modaleBox .crossButton"); // boutons croix ; Ferment les modales.
for(let cross of crossButton) {
    cross.addEventListener("click", (event) => {
        console.log("crossButton clicked");
        closeModale();
           
    });
}

modalePage.addEventListener("click", () => {
    console.log("modalePage clicked");
    closeModale();     
});
// ouverture et fermeture de la modale
// ouverture et fermeture de la modale



// Changement de modale au clique du bouton "ajouter photo".
// Changement de modale au clique du bouton "ajouter photo".
let modale1 = document.querySelector(".modale1")
let modale2 = document.querySelector(".modale2")
let modale1Button = document.querySelector(".modale1 button");

modale1Button.addEventListener("click", () => {
    modale1.classList.toggle("invisible");
    modale2.classList.toggle("invisible"); 
});
// Changement de modale au clique du bouton "ajouter photo".
// Changement de modale au clique du bouton "ajouter photo".


//Contenu dynamique de la balise select
//Contenu dynamique de la balise select
let select = document.querySelector("#inputCategory"); //Definition des options du volet deroulant.
for(let i = 0; i < filters.length; i++) {
    let option = document.createElement('option');
    select.appendChild(option); 
    option.setAttribute('value', filters[i].id); // La valeur enregistree sera l'id de categorie.
    option.innerText = filters[i].name; // l'option affichee sera le nom de categorie.    
}
select.selectedIndex = -1;
//Contenu dynamique de la balise select
//Contenu dynamique de la balise select


// Ajout d'une nouvelle image dans la gallerie. 
// Ajout d'une nouvelle image dans la gallerie. 
let modale2Button = document.querySelector(".modale2 button");

modale2Button.addEventListener("click", () => {

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
    
    })

});
// Ajout d'une nouvelle image dans la gallerie. 
// Ajout d'une nouvelle image dans la gallerie. 


// Gestion du login //
// Gestion du login //
const loginURL = 'http://localhost:5678/api/users/login'; // L'URL de swagger pour la connexion
const loginButton = document.querySelector(".loginBox button"); // Mon bouton "se connecter"

let extractDataForm = function() { // Alternative a l'utilisation de FormData ;

    let passwordInput = document.querySelector('.loginBox input[name="password"]')
    let emailInput = document.querySelector('.loginBox input[name="email"]')
 
    return `{ 
     "email": "${emailInput.value}",
     "password": "${passwordInput.value}"
   }`
 }

 loginButton.addEventListener("click", event => {  // Connexion.

    event.preventDefault();

    let postLogin = fetch(loginURL, { 
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: extractDataForm()
    });

    postLogin 
    .then((response) => { 
        if(!response.ok) { 
            document.getElementById("errorMessage").style.display = "block";
            throw new Error("Erreur dans l'identifiant ou le mot de passe");
        } else {
            adminMod()            
            return response.json();  
        }
    })
    .then((json) => { 
        let userToken = json
        localStorage.setItem('userToken', userToken.token); 
    })
});
// Gestion du login //
// Gestion du login // 


