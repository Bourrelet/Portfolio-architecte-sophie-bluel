export let userToken;


// https://fr.javascript.info/formdata
// L'API accepte seulement  :  'application/json'
// FormData renvoit du :  'multipart/form-data'
// let userData = new FormData(anyForm); // Je voudrais recuperer ma data comme ca. et la mettre dans body
// un FormData en bodyPOST ca ne marche donc pas -> Il faut donc que j'extrais les valeurs des champs moi meme.



const homePageURL = 'http://127.0.0.1:5500/index.html';
const loginURL = 'http://localhost:5678/api/users/login'; // L'URL de swagger
const loginButton = document.querySelector("button"); // Mon bouton "se connecter"
const loginForm = document.querySelector("form"); // Mon formulaire login


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
        .then((json) => {
            userToken = json
            console.log(userToken); // On arrive a recuperer le token ICI
                  
        })

});



        
