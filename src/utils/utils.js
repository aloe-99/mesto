import Card from '../components/Card.js';
import {popupWithImage, popupWithAdd, defaultCardList, addFormValidator} from '../pages/index.js';
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
  API.postCard(popupWithAdd.getInputValues())
    .then(result => {
      defaultCardList.addItem((createCard(result, '#card')));
      popupWithAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithAdd.changeSaveText();
      addFormValidator.disableFormBtn();
    });
}

export { addNewCard, createCard };