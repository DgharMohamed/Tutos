const listSurahs = document.querySelector('#list-surahs');
const infoSurahs = document.querySelector('#info-surahs');
const error = document.querySelector('#error');
const ayahAudio = document.querySelector('#ayahAudio');


fetch('https://ummahapi.com/api/quran/surahs')
  .then(response => response.json())
  .then(res => {

    console.log('Sourates:', res);

    const surahs = res.data.surahs;

    infoSurahs.textContent = `${surahs.length} sourates`;

    surahs.forEach(surah => {
      listSurahs.insertAdjacentHTML('beforeend', `
        <li>
          <strong>${surah.number}. ${surah.name_english}</strong>
          (${surah.name_arabic}) -
          ${surah.verses_count} آية
        </li>
      `);
    });

  })
  .catch(err => {
    console.error('Erreur sourates:', err);
    error.textContent = `Erreur : ${err.message}`;
  });
