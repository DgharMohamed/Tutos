    fetch('../backend/categorie.php')
    
    .then(response => response.json()) // On dit à JS que c'est du JSON
    .then(categorie => {
        // On récupère notre balise ul
        const ul = document.getElementById('liste-categories');
        
        // On boucle sur le tableau de catégories
        categorie.forEach(categorie => {
            const li = document.createElement('li');
            li.textContent = categorie.nom; // On affiche la clé "nom"
            ul.appendChild(li);
        });
    })
    .catch(erreur => console.error("Erreur de communication :", erreur));