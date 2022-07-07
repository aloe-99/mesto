export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._cardName = data.name;
    this._imageLink = data.link;
    this._elementsImage = '.elements__image';

    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
  }


  _setEventListeners() {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick(this._cardName, this._imageLink);
    });
    this._element.querySelector('.elements__like-button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('elements__like-button_active');
    });
    this._element.querySelector('.elements__delete-btn').addEventListener('click', () => {
      this._element.remove()
      this._element = null;
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
    this._element.querySelector(this._elementsImage).src = this._imageLink;
    this._element.querySelector(this._elementsImage).alt = this._cardName;

    this._setEventListeners();

    return this._element;
  }
}