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

let filtering = function(buttonArg){
    console.log('filtrage en cours');
    if(buttonArg.id == 0 ){ // tous
        initWork(); // Affiche toute la gallerie
        console.log('Lancement initWork');
    } else {
        gallerie.innerHTML = ""; // reset gallerie
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


let buttonList = document.querySelectorAll(".filterButton");
for (let button of buttonList){ // button prend les valeurs de la NodeList
    button.addEventListener("click", () => {
        console.log(`click sur bouton ${button.id}`)
        filtering(button)
    });
    
}

// Affichage des travaux
    



