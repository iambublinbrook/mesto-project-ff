import { closeModal, openModal } from './scripts/modal.js';
import { createCard, handleLikeCard, handleDeleteCard } from './scripts/card.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import {

  getInitialCards,
  getUserInfo,
  updateUserInfo,
  addNewCard,
  updateUserAvatar

} from './scripts/api.js';
import './pages/index.css';

//настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const elements = {
  //попапы
  editPopup: document.querySelector('.popup_type_edit'),
  addPopup: document.querySelector('.popup_type_new-card'),
  imageTypePopup: document.querySelector('.popup_type_image'),
  editAvatarPopup: document.querySelector('.popup_type_edit-avatar'),
  popupImage: document.querySelector('.popup__image'),
  popupImageCaption: document.querySelector('.popup__caption'),

  //кнопки
  editButton: document.querySelector('.profile__edit-button'),
  addButton: document.querySelector('.profile__add-button'),

  //формы и инпуты
  editAvatarForm: document.querySelector('.popup__form[name="edit-avatar"]'),
  editProfileForm: document.querySelector('.popup_type_edit .popup__form'),
  addForm: document.querySelector('.popup_type_new-card .popup__form'),
  nameInput: document.querySelector('.popup__input_type_name'),
  descriptionInput: document.querySelector('.popup__input_type_description'),
  cardNameInput: document.querySelector('.popup__input_type_card-name'),
  cardLinkInput: document.querySelector('.popup__input_type_url'),
  avatarUrlInput: document.querySelector('.popup__input_type_avatar-url'),
  profileAvatarContainer: document.querySelector('.profile__image-container'),

  //профиль
  profileTitle: document.querySelector('.profile__title'),
  profileDescription: document.querySelector('.profile__description'),
  profileAvatarElement: document.querySelector('.profile__image'),

  //список карточек
  placesList: document.querySelector('.places__list'),
};

const popups = document.querySelectorAll('.popup');
let currentUserId = '';

// обновление информации о пользователе
const updateUserInfoOnPage = (profile) => {
  if (!profile || !profile.name || !profile.about || !profile.avatar) {
    console.error('Ошибка', profile);
    return false;
  }

  const { name, about, avatar, _id } = profile;
  elements.profileTitle.textContent = name;
  elements.profileDescription.textContent = about;
  elements.profileAvatarElement.style.backgroundImage = `url(${avatar})`;

  if (_id) {
    currentUserId = _id;
  }

  return true;
}

function fillProfileForm() {
  elements.nameInput.value = elements.profileTitle.textContent;
  elements.descriptionInput.value = elements.profileDescription.textContent;
}

// Открытие попапа с изображением
function openImagePopup(cardData) {
  if (!cardData || !cardData.link || !cardData.name) {
    console.error('Ошибка', cardData);
    return;
  }

  elements.popupImage.src = cardData.link;
  elements.popupImage.alt = cardData.name;
  elements.popupImageCaption.textContent = cardData.name;
  openModal(elements.imageTypePopup);
}

// редактируем профиль
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const form = evt.currentTarget;
  const saveButton = form.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  updateUserInfo(elements.nameInput.value, elements.descriptionInput.value)
    .then((profile) => {
      updateUserInfoOnPage(profile);
      closeModal(elements.editPopup);
      form.reset();
      clearValidation(form, validationConfig);
    })
    .catch((error) => {
      console.error('Ошибка при обновлении профиля:', error);
    })
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    });
}

// добавляем карточку
const handleAddCardSubmit = (evt) => {
  evt.preventDefault();

  if (!currentUserId) {
    console.error('ID не загружен');
    return;
  }

  const saveButton = elements.addForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  const newCardData = {
    name: elements.cardNameInput.value,
    link: elements.cardLinkInput.value,
  };

  addNewCard(newCardData)
    .then((cardData) => {
      const newCardElement = createCard(
        cardData,
        handleDeleteCard,
        handleLikeCard,
        openImagePopup,
        currentUserId
      );
      elements.placesList.prepend(newCardElement);
      closeModal(elements.addPopup);
      elements.addForm.reset();
      clearValidation(elements.addForm, validationConfig);
    })
    .catch((error) => {
      console.error('Ошибка', error);
      alert('Не удалось добавить карточку. Попробуйте ещё раз.');
    })
    .finally(() => {
      saveButton.textContent = 'Создать';
    });
}

// редактируем аватар
const handleEditAvatarSubmit = (evt) => {
  evt.preventDefault();
  const saveButton = elements.editAvatarForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  updateUserAvatar(elements.avatarUrlInput.value)
    .then((profile) => {
      elements.profileAvatarElement.style.backgroundImage = `url(${profile.avatar})`;
      closeModal(elements.editAvatarPopup);
      elements.editAvatarForm.reset();
    })
    .catch((error) => {
      console.error('Ошибка', error);
    })
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    });
}

document.querySelectorAll('.popup').forEach((popup) => {
  popup.querySelector('.popup__close')?.addEventListener('click', () => closeModal(popup));
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
});

// Открытие попапа редактирования профиля
elements.editButton.addEventListener('click', () => {
  fillProfileForm();
  openModal(elements.editPopup);
  clearValidation(elements.editProfileForm, validationConfig);
});

// Открытие попапа добавления карточки
elements.addButton.addEventListener('click', () => {
  elements.addForm.reset();
  clearValidation(elements.addForm, validationConfig);
  openModal(elements.addPopup);

  elements.cardNameInput.focus();
});

// Открытие попапа редактирования аватара
elements.profileAvatarContainer.addEventListener('click', () => {
  elements.editAvatarForm.reset();
  clearValidation(elements.editAvatarForm, validationConfig);
  openModal(elements.editAvatarPopup);
});

//обработчики submit
elements.editProfileForm.addEventListener('submit', handleProfileFormSubmit);
elements.addForm.addEventListener('submit', handleAddCardSubmit);
elements.editAvatarForm.addEventListener('submit', handleEditAvatarSubmit);

//загрузка профиля и карточек
async function loadProfileAndCards() {

  try {
    const [profile, cards] = await Promise.all([getUserInfo(), getInitialCards()]);
    currentUserId = profile._id;
    updateUserInfoOnPage(profile);

    cards.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        handleDeleteCard,
        handleLikeCard,
        openImagePopup,
        currentUserId
      );
      elements.placesList.append(cardElement);
    });
  } catch (err) {
    console.log(err);
  }
}

enableValidation(validationConfig);
loadProfileAndCards();









