export function openModal(popup) {
  popup.classList.add('popup_is-opened');

  const closeButton = popup.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => closeModal(popup));
  }

  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeModal(popup);
    }
  });
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');

  const closeButton = popup.querySelector('.popup__close');
  if (closeButton) {
    closeButton.removeEventListener('click', () => closeModal(popup));
  }

  popup.removeEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });

  document.removeEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeModal(popup);
    }
  });
}
