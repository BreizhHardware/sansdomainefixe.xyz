import PocketBase from '../backend/pocketbase.es.mjs';
console.log("Backend Loading Started");

const pb = new PocketBase("https://sansdomainefixebackend.breizhhardware.fr");


if(window.location.href.includes("login.html")){
    if(pb.authStore.isValid === true){
        window.location.href = "dashboard.html";
    }
}

if(window.location.href.includes("dashboard.html") || window.location.href.includes("gestion.html.html")){
    if(pb.authStore.isValid === false){
        window.location.href = "login.html";
    }
}

if(window.location.href.includes("login.html")){
    document.getElementById("loginbutton").addEventListener("click", async () => {
        event.preventDefault();
        let email = document.getElementById("email").value;
        console.log(email);
        let password = document.getElementById("password").value;
        console.log(password);
        try{
            const authData = await pb.collection('users').authWithPassword(email, password);

            if(pb.authStore.isValid){
                window.location.href = "dashboard.html";
            }
            else{
                alert("Erreur de connexion");
            }
        }
        catch(error){
            alert("Erreur de connexion");
        }
    });
}

export default pb;

console.log("Backend Loading Finished");