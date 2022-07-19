export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleBinded = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleBinded);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleBinded);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    const closeBtn = this._popup.querySelector('.popup__close-button');
    const popupItem = this._popup.querySelector('.popup__target');

    this._popup.addEventListener('mousedown', (evt) => {
      if (closeBtn.contains(evt.target)) { // закрывает попап нажатием кнопки закрытия
        this.close();
      } else if (this._popup.contains(popupItem)) { // закрывает попап если нажать на оверлей
        if (!popupItem.contains(evt.target)) {
          this.close();
        }
      }
    });
  }
}