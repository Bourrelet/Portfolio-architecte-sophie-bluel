// https://fr.javascript.info/formdata
// L'API accepte seulement  :  'application/json'
// FormData renvoit du :  'multipart/form-data'
// let userData = new FormData(anyForm); // Je voudrais recuperer ma data comme ca. et la mettre dans body
// un FormData en bodyPOST ca ne marche donc pas -> Il faut donc que j'extrais les valeurs des champs moi meme.



const homePageURL = 'http://127.0.0.1:5500/index.html';
const loginURL = 'http://localhost:5678/api/users/login'; // L'URL de swagger
const loginButton = document.querySelector("button"); // Mon bouton "se connecter"
const loginForm = document.querySelector("form"); // Mon formulaire login

// Je recup les deux champs dans une liste de HTMLElements
// Je dois assigner la valeur if input.name=password ; let password = input.name.value
// Je dois ensuite retourner ca dans un format JSON (interpolation)

let extractDataForm = function() { // Return les valeurs du formulaire directement dans le bon format.
   let passwordInput = document.querySelector('input[name="password"]')
   let emailInput = document.querySelector('input[name="email"]')
   return `{
    "email": "${emailInput.value}",
    "password": "${passwordInput.value}"
  }`
}

// const userData = `{
//     "email": "sophie.bluel@test.tld",
//     "password": "S0phie"
//     }`

// let bodydata = extractDataForm()
// console.log(bodydata);
// console.log(userData)


let postFormRequest = async function(anyForm, anyURL) {  // requete POST 
        console.log('Lancement fonction fetch')
    

        console.log(`verification anyForm : ${anyForm}`);
        console.log(`verification anyURL : ${anyURL}`);

        let response = await fetch(anyURL, { // requete Post
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: extractDataForm()
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


        
