const popupImage = document.querySelector('#image');
const mestoImage = popupImage.querySelector('.popup__image');
const mestoName = popupImage.querySelector('.popup__text');



function handleEscKey(evt) {  // закрывает попап если нажать ESC
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {  // Открывает попап
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscKey);
}

function closePopup(popup) {  // Закрывает попап
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKey);
}

export { openPopup, popupImage, mestoName, mestoImage, handleEscKey, closePopup };