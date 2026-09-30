const API_URL = 'backend/api.php';

const tableBody = document.querySelector('#tableBody');
const form = document.querySelector('#categorieForm');
const btnAnnuler = document.querySelector('#btnAnnuler');
const titreFormulaire = document.querySelector('#titreFormulaire');
const message = document.querySelector('#message');

let ligneEnEdition = null;

function afficherMessage(texte, erreur = false) {
    message.textContent = texte;
    message.classList.toggle('erreur', erreur);
}

function echapper(texte) {
    const div = document.createElement('div');
    div.textContent = texte === null || texte === undefined ? '' : texte;
    return div.innerHTML;
}

function reinitialiserFormulaire() {
    form.reset();
    ligneEnEdition = null;
    titreFormulaire.textContent = 'Ajouter une categorie';
}

function fermerFormulaire() {
    reinitialiserFormulaire();
    afficherMessage('');
}

// 2.1 - Charger et afficher les categories au demarrage (GET)
function chargerCategories() {
    fetch(API_URL)
        .then(response => response.json())
        .then(result => {
            tableBody.innerHTML = '';

            result.data.forEach(categorie => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${echapper(categorie.nom)}</td>
                    <td>
                        <span style="display:inline-block;width:20px;height:20px;background:${echapper(categorie.couleur)};vertical-align:middle;"></span>
                        ${echapper(categorie.couleur)}
                    </td>
                    <td>${echapper(categorie.icone)}</td>
                    <td>
                        <button type="button" class="btnModifier">Modifier</button>
                        <button type="button" class="btnSupprimer">Supprimer</button>
                    </td>
                `;

                tableBody.appendChild(tr);

                tr.querySelector('.btnModifier').addEventListener('click', () => remplirFormulaire(categorie));

                // 2.3 - Bouton Supprimer (DELETE)
                tr.querySelector('.btnSupprimer').addEventListener('click', () => {
                    if (!confirm(`Supprimer la categorie "${categorie.nom}" ?`)) return;

                    fetch(API_URL, {
                        method: 'DELETE',
                        body: JSON.stringify({ id: categorie.id })
                    })
                        .then(response => response.json())
                        .then(() => chargerCategories())
                        .catch(err => afficherMessage(`Erreur : ${err.message}`, true));
                });
            });
        })
        .catch(err => afficherMessage(`Erreur : ${err.message}`, true));
}

function remplirFormulaire(categorie) {
    ligneEnEdition = categorie.id;
    titreFormulaire.textContent = 'Modifier la categorie';
    form.nom.value = categorie.nom;
    form.couleur.value = categorie.couleur;
    form.icone.value = categorie.icone;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2.2 - Formulaire connecte a l'API (POST / PUT)
form.addEventListener('submit', event => {
    event.preventDefault();

    const categorie = {
        nom: form.nom.value.trim(),
        couleur: form.couleur.value,
        icone: form.icone.value.trim()
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categorie)
    };

    if (ligneEnEdition) {
        categorie.id = ligneEnEdition;
        options.method = 'PUT';
    }

    fetch(API_URL, options)
        .then(response => response.json())
        .then(result => {
            if (!result.success) {
                afficherMessage(result.message || 'Erreur', true);
                return;
            }

            fermerFormulaire();
            chargerCategories();
        })
        .catch(err => afficherMessage(`Erreur : ${err.message}`, true));
});

btnAnnuler.addEventListener('click', fermerFormulaire);

document.addEventListener('DOMContentLoaded', chargerCategories);
