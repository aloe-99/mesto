import Card from '../components/Card.js';
import {addFormValidator} from '../pages/index.js'
import { mestoInput, imageInput } from './const.js';

export function addNewCard(evt) {
  evt.preventDefault();
  const newData = {
    name: mestoInput.value,
    link: imageInput.value
  }
  const card = new Card(newData, '#card', (cardName, imageLink) => {popupWithImage.open(cardName, imageLink)});
  const newCard = card.generateCard();
  document.querySelector('.elements').prepend(newCard);
  addFormValidator.disableFormBtn();
}