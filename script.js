// Получаем основные элементы
const container = document.querySelector('.container');
const songsContainer = container.querySelector('.songs-container');
const addButton = container.querySelector('.form__submit-btn_action_add');
const resetButton = container.querySelector('.form__submit-btn_action_reset');
const noSongsElement = container.querySelector('.no-songs');
const artistInput = container.querySelector('.input__text_type_artist');
const songInput = container.querySelector('.input__text_type_song');

// Функция рендера состояния (обновляет видимость "Нет песен" и состояние кнопки reset)
function renderAdded() {
  const songs = songsContainer.querySelectorAll('.song');

  if (songs.length === 0) {
    resetButton.setAttribute('disabled', true);
    resetButton.classList.add('form__submit-btn_disabled');
    noSongsElement.classList.remove('no-songs_hidden');
  } else {
    resetButton.removeAttribute('disabled');
    resetButton.classList.remove('form__submit-btn_disabled');
    noSongsElement.classList.add('no-songs_hidden');
  }
}

// Функция добавления песни
function addSong() {
  const artistValue = artistInput.value.trim();
  const songValue = songInput.value.trim();

  // Проверка на пустые поля
  if (!artistValue || !songValue) {
    alert('Пожалуйста, заполните оба поля!');
    return;
  }

  // Добавляем песню в контейнер
  songsContainer.insertAdjacentHTML('beforeend', `
    <div class="song">
      <h4 class="song__artist">${artistValue}</h4>
      <p class="song__title">${songValue}</p>
      <button class="song__like" aria-label="Лайк песни"></button>
    </div>
  `);

  // Очищаем поля ввода
  artistInput.value = '';
  songInput.value = '';

  // Обновляем состояние
  renderAdded();
}

// Функция очистки плейлиста
function resetPlaylist() {
  songsContainer.innerHTML = '';
  renderAdded();
}

// Функция переключения лайка
function toggleLike(event) {
  const likeButton = event.target;
  if (likeButton.classList.contains('song__like')) {
    likeButton.classList.toggle('song__like_active');
  }
}

// Обработчики событий
addButton.addEventListener('click', addSong);
resetButton.addEventListener('click', resetPlaylist);

// Делегирование событий для лайков (работает даже с новыми песнями)
songsContainer.addEventListener('click', toggleLike);

// Инициализация состояния при загрузке
renderAdded();