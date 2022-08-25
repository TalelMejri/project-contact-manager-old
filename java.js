/*** load  */
let ch = "bahra";
var ch1;
do {
  ch1 = prompt("Donner Votre Mot de Passe ");
} while (ch1 != ch);

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
let contenu_afficher = document.querySelector(".resultat");
let page_edit = document.getElementById("edit_contact");
let btn_update = document.getElementById("edit");
let content = document.getElementById("oups");
let champ_search = document.getElementById("search");
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

function createDeleteButton(id) {
  const button = document.createElement("button");
  button.innerHTML = "delete";
  button.className = "delButton";
  button.id = id;
  return button;
}

function creteedit(id) {
  const button = document.createElement("button");
  button.innerHTML = "edit";
  button.className = "edButton";
  button.id = id;
  return button;
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

if (localStorage.getItem("info") != null) {
  content.style.display = "none";
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
  let div = document.createElement("div");

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
  li_define_job.appendChild(text_li_define_job);
  ul.appendChild(li_define_job);

  let li_define_number = document.createElement("li");
  let text_li_define_number = document.createTextNode("Number :");
  li_define_number.appendChild(text_li_define_number);
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

  div.appendChild(createDeleteButton(contact.id));
  div.appendChild(creteedit(contact.id));

  contenu_afficher.appendChild(ul);
  contenu_afficher.appendChild(table);
  contenu_afficher.appendChild(div);

  div.firstElementChild.addEventListener("click", function supprimer(event) {
    let x = confirm("do you want delete !!");
    if (x == true) {
      const id = event.currentTarget.id;
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id == id) {
          contacts.splice(i, 1);
        }
      }
      savedata("info", contacts);
      contenu_afficher.innerHTML = "";
      afficher();
    }
  });

  div.lastElementChild.addEventListener("click", function edit(event) {
    const id = event.currentTarget.id;
    page_edit.style.display = "block";
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id == id) {
        let nom = document.querySelector("#name_edit");
        let job = document.getElementById("job_edit");
        let number = document.getElementById("number_edit");
        nom.value = contacts[i].nom;
        job.value = contacts[i].job;
        number.value = contacts[i].number;
        btn_update.addEventListener("click", function () {
          contacts[i].nom = document.querySelector("#name_edit").value;
          contacts[i].job = document.getElementById("job_edit").value;
          contacts[i].number = document.getElementById("number_edit").value;
          savedata("info", contacts);
          alert("update succefuly");
          page_edit.style.display = "none";
        });
      }
    }
  });
}
afficher();
function delete_afficher() {
  page_edit.style.display = "none";
}

/** search */

champ_search.addEventListener("input", function () {
  for (i = 0; i < contacts.length; i++) {
    //if (contacts[i].nom.indexOf(champ_search.value)) {
    if (contacts[i].nom == champ_search.value) {
      contenu_afficher.innerHTML = "";
      consulte(contacts[i]);
    }
  }
});
