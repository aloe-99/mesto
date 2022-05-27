const validityConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  submitButtonText: '.popup__save-text',
  inactiveButtonClass: 'popup__save-button_disabled',
  inactiveButtonText: 'popup__save-text_disabled',
  inputErrorClass: 'popup__input_type_error',
});

function isInvalidInput(evt) {
  return !evt.target.validity.valid;
}

function inputError (evt, config) {
  evt.target.classList.add(config.inputErrorClass);
  const errorText = document.querySelector(`.${evt.target.id}-error`);
  if (evt.target.validity.valueMissing) {
    errorText.textContent = 'Вы пропустили это поле.';
  } else if (evt.target.validity.tooShort) {
    errorText.textContent = 'Недостаточно символов.'
  } else if (evt.target.type === 'url') {
    errorText.textContent = 'Введите адрес сайта.'
  }
}

function removeInputError (evt, config) {
  evt.target.classList.remove(config.inputErrorClass);
  errorText = document.querySelector(`.${evt.target.id}-error`);
  errorText.innerHTML= `<span class="popup__error-text ${evt.target.id}-error">&nbsp;</span>`;
}

function disableButton (config, button, buttonText) {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
  buttonText.classList.add(config.inactiveButtonText);
}

function enableButton (config, button, buttonText) {
  button.disabled = false;
  button.classList.remove(config.inactiveButtonClass);
  buttonText.classList.remove(config.inactiveButtonText);
}

function setEventListeners (config) {
  const inputs = document.querySelectorAll(config.inputSelector);
  inputs.forEach((inputElem) => {
    inputElem.addEventListener('input', (evt) => {
      const activeForm = evt.target.parentNode;
      const saveButton = activeForm.querySelector(config.submitButtonSelector);
      const saveButtonText = saveButton.querySelector(config.submitButtonText);
      if (isInvalidInput(evt)) {
        inputError(evt, config);
        disableButton(config, saveButton, saveButtonText);
      } else {
        removeInputError(evt, config);
        enableButton(config, saveButton, saveButtonText);
      }
    });
  });
}

function enableValidation(config) {
  setEventListeners(config);
}

enableValidation(validityConfig);