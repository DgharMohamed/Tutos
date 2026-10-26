const btnSubmit = document.getElementById('btn-submit-form');
const listeCategories = document.getElementById('liste-categories');

btnSubmit.addEventListener('click', () => {
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Chargement...';

    const debut = Date.now();

    fetch('api/controllers/CategorieController.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Réponse invalide du serveur.');
            }

            listeCategories.innerHTML = '';
            data.forEach(categorie => {
                const li = document.createElement('li');
                li.textContent = categorie.nom;
                listeCategories.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Erreur :', error);
            listeCategories.textContent = 'Erreur lors du chargement.';
        })
        .finally(() => {
            const tempsRestant = Math.max(0, 800 - (Date.now() - debut));

            setTimeout(() => {
                btnSubmit.disabled = false;
                btnSubmit.textContent = 'Afficher les catégories';
            }, tempsRestant);
        });
});
