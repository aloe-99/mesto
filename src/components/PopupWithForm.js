import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._callback  = callbackSubmit;
    this._formInputs = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const formInputsValues = this._formInputs.map((item) => {
      return item.value;
    });
    const formData = {};
    this._formInputs.forEach((input) => {
      formData[input.name] = input.value;
    });
    return formData;
  }

  setInputValues(data) {
    this._formInputs[0].value = data.firstInput;
    this._formInputs[1].value = data.secondInput;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._callback);
  }

  close() {
    super.close();
    this._form.reset();
  }
}