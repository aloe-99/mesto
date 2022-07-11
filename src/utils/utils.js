import Card from '../components/Card.js';
import {popupWithAdd} from '../pages/index.js';
import {popupWithImage} from '../pages/index.js';
import {defaultCardList} from '../pages/index.js';
import {addFormValidator} from '../pages/index.js'

function createCard(item) {
  const card = new Card(item, '#card', (cardName, imageLink) => {popupWithImage.open(cardName, imageLink)});
  const cardElement = card.generateCard();
  return cardElement;
}

function addNewCard(evt) {
  evt.preventDefault();
  defaultCardList.addItem((createCard(popupWithAdd.getInputValues())));
  addFormValidator.disableFormBtn();
}

export { addNewCard, createCard};