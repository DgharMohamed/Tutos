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

fetch('https://ummahapi.com/api/quran/audio/36')
  .then(response => response.json())
  .then(res => {

    const reciters = res.data.reciters;

    reciters.forEach(reciter => {

      if (!reciter.full_surah_audio) {
        return;
      }

      ayahAudio.insertAdjacentHTML('beforeend', `
        <div>
          <strong>${reciter.name_arabic}</strong>
          <span>${reciter.name}</span>

          <audio controls preload="none">
            <source src="${reciter.full_surah_audio}" type="audio/mpeg">
            Votre navigateur ne supporte pas l'audio.
          </audio>
        </div>
      `);

    });

  })
  .catch(err => {
    console.error('Erreur audio:', err);
  });


