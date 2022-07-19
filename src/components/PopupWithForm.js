import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this.form = this._popup.querySelector('.popup__form');
    this._callback  = callbackSubmit;
    this._formInputs = Array.from(this.form.querySelectorAll('.popup__input'));
    this._formValues = {},
    this._saveText = this.form.querySelector('.popup__save-text');
    this._saveTextContent = this._saveText.textContent;
  }

  getInputValues() {
    this._formInputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._formInputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._callback);
  }

  close() {
    super.close();
    this.form.reset();
  }

  changeSaveTextInProcess() {
    this._saveText.textContent = 'Сохранение...';
  }

  changeSaveText() {
    this._saveText.textContent = this._saveTextContent;
  }
}