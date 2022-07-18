import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this.form = this._popup.querySelector('.popup__form');
    this._callback  = callbackSubmit;
    this._formInputs = Array.from(this.form.querySelectorAll('.popup__input'));
    this._saveText = this.form.querySelector('.popup__save-text');
    this._saveTextContent = this._saveText.textContent;
  }

  getInputValues() {
    const firstInputName = this._formInputs[0].name;
    const secondInputName = this._formInputs[1].name;
    const formData = {};
    formData[firstInputName] = this._formInputs[0].value;
    formData[secondInputName] = this._formInputs[1].value;
    return formData;
  }

  setInputValues(data) {
    this._formInputs[0].value = data.name;
    this._formInputs[1].value = data.about;
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