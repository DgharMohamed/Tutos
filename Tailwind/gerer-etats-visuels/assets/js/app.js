const formCategorie = document.getElementById('form-categorie');
const btnSubmit = document.getElementById('btn-submit-form');

function setLoadingState(isLoading) {
    btnSubmit.disabled = isLoading;

    if (isLoading) {
        btnSubmit.textContent = 'Enregistrement...';
    } else {
        btnSubmit.textContent = 'Enregistrer';
    }
}

formCategorie.addEventListener('submit', (e) => {
    e.preventDefault();

    setLoadingState(true);

    const startTime = Date.now();

    fetch('api/controllers/CategorieController.php', {
        method: 'POST',
        body: new FormData(formCategorie)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Succès :", data);
        formCategorie.reset();
    })
    .catch(error => {
        console.error("Erreur réseau :", error);
    })
    .finally(() => {
        const elapsedTime = Date.now() - startTime;
        const delay = Math.max(0, 800 - elapsedTime);

        setTimeout(() => {
            setLoadingState(false);
        }, delay);
    });
});
