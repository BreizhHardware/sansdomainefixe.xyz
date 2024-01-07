console.log("ActualDomain Loading Started");
import pb from '../login.js';

let domainList = await pb.collection("ndd").getFullList({
    expand: 'user'
});


let domainOfCurrentUser = domainList.filter(domain => domain.expand.user.email === pb.authStore.model.email);
let result =`
    <div>
        <h2 class="xl:text-4xl md:text-xl text-base font-sans mb-4 text-white">Vos nom de domaines:</h2>
        <ul class="list-disc mx-10">
            ${domainOfCurrentUser.map(domain => `<li><p class="border-solid border-2 border-white rounded-md text-white mb-3" onclick=goToPage("gestion.html") style="cursor:pointer">${domain.domaine}</p></li>`).join('')}
        </ul>
    </div>`;
let container = document.getElementById("ActualDomain");
container.innerHTML = result;