const Button = document.getElementById('button');
const Form = document.getElementById('form');
const Spinner = document.getElementById('spinner');

function setLoadingState(isLoading) {
    
    if (isLoading) {
        Button.disabled = true;
        Button.textContent = 'Enregistrement…';
        Spinner.classList.remove('hidden');
    } else {
        Button.disabled = false;
        Button.textContent = 'Enregistrer';
        Spinner.classList.add('hidden');
    }
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    let classes = 'text-white px-4 py-2 rounded shadow-lg mb-2 transition-opacity duration-500';
    if (type === 'success') {
        classes += ' bg-green-500';
    } else {
        classes += ' bg-red-500';
    }
    toast.className = classes;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function fetchCategories() {
    fetch('http://localhost:8000/controllers/CategorieController.php')
        .then(response =>response.json()).then(data => {
            console.log("Type :", typeof data);
            const tableBody = document.getElementById('table-body');
            tableBody.innerHTML = ''
            data.forEach(category => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="py-2 px-4 border-b">${category.nom}</td>
                    <td class="py-2 px-4 border-b">${category.couleur}</td>
                    <td class="py-2 px-4 border-b">${category.icone}</td>
                `;
                tableBody.appendChild(row);
            });
        }).catch(error => {
            console.error('Error fetching categories:', error);
        }) 
}




document.addEventListener('DOMContentLoaded', function() {
    fetchCategories()   
    Form.addEventListener('submit', function(event) {
            event.preventDefault();
            setLoadingState(true);
            fetch('http://localhost:8000/controllers/CategorieController.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nom: document.getElementById('nom').value,
                    couleur: document.getElementById('couleur').value,
                    icone: document.getElementById('icone').value
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                showToast('Categorie ajoutee avec succes!', 'success');
                fetchCategories() 
                Form.reset();
            })
            .catch(error => {
                setLoadingState(false);
                console.error('Error:', error);
                showToast('Erreur lors de l\'enregistrement', 'error');
            }).finally(() => {
                setLoadingState(false);
            })
    })
})
