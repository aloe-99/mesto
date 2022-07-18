const mestoInput = document.querySelector('#mesto');
const imageInput = document.querySelector('#mesto-image');


const validityConfig = ({  // объект конфигурации с селекторами
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  submitButtonText: '.popup__save-text',
  inactiveButtonClass: 'popup__save-button_disabled',
  inactiveButtonText: 'popup__save-text_disabled',
  inputErrorClass: 'popup__input_type_error'
});


export {validityConfig, mestoInput, imageInput};