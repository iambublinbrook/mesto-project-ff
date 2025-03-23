// Функция создания карточки
export function createCard(cardData, deleteCallback, likeCallback, openImageCallback, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardLikeCount.textContent = cardData.likes.length;

  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.owner._id === userId) {
    cardDeleteButton.style.display = 'block';
  } else {
    cardDeleteButton.style.display = 'none';
  }

  // Обработчики
  cardDeleteButton.addEventListener('click', () => {
    deleteCallback(cardData._id, cardElement);
  });

  cardLikeButton.addEventListener('click', () => {
    likeCallback(cardData._id, cardLikeButton, cardLikeCount);
  });

  cardImage.addEventListener('click', () => {
    openImageCallback(cardData);
  });

  return cardElement;
}

export function handleLikeCard(cardId, likeButton, likeCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  const likeMethod = isLiked ? 'DELETE' : 'PUT';
  fetch(`https://nomoreparties.co/v1/wff-cohort-34/cards/likes/${cardId}`, {
    method: likeMethod,
    headers: {
      authorization: '600ff3c5-dec1-43d8-a99c-2099edf0c668',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCount.textContent = data.likes.length;
    })
    .catch((error) => console.error('Ошибка при лайке карточки:', error));
}

// Функция удаления карточки
export function handleDeleteCard(cardId, cardElement) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-34/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '600ff3c5-dec1-43d8-a99c-2099edf0c668',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        cardElement.remove();
      } else {
        console.error('Ошибка при удалении карточки:', res.status);
      }
    })
    .catch((error) => console.error('Ошибка при удалении карточки:', error));
}

