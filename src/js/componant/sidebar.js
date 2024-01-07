function goToPage(page){
    window.location.href = page;
}

function goToHome(){
    pb.authStore.clear();
    window.location.href = "index.html";

}

let result =`
    <ul class="list-disc">
        <li><p class="border-solid border-2 border-white rounded-md text-white mb-3" onclick=goToPage("dashboard.html") style=cursor:"pointer">Dashboard</li>
        <li><p class="border-solid border-2 border-white rounded-md text-white mb-3" onclick=goToPage("gestion.html.html") style=cursor:"pointer">Gestion</li>
        <li><p class="border-solid border-2 border-white rounded-md text-white mb-3" onclick=goToHome() style=cursor:"pointer">Se déconnecter et retourner a l'acceuil</li>
    </ul>`;
container = document.getElementById("sidebar");
container.innerHTML = result;