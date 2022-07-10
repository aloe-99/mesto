import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._callback  = callbackSubmit;
    this.formData = this._getInputValues();
  }

  _getInputValues() {
    const formInputs = Array.from(this._form.querySelectorAll('.popup__input'));
    const formInputsValues = formInputs.map((item) => {
      return item.value;
    });
    const formData = {};
    formData.firstInput = formInputsValues['0'];
    formData.secondInput = formInputsValues['1'];
    return formData;
  }

  setInputValues(data) {
    const formInputs = Array.from(this._form.querySelectorAll('.popup__input'));
    formInputs[0].value = data.firstInput;
    formInputs[1].value = data.secondInput;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._callback);
  }

  close() {
    this.formData = this._getInputValues();
    super.close();
    this._form.reset();
  }
}