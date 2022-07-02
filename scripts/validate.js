const validityConfig = ({  // объект конфигурации с селекторами
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  submitButtonText: '.popup__save-text',
  inactiveButtonClass: 'popup__save-button_disabled',
  inactiveButtonText: 'popup__save-text_disabled',
  inputErrorClass: 'popup__input_type_error'
});



const showInputError = (formElement, inputElement, errorMessage, config) => {  // функция показывает ошибку
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {  // функция скрывает ошибку
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {  // функция проверяет корректность данных введенных в инпут и показывает/скрывает ошибку
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => { // функция предназначена для установки обработчиков событий
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); // создает массив из всех инпутов формы
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  const buttonText = buttonElement.querySelector(config.submitButtonText);
  toggleButtonState(inputList, buttonElement, buttonText, config);
  inputList.forEach((inputElement) => {  // вешает на каждый инпут формы обработчик событий, который проверяет валидность поля после любого ввода, и включает/выключает кнопку
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, buttonText, config);
    });
  });
};

function enableValidation(config) {  // функция для включения валидации
  const formList = Array.from(document.querySelectorAll(config.formSelector));  // создает массив из всех форм на странице
  formList.forEach((formElement) => {  // вешает обработчик событий на все формы, который отключает обновление страницы при отправке формы
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  setEventListeners(formElement, config);  // см. setEventListeners
  });
};

enableValidation(validityConfig);

function hasInvalidInput(inputList) { // функция проверяет, есть ли в форме поля с некорректными данными
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, buttonText, config) {  // в зависимости от корректности данных в форме делает кнопку активной/неактивной
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonText.classList.add(config.inactiveButtonText);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonText.classList.remove(config.inactiveButtonText);
    buttonElement.disabled = false;
  }
}