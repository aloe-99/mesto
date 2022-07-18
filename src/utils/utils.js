import Card from '../components/Card.js';
import {popupWithImage} from '../pages/index.js';;
import {addFormValidator} from '../pages/index.js';
import {API} from '../pages/index.js';

function createCard(item, cardType) {
  const cardId = item._id;
  const likes = item.likes;
  const card = new Card(item, cardType, (cardName, imageLink) => {popupWithImage.open(cardName, imageLink)}, cardId, likes);
  const cardElement = card.generateCard();
  return cardElement;
}

function addNewCard(evt) {
  evt.preventDefault();
  API.postCard();
  addFormValidator.disableFormBtn();
}

export { addNewCard, createCard };