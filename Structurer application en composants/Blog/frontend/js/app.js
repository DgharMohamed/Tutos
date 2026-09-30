    fetch('../backend/categorie.php')
    
    .then(response => response.json()) 
    .then(categorie => {
        
        const ul = document.getElementById('liste-categories');
        
        
        categorie.forEach(categorie => {
            const li = document.createElement('li');
            li.textContent = categorie.nom; 
            ul.appendChild(li);
        });
    })
    .catch(erreur => console.error("Erreur de communication :", erreur));