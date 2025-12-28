// URL de base de ton API
const API_BASE = 'http://localhost:8080/TestRS/test/users';

// Elements du DOM
const messagesDiv = document.getElementById('messages');
const personsTableBody = document.querySelector('#personsTable tbody');

const refreshBtn = document.getElementById('refreshBtn');
const personForm = document.getElementById('personForm');
const formTitle = document.getElementById('formTitle');
const personIdInput = document.getElementById('personId');
const personNameInput = document.getElementById('personName');
const personAgeInput = document.getElementById('personAge');
const saveBtn = document.getElementById('saveBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

const searchIdInput = document.getElementById('searchIdInput');
const searchByIdBtn = document.getElementById('searchByIdBtn');
const searchIdResult = document.getElementById('searchIdResult');

const searchNameInput = document.getElementById('searchNameInput');
const searchByNameBtn = document.getElementById('searchByNameBtn');
const searchNameResult = document.getElementById('searchNameResult');

// Affichage messages
function showMessage(text, type = 'success') {
    const div = document.createElement('div');
    div.className = 'message ' + type;
    div.textContent = text;
    messagesDiv.innerHTML = '';
    messagesDiv.appendChild(div);
}


function fetchAllPersons() {
    fetch(API_BASE + '/affiche')
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Erreur HTTP ' + response.status);
            }
            return response.json();
        })
        .then(function(persons) {
            console.log('persons = ', persons); // debug
            renderPersonsTable(persons);
            showMessage('Liste des personnes mise à jour.', 'success');
        })
        .catch(function(e) {
            console.error(e);
            showMessage('Erreur lors du chargement des personnes.', 'error');
        });
}



function addPerson(name, age) {
    var url = API_BASE + '/add/' + encodeURIComponent(age) + '/' + encodeURIComponent(name);

    fetch(url, { method: 'PUT' })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Erreur HTTP ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            if (data.state === 'ok') {
                showMessage('Personne ajoutée avec succès.', 'success');
                fetchAllPersons();
            } else {
                showMessage('Erreur ajout: ' + (data.state || ''), 'error');
            }
        })
        .catch(function(e) {
            console.error(e);
            showMessage('Erreur réseau lors de l\'ajout.', 'error');
        });
}

function updatePerson(id, name, age) {
    var url = API_BASE + '/update/' +
        encodeURIComponent(id) + '/' +
        encodeURIComponent(age) + '/' +
        encodeURIComponent(name);

    fetch(url, { method: 'PUT' })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Erreur HTTP ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            if (data.state === 'ok') {
                showMessage('Personne modifiée avec succès.', 'success');
                fetchAllPersons();
            } else {
                showMessage('Erreur modification: ' + (data.state || ''), 'error');
            }
        })
        .catch(function(e) {
            console.error(e);
            showMessage('Erreur réseau lors de la modification.', 'error');
        });
}


function deletePerson(id) {
    var url = API_BASE + '/remove/' + encodeURIComponent(id);

    fetch(url, { method: 'DELETE' })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Erreur HTTP ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            if (data.state === 'ok') {
                showMessage('Personne supprimée avec succès.', 'success');
                fetchAllPersons();
            } else {
                showMessage('Suppression impossible: ' + (data.state || ''), 'error');
            }
        })
        .catch(function(e) {
            console.error(e);
            showMessage('Erreur réseau lors de la suppression.', 'error');
        });
}



function searchById(id) {
    var url = API_BASE + '/getid/' + encodeURIComponent(id);

    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Erreur HTTP ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            if (data.state === 'ok' && data.data) {
                var p = data.data;
                searchIdResult.textContent =
                    'ID: ' + p.id + ', Nom: ' + p.name + ', Âge: ' + p.age;
            } else {
                searchIdResult.textContent = data.state || 'Non trouvé';
            }
        })
        .catch(function(e) {
            console.error(e);
            searchIdResult.textContent = 'Erreur lors de la recherche.';
        });
}


function searchByName(name) {
    var url = API_BASE + '/getname/' + encodeURIComponent(name);

    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Erreur HTTP ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            if (data.state === 'ok' && data.data) {
                var p = data.data;
                searchNameResult.textContent =
                    'ID: ' + p.id + ', Nom: ' + p.name + ', Âge: ' + p.age;
            } else {
                searchNameResult.textContent = data.state || 'Non trouvé';
            }
        })
        .catch(function(e) {
            console.error(e);
            searchNameResult.textContent = 'Erreur lors de la recherche.';
        });
}


// -----------------------
// UI
// -----------------------
function renderPersonsTable(persons) {
    personsTableBody.innerHTML = '';

    if (!Array.isArray(persons) || persons.length === 0) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.colSpan = 4;
        td.textContent = 'Aucune personne trouvée.';
        tr.appendChild(td);
        personsTableBody.appendChild(tr);
        return;
    }

    persons.forEach(function(p) {
        var tr = document.createElement('tr');

        var tdId = document.createElement('td');
        tdId.textContent = p.id;
        tr.appendChild(tdId);

        var tdName = document.createElement('td');
        tdName.textContent = p.name;
        tr.appendChild(tdName);

        var tdAge = document.createElement('td');
        tdAge.textContent = p.age;
        tr.appendChild(tdAge);

        var tdActions = document.createElement('td');

        var editBtn = document.createElement('button');
        editBtn.textContent = 'Modifier';
        editBtn.className = 'small';
        editBtn.onclick = function() {
            startEditPerson(p);
        };
        tdActions.appendChild(editBtn);

        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.className = 'small danger';
        deleteBtn.style.marginLeft = '0.4rem';
        deleteBtn.onclick = function() {
            if (confirm('Supprimer la personne ' + p.name + ' (ID ' + p.id + ') ?')) {
                deletePerson(p.id);
            }
        };
        tdActions.appendChild(deleteBtn);

        tr.appendChild(tdActions);
        personsTableBody.appendChild(tr);
    });
}


function startEditPerson(person) {
    personIdInput.value = person.id;
    personNameInput.value = person.name;
    personAgeInput.value = person.age;
    formTitle.textContent = 'Modifier une personne';
    saveBtn.textContent = 'Enregistrer';
    cancelEditBtn.style.display = 'inline-block';
}

function resetForm() {
    personForm.reset();
    personIdInput.value = '';
    formTitle.textContent = 'Ajouter une personne';
    saveBtn.textContent = 'Ajouter';
    cancelEditBtn.style.display = 'none';
}

// -----------------------
// Events
// -----------------------

refreshBtn.addEventListener('click', fetchAllPersons);

personForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var name = personNameInput.value.trim();
    var age = parseInt(personAgeInput.value, 10);

    if (!name || isNaN(age)) {
        showMessage('Nom et âge sont obligatoires.', 'error');
        return;
    }

    var id = personIdInput.value;
    if (id) {
        updatePerson(id, name, age);
    } else {
        addPerson(name, age);
    }
    resetForm();
});

cancelEditBtn.addEventListener('click', resetForm);

searchByIdBtn.addEventListener('click', () => {
    const id = parseInt(searchIdInput.value, 10);
    if (isNaN(id)) {
        searchIdResult.textContent = 'Veuillez entrer un ID valide.';
        return;
    }
    searchById(id);
});

searchByNameBtn.addEventListener('click', () => {
    const name = searchNameInput.value.trim();
    if (!name) {
        searchNameResult.textContent = 'Veuillez entrer un nom.';
        return;
    }
    searchByName(name);
});

// Charger la liste au démarrage
fetchAllPersons();
