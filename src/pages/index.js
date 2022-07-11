import './index.css';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {initialCards, validityConfig} from '../utils/const.js';
import {addNewCard, createCard} from'../utils/utils.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


const userInfo = new UserInfo({nameSelector: '.profile__name', profSelector: '.profile__text'});

const popupWithEdit = new PopupWithForm('#edit', (evt) => {
  evt.preventDefault();
  popupWithEdit.close();
  userInfo.setUserInfo(popupWithEdit.formData);
});

popupWithEdit.setEventListeners();

export const popupWithAdd = new PopupWithForm('#add', (evt) => {
  evt.preventDefault();
  addNewCard(evt);
  popupWithAdd.close();
});

popupWithAdd.setEventListeners();

export const popupWithImage = new PopupWithImage('#image');

export const defaultCardList = new Section(
  {
    items: initialCards, 
    renderer: (item) => {
      defaultCardList.addItem(createCard(item));
    }
  }, 
  '.elements'
);

popupWithImage.setEventListeners();

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
export const addFormValidator = new FormValidator(validityConfig, '#add-form');
addFormValidator.enableValidation();