export default class FormValidator {
  constructor(config, formID) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._submitButtonText = config.submitButtonText;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inactiveButtonText = config.inactiveButtonText;
    this._inputErrorClass = config.inputErrorClass;
    this._form = document.querySelector(formID);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement, buttonText) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonText.classList.add(this._inactiveButtonText);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonText.classList.remove(this._inactiveButtonText);
      buttonElement.disabled = false;
    }
  }

  disableFormBtn() {
    this._form.querySelector(this._submitButtonText).classList.add(this._inactiveButtonText);
    this._form.querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass);
    this._form.querySelector(this._submitButtonSelector).disabled = true;
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector)); // создает массив из всех инпутов формы
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    const buttonText = buttonElement.querySelector(this._submitButtonText);
    this._toggleButtonState(inputList, buttonElement, buttonText);
    inputList.forEach((inputElement) => {  // вешает на каждый инпут формы обработчик событий, который проверяет валидность поля после любого ввода, и включает/выключает кнопку
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement, buttonText);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}