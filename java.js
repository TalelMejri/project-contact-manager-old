/*** load  */
/*let ch = "talel";
var ch1;
do {
  ch1 = prompt("Donner Votre Mot de Passe ");
} while (ch1 != ch);*/

function loader() {
  document.querySelector(".load").classList.add("fade-out");
}

function fadeOut() {
  setInterval(loader, 800);
}

window.onload = fadeOut();

/** afficher nav  */

let menu = document.querySelector(".menu");
let contenu = document.querySelector("nav");
menu.addEventListener("click", toogle);
function toogle() {
  if (contenu.style.display === "none") {
    contenu.style.display = "block";
  } else {
    contenu.style.display = "none";
  }
}

/** add contact */
let btn_new_contact = document.getElementById("new");
let page_welcome = document.getElementById("welcome");
let page_add = document.getElementById("add_contact");
let page_list = document.getElementById("listepage");
let btn_add = document.getElementById("add");
let btn_clear_list = document.getElementById("clear");
let btn_page_list_contact = document.getElementById("listcontact");
let contenu_afficher = document.querySelector(".card");

let contacts = loaddata("info") ? loaddata("info") : [];

btn_new_contact.addEventListener("click", function () {
  page_add.style.display = "block";
  page_welcome.style.display = "none";
  page_list.style.display = "none";
});

btn_page_list_contact.addEventListener("click", function () {
  page_add.style.display = "none";
  page_welcome.style.display = "none";
  page_list.style.display = "block";
});

btn_clear_list.addEventListener("click", function () {
  localStorage.clear("info");
  alert("clear finished !");
});

function loaddata(dataname) {
  const data = JSON.parse(localStorage.getItem(dataname));
  return data;
}

function savedata(dataname, data) {
  const jsondata = JSON.stringify(data);
  localStorage.setItem(dataname, jsondata);
}

btn_add.addEventListener("click", function () {
  let champ_nom = document.querySelector("#name").value;
  let champ_job = document.getElementById("job").value;
  let champ_number = document.getElementById("number").value;
  let id = Math.random().toString().substr(2, 7);
  let nom = champ_nom;
  let job = champ_job;
  let number = champ_number;
  let contact = { id, nom, job, number };
  contacts.push(contact);
  // localStorage.setItem("contacts", JSON.stringify(contacts));
  savedata("info", contacts);
  alert("Add susscefuly !");
});

function afficher() {
  if (contacts.length > 0) {
    contacts.forEach((contact) => {
      consulte(contact);
    });
  }
}

/** methode 1 :pour afficher (hkimi)  */

/*function consulte(contact) {
  let contact_place = document.querySelector(".cards");
  contact_place.innerHTML += ` <div class="card">
    <div class="card-title">
        <center>
            <h1>contact</h1>
            <button class="badge text-bg-success btn" onclick="edit_contact(${contact.id})">update</button>
            <button class="badge text-bg-danger btn" onclick="delete_contact(${contact.id})">delete</button>
        </center>
    </div>
    <div class="card-body">
        <h3 class="card-text success"> <span class="material-symbols-rounded">
            account_circle
            </span> name:${contact.name}</h3>
        <h3 class="card-text success"><span class="material-symbols-rounded">
            work
            </span> job : ${contact.job}</h3>
        <h3 class="card-text success"><span class="material-symbols-rounded">
            android_dialer
            </span>number : ${contact.number}</h3>
    </div>
</div>`;
}*/

/**methode 2 */

/*function createdom(nom) {
  let li = document.createElement("li");
  let nom_li = document.createTextNode(nom);
  return li.appendChild(nom_li);
}*/

function consulte(contact) {
  let ul = document.createElement("ul");
  let table = document.createElement("table");
  let article = document.createElement("article");

  let li_define_id = document.createElement("li");
  let text_li_define_id = document.createTextNode("Id :");
  li_define_id.appendChild(text_li_define_id);
  ul.appendChild(li_define_id);

  let li_define_nom = document.createElement("li");
  let text_li_define_nom = document.createTextNode("Nom :");
  li_define_nom.appendChild(text_li_define_nom);
  ul.appendChild(li_define_nom);

  let li_define_job = document.createElement("li");
  let text_li_define_job = document.createTextNode("Job :");
  li_define_id.appendChild(text_li_define_job);
  ul.appendChild(li_define_job);

  let li_define_number = document.createElement("li");
  let text_li_define_number = document.createTextNode("Number :");
  li_define_id.appendChild(text_li_define_number);
  ul.appendChild(li_define_number);

  let td_id = document.createElement("td");
  let contenu_id = document.createTextNode(contact.id);
  td_id.appendChild(contenu_id);
  table.appendChild(td_id);

  let tr_nom = document.createElement("tr");
  let contenu_nom = document.createTextNode(contact.nom);
  tr_nom.appendChild(contenu_nom);
  table.appendChild(tr_nom);

  let tr_job = document.createElement("tr");
  let contenu_job = document.createTextNode(contact.job);
  tr_job.appendChild(contenu_job);
  table.appendChild(tr_job);

  let tr_number = document.createElement("tr");
  let contenu_number = document.createTextNode(contact.number);
  tr_number.appendChild(contenu_number);
  table.appendChild(tr_number);

  contenu_afficher.appendChild(ul);
  contenu_afficher.appendChild(table);
}
afficher();
