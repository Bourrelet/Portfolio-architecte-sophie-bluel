let getworks = function() {
    fetch('http://localhost:5678/api/works')
    .then((response) => response.json()) // tranforme la reponse en JSON
    .then((worksObj) => { // On stocke la reponse ds une variable (une liste)


    // let worksObj = JSON.parse(worksJSON); // conversion JSON en Objet
    console.log(worksObj);

    let gallerie = document.getElementById("gallery");
    // gallerie.innerHTML = '<p>' + "pouniette" + '<p>'
    
    for(let workObj of worksObj) { // On essaye deja d'afficher 1 element
        gallerie.innerHTML += '<figure>'
        + '<img src="' + workObj.imageUrl +'" alt="' + workObj.title + '">'
        + '<figcaption>' + workObj.title + '</figcaption>'
        + '</figure>'
    }
    
})
}



getworks()
