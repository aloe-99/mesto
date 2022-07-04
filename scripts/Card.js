import { openPopup, popupImage, mestoName, mestoImage } from "./utils.js";

export class Card {
  constructor(data, cardSelector) {
    this._cardName = data.name;
    this._imageLink = data.link;
    this._elementsImage = '.elements__image'

    this._cardSelector = cardSelector;
  }

  _handleOpenPopup() {
    mestoImage.src = this._imageLink;
    mestoImage.alt = this._cardName;
    mestoName.textContent = this._cardName;

    openPopup(popupImage);
  }


  _setEventListeners() {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleOpenPopup();
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