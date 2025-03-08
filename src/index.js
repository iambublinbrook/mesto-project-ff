import './pages/index.css';
import avatarUrl from './images/avatar.jpg';
import { initialCards } from './scripts/cards.js';
import { closeModal, openModal } from './scripts/modal.js';
import { createCard, handleLikeCard, handleDeleteCard } from './scripts/card.js';

const popups = document.querySelectorAll('.popup');

//используем forEach для всех попапов и добавляем обработчики закрытия

popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      closeModal(popup);
    });
  }
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
});

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

//обработчик отправки формы для профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  elements.profileTitle.textContent = elements.nameInput.value;
  elements.profileDescription.textContent = elements.descriptionInput.value;
  closeModal(elements.editPopup);
}

//обработчик отправки формы для добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: elements.cardNameInput.value,
    link: elements.cardLinkInput.value,
  };

  const newCardElement = createCard(newCardData, handleDeleteCard, handleLikeCard, openImagePopup);
  elements.placesList.prepend(newCardElement);
  closeModal(elements.addPopup);
  elements.addForm.reset();
}

function openImagePopup(cardData) {

  elements.popupImage.src = cardData.link;
  elements.popupImage.alt = cardData.name;
  elements.popupCaption.textContent = cardData.name;

  openModal(elements.imageTypePopup);
}

//добавляем обработчики событий
elements.editButton.addEventListener('click', () => {
  elements.nameInput.value = elements.profileTitle.textContent;
  elements.descriptionInput.value = elements.profileDescription.textContent;
  openModal(elements.editPopup);
});

elements.addButton.addEventListener('click', () => {
  elements.addForm.reset();
  openModal(elements.addPopup);
});

elements.formElement.addEventListener('submit', handleProfileFormSubmit);
elements.addForm.addEventListener('submit', handleAddCardSubmit);

//добавляем карточки
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, handleDeleteCard, handleLikeCard, openImagePopup);
  elements.placesList.append(cardElement);
});


if (elements.profileAvatarElement) {
  elements.profileAvatarElement.style.backgroundImage = `url(${avatarUrl})`;
}

