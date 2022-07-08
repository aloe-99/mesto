import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {initialCards, validityConfig, mestoInput, imageInput} from '../utils/const.js';
import {addNewCard} from'../utils/utils.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


const userInfo = new UserInfo({nameSelector: '.profile__name', profSelector: '.profile__text'});

const popupWithEdit = new PopupWithForm('#edit', (evt) => {
  evt.preventDefault();
  popupWithEdit.close();
  userInfo.setUserInfo(popupWithEdit.formData);
});

const popupWithAdd = new PopupWithForm('#add', (evt) => {
  evt.preventDefault();
  addNewCard(evt);
  popupWithAdd.close();
});

const popupWithImage = new PopupWithImage('#image');


const defaultCardList = new Section(
  {
    items: initialCards, 
    renderer: (item) => {
      const card = new Card(item, '#card', (cardName, imageLink) => {popupWithImage.open(cardName, imageLink)});
      const cardElement = card.generateCard();
      defaultCardList.addItem(cardElement);
    }
  }, 
  '.elements'
);

defaultCardList.renderItems();

document.querySelector('.profile__edit-button').addEventListener('click', () => { 
  const profData = userInfo.getUserInfo();
  popupWithEdit.setInputValues(profData);
  popupWithEdit.open();
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
  popupWithAdd.open();
});

const edtFormValidator = new FormValidator(validityConfig, '#edit-form');
edtFormValidator.enableValidation();
const addFormValidator = new FormValidator(validityConfig, '#add-form');
addFormValidator.enableValidation();