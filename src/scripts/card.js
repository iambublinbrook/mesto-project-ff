import { removeCard, likeCard, unLikeCard } from './api.js';

// Функция создания карточки
export function createCard(cardData, deleteCallback, likeCallback, openImageCallback, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCount = cardElement.querySelector('.card__like-count');

  // Заполняем карточку
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Отображаем количество лайков
  cardLikeCount.textContent = cardData.likes.length;

  // Проверяем лайк юзера
  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  // Показываем кнопку удаления только для своих карточек
  if (cardData.owner._id === userId) {
    cardDeleteButton.style.display = 'block';
  } else {
    cardDeleteButton.style.display = 'none';
  }

  // Обработчики событий
  cardDeleteButton.addEventListener('click', () => {
    deleteCallback(cardData._id, cardElement);
  });

  cardLikeButton.addEventListener('click', () => {
    likeCallback(cardData._id, cardLikeButton, cardLikeCount, userId);
  });

  cardImage.addEventListener('click', () => {
    openImageCallback(cardData);
  });

  return cardElement;
}

// Обработчик лайка карточки
export function handleLikeCard(cardId, likeButton, likeCount, userId) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  const likePromise = isLiked ? unLikeCard(cardId) : likeCard(cardId);

  likePromise
    .then((data) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCount.textContent = data.likes.length;
    })
    .catch((error) => console.error('Ошибка при лайке карточки:', error));
}

// удаляем карточку
export function handleDeleteCard(cardId, cardElement) {
  removeCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => console.error('Ошибка при удалении карточки:', error));
}
