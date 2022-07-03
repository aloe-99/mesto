export class Card {
  constructor(data, cardSelector) {
    this._cardName = data.name;
    this._imageLink = data.link;

    this._cardSelector = cardSelector;
  }

  _handleOpenPopup() {
    document.querySelector('.popup__image').src = this._imageLink;
    document.querySelector('.popup__image').alt = this._cardName;
    document.querySelector('.popup__text').textContent = this._cardName;

    document.querySelector('#image').classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        document.querySelector('.popup_opened').classList.remove('popup_opened');
      }
    });
  }


  _setEventListeners() {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });
    this._element.querySelector('.elements__like-button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('elements__like-button_active');
    });
    this._element.querySelector('.elements__delete-btn').addEventListener('click', () => {
      this._element.remove();
    });
    }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.elements__name').textContent = this._cardName;
    this._element.querySelector('.elements__image').src = this._imageLink;
    this._element.querySelector('.elements__image').alt = this._cardName;

    this._setEventListeners();

    return this._element;
  }
}