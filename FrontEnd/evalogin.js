// {
//     "userId": 1,
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNDExOTM2NSwiZXhwIjoxNzE0MjA1NzY1fQ.bmKPgm5Y2sDp2Iq0B87OSt4BuIuxN_38lB-MwDgYocE"
//   }

// Le token est donne dans la reponse 200 du loginrequest.  Je le passe en JSON et j'en fait quoi?  



const homePageURL = 'http://127.0.0.1:5500/index.html';
const loginURL = 'http://localhost:5678/api/users/login'; // L'URL de swagger
const loginButton = document.querySelector("button"); // Mon bouton "se connecter"
const loginForm = document.querySelector("form"); // Mon formulaire login

// Je n'arrive pas a extraire et envoyer les valeurs du formulaire avec formData.

        //https://fr.javascript.info/formdata   // -> encodage formdata
        // Content-Type: multipart/form-data.
        // -H 'accept: application/json' \

// Je pourrais eventuellement le faire manuellement en accedant aux balises avec .value
// en attendant ->
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


        
