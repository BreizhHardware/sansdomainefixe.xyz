console.log("Dropdown Loading Started");
import pb from '../login.js';

let domainList = await pb.collection("ndd").getFullList({
    expand: "user"
});

console.log(domainList);
let domainOfCurrentUser = domainList.filter(domain => domain.expand.user.email === pb.authStore.model.email);

let result =`
    <div class="relative inline-block text-left">
        <select id="dropdown" class="my-3 text-white border-solid border-2 border-white rounded-md px-1 py-2 bg-transparent">
            <option class="bg-transparent border-solid border-2 border-white text-white" value="" disabled selected>Veuillez séléctionner un domaine</option>
            ${domainOfCurrentUser.map(domain => `<option class="bg-transparent border-solid border-2 border-white text-white" value="${domain.domaine}">${domain.domaine}</option>`).join('')}
        </select>
    </div>`;

        
let container = document.getElementById("dropdowndomain");
container.innerHTML = result;


//When the user clicks on a domain, close the dropdown and change the button text and put it in the local storage
let dropdownElements = document.getElementById("dropdown").children;
for(let i = 0; i < dropdownElements.length; i++){
    dropdownElements[i].addEventListener("click", () => {
        document.getElementById("dropdown").classList.toggle("hidden");
        document.getElementById("dropdownDefaultButton").innerHTML = dropdownElements[i].innerHTML;
        localStorage.setItem("domain", dropdownElements[i].innerHTML);
    });
}

//When a domain is selected, display the field of the IP, the type of record and if it's proxy or not
let field = `
    <br>
    <input type="text" id="ip" name="ip" placeholder=${localStorage.getItem("domain")} class="px-4 py-2 border rounded-md text-black text-right ml-3" style="cursor:pointer"/>
    <input type="checkbox" id="proxy" name="proxy" class="px-4 py-2 border rounded-md text-black text-right ml-3" style="cursor:pointer"/>
    <label for="proxy">Proxy Cloudflare</label>
    <select id="type" name="type" class="px-4 py-2 border rounded-md text-black text-left ml-3" style="cursor:pointer">
        <option value="A">A</option>
        <option value="AAAA">AAAA</option>
        <option value="CNAME">CNAME</option>
    </select>
    <button id="add" class="my-3 text-white border-solid border-2 border-white rounded-md px-1 py-2">Sauvgarder</button>
    <br>
    Note: Si vous voulez supprimer un enregistrement, veuillez mettre le champ IP à 0.0.0.0<br>
    Note: Si vous voulez modifier un enregistrement, veuillez mettre le champ IP à la nouvelle valeur
`;



container.innerHTML += field;



document.getElementById("add").addEventListener("click", async () => {
    let ip = document.getElementById("ip").value;
    let type = document.getElementById("type").value;
    let proxy = document.getElementById("proxy").value;
    let domain = localStorage.getItem("domain");
    console.log(ip);
    console.log(type);
    console.log(proxy);
    console.log(domain);
    //Check if proxy is checked
    proxy = proxy === "on";
    if(ip != "" && type != "" && proxy != "" && domain != ""){
        const data = {
            "domaine": domain,
            "associatedIP": ip,
            "TYPE": type,
            "proxy": proxy
        }
        try{
            let currentDomainId = domainOfCurrentUser.filter(domain => domain.domaine === domain.domaine)[0].id;
            console.log(currentDomainId);
            const record = await pb.collection("ndd").update(currentDomainId, data);

            //Communicate with the cloudflare API to add the record
            const cloudflareApiUrl = "https://api.cloudflare.com/client/v4/YOUR_ZONE_ID/dns_records/YOUR_DNS_RECORD_ID";
            const cloudflareApiKey = "YOUR_CLOUDFLARE_API_KEY";

            const cloudflareApiData = {
                "type": type,
                "name": domain,
                "content": ip,
                "proxied": proxy
            };

            const cloudflareHeaders  = {
                "Content-Type": "application/json",
                "Authorization": "Bearer ${cloudflareApiKey}"
            };

            const cloudflareResponse = await fetch(cloudflareApiUrl, {
                method: 'PUT',
                headers: cloudflareHeaders,
                body: JSON.stringify(cloudflareApiData)
            });

            const cloudflareResponseJson = await cloudflareResponse.json();

            alert("Enregistrement modifié avec succès");
        }
        catch(error){
            alert("Erreur lors de la modification de l'enregistrement");
        }
    }
    else{
        alert("Veuillez remplir tous les champs");
    }
});


console.log("Dropdown Loading Finished");