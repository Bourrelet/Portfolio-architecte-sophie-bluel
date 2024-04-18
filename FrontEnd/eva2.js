// filter -> 'http://localhost:5678/api/categories'
// work -> 'http://localhost:5678/api/works'

// Recup les travaux
// Recup et afficher les filtres
// faire un eventlistener pour le click sur le HTMLElement des filtres
// En fonction du filtre clicke -> afficher les travaux correspondants

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

console.log(filters.length)


let displayFilters = async function() {

    // DOM Anchor and filter Box
    let filterParent = document.getElementById('filter-daddy');
    let filterBox = document.createElement('div');
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

// l'argument est le bouton clicke
// Je dois afficher works en fonction de son ID
// Je dois respecter le path

let filtering = function(element){


}

let buttonList = document.querySelectorAll("filterButton");
for (let button of buttonList){ // button prend les valeurs de la NodeList
    button.addEventListener(click, filtering(button));
    console.log(e.target)
}




    



