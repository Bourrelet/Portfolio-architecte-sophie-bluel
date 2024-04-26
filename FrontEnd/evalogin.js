// https://fr.javascript.info/formdata
// L'API accepte seulement  :  'application/json'
// FormData renvoit du :  'multipart/form-data'
// un FormData en bodyPOST ca ne marche donc pas -> Il faut donc que j'extrais les valeurs des champs moi meme.



const homePageURL = 'http://127.0.0.1:5500/index.html';
const loginURL = 'http://localhost:5678/api/users/login'; // L'URL de swagger
const loginButton = document.querySelector("button"); // Mon bouton "se connecter"
const loginForm = document.querySelector("form"); // Mon formulaire login






const userData = `{
    "email": "sophie.bluel@test.tld",
    "password": "S0phie"
    }`


let postFormRequest = async function(anyForm, anyURL) {  // requete POST 
        console.log('Lancement fonction fetch')
    
        // let userData = new FormData(anyForm); // Je voudrais recuperer ma data comme ca.
        console.log(`verification anyForm : ${anyForm}`);
        console.log(`verification anyURL : ${anyURL}`);

        let response = await fetch(anyURL, { // requete Post
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: userData
        });

        let token = await response.json(); // parsing      
        return token;

};

loginButton.addEventListener("click", event => {  // Connexion
    event.preventDefault();
    try {
        console.log('on essaye')

        let token = postFormRequest(loginForm, loginURL);  // Recuperation du token ... ?
        console.log(`La reponse stockee dans token ->`);
        console.log(token)
        
        // window.location.href= homePageURL;   // redirection        
        
    } catch { 
        console.log('on rattrape')

        console.log("Erreur dans l'identifiant ou le mot de passe"); 
    }   

});


        
