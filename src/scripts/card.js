// Функция создания карточки
export function createCard(cardData, deleteCallback, likeCallback, openImageCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;

  cardDeleteButton.addEventListener('click', () => {
    deleteCallback(cardElement);
  });

  cardLikeButton.addEventListener('click', () => {
    likeCallback(cardLikeButton);
  });

  cardImage.addEventListener('click', () => {
    openImageCallback(cardData);
  });

  return cardElement;
}

//Функция для обработки лайка
export function handleLikeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// Функция удаления карточки
export function handleDeleteCard(cardElement) {
  cardElement.remove();
}

