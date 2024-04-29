// Je n'arrive toujours pas a importer et exporter du code enntre mes fichiers JS

const homePageURL = 'http://127.0.0.1:5500/index.html';
const loginURL = 'http://localhost:5678/api/users/login'; // L'URL de swagger
const loginButton = document.querySelector(".loginBox button"); // Mon bouton "se connecter"



let extractDataForm = function() { // Return les valeurs du formulaire directement dans le bon format.

   let passwordInput = document.querySelector('input[name="password"]')
   let emailInput = document.querySelector('input[name="email"]')

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

                window.open(homePageURL, '_blank');
                return pouniette.json();  // On convertit la reponse en format JSON pour l'exploiter 

            }
        })
        .then((json) => { // Recuperation du token
            let userToken = json
            console.log('local promise userToken ->'); // On arrive a recuperer le token ICI
            console.log(userToken); // Objet userId ; token
            localStorage.setItem('storedToken', JSON.stringify(userToken));
            let storagetest = localStorage.getItem('storedToken');
            console.log(`storedToken-> ${storagetest}`);
            // Et ici je lance une fonction importee pour modifier la page index.html 
                  
        })

});
 


        
