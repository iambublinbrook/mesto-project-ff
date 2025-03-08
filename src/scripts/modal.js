function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export function openModal(popup) {
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', closePopupByEsc);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', closePopupByEsc);
}