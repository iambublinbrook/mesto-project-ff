import './pages/index.css';
import avatarUrl from './images/avatar.jpg';
import { initialCards } from './scripts/cards.js';
import { closeModal, openModal } from './scripts/modal.js';
import { createCard, handleLikeCard, handleDeleteCard } from './scripts/card.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  deleteCard,
  likeCard,
  unlikeCard,
  updateUserAvatar,
  getInitialData,
} from './scripts/api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

const elements = {
  editButton: document.querySelector('.profile__edit-button'),
  addButton: document.querySelector('.profile__add-button'),
  editPopup: document.querySelector('.popup_type_edit'),
  addPopup: document.querySelector('.popup_type_new-card'),
  profileTitle: document.querySelector('.profile__title'),
  profileDescription: document.querySelector('.profile__description'),
  formElement: document.querySelector('.popup_type_edit .popup__form'),
  nameInput: document.querySelector('.popup__input_type_name'),
  descriptionInput: document.querySelector('.popup__input_type_description'),
  addForm: document.querySelector('.popup_type_new-card .popup__form'),
  cardNameInput: document.querySelector('.popup__input_type_card-name'),
  cardLinkInput: document.querySelector('.popup__input_type_url'),
  placesList: document.querySelector('.places__list'),
  profileAvatarElement: document.querySelector('.profile__image'),
  imageTypePopup: document.querySelector('.popup_type_image'),
  popupImage: document.querySelector('.popup__image'),
  popupCaption: document.querySelector('.popup__caption'),
};

const popups = document.querySelectorAll('.popup');

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  elements.profileTitle.textContent = elements.nameInput.value;
  elements.profileDescription.textContent = elements.descriptionInput.value;
  closeModal(elements.editPopup);
}

// Функция handleAddCardSubmit
function handleAddCardSubmit(evt) {
  console.log('Функция handleAddCardSubmit вызвана'); // Отладочный вывод
  evt.preventDefault();

  const newCardData = {
    name: elements.cardNameInput.value,
    link: elements.cardLinkInput.value,
  };

  console.log('Данные новой карточки:', newCardData); // Отладочный вывод

  const newCardElement = createCard(newCardData, handleDeleteCard, handleLikeCard, openImagePopup);
  console.log('Созданный элемент карточки:', newCardElement); // Отладочный вывод

  if (elements.placesList) {
    elements.placesList.prepend(newCardElement);
  } else {
    console.error('Контейнер для карточек не найден');
  }

  closeModal(elements.addPopup);
  elements.addForm.reset();
  clearValidation(elements.addForm, validationConfig); // Очистка валидации
}

function openImagePopup(cardData) {
  elements.popupImage.src = cardData.link;
  elements.popupImage.alt = cardData.name;
  elements.popupCaption.textContent = cardData.name;
  openModal(elements.imageTypePopup);
}

popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      closeModal(popup);
    });
  }

  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
});

elements.editPopup.addEventListener('click', () => {
  clearValidation(elements.formElement, validationConfig);
});

elements.addPopup.addEventListener('click', () => {
  clearValidation(elements.addForm, validationConfig);
});

elements.editButton.addEventListener('click', () => {
  elements.nameInput.value = elements.profileTitle.textContent;
  elements.descriptionInput.value = elements.profileDescription.textContent;
  openModal(elements.editPopup);
});

elements.addButton.addEventListener('click', () => {
  elements.addForm.reset();
  clearValidation(elements.addForm, validationConfig);
  openModal(elements.addPopup);
});

elements.formElement.addEventListener('submit', handleProfileFormSubmit);
const submitButton = elements.addForm.querySelector(validationConfig.submitButtonSelector);
console.log('Кнопка отправки активна:', !submitButton.classList.contains(validationConfig.inactiveButtonClass));
console.log('Привязка обработчика submit к форме добавления карточки');
elements.addForm.addEventListener('submit', handleAddCardSubmit);

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, handleDeleteCard, handleLikeCard, openImagePopup);
  elements.placesList.append(cardElement);
});

if (elements.profileAvatarElement) {
  elements.profileAvatarElement.style.backgroundImage = `url(${avatarUrl})`;
}

