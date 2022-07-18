import { popupWithDecision } from "../pages/index.js";
import {API} from "../pages/index.js"

export default class Card {
  constructor(data, cardSelector, handleCardClick, cardId, likes) {
    this._cardName = data.name;
    this._imageLink = data.link;
    this._elementsImage = '.elements__image';
    this.cardId = cardId;
    this.likes = likes;

    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick(this._cardName, this._imageLink);
    });
    this._element.querySelector('.elements__like-button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('elements__like-button_active');
      if (evt.target.classList.contains('elements__like-button_active')) {
        API.addLike(this.cardId, this._element);
      } else {
        API.removeLike(this.cardId, this._element);
      }
    });
    if (this._element.contains(this._element.querySelector('.elements__delete-btn'))) {
      this._element.querySelector('.elements__delete-btn').addEventListener('click', (evt) => {
        popupWithDecision.open();
        popupWithDecision.form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._removeCard();
          popupWithDecision.close();
          API.deleteCard(this.cardId);
        });
      });
    }
    }

  _removeCard() {
    this._element.remove();
    this._element = null;
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
    this._element.querySelector('.elements__like-counter').textContent = this.likes.length;

    this.likes.find((item) => {
      if (item._id == 'c618fc51e5dd6c2993d73f44') {
        this._element.querySelector('.elements__like-button').classList.add('elements__like-button_active');
      }
    });

    this._setEventListeners();

    return this._element;
  }
}