// {
//     "userId": 1,
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNDExOTM2NSwiZXhwIjoxNzE0MjA1NzY1fQ.bmKPgm5Y2sDp2Iq0B87OSt4BuIuxN_38lB-MwDgYocE"
//   }

// Le token est donne dans la reponse 200 du loginrequest.  Je le passe en JSON et j'en fait quoi?  



const homePageURL = 'http://127.0.0.1:5500/index.html';
const loginURL = 'http://localhost:5678/api/users/login'; // L'URL de swagger
const loginButton = document.querySelector("button"); // Mon bouton "se connecter"
const loginForm = document.querySelector("form"); // Mon formulaire login



let postFormRequest = async function(anyForm, anyURL) {  // requete POST 
    
        let userData = new FormData(anyForm); // Recuperation de formData
        console.log(`userData : ${userData}`); 

        let response = await fetch(anyURL, { // requete Post
            method: "POST",
            body: userData 
        });

        console.log(await response.json()); // Traitement de la reponse
        let token = response.json();
        console.log(token); 

        return token;

};

loginButton.addEventListener("click", event => {  // Connexion
    event.preventDefault();
    try {
        let token =  postFormRequest(loginForm, loginURL);  // Recuperation du token ... ?
        console.log(token);
        // window.location.href= homePageURL;   // redirection
        
        
    } catch { 
        console.log("Erreur dans l'identifiant ou le mot de passe"); 
    }   

});


        
