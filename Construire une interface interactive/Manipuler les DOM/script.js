const btnShowForm = document.querySelector('#btn-show-form');
    const sectionForm = document.querySelector('#section-form');
    const btnCancelForm = document.querySelector('#btn-cancel-form');
    const formCategorie = document.querySelector('#form-categorie');
    const catNom = document.querySelector('#cat-nom');
    const catCouleur = document.querySelector('#cat-couleur');
    const tbody = document.querySelector('#table-categories-body');

    btnShowForm.addEventListener('click', () => {
      btnShowForm.hidden = true;
      sectionForm.hidden = false;
    });

    btnCancelForm.addEventListener('click', () => {
      formCategorie.reset();
      sectionForm.hidden = true;
      btnShowForm.hidden = false;
    });

    formCategorie.addEventListener('submit', (event) => {
      event.preventDefault();
      tbody.insertAdjacentHTML('beforeend', `
        <tr>
          <td>${catNom.value}</td>
          <td>${catCouleur.value}</td>
        </tr>
      `);
      formCategorie.reset();
      sectionForm.hidden = true;
      btnShowForm.hidden = false;
    });